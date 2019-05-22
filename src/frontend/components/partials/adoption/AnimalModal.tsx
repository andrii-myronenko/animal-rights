import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import * as Moment from 'moment';
import CardActions from '@material-ui/core/CardActions';
import { Animal } from "@common/interfaces";
import red from '@material-ui/core/colors/red';

const styles = () => createStyles({
    card: {
        height: '100%',
        display: 'flex',
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: 'column',
        overflowY: "auto"
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    closeButton: {
        color: red[500],
    }
});


export interface Props extends WithStyles<typeof styles> {
    currentAniaml: Animal | null;
    cbModalClosed: () => void;
}

class AnimalModal extends React.Component<Props>{
    handleClose = () => {
        this.props.cbModalClosed();
    }

    render() {
        const { classes, currentAniaml } = this.props;
        if(currentAniaml == null){
            return null;
        }
        return (
            <React.Fragment>
                <Dialog
                    aria-labelledby="animal-adoption-modal"
                    aria-describedby="animal-adoption-description"
                    open={this.props.currentAniaml !== null}
                    onClose={this.handleClose}
                >   
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={currentAniaml.photoUrl}
                            title={currentAniaml.name}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h3"  align="center">
                                {currentAniaml.name}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Description</strong>: {currentAniaml.description}
                            </Typography>
                            <Typography variant="body1" color="default">
                                <strong>Date of creation</strong>: {
                                    Moment(currentAniaml.dateOfCreation, "x").format("DD MMM YYYY hh:mm a") 
                                }
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                                size="small" 
                                color="primary"
                                onClick={this.handleClose}
                            >
                                Become patron
                            </Button>
                            <Button 
                                size="small" 
                                color="primary"
                                onClick={this.handleClose}
                            >
                                Adopt now
                            </Button>
                            <Button 
                                size="small" 
                                className={classes.closeButton}
                                onClick={this.handleClose}
                            >
                                Close
                            </Button>
                        </CardActions>
                    </Card>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AnimalModal);