import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string,
            background: string,
            foreground: string,
            error: string,
            typography: string,
            input: string
        },
        media: {
            sm: number,
        }
    }
}
