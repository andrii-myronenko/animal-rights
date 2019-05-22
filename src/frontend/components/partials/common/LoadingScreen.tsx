import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = ({spacing, palette}: Theme) => createStyles({
    progress: {
        margin: spacing.unit * 2,
        color: palette.primary.main
    },
    loadingContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }
});

export interface Props extends WithStyles {

}

function LoadingScreen(props: Props) {
    const { classes } = props;
    return (
        <div className={classes.loadingContainer}>
            <CircularProgress className={classes.progress}/>
        </div>
    );
}


export default withStyles(styles)(LoadingScreen);