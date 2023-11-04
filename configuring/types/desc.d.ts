declare module 'http://up1.yii.so/canvas-confetti' {
    const confetti: () => void;
    export default Object.assign(confetti, {
        reset: () => {}
    });
}

declare module "*.mdx" {
    export interface meta {
        author: string;
    }
}