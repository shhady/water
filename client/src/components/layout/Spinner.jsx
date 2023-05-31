import spinner from '../../assets/spinner.gif';
import TableLookUps from "../../constants/TableLookUps"
const Spinner = () => (
  <>
    <img
      src={spinner}
      alt={TableLookUps("LOADING_ALT")}
      className="spinner"
    />
  </>
);

export default Spinner;
