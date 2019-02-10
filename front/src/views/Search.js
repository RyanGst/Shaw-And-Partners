import React, {Component} from 'react';
import {fetchUsers} from '../actions/actions.js';
import {connect} from 'react-redux';
class Search extends Component {

    componentDidMount() {
        this
            .props
            .dispatch(fetchUsers());
    }
    render() {
        const {error, loading, users} = this.props;
        console.log(users);
        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <ul>
                {users.map(u => <li>{u.login}</li>)}
            </ul>
        );
    }
}
const mapStateToProps = state => ({users: state.rootReducer.items});

export default connect(mapStateToProps)(Search);
