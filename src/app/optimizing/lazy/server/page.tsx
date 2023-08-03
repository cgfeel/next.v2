import dynamic from "next/dynamic";

// Server Component:
const ServiceComponent = dynamic(() => import('../components/ServerComponent'));

export default function Page() {
    return (
        <div>
            <ServiceComponent />
        </div>
    );
}