import * as React from 'react';
import Breadcrumbs from '@components/partials/common/Breadcrumbs';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import MediaCard from "@components/partials/common/MediaCard";

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
    mainContainer: {
        overflow: "hidden",
        padding: `${spacing.unit * 2}px ${spacing.unit * 4}px ${spacing.unit * 4}px`,
        [breakpoints.up('lg')]: {
            paddingLeft: "20%",
            paddingRight: "20%"
        },
    },
    imageLeft: {
        borderRadius: "5px",
        width: "60%",
        maxWidth: "620px",
        [breakpoints.down('xs')]: {
            width: "100%",
            marginBottom: spacing.unit * 2
        },
        [breakpoints.up('sm')]: {
            float: "left",
            marginRight: spacing.unit * 2,
            marginBottom: spacing.unit * 0.5
        }
    },
    floatWithTextContainer: {
        overflow: "hidden"
    },
    cardGrid: {
        paddingTop: spacing.unit * 6,
        [breakpoints.down("xs")]: {
            paddingLeft: "5%",
            paddingRight: "5%"
        }
    },
});

const cards = [ 
    {
        title: "Upcoming events",
        text: "More information about upcoming events",
        image: "/images/events/calendar-pic.jpeg",
        link: "/events/upcoming",
        imageTitle: "Events calendar"
    },
    {
        title: "Past events",
        text: "Photos of past events of our organisation",
        image: "/images/events/past-meeting.jpg",
        link: "/events/past",
        imageTitle: "Meeting in Odessa"
    }
];

export interface Props extends WithStyles<typeof styles> { }

class About extends React.Component<Props> {
    render() {
        const { classes } = this.props;
        return( 
            <main className={classes.mainContainer}>
                <Breadcrumbs />
                <div className={classes.floatWithTextContainer}>
                    <img 
                        alt="Protest in shevchenko park" 
                        title="Protest in shevchenko park" 
                        className={classes.imageLeft} 
                        src={"images/events/meeting.jpg"}
                    />
                    <Typography 
                        variant="h4"
                        align="center"
                        gutterBottom
                    >
                        Events
                    </Typography>
                    <Typography 
                        variant="body1"
                        align="justify"
                        gutterBottom
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias vitae quia atque eius animi 
                        laborum magni quidem. Neque expedita fuga ea libero? Inventore facere nobis dolore non enim dolores
                        perspiciatis eos est debitis, ad laboriosam quis in laborum unde, asperiores ab architecto illum 
                        aut iure similique esse. Fuga ab officiis tempore mollitia ipsum dolores rerum consectetur aut eum, 
                        cupiditate molestiae pariatur in dolorem. Praesentium corporis ut necessitatibus non eaque vitae. 
                        Alias expedita tenetur vel rem. Cumque labore qui, neque necessitatibus hic provident molestias 
                        tempora? Fuga ab officiis tempore mollitia ipsum dolores rerum consectetur aut eum, cupiditate
                        molestiae pariatur in dolorem. Praesentium corporis ut necessitatibus non eaque vitae. 
                        Alias expedita tenetur vel rem. Cumque labore qui, neque necessitatibus hic provident molestias 
                        tempora? Fuga ab officiis tempore mollitia ipsum dolores rerum consectetur aut eum, cupiditate
                        molestiae pariatur in dolorem. Praesentium corporis ut necessitatibus non eaque vitae.
                    </Typography>
                </div>
                <Typography 
                    variant="h5"
                    align="center"
                    gutterBottom
                >
                    Additional info
                </Typography>
                <Typography 
                    variant="body1"
                    align="justify"
                    gutterBottom
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias vitae quia atque eius animi 
                    laborum magni quidem. Neque expedita fuga ea libero? Inventore facere nobis dolore non enim dolores
                    perspiciatis eos est debitis, ad laboriosam quis in laborum unde, asperiores ab architecto illum 
                    aut iure similique esse.
                </Typography>
                <div className={classNames(classes.cardGrid)}>
                    <Grid container justify="center" spacing={40}>
                        {cards.map((card, index) => (
                            <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                                <MediaCard card={card}/>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </main>
        );
    }
}

export default withStyles(styles)(About);