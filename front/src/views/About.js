import React, {Component} from 'react';
import {
    Card,
    List,
    ListItem,
    ListItemText,
    Grid,
    Button,
    Slide,
    ListItemIcon,
    CircularProgress
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {fetchUsers, fetchMoreUsers} from '../actions/actions.js';
import {connect} from 'react-redux';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4
    }
});

function Transition(props) {
    return <Slide direction="up" {...props}/>;
}

class About extends Component {
    constructor() {
        super()
        this.state = {
            per_page: 30,
            number: 15,
            users: [],
            open: false,
            openTable: false,
            details: [],
            since: 0,
            repos: [],
            currentPage: 1,
            reposPerPage: 3,
            isFetching: true
        };
        this.addMoreUsers = this
            .addMoreUsers
            .bind(this)
    }

    componentDidMount() {
        this
        .props
        .dispatch(fetchUsers());
    }

    addMoreUsers = (link) => {
        const since = link.split("&")
        this
        .props
        .dispatch(fetchMoreUsers(since[1]));
    }

    render() {
        const {error, loading, users, next} = this.props;
        const data = users.items
        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        const list = data.map((user, index) => {
            return (
                <div className="content">
                    <Link to={`/user/${user.login}`}>
                        <List component="nav">
                            <ListItem button>
                                <ListItemIcon>
                                    <img className="profileImg" src={user.avatar_url}></img>
                                </ListItemIcon>
                                <ListItemText primary={user.login}/>
                            </ListItem>
                        </List>
                    </Link>
                </div>
            )
        })
        return (
            <Card container>
                <Grid container spacing={12}>
                    {list}
                </Grid>
                <Grid container xl={24}>
                    {this.state.isFetching
                        ? <Button
                                className="spinner"
                                variant="flat"
                                onClick={() => this.addMoreUsers(this.props.next.util)}
                                color="secondary">
                                <i className="fas fa-plus"></i>
                            </Button>
                        : <div >
                            <CircularProgress className="spinner"/>
                        </div>}
                </Grid>
            </Card>
        );
    }
}
const mapStateToProps = state => ({users: state.rootReducer, next: state.rootReducer});

export default connect(mapStateToProps)(About);