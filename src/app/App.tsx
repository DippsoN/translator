import React, {useEffect, useState} from 'react';
import styled, {ThemeProvider} from "styled-components";
import { theme } from "lib/styles";
import {TranslatorScreen, translatorActions} from "features/translator";
import {Footer, Header, Loader, Messages} from "lib/components";
import {Language} from "lib/models";
import {useTranslations} from "lib/hooks";

export const App = () => {
    const T = useTranslations()
    const [languages, setLanguage] = useState<Array<Language>>([])
    const { isLoading, hasError, fetch: getSupportedLanguages } = translatorActions.useSupportedLanguage(setLanguage)

    useEffect(() => {
        getSupportedLanguages({})
    }, [])

    const getLayout = () => {
        if (isLoading) {
            return (
                <FetchLoaderContainer>
                    <Loader>
                        <Message>
                            {T.components.app.loading}
                        </Message>
                    </Loader>
                </FetchLoaderContainer>
            )
        }

        if (hasError) {
            return (
                <CenterContainer>
                    <Messages
                        withButton
                        message={T.components.app.error}
                        onClick={() => getSupportedLanguages({})} />
                </CenterContainer>
            )
        }

        if (languages.length === 0) {
            return (
                <CenterContainer>
                    <Messages message={T.components.app.empty} />
                </CenterContainer>
            )
        }

        return <TranslatorScreen languages={languages} />
    }


    return (
    <ThemeProvider theme={theme}>
        <AppContainer>
            <Header />
            {getLayout()}
            <Footer />
        </AppContainer>
    </ThemeProvider>
)}

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.colors.background};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const FetchLoaderContainer = styled.div`
    width: 50%;
    display: flex;
    align-self: center;
`
const Message = styled.div`
    color: ${({theme}) => theme.colors.typography};
    margin-top: 10px;
`
const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
`
