import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { compose } from 'recompose';
import PetsIcon from '@material-ui/icons/Pets';
import { Animal } from "@common/interfaces";

export interface Props {
    animal: Animal;
    cbAnimalSelected: (animal: Animal) => void;
}

const styles = () => createStyles({
    card: {
        width: "100%",
        maxWidth: "300px",
        height: '100%',
        display: 'flex',
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: 'column',
        "&:hover": {
            transform: "scale(1.1)",
            transition: "all .2s ease-in-out",
        }
    },
    cardMedia: {
        width: "100%",
        maxHeight: "300px",
        objectFit: "cover",
        paddingBottom: "100%"
    },
    cardContent: {
        flexGrow: 1,
    },
    tagContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    tagIcon: {
        marginRight: "5px"
    }
});

class AnimalCard extends React.Component<Props & WithStyles<typeof styles> & RouteComponentProps> {
    handleAnimalSelection = () => {
        this.props.cbAnimalSelected(this.props.animal);
    }

    render() {
        const { classes, animal } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={animal.photoUrl}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4"  align="center">
                        {animal.name}
                    </Typography>
                    <div className={classes.tagContainer}>
                        <PetsIcon className={classes.tagIcon} color="primary" fontSize="small"/> 
                        <Typography variant="body1">
                            {` ${animal.type}`}
                        </Typography>
                    </div>
                </CardContent>
                <CardActions>
                    <Button onClick={this.handleAnimalSelection}  color="primary">
                        Learn more
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default compose(
    withStyles(styles),
    withRouter
)(AnimalCard as any) as unknown as React.ComponentClass<Props>;