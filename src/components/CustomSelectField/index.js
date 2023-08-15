import { connectField } from 'uniforms';
import { SelectField } from 'uniforms-antd';

const CustomSelectField = ({ options, showSearch, onSearch, value }) => {
  return (
    <>
      <SelectField
        showSearch={showSearch}
        options={options}
        showInlineError
        onSearch={(query) => onSearch && onSearch(query)}
        filterOption={() => true}
        value={value}
        name=""
      />
    </>
  );
};

export default connectField(CustomSelectField);
