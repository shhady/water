/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import MyNotification from "./MyNotification";

/**
 * @function FatchDataApi makes a server request and runs callback function on the response
 * @param {string} path server API path
 * @param {['GET','SET','POST','DELETE','PUT']} method request method
 * @param {JWTtoken} accessToken JWT accessToken for server authorization
 * @param {Function} callback callback to send response to
 * @param {JSON} argument Optional JSON with following keys
 * @param {*} argument @key payload : data in the request body
 * @param {[]} argument @key successCodes:  array of accepteded code for running callback on response
 * @param {String} argument @key errorMsgTitle: error message title to be displayed on failure
 * @param {Function} argument @key onReject: Function Callback to run when response Error or 404, default :  (e) => { console.error(e.msg) } 
 */
export default async function FatchDataApi(path, method ='GET', accessToken, callback = ()=>{}, argument ={}) {


  let args = { payload: {}, errorMsgTitle: "שגיאה בחיבור לשרת", successCodes: [200, 201], 
  onReject: (e) => { 
    console.error(e);
    MyNotification("red", args.errorMsgTitle, `${e.msg ? e.msg : "חיבור לשרת נכשל"} `);
} }
  if (argument)
    args = { ...args, ...argument }

  const { REACT_APP_SERVER } = process.env
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      // JWT Authentication  
      Authorization: `Bearer ${accessToken}`,
    },
  }
  if (method !== 'GET' && method !== 'HEAD')
    options.body = JSON.stringify(args.payload)
  try {
    const response = await fetch(`${REACT_APP_SERVER}/${path}`, options)
    const data = await response.json()

    if (args.successCodes.includes(response.status)) {
      callback(data)
      return new Promise((resolve)=>{resolve(data)})
    }
    else {
      // MyNotification("red", args.errorMsgTitle, `${data.msg} `)
      args.onReject(data)
      return new Promise((resolve,reject)=>{reject(data)})
    }
  }
  catch (error) {
    args.onReject(error)
    return new Promise((resolve,reject)=>{reject(error)})
  }
}

