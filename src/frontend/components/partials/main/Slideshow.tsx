import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import Slide from '@partials/main/Slide';

const styles = ({breakpoints}: Theme) => createStyles({
    slider: {
        position: "relative",
        margin: "0 auto",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
    },
    slideWrapper: {
        width: "100%"
    },
    arrow: {
        height: "100%",
        width: "100px",
        [breakpoints.down('xs')]: {
            width: "50px",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: "rgba(0, 0, 0, 0.1)",
        "&:hover": {
            background: "rgba(0, 0, 0, 0.5)",
            transition: "background-color 100ms linear",
        }
    },
    arrowLeft: {
        position: "absolute",
        top: 0,
        left: 0,
        color: "white"
    },
    arrowRight: {
        position: "absolute",
        top: 0,
        right: 0,
        color: "white"
    },
    arrowIcon: {
        fontSize: "70px",
        [breakpoints.down('sm')]: {
            width: "55px",
        },
        [breakpoints.down('xs')]: {
            width: "40px",
        },
    }
});

export interface Props extends WithStyles<typeof styles> { 
    images: string[];
}

export interface State{
    currentIndex: number;
    translateValue: number;
    intervalHandler: number;
} 

class Slideshow extends React.Component<Props, State> {
    state: State = {
        currentIndex: 0,
        translateValue: 0,
        intervalHandler: setInterval(() => { this.goToNextSlide(); }, 2500) as any
    };

    restartInterval = () => {
        clearInterval(this.state.intervalHandler);
        this.setState({
            intervalHandler: setInterval(() => { this.goToNextSlide(); }, 2500) as any
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalHandler);
    }
  
    goToPrevSlide = () => {
        this.restartInterval();

        if(this.state.currentIndex === 0){
            return this.setState({
                currentIndex: this.props.images.length - 1,
                translateValue: -(this.slideWidth() * (this.props.images.length - 1))
            });
        }
      
        this.setState((previousState: State) => ({
            currentIndex: previousState.currentIndex - 1,
            translateValue: previousState.translateValue + this.slideWidth()
        }));
    }
  
    goToNextSlide = () => {
        this.restartInterval();

        if(this.state.currentIndex === this.props.images.length - 1) {
            return this.setState({
                currentIndex: 0,
                translateValue: 0
            });
        }

        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue + -(this.slideWidth())
        }));
        
    }
  
    slideWidth = () => {
        return document.querySelector('.slide')!.clientWidth;
    }
  
    render() {
        const {classes} = this.props;

        const transition = {
            transition: 'transform ease-out 0.45s',
            transform: `translateX(${this.state.translateValue}px)`,
        };
        
        return (
            <div className={classes.slider} >
                
                <div 
                    className={classes.slideWrapper}
                    style={transition}
                >
                    {
                        this.props.images.map((image, i) => (
                            <Slide 
                                image={image}
                                key={i}
                            />
                        ))
                    }
                </div>
        
                <div className={`${classes.arrow} ${classes.arrowLeft}`} onClick={this.goToPrevSlide}>
                    <NavigateBefore className={ classes.arrowIcon } />
                </div>

                <div className={`${classes.arrow} ${classes.arrowRight}`} onClick={this.goToNextSlide}>
                    <NavigateNext className={ classes.arrowIcon } />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Slideshow);