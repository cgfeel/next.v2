import { ResolvingMetadata } from "next";
import { ResolvedOpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const openGraphImage = {
    images: ['/imgdir/mountains.jpg'],
} as Required<Pick<ResolvedOpenGraph, 'images'>>;

export const openGraphSubImage = {
    images: ['/imgdir/dog.jpg'],
} as Required<Pick<ResolvedOpenGraph, 'images'>>;