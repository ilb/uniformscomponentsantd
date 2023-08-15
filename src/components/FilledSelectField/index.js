import { SelectField } from 'uniforms-antd';
import { useEffect, useState } from 'react';

const Index = ({ options, showSearch = true, ...props }) => {
  const [_options, setOptions] = useState(options);

  useEffect(() => {
    setOptions(options);
  }, [options]);

  return (
    <SelectField
      {...props}
      onSearch={(value) => {
        value = value.trim();

        setOptions([...options, ...(value ? [{ value, label: value }] : [])]);
        props.onSearch && props.onSearch(value);
      }}
      showSearch={showSearch}
      options={_options}
    />
  );
};

export default Index;
