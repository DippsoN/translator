import styled from "styled-components";
import React from "react";

export const Loader: React.FunctionComponent = ({
    children
}) => (
    <LoaderContainer>
        <ActivityIndicator />
        {children && children}
    </LoaderContainer>
)

const ActivityIndicator = styled.div`
    height: 2px;
    background-color: ${({theme}) =>  theme.colors.primary};
    border-radius: 6px;
    animation: loading 1s linear infinite alternate;

    @keyframes loading {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }
`
const LoaderContainer = styled.div`
    width: 100%;
    text-align: center;
`
