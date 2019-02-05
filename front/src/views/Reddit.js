import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit} from "../actions/actions";
import Picker from "../components/Picker";
import Posts from "../components/Posts";
import {CircularProgress, Grid} from "@material-ui/core";

import "../assets/index.css";
class Reddit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
        this.updateWindowDimensions = this
            .updateWindowDimensions
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleRefreshClick = this
            .handleRefreshClick
            .bind(this);
    }

    componentDidMount() {
        const {dispatch, selectedSubreddit} = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
            const {dispatch, selectedSubreddit} = this.props;
            dispatch(fetchPostsIfNeeded(selectedSubreddit));
        }
    }

    handleChange(nextSubreddit) {
        this
            .props
            .dispatch(selectSubreddit(nextSubreddit));
        this
            .props
            .dispatch(fetchPostsIfNeeded(nextSubreddit));
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const {dispatch, selectedSubreddit} = this.props;
        dispatch(invalidateSubreddit(selectedSubreddit));
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    render() {
        const {selectedSubreddit, posts, isFetching, lastUpdated} = this.props;
        return (
            <div
                className="container"
                style={{
                maxWidth: this.state.width
            }}>
                <Grid container>
                    <div>
                        <Picker
                            value={selectedSubreddit}
                            onChange={this.handleChange}
                            options={[
                            "leagueOfLegends",
                            "LeagueOfMemes",
                        ]}/>
                        <p>
                            {lastUpdated && (
                                <span>
                                    Último reload em: {new Date(lastUpdated).toLocaleTimeString()}.{" "}
                                </span>
                            )}
                            {!isFetching && (
                                <button onClick={this.handleRefreshClick}>Reload</button>
                            )}
                        </p>
                    </div>

                </Grid>
                <Grid container>
                    <div>
                        {isFetching && posts.length === 0 && <CircularProgress/>}
                        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
                        {posts.length > 0 && (
                            <div 
                            className="content"
                                style={{
                                opacity: isFetching
                                    ? 0.5
                                    : 1,
                                maxWidth: this.state.width
                                
                            }}>
                                <Posts posts={posts}/>
                            </div>
                        )}
                    </div>

                </Grid>

            </div>
        );
    }
}
/**
|--------------------------------------------------
|
| TODO:
| isFetching --- Load a Spinner
|
|--------------------------------------------------
*/

Reddit.propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {selectedSubreddit, postsBySubreddit} = state;
    const {isFetching, lastUpdated, items: posts} = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    };

    return {selectedSubreddit, posts, isFetching, lastUpdated};
}

export default connect(mapStateToProps)(Reddit);