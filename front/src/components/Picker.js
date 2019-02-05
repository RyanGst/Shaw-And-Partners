import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    withStyles,
    InputBase
} from '@material-ui/core';

import "../assets/index.css";

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
    },
    margin: {
        margin: theme.spacing.unit
    }
}))(InputBase);

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    bootstrapFormLabel: {
        fontSize: 18
    }
});
class Picker extends Component {
    render() {
        const {value, onChange, options} = this.props
        const classes = styles
        return (
            <span>
                <h1
                    className="header"
                    style={{
                    textAlign: 'center',
                    position: 'relative'
                }}>{value}</h1>
                <FormControl >
                    <InputLabel
                        htmlFor="age-customized-select"
                        className={classes.bootstrapFormLabel}>
                        Reedit
                    </InputLabel>
                    <Select
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        input={< BootstrapInput name = "age" id = "age-customized-select" />}>
                        <MenuItem value="">
                            <em>---</em>
                        </MenuItem>
                        {options.map(option => (
                            <MenuItem value={option} key={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </span>
        )
    }
}

Picker.propTypes = {
    options: PropTypes
        .arrayOf(PropTypes.string.isRequired)
        .isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Picker;