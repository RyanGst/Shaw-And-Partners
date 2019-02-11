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
import Axios from 'axios';
import {fetchUsers} from '../actions/actions.js';
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

    addMoreUsers = () => {
        this.setState(prevState => ({
            isFetching: !prevState.isFetching
        }));
        //console.log();
        Axios
            .get(`https://s-a-p.herokuapp.com/api/users?per_page=${this.state.per_page}&${this.state.since}`)
            .then(res => {
                const next = res.data.nextPage[0]
                const since = next.split('&')[1];
                //console.log(since);
                this.setState({since})
                const users = res.data.response;
                var a = this
                    .state
                    .users
                    .concat(users)
                this.setState({users: a});
            });

        this.setState((prevState) => ({
            per_page: prevState.per_page + 2
        }));

        setTimeout(() => {
            this.setState(prevState => ({
                isFetching: !prevState.isFetching
            }));
        }, 2000);

    }

    render() {
        const {error, loading, users} = this.props;
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
                                onClick={this.addMoreUsers}
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
const mapStateToProps = state => ({users: state.rootReducer});

export default connect(mapStateToProps)(About);