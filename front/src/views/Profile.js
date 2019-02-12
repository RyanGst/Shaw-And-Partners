import React, {Component} from 'react';
import {Grid, Avatar, ListItemText, Card} from '@material-ui/core';

import "../assets/index.css"
import Axios from 'axios';
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            user: [], 
            repos: []
        }
    }
    componentDidMount() {
        Axios
            .get(`http://localhost:5050/api/user/details?name=${this.props.match.params.userName}`)
            .then(res => {
                var user = res.data.res;
                this.setState({user})
            });

        Axios
            .get(`http://localhost:5050/api/user/repos?name=${this.props.match.params.userName}`)
            .then(res => {
                var repos = res.data;
                //console.log(repos);
                this.setState({repos})
            });
    }
    render() {

        const {user, repos} = this.state

        const repoList = repos.map((r) => {
            return (
                <Card>
                    <Grid spacing={24}>
                        <Grid item spacing={12}>
                            <div className="reposContent">
                                <h4>Name: {r.name}</h4>
                                <h4>ID: #{r.id}</h4>
                                <a href={r} target="_blank">Profile Link</a>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            )
            
        })
        return (
            <Card>
                <Grid spacing={24}>
                    <Grid item spacing={12}>
                        <Grid container justify="center" alignItems="center">
                            <Avatar alt={user.name} src={user.avatar}/>
                        </Grid>
                        <div className="textContent">
                            <h4>Name: {user.name}</h4>
                            <h4>Login: {user.login}</h4>
                            <a href={user.profile} target="_blank">Profile Link</a>
                        </div>
                    </Grid>
                </Grid>
                <Grid spacing={24}>
                    {repoList}
                </Grid>
            </Card>
        );
    }
}
