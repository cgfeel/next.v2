const encoder = new TextEncoder();

function iteratorToStream(iterator: AsyncGenerator<Uint8Array, void, unknown>) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next();
            if (done) {
                controller.close();
            } else {
                controller.enqueue(value);
            }
        },
    });
}

function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

async function* makeIterator() {
    yield encoder.encode('<p>One</p>');
    await sleep(500);
    yield encoder.encode('<p>Two</p>');
    await sleep(500);
    yield encoder.encode('<p>Three</p>');
}

export async function GET() {
    const iterator = makeIterator();
    const stream = iteratorToStream(iterator);

    return new Response(stream);
}