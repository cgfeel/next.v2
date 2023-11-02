import Link from "next/link";

export default function Page() {
    return (
        <div>
            <div>
                <Link 
                    href="/optimizing/link/dashboard"
                >
                    Dashboard
                </Link>
            </div>
            <hr />
            <div>
                <Link 
                    href={{
                        pathname: '/optimizing/link/demo',
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
                    href="/optimizing/link/dashboard"
                    replace
                >
                    Dashboard (replace)
                </Link>
            </div>
            <hr />
            <div>
                <Link 
                    href="/optimizing/link/demo/about"
                    prefetch={false}
                >
                    about (no-prefetch)
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