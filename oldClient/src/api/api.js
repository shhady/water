import axios from 'axios';

import { BASE_URL_SERVER, SUCCESS } from "../constants";

const apiPost = (query, data) => {
  fetch(`${BASE_URL_SERVER}/${query}/`, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" 
    }).then((res) => {
    if (res.ok) {
      return SUCCESS;
    }
  });
};




// import {BASE_URL_SERVER} from "../constants"


const api = axios.create({
  baseURL: BASE_URL_SERVER,
});

const apiProtected = axios.create({
  BASE_URL_SERVER, 
    withCredentials: true, 
});

const auth = axios.create({
  baseURL:BASE_URL_SERVER
  
});


export { api, apiProtected, auth, apiPost };
