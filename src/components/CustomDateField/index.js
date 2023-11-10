import { connectField } from 'uniforms';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
import styles from './index.module.scss';
import IMask from 'imask';

const CustomDateField = connectField(
  ({ value, onChange, required, error, label, id, dateFormat = 'DD.MM.YYYY', ...props }) => {
    const masked = IMask.createMask({ mask: Date });

    const maskValue = (event) => {
      masked.resolve(event.target.value);
      event.target.value = masked.value;
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
