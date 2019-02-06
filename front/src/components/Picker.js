import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    FormControl,
    TextField
} from '@material-ui/core';

import "../assets/index.css";


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
                    <TextField
                        id="outlined-email-input"
                        label="User"
                        onChange={e => onChange(e.target.value)}
                        margin="normal"
                        variant="outlined"/>
                        {
                            /*
                             <InputLabel
                        htmlFor="age-customized-select"
                        className={classes.bootstrapFormLabel}>
                        Reedit
                    </InputLabel>
                    <Select
                        value={value}
                        
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
                            */
                        }
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