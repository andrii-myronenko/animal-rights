import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PetsIcon from '@material-ui/icons/Pets';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { compose } from 'recompose';
import Button from '@material-ui/core/Button';

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
    logoButton: {
        textTransform: "none",
        alignSelf: "stretch",
        color: "white",
    }
});

export interface Props{ }

class Logo extends React.Component<Props & WithStyles<typeof styles> & RouteComponentProps> {
    handleRedirect = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        this.props.history.push("/");
    }
    
    render() {

        const { classes } = this.props;

        return (
            <div 
                className={classes.logo}
            >
                <Button 
                    className={classes.logoButton}
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
                </Button>
                
            </div>
        );
    }
}

export default compose<Props & WithStyles<typeof styles> & RouteComponentProps, {}>(
    withStyles(styles),
    withRouter
)(Logo) as unknown as React.ComponentClass<Props>;
  
