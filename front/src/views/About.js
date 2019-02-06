import React, {Component} from 'react';
import {
    Card,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Grid,
    FormControl,
    Select,
    MenuItem,
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
    state = {
        number: 10,
        users: [],
        open: false
    };

    handleChange = event => {
        this.setState({number: event.target.value});
    };

    componentDidMount() {
        Axios
            .get(`https://s-a-p.herokuapp.com/api/users?per_page=${this.state.number}`)
            .then(res => {
                const users = res.data.response;
                this.setState({users});
            });
    }

    info = (user) => {
        this.setState({open: true});
        Axios.get(`https://s-a-p.herokuapp.com/api/user/details?name=${user.login}`)
            .then(res => {
                const data = res.data
                

            })
        
        
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {

        const {users} = this.state
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
                                <Button onClick={() => this.info(user, index)} variant="contained" color="primary">
                                    <i className="fas fa-info-circle"></i>
                                </Button>
                                <Button variant="contained" color="secondary">
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
                                {"User Info"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Let Google help apps determine location. This means sending anonymous location
                                    data to Google, even when no apps are running.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Disagree
                                </Button>
                                <Button onClick={this.handleClose} color="primary">
                                    Agree
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
                    <div className="select">
                        <FormControl>
                            <Select
                                value={this.state.number}
                                onChange={this.handleChange}
                                input={< BootstrapInput name = "age" id = "age-customized-select" />}>
                                <MenuItem value="">
                                    <em>__</em>
                                </MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid container spacing={12}>
                    {list}
                </Grid>

            </Card>
        );
    }
}
