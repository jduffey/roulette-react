/* global BigInt */

export class RandomnessProvider {
    constructor(collection, digest) {
        if (!/^[0-9a-fA-F]{64}$/.test(digest)) {
            throw new RangeError("Digest must be a 64-character hexadecimal string");
        }
        this._collection = collection;
        this._digest = digest;
    }

    getRandomElement() {
        const randomIndex = getRandomIndex(this._collection.length, this._digest);
        return this._collection[randomIndex];
    }
}

function getRandomIndex(max, digest) {
    const inputDigestAsNumber = BigInt("0x" + digest);

    const chunkSize = (BigInt("0x" + "f".repeat(64)) + 1n) / BigInt(BigInt(max));

    const chunksEnd = chunkSize * BigInt(max) - 1n;

    // We need to make sure that the index returned is valid, and due to chunking there is a negligible but
    // non-zero chance that the index will be out of bounds if we use a digest value that is beyond the range of the last chunk.
    const effectiveDigest =
        inputDigestAsNumber <= chunksEnd ?
            inputDigestAsNumber :
            chunksEnd;

    const effectiveIndex =
        Number(effectiveDigest / chunkSize);

    return effectiveIndex;
}
