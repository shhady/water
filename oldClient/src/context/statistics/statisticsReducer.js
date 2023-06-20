/* eslint-disable import/no-anonymous-default-export */
import {    STATISTICS_ACTIONS } from '../actions';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case STATISTICS_ACTIONS.GET_HANDLED_ALERT:
      return {
        ...state,
        handledAlert: payload,
        loading: false
      };

      case STATISTICS_ACTIONS.SET_LOADING:
        return {
          ...state,
          loading: true
        };
    
    default:
      return state;
  }
};