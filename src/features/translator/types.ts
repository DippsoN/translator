import {LanguagesCode} from "lib/models";

export type SelectedLanguages = {
    source: LanguagesCode,
    target: LanguagesCode
}

export type AutoDetectedLanguageRequest = {
    q: string
}

export type TranslateTextRequest = {
    q: string,
    source: LanguagesCode,
    target: LanguagesCode,
    format: string
}

export type TranslateTextResponse = {
    translatedText: string
}
