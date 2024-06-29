import {Dictionary} from "lib/types";

export const en_GB: Dictionary = {
    common: {
        autoTranslate: 'Auto translate',
        companyName: 'Company XYZ',
    },
    components: {
        app: {
            loading: 'Fetching supported languages...',
            error: 'Something went wrong',
            empty: 'No supported language'
        },
        header: {
            github: 'Github',
            discord: 'Discord',
            title: 'Translator'
        },
        footer: {
            flatIcon: 'FlatIcon',
            libreTranslate: 'LibreTranslate'
        },
        message: {
            tryAgain: 'Try again'
        },
        confidence: {
            error: 'We could\'t detect the language'
        }
    },
    screens: {
        translator: {
            sourceInputPlaceholder: 'Type text here...'
        }
    }
}
