/* eslint-disable no-unused-vars, no-param-reassign -- Отключаем eslint no-unused-vars и no-param-reassign */
import { useEffect, useState } from "react";
import { connectField } from "uniforms";
import { SelectField } from "uniforms-antd";

/**
 * @param {Object} root0
 * @param {Function} root0.resource
 * @param {Object} root0.filters
 * @param {Function} root0.clientFilter
 * @param {Function} root0.onSelect
 * @param {Function} root0.onChange
 * @param {Function} root0.onSetOptions
 * @param {string} root0.value
 * @param {boolean} root0.serverSearch
 * @param {boolean} root0.showSearch
 * @returns {JSX.Element}
 */
const DropdownAntd = ({
  resource,
  filters = null,
  clientFilter = null,
  onSelect,
  onChange,
  onSetOptions,
  value,
  serverSearch = false,
  showSearch = false,
  ...params
}) => {
  const [defaultValue] = useState(value);
  const [options, setOptions] = useState([]);
  const [prevFilters, setPrevFilters] = useState(null);
  const [query, setQuery] = useState("");

  /**
   * @param {Object} newFilters
   * @returns {Promise<Array>}
   */
  const getOptions = async newFilters => resource(newFilters);

  /**
   * @returns {Promise<void>}
   */
  const updateOptions = async () => {
    getOptions(filters).then(newOptions => {
      setOptions(newOptions);
      if (onSetOptions) {
        onSetOptions(newOptions);
      }
    });
  };

  useEffect(() => {
    if (resource && !filters) {
      updateOptions().catch(console.error);
    }
  }, [resource]);

  /**
   * @returns {boolean}
   */
  const filtersHasBeenChanged = () => JSON.stringify(filters) !== JSON.stringify(prevFilters);

  /**
   * @returns {boolean}
   */
  const filtersIsApplied = () => !!filters && !!Object.values(filters).filter(filter => filter !== null).length;

  useEffect(() => {
    filters = { ...filters, query };

    if (filters && filtersHasBeenChanged() && filtersIsApplied()) {
      updateOptions().catch(console.error);
    }
  }, [filters, query]);

  useEffect(() => {
    setPrevFilters({ ...filters, query });

    if (!options?.find(option => option.value === value) && !defaultValue) {
      onChange(null);
    }
  }, [options]);

  /**
   * @param {string} input
   * @param {Object} option
   * @returns {boolean}
   */
  const filterByInput = (input, option) => option.text.toLowerCase().includes(input.toLowerCase().trim());

  return (
    <div className="vehiclecomponent-dropdown">
      {params.displayType === "text" && (
        <>
          <span style={{ float: "left" }}>{params.label}:</span>
          <span style={{ float: "right", fontWeight: 600 }}>{value}</span>
        </>
      )}
      {params.displayType !== "text" && (
        <SelectField
          showSearch={showSearch || serverSearch}
          options={options}
          onChange={newValue => {
            onChange(newValue);
            if (onSelect) {
              onSelect(
                newValue,
                options.find(option => option.value === newValue),
              );
            }
          }}
          onDeselect={() => {
            onChange(null);
          }}
          onSearch={newQuery => {
            if (serverSearch) {
              setQuery(newQuery || "");
            }
          }}
          filterOption={(input, option) => {
            if (serverSearch) {
              return true;
            }

            return filterByInput(input, option) && (clientFilter ? clientFilter() : true);
          }}
          {...params}
          name=""
        />
      )}
    </div>
  );
};

export default connectField(DropdownAntd);
/* eslint-enable no-unused-vars, no-param-reassign -- Возвращаем eslint no-unused-vars и no-param-reassign */
