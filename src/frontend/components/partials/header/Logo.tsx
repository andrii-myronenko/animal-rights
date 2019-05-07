import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PetsIcon from '@material-ui/icons/Pets';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { compose } from 'recompose';

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
    logo: {
        display: "flex",
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        [breakpoints.down("sm")]: {
            flexGrow: 1,
        }
    },
    icon: {
        marginLeft: spacing.unit * 3,
    },
    siteName: {
        marginLeft: spacing.unit * 3,
        marginRight: spacing.unit * 3,
    },
});

export interface Props{ }

class Logo extends React.Component<Props & WithStyles<typeof styles> & RouteComponentProps> {
    handleRedirect = () => {
        this.props.history.push("/");
    }
    
    render() {

        const { classes } = this.props;

        return (
            <div 
                className={classes.logo}
                onClick={this.handleRedirect}
            >
                <PetsIcon className={classes.icon}  />
                <Typography 
                    variant="h6" 
                    color="inherit"
                    className={classes.siteName} 
                >
                    ANIMAL RIGHTS
                </Typography>
            </div>
        );
    }
}

export default compose<Props & WithStyles<typeof styles> & RouteComponentProps, {}>(
    withStyles(styles),
    withRouter
)(Logo) as unknown as React.ComponentClass<Props>;
  
