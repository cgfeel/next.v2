export default function Page() {
    return (
        <div>
            <h1>This is Home page.</h1>
            <div>web vitals: {process.env.NEXT_PUBLIC_GA_ID}</div>
        </div>
    );
}