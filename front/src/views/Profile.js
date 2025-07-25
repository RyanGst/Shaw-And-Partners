import React, {Component} from 'react';
import {Grid, Avatar, Card} from '@material-ui/core';
import {fetchSpecificUser} from '../actions/actions.js';
import {connect} from 'react-redux';
import "../assets/index.css"
import Axios from 'axios';
class Profile extends Component {
    constructor() {
        super();
        this.state = {
            repos: []
        }
    }
    componentDidMount() {
        
        this
        .props
        .dispatch(fetchSpecificUser(this.props.match.params.userName));


        setTimeout(() => {
            Axios
            .get(`http://localhost:5050/api/user/repos?name=${this.props.match.params.userName}`)
            .then(res => {
                var repos = res.data;
                //console.log(repos);
                this.setState({repos})
            });
        }, 5000);
        
    }
    render() {
        const {current} = this.props
        const {repos} = this.state
        console.log(current);
        const repoList = repos.map((r) => {
            return (
                <Card id="content">
                    <Grid spacing={24}>
                        <Grid className="repoContent" item spacing={12}>
                            <div>
                                <h4>Name: {r.name}</h4>
                                <h4>ID: #{r.id}</h4>
                                <a href={r.html_url} target="_blank">Repo Link</a>
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
                        <Grid className="Profile" container justify="center" alignItems="center">
                            <Avatar alt={current.name} src={current.avatar}/>
                        </Grid>
                        <div className="textContent">
                            <h4>Name: {current.name}</h4>
                            <h4>Login: {current.login}</h4>
                            <a href={current.profile} target="_blank">Profile Link</a>
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
const mapStateToProps = state => ({current: state.rootReducer.current});

export default connect(mapStateToProps)(Profile);