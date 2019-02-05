import { combineReducers } from "redux";
import {
  SELECT_USER,
  INVALIDATE_USER,
  REQUEST_USER,
  RECEIVE_USER
} from "../actions/actions";

function selectedUser(state = "RyanGostosaum", action) {
  switch (action.type) {
    case SELECT_USER:
      return action.user;
    default:
      return state;
  }
}

function users(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_USER:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      });
    default:
      return state;
  }
}


function postsByUser(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_USER:
    case RECEIVE_USER:
    case REQUEST_USER:
      return Object.assign({}, state, {
        [action.user]: posts(state[action.user], action)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsByUser,
  selectedUser
});

export default rootReducer;