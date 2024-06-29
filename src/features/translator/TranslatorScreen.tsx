import React from "react";
import styled from "styled-components";
import {Confidence, ExchangeLanguage, Loader, SelectLanguage, TextCounter, TextInput} from "lib/components";
import {Language, LanguagesCode} from "lib/models";
import {useTranslations} from "lib/hooks";
import {APP_CONFIG} from "lib/config";
import {useLibreTranslate} from "./useLibreTranslate";

type TranslatorScreenProps = {
    languages: Array<Language>
}

export const TranslatorScreen: React.FunctionComponent<TranslatorScreenProps> = ({
    languages
}) => {
    const T = useTranslations()
    const {
        selectedLanguages,
        setSelectedLanguages,
        query,
        setQuery,
        autoDetectedLanguage,
        setAutoDetectedLanguage,
        hasErrorDetectingLanguage,
        isDetectingLanguage,
        hasErrorTranslatingText,
        isTranslatingText,
        debouncedAction,
        translatedText
    } = useLibreTranslate()

    return (
        <Container>
            <TranslatorContainer>
                <InputContainer>
                    <SelectLanguage
                        language={languages}
                        exclude={[selectedLanguages.target]}
                        onChange={newCode => setSelectedLanguages(prevState => ({
                            ...prevState,
                            source: newCode
                        }))}
                        selectedLanguage={selectedLanguages.source}
                    />
                    <TextInput
                        value={query}
                        onChangeText={newQuery => {
                            if(newQuery.length > APP_CONFIG.TEXT_INPUT_LIMIT) {
                                return
                            }

                            setQuery(newQuery)
                            debouncedAction(newQuery)
                        }}
                        autoFocus
                        placeholder={T.screens.translator.sourceInputPlaceholder} />

                    <LoaderContainer>
                        {isDetectingLanguage && (
                            <Loader />
                        )}
                    </LoaderContainer>

                    <InputFooter>
                        <Confidence
                            hasError={hasErrorDetectingLanguage && selectedLanguages.source === LanguagesCode.Auto}
                            autoDetectedLanguage={autoDetectedLanguage}
                            onClick={() => {
                                setSelectedLanguages(prevState => ({
                                    ...prevState,
                                    source: autoDetectedLanguage?.language as LanguagesCode
                                }))
                                setAutoDetectedLanguage(undefined)
                                debouncedAction(query)
                            }}
                        />
                        <TextCounter
                            counter={query.length}
                            limit={APP_CONFIG.TEXT_INPUT_LIMIT} />
                    </InputFooter>
                </InputContainer>
                <ExchangeLanguage
                    hidden={selectedLanguages.source === LanguagesCode.Auto}
                    onClick={() => setSelectedLanguages(prevState => ({
                        source: prevState.target,
                        target: prevState.source
                    }))}
                />
                <InputContainer>
                    <SelectLanguage
                        language={languages}
                        exclude={[selectedLanguages.source, LanguagesCode.Auto]}
                        onChange={newCode => setSelectedLanguages(prevState => ({
                            ...prevState,
                            target: newCode
                        }))}
                        selectedLanguage={selectedLanguages.target}
                    />
                    <TextInput
                        value={translatedText}
                        hasError={hasErrorTranslatingText}
                        disabled />
                    <LoaderContainer>
                        {isTranslatingText && (
                            <Loader />
                        )}
                    </LoaderContainer>
                </InputContainer>
            </TranslatorContainer>
        </Container>
    )
}

const Container = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    color: ${({theme}) => theme.colors.typography}
`

const TranslatorContainer = styled.section`
    display: flex;
    justify-content: space-around;
    margin-top: 50px;

    @media(min-width: ${({theme}) => theme.media.sm}px) {
        justify-content: center;
    }

    @media(max-width: ${({theme}) => theme.media.sm}px) {
        flex-direction: column;
        align-items: center;
    }
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const LoaderContainer = styled.div`
    padding: 5px 10px;
    height: 2px;
`
const InputFooter = styled.div`
    display: flex;
    justify-content: space-between;
`
