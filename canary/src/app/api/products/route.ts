import { NextRequest } from "next/server";
import list, { sleep } from "../list";

function productInfo(id: string) {
    return {
        description: 'Morbi eu ullamcorper urna, a condimentum massa. In fermentum ante non turpis cursus fringilla. Praesent neque eros, gravida vel ante sed, vehicula elementum orci. Sed eu ipsum eget enim mattis mollis.',
        discount: {
            expires: 2,
            percent: 90,
        },
        image: 'eniko-kis-KsLPTsYaqIQ-unsplash.jpg',
        imageBlur: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAAAoAAAAA/8AAEQgACgAKAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8A+3/HPx10jQPE0+k6ZrPh6TTtKsbi41R7nVUiu7WeMkQxi2H3lk2su4sCrjBHFd54c+InhvxJ4e0vxFa3aRw6pawXSKxG5VnQOAfcA81474z8G+ENU1OeXU9Dsbt/N8zdNbRSHfn72WU/N79a9U03TtPj061jjtYkRIkAARQAAowAMV2Sa7GsIH//2Q==',
        isBestSeller: false,
        leadTime: 2,
        name: 'Donec sit elit',
        price: {
            amount: 4200,
            currency: {
                base: 10,
                code: 'USD',
                exponent: 2,
            },
            scale: 2,
        },
        rating: 5,
        stock: 2,
        id,
    };
}

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');
    const delay = parseInt(request.nextUrl.searchParams.get('delay')||'0');

    if (delay > 0) {
        await sleep(delay);
    }

    return new Response(JSON.stringify(id === null ? list : productInfo(id)), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}