import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs, { InjectedProps } from 'react-router-breadcrumbs-hoc';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
 

const routes = [
    { path: '/example', breadcrumb: 'Custom Example' },
];

const styles = ({ breakpoints, spacing, palette }: Theme) => createStyles({
    main: {
        marginTop: "56px",
        [breakpoints.up('sm')]: {
            marginTop: "64px"
        },
    },
    breadcrumbsContainer: {
        borderRadius: "5px",
        width: "100%",
        color: "white",
        padding: `${spacing.unit * 2}px`,
        marginBottom: `${spacing.unit * 2}px`,
        backgroundColor: palette.secondary.main,
    },
    breadcrumbLink: {
        textDecoration: "none",
        color: "inherit",
        padding: `${spacing.unit}px`,
        "& :hover": {
            color: palette.secondary.dark
        },
        "& :active": {
            color: palette.primary.dark
        }
    }
});

export interface Props extends WithStyles<typeof styles> { }


class Breadcrumbs extends React.Component<Props & InjectedProps> {
    render() {
        const breadcrumbs = this.props.breadcrumbs;
        const  { classes } = this.props;

        return (
            <React.Fragment>
                 <div className={classes.breadcrumbsContainer}>
                    <Typography color="inherit">
                        {breadcrumbs.map((breadcrumb, index) => (
                            <span key={breadcrumb.key}>
                                <NavLink className={classes.breadcrumbLink} to={breadcrumb.props.match.url}>
                                    {breadcrumb}
                                </NavLink>
                                {(index < breadcrumbs.length - 1) && <i> / </i>}
                            </span>
                        ))}
                    </Typography>
                </div>
            </React.Fragment>
        );
    }
}

export default compose(
    withStyles(styles),
    withBreadcrumbs(routes),
)(Breadcrumbs as any);
  