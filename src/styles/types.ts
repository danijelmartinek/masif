
interface FontSizeObject {
    fontSize: number;
    lineHeight: number;
}

interface ThemeOption {
    label: string;
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
        accent: string;
        textPrimary: string;
        textSecondary: string;

        topBar: {
            background: string;
            text: string
        },

        semantic: {
            error: string;
            success: string;
            warning: string;
        }
    }
}

export interface ProjectThemeOptionsType {
    colors: {
        projectPrimary: string;
        projectSecondary: string;
    },
    icon: string;
}

interface ThemeBasicsType {
    fonts: {
        primary: string;
        secondary: string;
        tertiary: string;

        oSize: {
            giga: FontSizeObject;
            mega: FontSizeObject;
            kilo: FontSizeObject;

            alpha: FontSizeObject;
            beta: FontSizeObject;
            gamma: FontSizeObject;
            delta: FontSizeObject;
            epsilon: FontSizeObject;
            zeta: FontSizeObject;

            mili: FontSizeObject;
        },

        size: {
            giga: string;
            mega: string;
            kilo: string;
            alpha: string;
            beta: string;
            gamma: string;
            delta: string;
            epsilon: string;
            zeta:  string;
            mili:  string;
        }
    },

    options: {
        initialOpacity: number;
        activeOpacity: number;
        textDepressedOpacity: number;
    }
}

export interface ThemeType extends ThemeBasicsType {
    light: ThemeOption;
    dark: ThemeOption;
    project: ProjectThemeOptionsType;
}

export interface SelectedTheme extends ThemeOption, ThemeBasicsType {
    project: ProjectThemeOptionsType;
}

export enum ThemeMode {
    DARK = 'dark',
    LIGHT = 'light'
}