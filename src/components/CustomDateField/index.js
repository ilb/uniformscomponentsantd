import { connectField } from 'uniforms';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
import styles from './index.module.scss';
import { useState } from 'react';

const CustomDateField = connectField(
  ({ value, onChange, required, error, label, id, dateFormat = 'DD.MM.YYYY', ...props }) => {
    const [text, setText] = useState("");

    const maskValue = (event) => {
      let input = event.target;

      if (event.key !== 'Backspace') {
        const newText = text.concat(event.key);
        setText(newText);
      }

      let inputValue = text.replace(/\D/g, ''); // Удаляем все символы, кроме цифр
      let masked = inputValue;

      if (inputValue.length >= 2) {
        masked = inputValue.slice(0, 2) + '.' + inputValue.slice(2);
      }

      if (inputValue.length >= 4) {
        masked = inputValue.slice(0, 2) + '.' + inputValue.slice(2, 4) + '.' + inputValue.slice(4);
      }

      input.value = masked;
    };

    return (
      <Form.Item required={required} label={label} htmlFor={id} className={styles.dateField}>
        <DatePicker
          showTime={false}
          {...props}
          onKeyDown={maskValue}
          id={id}
          style={{ width: '100%' }}
          value={value ? moment.utc(value) : undefined}
          onChange={(value) => {
            if (value) {
              value = value.toISOString();
            }
            onChange(value);
          }}
          format={dateFormat}
          className={props.validateStatus && styles.input}
        />
        {error && (
          <div
            className="ui red fluid basic pointing label"
            style={{ color: '#ff4d4f', fontSize: '14px' }}>
            {error.message}
          </div>
        )}
        {props.help && (
          <>
            <p className={styles.helpText}>{props.help}</p>
            {/*<span className={styles.warningIcon}>{getWarningIcon()}</span>*/}
          </>
        )}
      </Form.Item>
    );
  }
);

export default CustomDateField;
