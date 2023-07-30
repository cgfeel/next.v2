'use client'

import { ibmSans, raleway } from "@/src/utils/fonts";
import { FC } from "react"
import Paragraph from "./Paragraph";

const StyleNode: FC = () => (
    <>
        <div
            className="container"
        >
            <Paragraph className="cnode" />
            <h1>
                this is h1 font used raleway from :root css variables.
            </h1>
            <div 
                className="subline"
            >
                this is h1 font used ibmSans from :root css variables.
            </div>
        </div>
        <style jsx global>{`
            :root {
                --raleway-font: ${raleway.style.fontFamily};
                --ibmSans-font: ${ibmSans.style.fontFamily};
            }
            .container :global(.cnode) {
                font-family: ${raleway.style.fontFamily};
            }
        `}</style>
    </>
);

export default StyleNode;