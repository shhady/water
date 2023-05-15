import {MIN_LEN_MEANING, MIN_LEN_NUMBER} from "../constants"



const validateNumber= (number) => {
  return number< MIN_LEN_NUMBER;
};


const validateMeaning= (meaning) => {
  return meaning.length< MIN_LEN_MEANING;
};

export {  validateNumber, validateMeaning };
