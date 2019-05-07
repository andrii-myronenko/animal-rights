import * as React from "react";
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) => createStyles({
    error: {
        marginLeft: spacing.unit * 2
    },
});

export interface Props extends WithStyles<typeof styles> {
    children: any;
}

interface State {
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}


class ErrorBoundary extends React.Component<Props, State> {
    state: State = {
        error: null,
        errorInfo: null
    };
    
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      this.setState({
        error,
        errorInfo
      });
    }
    
    render() {
        if (this.state.errorInfo) {
            return (
                <div className="error">
                    <h1>An error has occured</h1>
                    <h2>{this.state.error && this.state.error.toString()}</h2>
                    <details>
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children;
    }  
  }

export default withStyles(styles)(ErrorBoundary);