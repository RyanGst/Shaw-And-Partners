import React, {Component} from 'react';
import {FetchPokeIfNeed} from '../actions/actions.js';
import {connect} from 'react-redux';
import {Card, Grid, Typography, Input, Button} from '@material-ui/core';
import {log} from 'util';
class Poke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        this.handleChange = this
            .handleChange
            .bind(this)
        this.submitValues = this
            .submitValues
            .bind(this)
    }

    handleChange(e) {
        console.log(e.target.value);
        this.setState({input: e.target.value})
    }

    submitValues() {}
    componentDidMount() {
        this
            .props
            .dispatch(FetchPokeIfNeed())
    }

    render() {

        const {data} = this.props

        const list = data.map((poke, index) => {

            return (
                <Grid item spacing={8} xs={3} sm={3}>
                    <p key={index}>{poke.name}</p>
                </Grid>
            )
        })
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
                                <p className="header">Poke</p>
                            </Typography>
                        </div>
                    </Grid>
                    <div>
                        Search by Name/ID
                    </div>
                    <Input onChange={this.handleChange} placeholder="here"></Input>
                    <Button onClick={this.submitValues} variant="contained" color="primary">
                        Send
                    </Button>
                </div>
                <Grid container>
                    {list}
                </Grid>
            </Card>
        );
    }
}
const mapStateToProps = state => ({data: state.rootReducer.poke});

export default connect(mapStateToProps)(Poke);
