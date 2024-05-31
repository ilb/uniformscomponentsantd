/* eslint-disable no-unused-vars, n/no-missing-import -- Отключаем eslint no-unused-vars и n/no-missing-import */
import { useEffect, useState } from "react";

import CustomAutoField from "../CustomAutoField";

/**
 * @param {Object} root0
 * @param {Array} root0.options
 * @param {boolean} root0.showSearch
 * @returns {JSX.Element}
 */
const Index = ({ options, showSearch = true, ...props }) => {
  const [_options, setOptions] = useState(options);

  useEffect(() => {
    setOptions(options);
  }, [options]);

  return (
    <CustomAutoField
      {...props}
      onSearch={value => {
        const newValue = value.trim();

        setOptions([...options, ...(newValue ? [{ newValue, label: newValue }] : [])]);
        if (props.onSearch) {
          props.onSearch(newValue);
        }
      }}
      showSearch={showSearch}
      options={_options}
    />
  );
};

export default Index;
/* eslint-enable no-unused-vars, n/no-missing-import -- Возвращаем eslint no-unused-vars и n/no-missing-import */
