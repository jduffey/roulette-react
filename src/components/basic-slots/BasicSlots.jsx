import { PayoutSchedule } from "./components/PayoutSchedule";

export function BasicSlots() {
    return (
        <div
            style={{
                width: 1440,
                height: 1024,
                outline: '1px solid red',
            }}
        >
            <PayoutSchedule />
        </div>
    );
}