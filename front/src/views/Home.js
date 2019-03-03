import React, {Component} from 'react';
import {
    Grid,
    Typography,
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
                                <p className="header">Just a Repo</p>
                            </Typography>
                        </div>
                    </Grid>
                </div>
            </Card>

        );
    }
}
