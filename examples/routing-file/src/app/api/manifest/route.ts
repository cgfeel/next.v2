const manifest = {
    "name": "HackerWeb",
    "short_name": "HackerWeb",
    "start_url": ".",
    "display": "standalone",
    "background_color": "#fff",
    "description": "A readable Hacker News app.",
    "icons": [
        {
            "src": "/icons/icon-small.png",
            "sizes": "48x48",
            "type": "image/png"
        },
        {
            "src": "/icons/shortcut-icon.png",
            "sizes": "72x72",
            "type": "image/png"
        }
    ],
    "related_applications": [
        {
            "platform": "play",
            "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
        }
    ]
};  

export async function GET() {
    return new Response(JSON.stringify(manifest));
}