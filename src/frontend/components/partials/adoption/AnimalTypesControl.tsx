import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import { PossibleTypes } from '@common/interfaces';
import { AnimalType } from "@common/interfaces";

const styles = ({ palette, spacing, breakpoints }: Theme) => createStyles({
    formControl: {
        margin: spacing.unit * 3,
        width: "100%"
    },
    formLabel: {
        color: palette.secondary.main,
        textAlign: 'center',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    chip: {
        margin: `-6px 2px -2px 2px`,
        height: "27px"
    },
    formContainer: {
        display: 'flex',
        [breakpoints.up('xs')]: {
            minWidth: "220px",
        },
        width: "100%"
    },
    labelHelper: {
        position: 'initial'
    }
});

export interface Props extends WithStyles<typeof styles> {
    cbTypesChanged:  (newTypes: AnimalType[]) => void;
    currentTypes: AnimalType[];
}


class AnimalTypesControl extends React.Component<Props> {
    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as unknown;
        this.props.cbTypesChanged(value as AnimalType[]);
    }

    renderSelectValue = (selected: SelectProps["value"]) => {
        const { classes } = this.props; 
        const arr = selected as AnimalType[]; 
        return (
            <div className={classes.chips}>
                {arr.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                ))}
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.formContainer}>
                <FormControl className={classes.formControl}>
                    <InputLabel 
                        className={classes.labelHelper} 
                        htmlFor="select-multiple-chip"
                    >
                        Select desired animal types
                    </InputLabel>
                    <FormGroup>
                        <Select
                            multiple
                            value={this.props.currentTypes}
                            onChange={this.handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={this.renderSelectValue}
                            MenuProps={{
                                getContentAnchorEl: null,
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                }
                            }}
                        >
                        {PossibleTypes.map(value => (
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormGroup>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(AnimalTypesControl);