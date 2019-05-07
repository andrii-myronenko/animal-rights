import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
    slide: {
        width: "100%",
        paddingTop: "55%",
    },
    inlineDiv: {
        display: "inline-block",
        width: "100%",
        verticalAlign: "middle"
    }
});

export interface Props extends WithStyles<typeof styles> { 
    image: string;
}

export interface State{
    isLoading: boolean;
}

class Slide extends React.Component<Props, State> {
    state: State = {
        isLoading: true
    };

    handleImageLoad = () => {
        console.log("Loaded!");
        this.setState({ isLoading: false });
    }

    render() {
        const { classes, image } = this.props;

        const background = {
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };

        return (
            <div className={`${classes.inlineDiv} slide`}>
                <div 
                    style={background}
                    className={classes.slide} 
                />
            </div>
        );
    }
}

export default withStyles(styles)(Slide);