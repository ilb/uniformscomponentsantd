import { connectField } from 'uniforms';
import { SelectField } from 'uniforms-antd';

const CustomSelectField = ({
  options,
  showSearch,
  onSearch,
  value,
  onAfterChange,
  onChange,
  withEmptyOption = false,
  ...props
}) => {
  if (withEmptyOption) {
    options.unshift({
      label: withEmptyOption?.label ?? 'Ничего не выбрано',
      value: withEmptyOption.value ?? ''
    });
  }

  return (
    <SelectField
      {...props}
      onChange={(...props) => {
        onChange(...props);
        onAfterChange && onAfterChange(...props);
      }}
      showSearch={showSearch}
      options={options}
      showInlineError
      onSearch={(query) => onSearch && onSearch(query)}
      filterOption={() => true}
      value={value}
      name=""
    />
  );
};
export default connectField(CustomSelectField);
