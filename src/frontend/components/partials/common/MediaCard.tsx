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


export interface Props {
    card: {
        text: string;
        title: string;
        image: string;
        link: string
    };
}

const styles = () => createStyles({
    card: {
        height: '100%',
        display: 'flex',
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
});

class MediaCard extends React.Component<Props & WithStyles<typeof styles> & RouteComponentProps> {
    handleRedirect = () => {
        this.props.history.push(this.props.card.link);
    }

    render() {
        const { classes, card } = this.props;
        const {image, title, text} = card;

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={image}
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" align="center">
                        {title}
                    </Typography>
                    <Typography>
                        {text}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={this.handleRedirect}  size="small" color="primary">
                        View
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default compose<Props & WithStyles<typeof styles> & RouteComponentProps, {}>(
    withStyles(styles),
    withRouter
)(MediaCard) as unknown as React.ComponentClass<Props>;
  
