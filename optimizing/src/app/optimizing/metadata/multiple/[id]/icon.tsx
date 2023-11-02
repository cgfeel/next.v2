import { ImageResponse } from "next/og";

export function generateImageMetadata() {
    return [
        {
            contentType: 'image/png',
            size: { width: 48, height: 48 },
            id: 'small',
        },
        {
            contentType: 'image/png',
            size: { width: 72, height: 72 },
            id: 'medium',
        },
    ];
}

export default function Icon({ params, id: tid }: { 
    params: { id: string; }; 
    id: string;
}) {
    const { id } = params;
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 88,
                    background: '#000',
                    color: '#fafafa',
                }}
            >
                Icon {tid} - {id}
            </div>
        )
    );
}