import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
    navigationItem: {
        display: "flex",
        alignItems: "center",
        alignSelf: "stretch",
        paddingLeft: spacing.unit * 3,
        paddingRight: spacing.unit * 3,
        color: "white",
        cursor: "pointer",
        textDecoration: "none",
        [breakpoints.down('sm')]: {
            width: "100%",
            justifyContent: "center"
        },
    },
});

export interface Props extends WithStyles<typeof styles> {
    text: string;
}

class NavigationItem extends React.Component<Props> {
    render() {
        const { classes, text } = this.props;

        return (
            <div className={classes.navigationItem}>
                <Typography 
                    variant="h6" 
                    color="inherit" 
                >
                    { text }
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(NavigationItem);