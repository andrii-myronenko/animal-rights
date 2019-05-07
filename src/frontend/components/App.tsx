import * as React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@theme/index';
import Header from '@components/partials/common/Header';
import Router from '@router/root';
import { SnackbarProvider } from 'notistack';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Footer from '@components/partials/common/Footer';
// import { Provider } from 'react-redux';
// import store from '@configs/configureReduxStore'; 
import ErrorBoundary from './specials/ErrorBoundary';
import RouterConfig from '@router/config';

const styles = ({breakpoints, spacing}: Theme) => createStyles({
    "@global": {
        html: {
            [breakpoints.down("sm")]: {
                fontSize: 13
            },
            [breakpoints.down("xs")]: {
                fontSize: 12
            }
        }
    },
    main: {
        marginTop: `${spacing.unit * 7}px`,
        [breakpoints.up('sm')]: {
            marginTop: `${spacing.unit * 8}px`,
        },
        width: "100%",
        padding: `${spacing.unit * 2}px ${spacing.unit * 4}px ${spacing.unit * 4}px`,
        [breakpoints.up('lg')]: {
            paddingLeft: "20%",
            paddingRight: "20%"
        },
        overflow: "hidden"
    }
});

export interface Props extends WithStyles<typeof styles> { }

class App extends React.Component<Props> {
    render() {
        const { classes } = this.props;

        return (
            <ErrorBoundary>
                <SnackbarProvider maxSnack={3}>
                    <MuiThemeProvider theme={theme}>
                        <RouterConfig>
                            <CssBaseline />
                            <Header />
                            <div className={classes.main}>
                                <Router />
                            </div> 
                            <Footer />
                        </RouterConfig>
                    </MuiThemeProvider>
                </SnackbarProvider>
            </ErrorBoundary>
        );
    }
}

export default withStyles(styles)(App);