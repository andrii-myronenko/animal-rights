import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Pagination from "material-ui-flat-pagination";
import withWidth, { WithWidthProps } from '@material-ui/core/withWidth';

const styles = ({ spacing }: Theme) => createStyles({
    paginator: {
        paddingBottom: spacing.unit * 3,
        paddingTop: spacing.unit * 3,
        boxSizing: "content-box",
        display: "flex", 
        alignItems: "center",
        justifyContent: "center"
    },
});

export interface Props extends WithStyles<typeof styles>, WithWidthProps {
    onPageChanged: (newOffset: number, newPage: number) => void;   
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
}

class Paginator extends React.Component<Props> {
    getSizePaginator = () => this.props.width === 'xs' ? 'medium' : 'large';

    handleChange = (_e: object, newOffset: number, newPage: number) => {
        this.props.onPageChanged( newOffset, newPage );
    }

    render() {
        const { classes } = this.props;
        const { currentPage, totalItems, itemsPerPage } = this.props;
        const offset = (currentPage - 1) * itemsPerPage;
        if (totalItems === 0) return <div />;
        return (
            <React.Fragment>
                <div className={classes.paginator}>
                    {this.props.totalItems / itemsPerPage > 1.0 && 
                        <Pagination
                            limit={itemsPerPage}
                            offset={offset}
                            total={totalItems}
                            onClick={this.handleChange}
                            currentPageColor="default"
                            otherPageColor="secondary"
                            size={this.getSizePaginator()}
                            outerButtonCount={this.getSizePaginator() === 'large'?  2 : 1}
                            innerButtonCount={this.getSizePaginator() === 'large'?  2 : 1}
                        />
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(withWidth()((Paginator)));
