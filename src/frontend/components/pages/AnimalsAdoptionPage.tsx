import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Breadcrumbs from '@components/partials/common/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { Query } from "react-apollo";
import { AnimalType, Order } from "@common/interfaces";
import AnimalTypesControl from "@components/partials/adoption/AnimalTypesControl";
import { Variables, Data, GET_ANIMALS } from "@graphql/getAnimals";
import AnimalsGrid from "@partials/adoption/AnimalsGrid";
import SortingOrderControl from "@partials/adoption/SortingOrderControl";
import Paginator from "@partials/common/Paginator";
import LoadingScreen from "@partials/common/LoadingScreen";
import AnimalNameControl from '@components/partials/adoption/AnimalNameControl';

export const ITEMS_PER_PAGE = 10;

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
    mainContainer: {
        overflow: "hidden",
        padding: `${spacing.unit * 2}px ${spacing.unit * 4}px ${spacing.unit * 4}px`,
        [breakpoints.up('lg')]: {
            paddingLeft: "10%",
            paddingRight: "10%"
        },
    },
    textContent: {
        marginTop: spacing.unit * 2,
    },
    title: {
        fontSize: "2rem",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginBottom: spacing.unit
    },
    cardGrid: {
        paddingTop: spacing.unit * 6,
        [breakpoints.down("xs")]: {
            paddingLeft: "5%",
            paddingRight: "5%"
        }
    },
    formsContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [breakpoints.down("xs")]: {
            flexDirection: "column",
        }
    }
});

export interface Props extends WithStyles<typeof styles> { }

export interface State{
    searchQuery: string;
    types: AnimalType[];
    page: number;
    offset: number;
    order: Order;
}

class AnimalsAdoptionPage extends React.Component<Props, State>{
    state: State = {
        searchQuery: "",
        types: [],
        page: 1,
        offset: 0,
        order: Order.DESC,
    };

    handleQueryChange = (newQuery: string) => {
        this.setState({ 
            searchQuery: newQuery,
            page: 1,
            offset: 0, 
        });
    }

    handleTypesChange = (newTypes: AnimalType[]) => {
        this.setState({ 
            types: newTypes,
            page: 1,
            offset: 0, 
        });
    }

    handlePageChange = (newOffset: number, newPage: number) => {
        this.setState({ offset: newOffset, page: newPage });
    }

    handleOrderChange = (newOrder: Order) => {
        this.setState({ 
            order: newOrder,
            page: 1,
            offset: 0, 
        });
    }
    
    render() {
        const { classes } = this.props;
        const { searchQuery, types, page, offset, order } = this.state;
        const number = ITEMS_PER_PAGE;

        return( 
            <main className={classes.mainContainer}>
                <Breadcrumbs />
                <div className={classes.textContent}>
                    <Typography 
                        variant="h1"
                        align="center"
                        className={classes.title}
                    >
                        Animals to adopt
                    </Typography>
                </div>    
                <div className={classes.formsContainer}>
                    <AnimalNameControl 
                        cbQueryChanged={this.handleQueryChange}
                        currentQuery={searchQuery}
                    />
                    <AnimalTypesControl 
                        cbTypesChanged={this.handleTypesChange}
                        currentTypes={types}
                    />
                    <SortingOrderControl 
                        cbOrderChanged={this.handleOrderChange}
                        currentOrder={order}
                    />
                </div>
                <Query<Data, Variables>
                    query={GET_ANIMALS}
                    variables={{ number, types, offset, order, searchQuery }}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <LoadingScreen />;
                        if (error) return `${error}`;
                        return (
                            <div className={classNames(classes.cardGrid)}>
                                <AnimalsGrid 
                                    animals={data!.getAnimals.animals}
                                />
                                <Paginator 
                                    totalItems={data!.getAnimals.count} 
                                    onPageChanged={this.handlePageChange} 
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    currentPage={page}
                                />
                            </div>
                        );
                    }}
                </Query>
            </main>
        );
    }
}

export default withStyles(styles)(AnimalsAdoptionPage);

