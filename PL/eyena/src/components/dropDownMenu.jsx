export function DropDownMenu({ value, name, changeFun, options }) {
  return (
    <select
      value={value}
      name={name}
      onChange={changeFun}
      className="border-0 font-semibold outline-none cursor-pointer mx-2  p-2 rounded-lg capitalize"
    >
      <option className=" text-gray-500" value={""}>
        {name}
      </option>
      {options.map((option, index) => {
        return <option key={index}>{option}</option>;
      })}
    </select>
  );
}
