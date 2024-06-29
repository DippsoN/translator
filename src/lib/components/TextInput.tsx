import styled from "styled-components";
import React, {createRef, FunctionComponent, useEffect} from "react";

type InputProps = {
    hasError?: boolean
}

type TextInputProps = {
    disabled?: boolean,
    autoFocus?: boolean,
    hasError?: boolean,
    placeholder?: string,
    value?: string,
    onChangeText?(text: string): void
}

export const TextInput: FunctionComponent<TextInputProps> = ({
    disabled,
    autoFocus,
    hasError,
    placeholder,
    value,
    onChangeText
}) => {
    const inputRef = createRef<HTMLTextAreaElement>()

    useEffect(() => {
        if (!disabled && autoFocus && inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <Input
            value={value}
            onChange={event => {
                if(onChangeText) {
                    onChangeText(event.target.value)
                }
            }}
            disabled={disabled}
            ref={inputRef}
            placeholder={disabled ? undefined : placeholder}
            hasError={hasError}
        />
    )
}

const Input = styled.textarea<InputProps>`
    background-color: ${({ theme}) => theme.colors.input};
    color: ${({theme}) => theme.colors.typography};
    border: ${({ theme, hasError }) => hasError ? `1px solid ${theme.colors.error}` : 'none'};
    border-radius: 8px;
    height: 300px;
    width: 400px;
    resize: none;
    font-size: 10px;
    padding: 10px 15px;
`
