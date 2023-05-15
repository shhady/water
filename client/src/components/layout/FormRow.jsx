const FormRow = ({ type, name, maxLength, value, placeholder, handleChange, handleBlur, error, message }) => {
  return (
    <>

      <div className={`form-row ${error && 'error'}`}>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          maxLength = {maxLength}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${error && 'error'}`}
        />
      </div>
      {error && <small>{message}</small>}
    </>
  );
};
export default FormRow;
