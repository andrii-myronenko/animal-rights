import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Slideshow from "@components/partials/main/Slideshow";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import MediaCard from "@components/partials/common/MediaCard";

const styles = ({ spacing }: Theme) => createStyles({
    textContent: {
        marginTop: spacing.unit * 2,
    },
    title: {
        fontSize: "2rem",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginBottom: spacing.unit
    },
    cardGrid: {
        paddingTop: spacing.unit * 6
    },
});

const cards = [ 
    {
        title: "About us",
        text: "More information about our organisation",
        image: "/images/main-page-cards/paws.jpg",
        link: "/about"
    },
    {
        title: "Events",
        text: "Events you can participate in to promote out movement",
        image: "/images/main-page-cards/meeting.jpg",
        link: "/events"
    },
    {
        title: "Adoption",
        text: "You can help the animals from our shelter to find a new home",
        image: "/images/main-page-cards/girl-and-dog.jpg",
        link: "/animals"
    }
];

const slideImages = [
    'images/slides/slide.jpg',
    'images/slides/slide1.jpg',
    'images/slides/slide2.jpg'
];

export interface Props extends WithStyles<typeof styles> { }


class MainPage extends React.Component<Props>{
    render() {
        const { classes } = this.props;
        return( 
            <React.Fragment>
                <Slideshow images={slideImages}/>
                <div className={classes.textContent}>
                    <Typography 
                        variant="h1"
                        align="center"
                        className={classes.title}
                    >
                        Welcome to Animal Rights!
                    </Typography>
                    <Typography 
                        variant="body1"
                        align="justify"
                    >
                        Animal Rights is a community of people who are concerned about dozens of poor
                        and hopless animals around. Who are eager to help them and to participate in
                        events and meetings to bring attention to the problem of violation of animals' 
                        rights
                    </Typography>
                    <div className={classNames(classes.cardGrid)}>
                        <Grid container justify="center" spacing={40}>
                            {cards.map((card, index) => (
                                <Grid item key={index} xs={12} sm={4} md={4} lg={4}>
                                    <MediaCard card={card}/>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            </ React.Fragment>
        );
    }
}

export default withStyles(styles)(MainPage);