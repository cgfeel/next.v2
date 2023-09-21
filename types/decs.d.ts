type PullInitProps = {
    ptrElement: string;
    ptrTextElement: string;
    targetElement: string;

    instructionsPullToRefresh?: string;
    instructionsReleaseToRefresh?: string;
    instructionsRefreshing?: string;
    threshold?: number;
    onRefresh?: () => void;
}

interface PullInitInterface {
    destroy: () => void;
}

/*declare module "http://up1.yii.so/jianli/static/square.js" {
    export const name: string;
}*/

// declare function test (): void;

declare module 'http://up1.yii.so/canvas-confetti' {
    const confetti: () => void;
    export default confetti;
}

declare module "pulltorefreshjs" {
    export const init: (value: PullInitProps) => PullInitInterface;
}