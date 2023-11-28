import { connectField } from 'uniforms';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
import styles from './index.module.scss';
import IMask from 'imask';

const CustomDateField = connectField(
  ({ value, onChange, required, error, label, id, dateFormat = 'DD.MM.YYYY', ...props }) => {
    const masked = IMask.createMask({ mask: Date });

    const maskValue = (event) => {
      if (countDots(event.target.value) === 2) {
        return;
      }

      const text = event.target;

      if (isNumber(event.key) && [2, 5].includes((event.target.value + event.key).length)) {
        let string = text.value;
        let start = text.selectionStart;
        let end = text.selectionEnd + 1;
        text.value = string.slice(0, end) + event.key + '.';
        text.focus();
        let position = start;
        text.setSelectionRange(position, position);
        event.target.selectionStart = event.target.selectionEnd = event.target.value.length + 1;
        event.preventDefault();
      } else {
        masked.resolve(event.target.value);
        event.target.value = masked.value;
      }
    };

    function isNumber(str) {
      return /\d/.test(str);
    }

    const countDots = (str) => {
      return str.split('').filter((c) => c === '.').length;
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
              value = new Date(value.format('YYYY-MM-DD'));
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
