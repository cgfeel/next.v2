import Client from "./Client";

export const revalidate = 0;

export default function Page() {
    return (
        <div>
            <div
                style={{
                    height: 800
                }}
            >
                800px to scroll height, at bottom hava button to shop
            </div>
            <Client />
            <hr />
            {Date.now()}
        </div>
    );
}