import {useState} from "react";
import {AutoDetectedLanguage, LanguagesCode} from "lib/models";
import {SelectedLanguages} from "./types";
import {useAutoDetectedLanguage, useTranslateText} from "./actions";
import {useDebouncedCallback} from "use-debounce";

export const useLibreTranslate = () => {
    const [ translatedText, setTranslatedText ] = useState<string>('')
    const [query, setQuery] = useState<string>('')
    const [ autoDetectedLanguage, setAutoDetectedLanguage ] = useState<AutoDetectedLanguage>()
    const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguages>({
        source: LanguagesCode.Auto,
        target: LanguagesCode.Polish
    })
    const {
        isLoading: isDetectingLanguage,
        hasError: hasErrorDetectingLanguage,
        fetch: autoDetectLanguage
    } = useAutoDetectedLanguage(setAutoDetectedLanguage)
    const {
        isLoading: isTranslatingText,
        hasError: hasErrorTranslatingText,
        fetch: translateText
    } = useTranslateText(setTranslatedText)
    const debouncedAction = useDebouncedCallback(
        debounceQuery => {
            if(debounceQuery.length < 5){
                return
            }

            selectedLanguages.source === LanguagesCode.Auto
                ? autoDetectLanguage({
                    q: debounceQuery
                })
                : translateText({
                    q: debounceQuery,
                    source: selectedLanguages.source,
                    target: selectedLanguages.target,
                    format: 'text'
                })

        },
        1000)

    return {
        selectedLanguages,
        setSelectedLanguages,
        query,
        setQuery,
        debouncedAction,
        isDetectingLanguage,
        hasErrorDetectingLanguage,
        autoDetectedLanguage,
        setAutoDetectedLanguage,
        hasErrorTranslatingText,
        isTranslatingText,
        translatedText
    }
}
