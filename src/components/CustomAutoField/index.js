/* eslint-disable no-unused-vars, n/no-missing-import, no-undefined -- Отключаем eslint no-unused-vars, n/no-missing-import, no-undefined */
import { connectField } from "uniforms";
import { AutoField } from "uniforms-antd";

import CustomDateField from "../CustomDateField";
import CustomInputField from "../CustomInputField";
import CustomNumericField from "../CustomNumericField";
import CustomPatternField from "../CustomPatternField";
import CustomVehiclePassportField from "../CustomVehiclePassportField";
import CustomNumberField from "../CustomNumberField";

/**
 * Кастомное поле
 * todo нужно допиливать
 * @param {Object} props
 * @returns {('react').ReactComponentElement}
 */
const CustomField = props => {
  let Field = AutoField;

  if (props.field?.uniforms?.format) {
    Field = CustomPatternField;
  }
  if (props.field?.uniforms?.thousandSeparator) {
    Field = CustomNumberField;
  }
  if (props.field?.uniforms?.pattern) {
    Field = CustomInputField;
  }
  if (props.field?.format === "date") {
    Field = CustomDateField;
  }
  if (props.field?.format === "number") {
    Field = CustomNumericField;
  }
  if (props.isEpts !== undefined) {
    Field = CustomVehiclePassportField;
  }

  return (
    <Field
      {...props}
      onInput={event => {
        if (props.capitalize) {
          const target = event.target;
          const p = target.selectionStart;

          target.value = target.value.toUpperCase();
          target.setSelectionRange(p, p);
        }
        if (props.field?.uniforms?.max && Number(event.target.value) > props.field?.uniforms?.max) {
          event.target.value = props.field?.uniforms.max;
        }
        if (props.field?.uniforms?.min && Number(event.target.value) < props.field?.uniforms?.min) {
          event.target.value = props.field?.uniforms.min;
        }
        if (props.onInput) {
          props.onInput(event.target.value);
        }
      }}
      placeholder={props?.field?.uniforms?.placeholder || ""}
      name=""
    />
  );
};

const CustomAutoField = connectField(CustomField);

export default CustomAutoField;
/* eslint-enable no-unused-vars, n/no-missing-import, no-undefined -- Возвращаем eslint no-unused-vars, n/no-missing-import, no-undefined */
