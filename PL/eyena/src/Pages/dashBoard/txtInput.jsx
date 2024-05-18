import PropTypes from "prop-types";
function Input({
  label = "",
  name = "",
  type = "text",
  style = "basic",
  placeholder = "",
  inputProps = {},
}) {
  const styles = {
    basic: {
      input:
        "w-52 rounded-md py-3 pl-2 text-neutral-600 shadow-md shadow-gray-100 outline-primary ring-1 ring-gray-300",
      label: "text-base font-medium text-neutral-800",
      error: "px-1 text-sm font-medium text-primary",
    },
  };
  return (
    <div className="w-full">
      <div className="relative w-full flex items-center gap-x-2 justify-between">
        <label className={styles[style].label}>{label}</label>
        <input
          type={type}
          defaultValue={placeholder}
          name={name}
          className={styles[style].input}
          {...inputProps}
        />
      </div>
    </div>
  );
}
Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  inputProps: PropTypes.object,
  style: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};
export default Input;
