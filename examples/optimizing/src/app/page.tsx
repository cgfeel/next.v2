import SemiBtns from "../components/SemiBtns";

// <div className="btn-margin-right">...</div>
// if className is not exist will output error: Text content does not match server-rendered HTML
// https://nextjs.org/docs/messages/react-hydration-error

export default function Page() {
    return (
        <div>
            <SemiBtns />
        </div>
    );
}