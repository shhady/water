import { createContext, useContext, useReducer } from "react";
import statisticsReducer from "./statisticsReducer";
import { STATISTICS_ACTIONS } from "../actions";
import { api } from "../../api/api";
import { getDateNow } from "../../utils"
import PropTypes from 'prop-types';
import moment from 'moment';
const StatisticsContext = createContext();

const StatisticsProvider = ({ children }) => {
  const initialState = {
    handledAlert: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(statisticsReducer, initialState);
  const setLoading = () => dispatch({ type: STATISTICS_ACTIONS.SET_LOADING });

  const getDailyHandledAlert =  (resIdentifiers, resTriggers) => {
    const date = getDateNow();
    let sumHandledAlert = 0;
    resTriggers.forEach((e) => {
      if (e.updatedAt.split("T")[0] === date && e.status) {
        sumHandledAlert++;
      }
    })
    resIdentifiers.forEach((e) => {
      if (e.updatedAt.split("T")[0] === date && e.status) {
        sumHandledAlert++;
      }
    })

    return sumHandledAlert;
  };


  const getWeeklyHandledAlert = (resIdentifiers, resTriggers) => {

    const now = moment();
    let sumHandledAlert = 0;
    resTriggers.forEach((e) => {
      const input = moment(e.updatedAt);
      const isThisWeek = (now.isoWeek() == input.isoWeek())

      if (isThisWeek && e.status) {
        sumHandledAlert++;
      }
    })

    resIdentifiers.forEach((e) => {
      const input = moment(e.updatedAt);
      const isThisWeek = (now.isoWeek() == input.isoWeek())
      if (isThisWeek && e.status) {
        sumHandledAlert++;
      }
    })

    return sumHandledAlert;
  };


  const getMonthlyHandledAlert =  (resIdentifiers, resTriggers) => {
    
    const now = moment();
    let sumHandledAlert = 0;
    resTriggers.forEach((e) => {
      const input = moment(e.updatedAt);
      const isThisMonth = (now.month() == input.month())
      if (isThisMonth && e.status) {
        sumHandledAlert++;
      }
    })

    resIdentifiers.forEach((e) => {
      const input = moment(e.updatedAt);
      const isThisMonth = (now.month() == input.month())
      if (isThisMonth && e.status) {
        sumHandledAlert++;
      }
    })

    return sumHandledAlert;
  };

  const getYearlyHandledAlert =  (resIdentifiers, resTriggers) => {

    const now = moment();
    let sumHandledAlert = 0;
    resTriggers.forEach((e) => {
      const input = moment(e.updatedAt);
      const isThisYear = (now.year() == input.year())
      if (isThisYear && e.status) {
        sumHandledAlert++;
      }
    })

    resIdentifiers.forEach((e) => {
      const input = moment(e.updatedAt);
      const isThisYear = (now.year() == input.year())
      if (isThisYear && e.status) {
        sumHandledAlert++;
      }
    })

    return sumHandledAlert;
  };


  const getHandledAlert = async (timePeriod) => {
    setLoading();
    const resTriggers = await api.get(`/Triggers`);
    const resIdentifiers = await api.get(`Identifiers`);

    let sumHandledAlert ;
    if (timePeriod === "day") {
      sumHandledAlert = getDailyHandledAlert(resIdentifiers.data, resTriggers.data)
    }
    else if (timePeriod === "week") {
      sumHandledAlert = getWeeklyHandledAlert(resIdentifiers.data, resTriggers.data)
    }
    else if (timePeriod === "month") {
      sumHandledAlert = getMonthlyHandledAlert(resIdentifiers.data, resTriggers.data)
    }
    else if (timePeriod === "year") {
      sumHandledAlert = getYearlyHandledAlert(resIdentifiers.data, resTriggers.data)
    }

    const sumInquiries = resTriggers.data.length + resIdentifiers.data.length
    const res = { inquiries: sumInquiries, handledAlert: sumHandledAlert };
    dispatch({
      type: STATISTICS_ACTIONS.GET_HANDLED_ALERT,
      payload: res,
    });
  };


  return (
    <StatisticsContext.Provider
      value={{
        handledAlert: state.handledAlert,
        loading: state.loading,
        getHandledAlert
      }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};

StatisticsProvider.propTypes = { children: PropTypes.node.isRequired, };

export const useStatisticsContext = () => {
  return useContext(StatisticsContext);
};

export { StatisticsProvider };
