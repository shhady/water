import {MIN_LEN_MEANING, MIN_LEN_NUMBER} from "../constants"



const validateNumber= (number) => {
  return number< MIN_LEN_NUMBER;
};


const validateMeaning= (meaning) => {
  return meaning.length< MIN_LEN_MEANING;
};

/*
*
* Get the current date in the following format: yyyy-mm-dd
*/
const getDateNow = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return  `${year}-${month>10? month: `0${month}`}-${day>10? day: `0${day}`}`;
}


export {  validateNumber, validateMeaning, getDateNow };
