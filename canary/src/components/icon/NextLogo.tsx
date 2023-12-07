import { FC } from "react";

const NextLogo: FC = () => (
    <svg 
        fill="none" 
        viewBox="0 0 180 180" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <mask
            id="mask0_408_134"
            height="180"
            style={{ maskType: 'alpha' }}
            width="180"
            x="0"
            y="0"
        >
            <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g 
            mask="url(#mask0_408_134)"
        >
            <circle cx="90" cy="90" r="90" fill="black" />
            <path
                d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                fill="url(#paint0_linear_408_134)"
            />
            <rect
                fill="url(#paint1_linear_408_134)"
                height="72"
                width="12"
                x="115"
                y="54"
            />
        </g>
        <defs>
            <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear_408_134"
                x1="109"
                x2="144.5"
                y1="116.5"
                y2="160.5"
            >
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint1_linear_408_134"
                x1="121"
                x2="120.799"
                y1="54"
                y2="106.875"
            >
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

export default NextLogo;