import styled from "styled-components";
import {FunctionComponent, useCallback} from "react";
import {AutoDetectedLanguage, LanguagesCode} from "lib/models";
import {useTranslations} from "lib/hooks";

type LanguageProps = {
    disabled: boolean
}

type ConfidenceProps = {
    hasError: boolean
    onClick(): void
    autoDetectedLanguage?: AutoDetectedLanguage
}

export const Confidence: FunctionComponent<ConfidenceProps> = ({
    autoDetectedLanguage = {},
    onClick,
    hasError
}) => {
    const T = useTranslations()
    const { confidence, language } = autoDetectedLanguage

    const getDetectedLanguage = useCallback(() => {
        if (!language) {
            return undefined
        }
        const [detectedLanguage] = Object
            .entries(LanguagesCode)
            .find(([, languageCode]) => language === languageCode) || []

        return detectedLanguage
            ? `(${detectedLanguage})`
            : undefined
    }, [language])



    return (
        <Container>
            <Percentage>
                {confidence && `${confidence}%`}
            </Percentage>
            <Language
                onClick={() => {
                    if(!hasError) {
                        onClick()
                    }
                }}
                disabled={hasError}
            >
                {hasError && T.components.confidence.error}
                {language && getDetectedLanguage()}
            </Language>
        </Container>
    )
}

const Container = styled.div``

const Percentage = styled.span`
    color: ${({theme}) => theme.colors.primary};
`

const Language = styled.a<LanguageProps>`
    cursor: ${({ disabled }) => disabled ? undefined : 'pointer'};
    text-decoration: ${({ disabled }) => disabled ? undefined : 'underline'};
    margin-left: 5px;
    color: ${({theme, disabled}) => disabled ? theme.colors.error : theme.colors.primary};
`
