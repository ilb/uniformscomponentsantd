import { connectField } from 'uniforms';
import { AutoField } from 'uniforms-antd';

import CustomPatternField from '../CustomPatternField';
import CustomNumericField from '../CustomNumericField';
import CustomDateField from '../CustomDateField';
import CustomInputField from '../CustomInputField';

/**
 * Кастомное поле
 * todo нужно допиливать
 * @param {} props
 * @returns {('react').ReactComponentElement}
 */
const CustomField = (props) => {
  let Field = AutoField;
  if (props.field?.uniforms?.format) {
    Field = CustomPatternField;
  }
  if (props.field?.uniforms?.pattern) {
    Field = CustomInputField;
  }
  if (props.field?.format === 'date') {
    Field = CustomDateField;
  }
  if (props.field?.format === 'number') {
    Field = CustomNumericField;
  }

  return (
    <Field
      {...props}
      onInput={(event) => {
        if (props.capitalize) {
          let target = event.target;
          let p = target.selectionStart;
          target.value = target.value.toUpperCase();
          target.setSelectionRange(p, p);
        }
        if (props.field?.uniforms?.max && Number(event.target.value) > props.field?.uniforms?.max) {
          event.target.value = props.field?.uniforms.max;
        }
        if (props.field?.uniforms?.min && Number(event.target.value) < props.field?.uniforms?.min) {
          event.target.value = props.field?.uniforms.min;
        }
        props.onInput && props.onInput(event.target.value);
      }}
      placeholder={props?.field?.uniforms?.placeholder || ''}
      name=""
    />
  );
};

const CustomAutoField = connectField(CustomField);
export default CustomAutoField;
