import { getItem } from "../services/localStorageService";

export const DEFAULT_LANGUAGE = "he";
export let language = getItem("language") || DEFAULT_LANGUAGE; //set hebrew language by default
export const BASE_URL_SERVER = "http://localhost:5000";
export const MS_1000 = 1000;
export const DEFAULT_TIME_ALERT = 3;
export const SUCCESS_TIME_ALERT = 1.5;
export const DEFAULT_TIME_WAITING = 1.2;
export const DANGER_TIME_ALERT = 2.5;
export const MIN_LEN_NUMBER = 2;
export const MIN_LEN_MEANING = 2;
export const SUCCESS = true;

export const AH = true;
