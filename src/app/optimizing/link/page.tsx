import Link from "next/link";
import ActiveLink from "./components/ActiveLink";

export default function Page() {
    return (
        <div>
            <div>
                <Link 
                    href="/dashboard"
                >
                    Dashboard
                </Link>
            </div>
            <hr />
            <div>
                <Link 
                    href={{
                        pathname: '/posts',
                        query: {
                            name: 'search',
                        },
                    }}
                >
                    Posts
                </Link>
            </div>
            <hr />
            <div>
                <Link 
                    href="/dashboard"
                    replace
                >
                    Dashboard (replace)
                </Link>
            </div>
            <hr />
            <div>
                <Link 
                    href="/dashboard"
                    prefetch={false}
                >
                    Dashboard (no-prefetch)
                </Link>
            </div>
            <hr />
            <div>
                <Link 
                    href="/optimizing-dashboard"
                >
                    Dashboard (link)
                </Link>
            </div>
            <hr />
        </div>
    );
}