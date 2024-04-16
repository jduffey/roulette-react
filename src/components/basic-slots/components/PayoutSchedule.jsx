export function PayoutSchedule() {
    return (
        <div
            style={{
                width: 516,
                height: 444,
                borderRadius: 30,
                backgroundColor: '#00B5FF',
            }}
        >
            <div
                style={{
                    width: 516,
                    height: 60,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 40,
                    fontWeight: 'bold',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    rotate: '-4deg',
                    color: '#FFE24B',
                    '-webkit-text-stroke-color': 'black',
                    '-webkit-text-stroke-width': '2px',
                }}
            >
                <StarSvg /> WINNING <StarSvg />
            </div>
            <div
                style={{
                    width: 516,
                    height: 60,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'white',
                    '-webkit-text-stroke-color': 'black',
                    '-webkit-text-stroke-width': '2px',
                }}
            >
                COMBINATIONS
            </div>
            <div
                style={{
                    padding: 2,
                }}
            >
                <SlotIconSeven />
                <SlotIconSeven />
                <SlotIconSeven />
            </div>
            <div
                style={{
                    width: 516,
                    height: 160,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                }}
            >
                <div
                    style={{
                        width: 516,
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        fontSize: 70,
                        fontWeight: 'bold',
                        color: '#74EE15',
                        rotate: '6deg',
                    }}
                >
                    $2000
                </div>
            </div>
        </div >
    );
}

const StarSvg = () => (
    <svg width="48" height="46" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4.8541L28.1863 17.7381L28.523 18.7746H29.6129H43.1599L32.2001 26.7373L31.3184 27.3779L31.6552 28.4144L35.8415 41.2984L24.8817 33.3356L24 32.695L23.1183 33.3356L12.1585 41.2984L16.3448 28.4144L16.6816 27.3779L15.7999 26.7373L4.84011 18.7746H18.3871H19.477L19.8137 17.7381L24 4.8541Z" fill="#FFE24B" stroke="black" stroke-width="3" />
    </svg>
);

const SlotIconSeven = () => (
    <svg width="70" height="72" viewBox="0 0 70 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.4859 6.26481V4.76481H14.9859H3H1.5V6.26481V30.2718V31.7718H3H14.9859H16.3751L16.4815 30.3867L16.6935 27.6263L17.4399 25.3837L19.3003 23.3342L21.4464 22.2596H24.9915L27.618 22.8666L29.9686 23.9366L29.9784 23.9411L29.9881 23.9453L33.6065 25.5307L33.6568 25.5527L33.7086 25.5711L37.5531 26.9299L37.7157 26.9874L37.8871 27.0065L43.9931 27.6859L44.1313 27.7013L44.27 27.691L46.8968 27.4961L37.5835 34.7504L37.56 34.7688L37.5372 34.7881L30.3004 40.903L30.2364 40.9571L30.1789 41.018L26.1082 45.3211L25.9988 45.4368L25.9161 45.5728L22.75 50.7819L22.6766 50.9026L22.6271 51.035L20.5917 56.4705L20.5473 56.5892L20.5234 56.7136L19.3926 62.6021L19.3719 62.7101L19.3671 62.82L19.141 68.029L19.1242 68.4168L19.2975 68.7641L19.7498 69.67L20.1642 70.5H21.0919H47.0989H47.4072L47.6906 70.3784L49.2736 69.699L50.182 69.3091V68.3206V59.7143V55.5229L50.8191 51.2689L52.3033 47.4468L54.2559 43.9705L58.493 37.7171L63.6681 30.9571L63.8051 30.7782L63.8834 30.5669L66.8233 22.6401L66.8674 22.5213L66.8909 22.3969L68.4739 14.0171L68.5 13.8791V13.7387V6.26481V4.76481H67H55.4664H54.1529L53.9795 6.06685L53.5543 9.26059L52.6676 11.3328H52.4572L50.3574 10.1857L45.2054 6.82079L45.1454 6.78161L45.082 6.74833L40.3329 4.25704L40.24 4.20831L40.1412 4.17299L36.9751 3.04058L36.8257 2.98716L36.6685 2.96616L33.2763 2.5132L33.0839 2.48752L32.8914 2.51162L29.273 2.96458L29.0912 2.98734L28.9202 3.05321L25.9803 4.18561L25.8896 4.22054L25.8042 4.26687L20.3766 7.21112L20.3512 7.22491L20.3263 7.23967L16.4859 9.51885V6.26481Z" fill="#BB2828" stroke="black" stroke-width="3" />
    </svg>
);