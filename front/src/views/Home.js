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
export default class Home extends Component {
    render() {
        return (
            <Card>
                <div>
                    <Grid container spacing={24}>
                        <div className="container">
                            <Typography
                                style={{
                                textAlign: 'center'
                            }}
                                variant="h4">
                                <p className="header">Shaw and Partners full stack challenge</p>
                            </Typography>
                        </div>
                        <div className="listContainer">
                            <List>
                                <ListItem>
                                    <Avatar>
                                        <i className="fas fa-server"></i>
                                    </Avatar>
                                    <ListItemText primary="1º - Do The Backend" secondary="It's a little scary"/>
                                </ListItem>
                                <ListItem>
                                    <Avatar>
                                        <i className="fas fa-object-group"></i>
                                    </Avatar>
                                    <ListItemText primary="2º - Do the Front-End" secondary="A bit less scary"/>
                                </ListItem>
                                <ListItem>
                                    <Avatar>
                                        <i className="fas fa-smile-wink"></i>
                                    </Avatar>
                                    <ListItemText primary="3º - Work happy" secondary="Don't worry, be happy"/>
                                </ListItem>
                            </List>
                            
                        </div>
                    </Grid>
                    <hr style={{marginLeft: 15, marginRight: 15}}/>
                </div>
            </Card>

        );
    }
}
