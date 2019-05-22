import * as React from 'react';
import Breadcrumbs from '@components/partials/common/Breadcrumbs';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import GoogleMapComponent from "@components/partials/about/GoogleMap";
import { lightGreen } from '@material-ui/core/colors';

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
    mainContainer: {
        overflow: "hidden",
        padding: `${spacing.unit * 2}px ${spacing.unit * 4}px ${spacing.unit * 4}px`,
        [breakpoints.up('lg')]: {
            paddingLeft: "20%",
            paddingRight: "20%"
        },
    },
    imageLeftContainer: {
        margin: 0,
        width: "60%",
        maxWidth: "620px",
        textAlign: "center",
        borderRadius: "5px",
        backgroundColor: lightGreen[50],
        paddingBottom: spacing.unit * 0.5,
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
    imageLeft: {
        borderRadius: "5px 5px 0px 0px",
        width: "100%"
    },
    floatWithTextContainer: {
        overflow: "hidden"
    },
    mapContainer: {
        width: "40%",
        maxWidth: "200px",
        height: "200px",
        float: "right",
        marginLeft: spacing.unit * 2,
        [breakpoints.down('xs')]: {
            maxWidth: "150px",
            height: "150px",
        }
    },
});

const kyivCoordinates = {
    latitude: 50.45,
    longitude: 30.52
};

export interface Props extends WithStyles<typeof styles> { }

class AboutPage extends React.Component<Props> {
    render() {
        const { classes } = this.props;
        return( 
            <main className={classes.mainContainer}>
                <Breadcrumbs />
                <div className={classes.floatWithTextContainer}>
                    <figure className={classes.imageLeftContainer}>
                        <img alt="animals protest" className={classes.imageLeft} src={"images/about-page/animalrights.jpg"}/>
                        <figcaption><Typography variant="body1">Our banner since 2015</Typography></figcaption>
                    </figure>
                    <Typography 
                        variant="h4"
                        align="center"
                        gutterBottom
                    >
                        About us
                    </Typography>
                    <Typography 
                        variant="body1"
                        align="justify"
                        gutterBottom
                    >
                        Lorem ipsum dolor sit amet <strong>consectetur adipisicing</strong> elit. <em>Molestias vitae</em> 
                        quia atque eius animi laborum magni quidem. Neque expedita fuga ea libero? Inventore facere nobis 
                        dolore non enim dolores perspiciatis eos est debitis, ad laboriosam quis in laborum unde, asperiores
                        ab architecto illum aut iure similique esse. Fuga ab officiis tempore mollitia ipsum dolores rerum 
                        consectetur aut eum, cupiditate molestiae pariatur in dolorem. Praesentium corporis ut necessitatibus
                        non eaque vitae. Alias expedita tenetur vel rem. Cumque labore qui, neque necessitatibus hic provident 
                        molestias tempora? Fuga ab officiis tempore mollitia ipsum dolores rerum consectetur aut eum, cupiditate
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
                <Typography 
                    variant="h5"
                    align="center"
                    gutterBottom
                >
                    Our location
                </Typography>
                <div className={classes.mapContainer}>
                    <GoogleMapComponent 
                        latitude={kyivCoordinates.latitude}
                        longitude={kyivCoordinates.longitude}
                    />
                </div>
                <Typography 
                    variant="body1"
                    align="justify"
                >
                    Our company had a large number of offices allaround the world. But our main
                    office is located located in <strong>Kyiv at 22, Khreshchatyk Street</strong>. 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias vitae quia atque eius animi 
                    laborum magni quidem. Neque expedita fuga ea libero? Inventore facere nobis dolore non enim dolores
                    perspiciatis eos est debitis, ad laboriosam quis in laborum unde, asperiores ab architecto illum 
                    aut iure similique esse.
                </Typography>
            </main>
        );
    }
}

export default withStyles(styles)(AboutPage);