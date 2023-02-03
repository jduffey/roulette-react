/* global BigInt */

import { WHEEL_NUMBERS } from "./wheelNumbers";
import { digestMessage } from "./digestMaker";

async function getRandomIntBetweenZeroInclusiveAndMaxExclusive(max, entropy) {
    const digest = await digestMessage(entropy);
    if (digest.length !== 64) throw new Error("Digest must be 64 characters long");

    const inputDigestAsNumber = BigInt(`0x${digest}`);

    const chunkSize = (BigInt(`0x${"f".repeat(64)}`) + 1n) / BigInt(BigInt(max));

    // Uncomment to see the chunks
    // for (let i = 0; i < max; i++) {
    //     const chunkStart = chunkSize * BigInt(i);
    //     const chunkEnd = chunkSize * BigInt(i + 1) - 1n;
    //     console.log("Chunk ", i, ": \n", chunkStart.toString(16), "\n", chunkEnd.toString(16));
    // }

    const chunksEnd = chunkSize * BigInt(max) - 1n;

    const actualIndex = Number(inputDigestAsNumber / chunkSize);

    // We need to make sure that the index returned is less than 38, and due to chunking there is a neglibigle but
    // non-zero chance that the index will be 38. The hash value below is the highest hash value that will
    // result in a valid index.
    const effectiveDigest = inputDigestAsNumber <= chunksEnd ?
        inputDigestAsNumber :
        chunksEnd;

    const effectiveIndex =
        Number(effectiveDigest / chunkSize);

    return {
        entropy: {
            value: entropy,
            type: typeof entropy,
        },
        digest: {
            actual: digest,
            effective: effectiveDigest.toString(16),
        },
        chunks: {
            count: max,
            size: {
                hex: chunkSize.toString(16),
                decimal: chunkSize.toString(10),
            },
        },
        index: {
            actual: actualIndex,
            effective: effectiveIndex,
        }
    };
}

export const getRandomWheelNumber = async (entropy) => {
    const randomnessData = await getRandomIntBetweenZeroInclusiveAndMaxExclusive(Object.keys(WHEEL_NUMBERS).length, entropy);

    // TODO leaving here as reminder to extract and test
    // console.log(randomnessData);

    const randomIndex = randomnessData.index.effective;

    const randomWheelNumber = WHEEL_NUMBERS[Object.keys(WHEEL_NUMBERS)[randomIndex]];

    return randomWheelNumber;
}
