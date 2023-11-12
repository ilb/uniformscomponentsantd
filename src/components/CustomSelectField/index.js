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
  filterOption = () => true,
  ...props
}) => {
  let emptyOption = null;
  if (withEmptyOption) {
    emptyOption = {
      label: withEmptyOption?.label ?? 'Ничего не выбрано',
      value: withEmptyOption.value ?? ''
    };
  }

  return (
    <SelectField
      {...props}
      onChange={(...props) => {
        onChange(...props);
        onAfterChange && onAfterChange(...props);
      }}
      showSearch={showSearch}
      options={[...([emptyOption] || []), ...options]}
      showInlineError
      onSearch={(query) => onSearch && onSearch(query)}
      filterOption={filterOption}
      value={value}
      name=""
    />
  );
};
export default connectField(CustomSelectField);
