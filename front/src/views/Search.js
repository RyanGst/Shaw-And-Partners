
import React, {Component} from 'react';
import {Formik} from 'formik';
import {actions} from '../actions/actions.js';
import {connect} from 'react-redux';
class Search extends Component {


    render() {
        return (
            <div>
                <Formik
                    initialValues={{name: 'RyanGostosaum'}}
                    onSubmit={(values, {setSubmitting}) => {
                        this.props.loadUserData(values.name);
                        setSubmitting(false);
                    }}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset, 
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name">GitHub name</label>
                                <br/>
                                <input
                                    id="name"
                                    placeholder="Enter your username"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    // In case, if the user didn't input the data to the search field
                                    // then the border of the field would be red
                                    className={errors.name && touched.name ? 'error' : ''}
                                />

                                {errors.name && errors.touched && <div className="input-feedback">{errors.name}</div>}

                                <button
                                    type="button"
                                    className="outline"
                                    onClick={handleReset}
                                    disabled={!dirty || isSubmitting}
                                >
                                    Reset
                                </button>
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        );
                    }}
                </Formik>
                <div 
                onClick={()=> console.log(this.props.user)}
                className="output">
                aa
                    {this.props.user.login}
                </div>
            </div>
        );
    }
}
//State
const mapStateToProps = (state) => {
    return {
        user: state.user
    };
    
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadUserData: name => dispatch(actions.loadUserData(name))
    }
};
const SearchScreen = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchScreen;