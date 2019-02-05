import React, {Component} from "react";
import PropTypes from "prop-types";

import "../assets/index.css";
import {List} from "@material-ui/core";
export default class Posts extends Component {
    render() {
        return (
            <ul>
                {this
                    .props
                    .posts
                    .map((post, i) => (
                        <List key={i}>
                            <p onClick={() => console.log(JSON.stringify(post))}>{post.title}</p>
                            <a target="blank" href={post.url}>
                                <i className="fas fa-link"></i>
                            </a>

                        </List>
                    ))}
            </ul>
        );
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
};