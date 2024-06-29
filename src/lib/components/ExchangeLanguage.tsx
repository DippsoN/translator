import styled from "styled-components";
import { Images } from '../../assets'
import React from "react";

type ExchangeLanguageProps = {
    onClick(): void,
    hidden: boolean
}

export const ExchangeLanguage: React.FunctionComponent<ExchangeLanguageProps> = ({ onClick, hidden }) => (

    <ExchangeContainer>
        {!hidden && (
            <Exchange
                src={Images.Exchange}
                onClick={onClick}
                hidden={hidden}
            />
        )}
    </ExchangeContainer>

)

const ExchangeContainer = styled.div`
    width: 40px;
    height: 40px;

    @media(min-width: ${({theme}) => theme.media.sm}px) {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
    }

    @media(max-width: ${({theme}) => theme.media.sm}px) {
        height: 70px;
        align-items: center;
        display: flex;
        justify-content: center;
    }
`
const Exchange = styled.img`
    cursor: pointer;
    width: 40px;
    height: 40px;
`
