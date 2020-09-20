// types
import { ThemeType, SelectedTheme, ThemeMode } from '/styles/types';

 /**
 * Initialization of theme.
 *
 * @param themeOptions - object with multiple theme variants and other app options
 * @param mode - theme mode (e.g. dark or light)
 * @returns the arithmetic mean of `x` and `y`
 */
const initTheme = (themeOpts: ThemeType, mode: ThemeMode) => {
    let defaultTheme: SelectedTheme = {
        ...themeOpts[mode],  
        fonts: themeOpts.fonts, 
        options: themeOpts.options,
        project: themeOpts.project
    }
    return defaultTheme;
}

export {
    initTheme,
    // getTemplateData
}