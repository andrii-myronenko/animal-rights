import * as React from "react";
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) => createStyles({
    container: {
        margin: spacing.unit * 3
    },
});

export interface Props extends WithStyles<typeof styles> {
}

class PageNotFound extends React.Component<Props> {
    
    render() {
        return (
            <div className={this.props.classes.container}>
                <h1>Page not found</h1>
            </div>
        );
    }  
  }

export default withStyles(styles)(PageNotFound);