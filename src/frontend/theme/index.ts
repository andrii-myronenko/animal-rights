import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { 
        main: '#33691e',
        light: '#629749',
        dark: '#003d00'
    },
    secondary: { 
        main: '#558b2f',
        light: '#85bb5c',
        dark: '#255d00'
    },
    error: { main: '#f44336' },
};

const typography = {
    useNextVariants: true,
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
};

export default createMuiTheme({ palette, typography });