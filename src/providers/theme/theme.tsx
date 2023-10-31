import {createTheme} from "@mui/material/styles"

export const getTheme = (mode: "light" | "dark") => {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: "#2196f3",
                dark: "#1769aa",
                light: "#4dabf5",
                contrastText: "#fff"
            },
            success: {
                main: "#66BB6A"
            },
            info: {
                main: "#90CAF9"
            },
            secondary: {
                main: "#19857b"
            },
            error: {
                main: "#CF3050"
            },

            // background: {
            //     paper: mode === "dark" ? "#22272E" : "#fcfcfc",
            //     default: mode === "dark" ? "#1C2128" : "#F6F8FA"
            // }
        },
        typography: {
            button: {
                textTransform: "none"
            }
        },
    })
}
