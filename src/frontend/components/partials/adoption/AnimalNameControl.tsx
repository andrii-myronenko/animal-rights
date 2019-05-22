import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
    formContainer: {
        display: 'flex',
        [breakpoints.up('sm')]: {
            maxWidth: "200px",
        },
        width: "100%"
    },
    formControl: {
        margin: spacing.unit * 3,
        width: "100%"
    },
    selectEmpty: {
        marginTop: spacing.unit * 2,
    }
});

export interface Props extends WithStyles<typeof styles> {
    cbQueryChanged: (newQuery: string) => void;
    currentQuery: string;
}

class SortingOrderControl extends React.Component<Props> {
    handleSearchQueryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.cbQueryChanged(event.target.value);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.formContainer}>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="standard-name"
                        label="Name"
                        value={this.props.currentQuery}
                        onChange={this.handleSearchQueryChange}
                    />
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(SortingOrderControl);   