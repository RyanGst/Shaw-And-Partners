import React, {Component} from 'react';
import {
    Card,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Grid,
    withStyles,
    InputBase,
    Button,
    Slide,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import Axios from 'axios';

// import { Container } from './styles';
const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing.unit * 3
        }
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 26px 10px 12px',
        transition: theme
            .transitions
            .create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
        }
    }
}))(InputBase);

function Transition(props) {
    return <Slide direction="up" {...props}/>;
}

export default class About extends Component {
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
            reposPerPage: 3
        };
        this.addMoreUsers = this
            .addMoreUsers
            .bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        Axios
            .get(`https://s-a-p.herokuapp.com/api/users?per_page=${this.state.per_page}`)
            .then(res => {
                const next = res.data.nextPage[0]
                const since = next.split('&')[1];
                //console.log(since);
                this.setState({since})
                const users = res.data.response;
                this.setState({users});
            });
    }

    info = (user) => {
        Axios
            .get(`https://s-a-p.herokuapp.com/api/user/details?name=${user.login}`)
            .then(res => {
                const data = res.data.res

                this.setState({details: data})
            })
        this.setState({open: true});
    };

    handleClick(event) {

        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    table = (user) => {
        Axios
            .get(`https://api.github.com/users/${user.login}/repos`)
            .then(res => {
                const data = res.data
                //console.log(data);
                this.setState({repos: data})
            })
        this.setState({openTable: true});
    }

    handleTableClose = () => {
        this.setState({openTable: false});
    };
    addMoreUsers = () => {

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

    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {

        const {users, details, repos, currentPage, reposPerPage} = this.state

        const indexOfLastClient = currentPage * reposPerPage;
        const indexOfFirstClient = indexOfLastClient - reposPerPage;
        const currentUsers = repos.slice(indexOfFirstClient, indexOfLastClient);

        const render = currentUsers.map((repo, index) => {
            return (
                <ul className='unList' key={index}>
                    <li>{repo.id}</li>
                    <li>{repo.name}</li>
                    <li><a href={repo.html_url}><i className="fas fa-link"></i></a></li>
                </ul>
            )
        })

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(repos.length / reposPerPage); i++) {
            pageNumbers.push(i);
        }
        //TODO: Style this
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    style={{
                    float: "left",
                    padding: 9
                }}
                    key={number}
                    id={number}
                    onClick={this.handleClick}>
                    {number}
                </li>
            );
        });

        const data = users

        const list = data.map((user, index) => {
            return (
                <div className="content">
                    <List>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={user.avatar_url}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${user.login} - #${user.id}`}
                                secondary={< div className = "tooltip" > <small>
                                <Button
                                    onClick={() => this.info(user, index)}
                                    variant="contained"
                                    color="primary">
                                    <i className="fas fa-info-circle"></i>
                                </Button>
                                <Button
                                    onClick={() => this.table(user, index)}
                                    variant="contained"
                                    color="secondary">
                                    <i className="fas fa-bug"></i>
                                </Button>
                            </small> </div>}/>
                        </ListItem>
                        <Dialog
                            open={this.state.open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description">
                            <DialogTitle id="alert-dialog-slide-title">
                                <h4>
                                    {details.login}</h4>
                            </DialogTitle>
                            <DialogContent>
                                <div className="modal">
                                    <Grid container spacing={24}>
                                        <Grid item spacing={6}>
                                            <img id="img" src={details.avatar}></img>
                                        </Grid>
                                        <Grid item spacing={6}>
                                            <div id="content">
                                                <List>
                                                    <ListItem>
                                                        <b>Name:</b>{" "} {details.name}
                                                    </ListItem>
                                                    <ListItem>
                                                        <b>ID:</b>{" "} {'#' + details.id}
                                                    </ListItem>
                                                    <ListItem>
                                                        <b>Member since:</b>{" "}
                                                        <p>{details.date}</p>
                                                    </ListItem>
                                                </List>
                                            </div>

                                        </Grid>
                                    </Grid>
                                </div>

                            </DialogContent>
                            <DialogActions>
                                <Button target="_blank" href={details.profile} color="primary">
                                    Profile
                                </Button>
                                <Button onClick={this.handleClose} color="primary">
                                    Close
                                </Button>

                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={this.state.openTable}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description">
                            <DialogContent>
                                <div className="modal">
                                    <Grid container spacing={24}>
                                        {render}
                                    </Grid >
                                </div>
                                <ul className="unList" >
                                {renderPageNumbers}
                                </ul>
                                
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleTableClose} color="primary">
                                    Close
                                </Button>

                            </DialogActions>
                        </Dialog>
                    </List>
                </div>
            )
        })
        return (
            <Card container>
                <Grid container spacing={12}>
                    {list}
                </Grid>
                <Grid container xl={12}>
                    <Grid item xl={6}>
                        <Button variant="flat" onClick={this.addMoreUsers} color="secondary">
                            <i className="fas fa-plus"></i>
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}
