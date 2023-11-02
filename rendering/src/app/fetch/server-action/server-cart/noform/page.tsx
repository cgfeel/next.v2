import { action } from "./action";

export default function Page() {
    action().then(success => console.log(success, 'say hi'));
    return (
        <div>test</div>
    );
}