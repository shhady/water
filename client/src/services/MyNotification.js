/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import addNotification from 'react-push-notification';


/**
 * A function that creates a notification.       
 * @param {string} color - the color of the notification.       
 * @param {string} title - the title of the notification.       
 * @param {string} message - the message of the notification.       
 * @param {boolean} [native=false] - whether or not to use the native notification.       
 * @returns None       
 */
export default function MyNotification(color, title, message, native = false) {

  if (native) {

    Notification.requestPermission();
    navigator.serviceWorker.ready.then(function (registration) {
      registration.active.postMessage({
        type: 'push-notofications',
        title: title,
        body: message
      })
    });
  }
  else
    addNotification({
      title: title,
      message: message,
      theme: color,
      duration: 6000,
      native: false,
      closeButton:'סגירה',
      backgroundTop:'var(--blue)',
      backgroundBottom:(color==='light')?'var(--green)':undefined,
    }
    )

}
