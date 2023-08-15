import { connectField } from 'uniforms';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
import styles from './index.module.scss';

const CustomDateField = connectField(
  ({ value, onChange, required, error, label, id, ...props }) => {
    const dateFormat = 'YYYY-MM-DD';

    return (
      <Form.Item required={required} label={label} htmlFor={id} className={styles.dateField}>
        <DatePicker
          showTime={false}
          {...props}
          id={id}
          style={{ width: '100%' }}
          value={value ? moment(value, dateFormat) : undefined}
          onChange={(value) => {
            if (value) {
              value = value.format(dateFormat);
            }
            onChange(value);
          }}
          format="DD.MM.YYYY"
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
