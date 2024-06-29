import styled from "styled-components";
import {FunctionComponent, useEffect} from "react";

type TextCounterProps = {
    counter: number,
    limit: number
}

export const TextCounter: FunctionComponent<TextCounterProps> = ({
    counter,
    limit
}) => (
    <Counter>
        {counter}/{limit}
    </Counter>
)
const Counter = styled.div`
  color: ${({theme}) => theme.colors.typography};
`
