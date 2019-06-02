import * as React from "react";
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) => createStyles({
    container: {
        padding: spacing.unit * 2,
        textAlign: "center"
    },
    title: {
        margin: 0
    }
});

export interface Props extends WithStyles<typeof styles> {
}

class PageNotFound extends React.Component<Props> {
    
    render() {
        return (
            <div className={this.props.classes.container}>
                <h1 className={this.props.classes.title}>Page not found</h1>
            </div>
        );
    }  
  }

export default withStyles(styles)(PageNotFound);