import { Antonio, Dancing_Script, IBM_Plex_Sans, Inter, Merriweather, Oswald, Press_Start_2P, Raleway, Roboto } from "next/font/google";

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

export const robotoArray = Roboto({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

export const dancingScript = Dancing_Script({
    subsets: ['latin'],
    display: 'swap',
});

export const oswald = Oswald({
    subsets: ['latin'],
    display: 'swap',
});

export const merriweather = Merriweather({
    weight: ['300', '400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

export const raleway = Raleway({
    subsets: ['latin'],
});

export const ibmSans = IBM_Plex_Sans({
    weight: '700',
    subsets: ['latin'],
    variable: '--font-ibm-sans',
});

export const antonio = Antonio({
    subsets: ['latin'],
    variable: '--font-antonio',
});

export const pressStart2p = Press_Start_2P({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-press-start',
});