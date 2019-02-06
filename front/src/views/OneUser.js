import React, {Component} from 'react';
import {
    Grid,
    Typography,
    Card
} from '@material-ui/core';

// import { Container } from './styles';
import "../assets/index.css"
export default class Details extends Component {
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
                                <p className="header">Details</p>
                            </Typography>
                        </div>
                        <div className="listContainer">
                
                        </div>
                    </Grid>
                    <hr style={{marginLeft: 15, marginRight: 15}}/>
                </div>
            </Card>

        );
    }
}
