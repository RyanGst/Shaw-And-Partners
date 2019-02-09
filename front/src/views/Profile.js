import React, {Component} from 'react';
import {
    Grid,
    Typography,
    List,
    ListItem,
    Avatar,
    ListItemText,
    Card
} from '@material-ui/core';

// import { Container } from './styles';
import "../assets/index.css"
import Axios from 'axios';
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            user: []
        }
    }
    componentDidMount() {
        Axios
            .get(`http://localhost:5050/api/user/details?name=${this.props.match.params.userName}`)
            .then(res => {
                var user = res.data.res;
                console.log(user);
                this.setState({user})
            });
    }
    render() {

        const {user} = this.state
        return (
            <Card>
                <Grid spacing={24}>
                    <Grid item spacing={12}>
                        <Grid container justify="center" alignItems="center">
                            <Avatar
                                alt={user.name}
                                src={user.avatar}/>
                        </Grid>
                        <h4>Name:  {user.name}</h4>
                        <h4>Login: {user.login}</h4>
                        <a href={user.profile} target="_blank" >Profile Link</a>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}
