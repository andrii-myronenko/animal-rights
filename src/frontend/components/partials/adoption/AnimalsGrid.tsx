import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import AnimalCard from "@components/partials/adoption/AnimalCard";
import { Animal } from "@common/interfaces";
import AnimalModal from "@components/partials/adoption/AnimalModal";

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
    title: {
        fontSize: "2rem",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginBottom: spacing.unit
    },
    cardGrid: {
        [breakpoints.down("xs")]: {
            paddingLeft: "5%",
            paddingRight: "5%"
        }
    }
});

export interface Props extends WithStyles<typeof styles> { 
    animals: Array<Animal>;
}

export interface State{
    currentAnimal: Animal | null;
}

class AnimalsAdoptionPage extends React.Component<Props, State>{
    state: State = {
        currentAnimal: null
    };

    handleAnimalSelected = (animal: Animal) => {
        this.setState({currentAnimal: animal});
    }

    handleModalClosed = () => {
        this.setState({currentAnimal: null});
    }
   
    render() {
        const { classes, animals } = this.props;

        return( 
            <React.Fragment>
                <AnimalModal 
                    cbModalClosed={this.handleModalClosed} 
                    currentAniaml={this.state.currentAnimal}
                />
                <div className={classNames(classes.cardGrid)}>
                    <Grid container justify="center" spacing={40}>
                        {animals.map((animal, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <AnimalCard 
                                    animal={animal}
                                    cbAnimalSelected={this.handleAnimalSelected}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AnimalsAdoptionPage);

