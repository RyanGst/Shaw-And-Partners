import React, {Component} from "react";
import PropTypes from "prop-types";

import "../assets/index.css";
import {List} from "@material-ui/core";
export default class Posts extends Component {
    render() {

        const data = this.props.names
        return (
            <ul>
                {[data].map((post, i) => (
                    <li key={i}>
                        <p onClick={() => console.log('aaaa')}>{post}</p>
                        <a target="blank" href={post.url}>{post.url}</a>

                    </li>
                ))}
            </ul>
        );
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
};