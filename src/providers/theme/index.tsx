import { Theme as MaterialUITheme } from "@mui/system";

export type AppThemeContextType = {
    mode: ITheme
    toggleTheme: () => void
}

export type ITheme = 'dark' | 'light'


// Re-declare the emotion theme to have the properties of the MaterialUiTheme
declare module '@emotion/react' {
    export interface Theme extends MaterialUITheme {}
}
