import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const styles = ({ breakpoints, spacing }: Theme) => createStyles({
    profileButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "none",
        alignSelf: "stretch",
        color: "white",
        [breakpoints.up('md')]: {
            marginLeft: "auto",
            marginRight: spacing.unit * 3
        },
        [breakpoints.down('sm')]: {
            paddingTop: spacing.unit,
            paddingBottom: spacing.unit
        }
    },
    avatar: {
        marginLeft: spacing.unit * 2,
        [breakpoints.down('sm')]: {
            display: "none"
        }
    }
});

export interface Props extends WithStyles<typeof styles> { }

interface State {
    profileAnchorElement: HTMLElement | null;
}

class ProfileButton extends React.Component<Props, State> {
    state: State = {
        profileAnchorElement: null
    };

    handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        this.setState({ profileAnchorElement: event.currentTarget });
    }

    handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        this.setState({ profileAnchorElement: null });
    }
   
    render() {
        const { profileAnchorElement } = this.state;
        const { classes } = this.props;
        const isProfileMenuOpen = Boolean(profileAnchorElement);

        const profileMenu = (
            <Menu
                anchorEl={profileAnchorElement}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isProfileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>My profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
            </Menu>
        );

        return (
            <React.Fragment>
                <Button 
                    className={classes.profileButton}
                    onClick={this.handleProfileMenuOpen}
                >
                    <Typography 
                        variant="h6" 
                        color="inherit" 
                    >
                        John Doe
                    </Typography>
                    <Avatar alt="User Avatar" src="/images/avatar/1.jpg" className={classes.avatar} />
                </Button>
                { profileMenu }
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ProfileButton);