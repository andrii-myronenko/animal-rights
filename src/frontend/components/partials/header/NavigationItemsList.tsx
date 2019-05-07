import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NavigationItem from './NavigationItem';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { compose } from 'recompose';

const styles = ({ breakpoints, spacing }: Theme) => createStyles({
    navigationItemsList: {
        padding: "0 0",
        display: "flex",
        alignSelf: "stretch",
        [breakpoints.up('md')]: {
            "& > div:not(:last-child):after": {
                content : '""',
                left    : 0,
                bottom  : "15px",
                height  : "30px",
                borderRight: "1px solid #ffffff"
            },
        },
        [breakpoints.down('sm')]: {
            flexDirection: "column",
            justifyContent: "center"
        },
    },
    navigationButton: {
        width: "auto",
        padding: `${spacing.unit}px 0px`
    }
});

export interface Props extends WithStyles<typeof styles> { }

interface State {
    eventsAnchorElement: HTMLElement | null;
    adoptsAnchorElement: HTMLElement | null;
}

class NavigationItemsList extends React.Component<Props & RouteComponentProps, State> {
    state: State = {
        eventsAnchorElement: null,
        adoptsAnchorElement: null
    };

    handleEventsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ eventsAnchorElement: event.currentTarget, adoptsAnchorElement: null });
    }

    handleAdoptsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ eventsAnchorElement: null, adoptsAnchorElement: event.currentTarget });
    }

    handleRedirectMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ eventsAnchorElement: null, adoptsAnchorElement: event.currentTarget });
    }

    handleMenuClose = () => {
        this.setState({ eventsAnchorElement: null, adoptsAnchorElement: null });
    }

    handleAboutRedirect = () => {
        this.props.history.push("/about");
    }
   
    render() {
        const { eventsAnchorElement, adoptsAnchorElement } = this.state;
        const { classes } = this.props;
        const isEventsMenuOpen = Boolean(eventsAnchorElement);
        const isAdoptsMenuOpen = Boolean(adoptsAnchorElement);

        const eventsMenu = (
            <Menu
                anchorEl={eventsAnchorElement}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isEventsMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>About Events</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Upcoming Events</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Past Events Gallery</MenuItem>
            </Menu>
        );

        const adoptsMenu = (
            <Menu
                anchorEl={adoptsAnchorElement}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isAdoptsMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>About Adoption</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Animals To Adopt</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Adopted Gallery</MenuItem>
            </Menu>
        );

        return (
            <React.Fragment>
                <List 
                    disablePadding
                    className={classes.navigationItemsList}
                >
                    <ListItem 
                        button 
                        className={classes.navigationButton}
                        onClick={this.handleEventsMenuOpen}
                    >
                        <NavigationItem text="Events"/> 
                    </ListItem>
                    <ListItem 
                        button 
                        className={classes.navigationButton}
                        onClick={this.handleAdoptsMenuOpen}
                    >
                        <NavigationItem text="Animals Adoption"/> 
                    </ListItem>
                    <ListItem 
                        button
                        className={classes.navigationButton}
                        onClick={this.handleAboutRedirect} 
                    >
                        <NavigationItem text="About us"/> 
                    </ListItem>
                </List>
                { eventsMenu }
                { adoptsMenu }
            </React.Fragment>
        );
    }
}

export default compose(
    withStyles(styles),
    withRouter
)(NavigationItemsList as any);
  