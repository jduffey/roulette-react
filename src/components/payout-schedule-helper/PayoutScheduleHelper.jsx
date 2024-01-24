export function PayoutScheduleHelper() {
    const commonFontStyles = {
        fontFamily: 'Lexend Mega',
        fontWeight: '700',
        wordWrap: 'break-word',
    };

    const commonBoxStyles = {
        borderRadius: 15,
        border: '4px black solid',
    };

    return (
        <div
            style={{
                width: 1440,
                height: 1024,
                outline: '1px solid red',
                backgroundColor: '#027eb1',
            }}>
            <div
                style={{
                    ...commonFontStyles,
                    position: 'absolute',
                    top: '60px',
                    left: '276px',
                    width: '888px',
                    height: '60px',
                    color: 'white',
                    fontSize: 48,
                    textAlign: 'center',
                }}>
                PAYOUT SCHEDULE HELPER
            </div>
            <div
                style={{
                    ...commonBoxStyles,
                    position: 'absolute',
                    top: '158px',
                    left: '250px',
                    width: '390px',
                    height: '63px',
                    background: '#D9D9D9',
                }} />
            <div
                style={{
                    ...commonBoxStyles,
                    position: 'absolute',
                    top: '247px',
                    left: '250px',
                    width: '390px',
                    height: '63px',
                    background: '#D9D9D9',
                }} />
            <div
                style={{
                    ...commonFontStyles,
                    ...commonBoxStyles,
                    position: 'absolute',
                    top: '153px',
                    left: '671px',
                    width: '518px',
                    height: '68px',
                    background: '#FFA17B',
                    boxShadow: '4px 6px 0px black',
                    textAlign: 'center',
                    fontSize: 28,
                    lineHeight: '68px',
                }}>
                SET TARGET HOUSE EDGE
            </div>
            <div
                style={{
                    ...commonFontStyles,
                    ...commonBoxStyles,
                    position: 'absolute',
                    top: '243px',
                    left: '671px',
                    width: '518px',
                    height: '68px',
                    background: '#FFA17B',
                    boxShadow: '4px 6px 0px black',
                    textAlign: 'center',
                    fontSize: 28,
                    lineHeight: '68px',
                }}>
                SET TOTAL OUTCOMES
            </div>
            <div
                style={{
                    ...commonFontStyles,
                    position: 'absolute',
                    top: '340px',
                    left: '170px',
                    width: '556px',
                    height: '35px',
                    color: 'white',
                    fontSize: 28,
                    textAlign: 'right',
                }}>
                TOTAL WINNING OUTCOMES:
            </div>
            <div
                style={{
                    ...commonFontStyles,
                    position: 'absolute',
                    top: '380px',
                    left: '170px',
                    width: '556px',
                    height: '35px',
                    color: 'white',
                    fontSize: 28,
                    textAlign: 'right',
                }}>
                TOTAL ODDS OF WINNING:
            </div>
            <div
                style={{
                    ...commonFontStyles,
                    position: 'absolute',
                    top: '420px',
                    left: '170px',
                    width: '556px',
                    height: '35px',
                    color: 'white',
                    fontSize: 28,
                    textAlign: 'right',
                }}>
                MONOTONIC PLAYER EV:
            </div>
            <div
                style={{
                    ...commonFontStyles,
                    position: 'absolute',
                    top: '460px',
                    left: '170px',
                    width: '556px',
                    height: '35px',
                    color: 'white',
                    fontSize: 28,
                    textAlign: 'right',
                }}>
                MONOTONIC HOUSE EDGE:
            </div>
            <div
                style={{
                    ...commonFontStyles,
                    position: 'absolute',
                    top: '340px',
                    left: '740px',
                    height: '35px',
                    color: '#FDFD96',
                    fontSize: 28,
                }}>
                546 OF 1326
            </div>
            <div
                style={{
                    ...commonFontStyles,
                    position: 'absolute',
                    top: '380px',
                    left: '740px',
                    height: '35px',
                    color: '#FDFD96',
                    fontSize: 28,
                }}>
                41.176471 %
            </div>
            <div
                style={{
                    ...commonFontStyles,
                    position: 'absolute',
                    top: '420px',
                    left: '740px',
                    height: '35px',
                    color: '#FDFD96',
                    fontSize: 28,
                }}>
                0.947210
            </div>
            <div
                style={{
                    ...commonFontStyles,
                    position: 'absolute',
                    top: '460px',
                    left: '740px',
                    height: '35px',
                    color: '#FDFD96',
                    fontSize: 28,
                }}>
                0.052790 (5.580694 % FROM TARGET)
            </div>
            <div
                style={{
                    ...commonFontStyles,
                    ...commonBoxStyles,
                    position: 'absolute',
                    top: '515px',
                    left: '308px',
                    width: '297px',
                    height: '55px',
                    background: '#A388EE',
                    boxShadow: '4px 6px 0px black',
                    textAlign: 'center',
                    fontSize: 21,
                    lineHeight: '55px',
                }}>
                ADD ENTRY
            </div>
            <div
                style={{
                    ...commonBoxStyles,
                    position: 'absolute',
                    top: '515px',
                    left: '629px',
                    width: '249px',
                    height: '63px',
                    background: '#D9D9D9',
                }} />
            <div
                style={{
                    ...commonBoxStyles,
                    position: 'absolute',
                    top: '515px',
                    left: '894px',
                    width: '249px',
                    height: '63px',
                    background: '#D9D9D9',
                }} />
            <div
                style={{
                    ...commonFontStyles,
                    ...commonBoxStyles,
                    position: 'absolute',
                    top: '1010px',
                    left: '625px',
                    width: '192px',
                    height: '34px',
                    background: '#FFB2EF',
                    boxShadow: '4px 6px 0px black',
                    fontSize: 18,
                    lineHeight: '34px',
                    textAlign: 'center',
                }}>
                CLEAR TABLE
            </div>
        </div>
    );
}
