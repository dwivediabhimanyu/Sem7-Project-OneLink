import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADD_LINK_SUCCESS,
  DELETE_LINK_SUCCESS
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
          isLoading: false,
          user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      window.location.reload(false);
      return {
        ...state,
        ...action.payload,
          isAuthenticated: true,
          isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL: {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    }
  case ADD_LINK_SUCCESS: {
    return {
      ...state,
      user: {
        social: [action.payload[0], ...state.user.social]
      }
    };
  }
  case DELETE_LINK_SUCCESS: {
    return {
      ...state,
      user: {
        social: state.user.social.filter(item => item.name !== action.payload.name)
      }
    };
  }
  default:
    return state;
  }
}
