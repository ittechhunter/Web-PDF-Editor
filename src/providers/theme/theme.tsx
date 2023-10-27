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

            background: {
                paper: mode === "dark" ? "#22272E" : "#fcfcfc",
                default: mode === "dark" ? "#1C2128" : "#F6F8FA"
            }
        },
        components: {
            MuiCardHeader:{
                styleOverrides:{
                    root: {
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        // backgroundColor: "#e7e6e6",
                        borderBottom: "1px solid #3e3e3e"
                    }
                }
            },
            MuiCardActions:{
                styleOverrides:{
                    root: {
                        paddingLeft: "18px",
                        paddingRight: "18px",
                        backgroundColor: mode === "dark" ? "#22272E" : "#F6F8FA"
                    }
                }
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        background: mode === "dark" ? "#1C2128" : "#F6F8FA"
                    }
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        userSelect: "none"
                    },
                    stickyHeader: {
                        background: mode === "dark" ? "#22272E" : "#F6F8FA"
                    }
                }
            },
            MuiChip: {}
        },
        typography: {
            button: {
                textTransform: "none"
            }
        },
        // overrides: {
        //     MuiCssBaseline: {
        //         "@global": {
        //             body: {
        //                 transition: "all 0.3s linear",
        //             },
        //         },
        //     },
        // },
    })
}
