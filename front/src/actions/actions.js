import fetch from 'cross-fetch'
//Reddit Fetch
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

//GitHub Fetch
export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'
export const SELECT_USER = 'SELECT_USER'
export const INVALIDATE_USER = 'INVALIDATE_USER'

//Reddit
export function selectSubreddit(subreddit) {
    return {type: SELECT_SUBREDDIT, subreddit}
}

//Git
export function selectUser(user) {
    return {type: SELECT_USER, user}
}

//Reddit
export function invalidateSubreddit(subreddit) {
    return {type: INVALIDATE_SUBREDDIT, subreddit}
}

//Git
export function invalidateUser(user) {
    return {type: INVALIDATE_USER, user}
}

//Reddit
function requestPosts(subreddit) {
    return {type: REQUEST_POSTS, subreddit}
}

//Git
function requestUser(user) {
    return {type: REQUEST_USER, user}
}

function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json
            .data
            .children
            .map(child => child.data),
        receivedAt: Date.now()
    }
}

//Git
function receiveUser(user, json) {
    return {
        type: RECEIVE_USER,
        user,
        posts: json
            .data
            .children
            .map(child => child.data),
        receivedAt: Date.now()
    }
}

//Reddit
function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit))
        //Any domain should be here
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(subreddit, json)))
    }
}

//Git
function fetchUser(user) {
    return dispatch => {
        dispatch(requestUser(user))
        //Any domain should be here
        return fetch(`https://api.github.com/users/${user}`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(user, json)))
    }
}
//TODO:
function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}


export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        }
    }
}