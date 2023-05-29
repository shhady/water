import spinner from '../../assets/spinner.gif';
import {LOADING_ALT} from "../../constants"
const Spinner = () => (
  <>
    <img
      src={spinner}
      alt={LOADING_ALT}
      className="spinner"
    />
  </>
);

export default Spinner;
