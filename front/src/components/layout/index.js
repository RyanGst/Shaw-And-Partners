//Layout of the page, simple responsive Drawer and AppBar from Material UI

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom"
import Menu from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles';
import {
    MenuList,
    MenuItem,
    Toolbar,
    IconButton,
    Hidden,
    Drawer,
    CssBaseline,
    AppBar
} from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            width: drawerWidth,
            flexShrink: 0
        }, 
    },
    appBar: {
        marginLeft: drawerWidth,
        zIndex: '999999',
        backgroundColor: '#0c0b0b'
    },
    menuButton: {
        marginRight: 20,
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            display: 'none'
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth, 
        padding: 10
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        backgroundColor: '#eef0f2'
    }, 
    itens: {
        marginTop: 10,
        borderRadius: 25,
    }
});

class Sidebar extends React.Component {
    state = {
        mobileOpen: false
    };

    handleDrawerToggle = () => {
        this.setState(state => ({
            mobileOpen: !state.mobileOpen
        }));
    };

    render() {
        const {classes} = this.props;

        const routes = this.props.routes
        const drawer = (
            <div>
                <div className={classes.toolbar}/>
                <MenuList>

                    {routes.map((route, index) => (
                        <MenuItem className={classes.itens} component={Link} to={route.path}>
                            <IconButton>
                                <i className={route.icon}></i>
                            </IconButton>
                          
                                {route.name}
                       
                        </MenuItem>
                    ))}

                </MenuList>
            </div>
        );

        return (
            <div className={classes.root}>
                <CssBaseline>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}>
                                <Menu/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer}>
                        {/* */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={this.props.container}
                                variant="temporary"
                                open={this.state.mobileOpen}
                                onClose={this.handleDrawerToggle}
                                classes={{
                                paper: classes.drawerPaper
                            }}>
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                paper: classes.drawerPaper
                            }}
                                variant="permanent"
                                open>
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/> {this.props.children}
                    </main>
                </CssBaseline>
            </div>
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(Sidebar);
