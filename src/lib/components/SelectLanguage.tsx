import styled from "styled-components";
import React, { useMemo } from "react";
import { Language, LanguagesCode } from "lib/models";

type SelectLanguageProps = {
    language: Array<Language>;
    selectedLanguage: LanguagesCode;
    exclude: Array<LanguagesCode>;
    onChange(newLanguage: LanguagesCode): void;
};

export const SelectLanguage: React.FunctionComponent<SelectLanguageProps> = ({
    language,
    selectedLanguage,
    exclude,
    onChange,
}) => {
    const filteredLanguages = useMemo(
        () =>
            language
                .filter((language) => !exclude.includes(language.code))
                .map((languages) => ({
                    key: languages.code,
                    label: languages.name,
                })),
        [language, exclude]
    );

    return (
        <SelectContainer>
            <Select value={selectedLanguage} onChange={(event) => onChange(event.target.value as LanguagesCode)}>
                {filteredLanguages.map((language) => (
                    <Option key={language.key} value={language.key}>
                        {language.label}
                    </Option>
                ))}
            </Select>
        </SelectContainer>
    );
};

const Select = styled.select`
    width: 100%;
    margin-bottom: 10px;
    -webkit-appearance: none;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.foreground};
    color: ${({ theme }) => theme.colors.typography};
    height: 26px;
    padding: 0 10px;
`;

const Option = styled.option``;
const SelectContainer = styled.div`
    max-width: 140px;
    position: relative;
    height: 26px;
    margin-bottom: 10px;

    &:after {
        width: 0;
        height: 0;
        content: "";
        position: absolute;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid ${({ theme }) => theme.colors.typography};
        right: 10px;
        top: calc(50% - 2px);
    }
`;
