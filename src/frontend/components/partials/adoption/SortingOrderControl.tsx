import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { Order } from "@common/interfaces";

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
    cbOrderChanged:  (newOrder: Order) => void;
    currentOrder: Order;
}

class SortingOrderControl extends React.Component<Props> {
    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as Order;
        this.props.cbOrderChanged(value);
    }

    render() {
        const { classes, currentOrder } = this.props;
        return (
            <div className={classes.formContainer}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="order-contorl">Order</InputLabel>
                    <Select
                        value={currentOrder}
                        onChange={this.handleChange}
                        input={<Input name="order" id="order-contorl" />}
                        displayEmpty
                        name="order"
                        className={classes.selectEmpty}
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                            }
                        }}
                    >
                        <MenuItem value={Order.DESC}>Newer Frist</MenuItem>
                        <MenuItem value={Order.ASC}>Older First</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(SortingOrderControl);   