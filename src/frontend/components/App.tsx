import * as React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@theme/index';
import Header from '@components/partials/common/Header';
import Router from '@components/router/RouterRoot';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Footer from '@components/partials/common/Footer';
import ErrorBoundary from './specials/ErrorBoundary';
import RouterConfig from '@components/router/RouterConfig';
import client from '@graphql/config';
import { ApolloProvider } from "react-apollo";


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
    }
});

export interface Props extends WithStyles<typeof styles> { }

class App extends React.Component<Props> {
    render() {
        const { classes } = this.props;

        return (
            <ErrorBoundary>
                <ApolloProvider client={client}>
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
                </ApolloProvider>
            </ErrorBoundary>
        );
    }
}

export default withStyles(styles)(App);