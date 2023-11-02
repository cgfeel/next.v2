import 'server-only';

type DictionaryType = {
    products: Record<string, string>;
};

const dictionaries = {
    en: () => import('../../../dictionaries/en.json').then(module => module.default),
    nl: () => import('../../../dictionaries/nl.json').then(module => module.default),
};

export const getDictionary = async (locale: 'en'|'nl') => dictionaries[locale]() as Promise<DictionaryType>;