import React from "react";
import styled from "styled-components";
import {useTranslations} from "../hooks";

type MassagesProps = {
    message: string,
    withButton?: boolean,
    onClick?(): void
}

export const Messages: React.FunctionComponent<MassagesProps> = ({
    message,
    withButton,
    onClick
}) => {
    const T = useTranslations()


    return (
        <MessageContainer>
            <Text>
                {message}
            </Text>
            {withButton && (
                <Button
                    onClick={onClick}
                >
                    ${T.components.message.tryAgain}
                </Button>
            )}
        </MessageContainer>
    )
}

const MessageContainer = styled.div``

const Button = styled.button`
    padding: 10px 50px;
    text-align: center;
    border-radius: 8px;
    border: none;
    background-color: ${({theme}) => theme.colors.primary};
    cursor: pointer;
`

const Text = styled.p`
    margin-bottom: 20px;
    color: ${({theme}) => theme.colors.typography};
`
