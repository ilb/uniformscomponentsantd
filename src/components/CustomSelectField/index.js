/* eslint-disable no-unused-vars, no-shadow -- Отключаем eslint no-unused-vars, no-shadow */
import { connectField } from "uniforms";
import { SelectField } from "uniforms-antd";

/**
 * @param {Object} props
 * @param {Array} props.options
 * @param {boolean} props.showSearch
 * @param {Function} props.onSearch
 * @param {string} props.value
 * @param {Function} props.onAfterChange
 * @param {Function} props.onChange
 * @param {Object} props.withEmptyOption
 * @param {Function} props.filterOption
 * @returns {JSX.Element}
 */
const CustomSelectField = ({
  options,
  showSearch,
  onSearch,
  value,
  onAfterChange,
  onChange,
  withEmptyOption = false,
  filterOption = () => true,
  ...props
}) => {
  let emptyOption = null;

  if (withEmptyOption) {
    emptyOption = {
      label: withEmptyOption?.label ?? "Ничего не выбрано",
      value: withEmptyOption.value ?? "",
    };
  }

  return (
    <SelectField
      {...props}
      onChange={(...props) => {
        onChange(...props);
        if (onAfterChange) {
          onAfterChange(...props);
        }
      }}
      showSearch={showSearch}
      options={emptyOption ? [emptyOption, ...options] : options}
      showInlineError
      onSearch={query => onSearch && onSearch(query)}
      filterOption={filterOption}
      value={value}
      name=""
    />
  );
};

export default connectField(CustomSelectField);
/* eslint-enable no-unused-vars, no-shadow -- Возвращаем eslint no-unused-vars, no-shadow */
