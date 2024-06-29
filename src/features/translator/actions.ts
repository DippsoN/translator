import {AutoDetectedLanguage, Language, LanguagesCode} from "lib/models";
import {useFetch, useTranslations} from "../../lib/hooks";
import {AutoDetectedLanguageRequest, TranslateTextRequest, TranslateTextResponse} from "./types";
import {HttpMethod} from "../../lib/types";

export const useSupportedLanguage = (
    onSuccess: (language: Array<Language>) => void
) => {
    const T = useTranslations()

    return useFetch<Array<Language>>({
        url: 'languages',
        method: HttpMethod.GET
    }, {
        onSuccess: languages => {
            const allLanguages: Array<Language> = [
                {
                    code: LanguagesCode.Auto,
                    name: T.common.autoTranslate
                }
            ].concat(languages)

            onSuccess(allLanguages)
        }
    })
}

export const useAutoDetectedLanguage = (
    onSuccess: (autoDetectedLanguage: AutoDetectedLanguage) => void
) => {
    return useFetch<Array<AutoDetectedLanguage>, AutoDetectedLanguageRequest>({
        url: 'detect',
        method: HttpMethod.POST
    }, {
        onSuccess: ([autoDetectedLanguage]) => onSuccess(autoDetectedLanguage)
    })
}

export const useTranslateText = (
    onSuccess: (translatedText: string) => void
) => {
    return useFetch<TranslateTextResponse, TranslateTextRequest>(
        {
        url: 'translate',
        method: HttpMethod.POST
        },
{
            onSuccess: ({ translatedText }) => onSuccess(translatedText)
        })
}
