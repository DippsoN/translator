import styled from "styled-components";
import { useTranslations } from "lib/hooks";
import {APP_CONFIG} from "../config";

export const Footer = () => {
    const T = useTranslations()
    const year = new Date().getFullYear()

    return (
        <FooterContainer>
            <CodemaskContainer>
                &copy; {year} {T.common.companyName}
            </CodemaskContainer>
            <LinkContainer>
                <Link
                    href={APP_CONFIG.FLAT_ICON_URL}
                    target="_blank"
                >
                    {T.components.footer.flatIcon}
                </Link>
                <Link
                    href={APP_CONFIG.LIBRE_TRANSLATE_URL}
                    target="_blank"
                >
                    {T.components.footer.libreTranslate}
                </Link>
            </LinkContainer>
        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background-color: ${({theme}) => theme.colors.foreground};
`
const CodemaskContainer = styled.p`
    color: ${({theme}) => theme.colors.typography}
`

const LinkContainer = styled.div``

const Link = styled.a`
    color: ${({theme}) => theme.colors.typography};
    text-decoration: underline;
    cursor: pointer;
    padding: 0 10px;
`
