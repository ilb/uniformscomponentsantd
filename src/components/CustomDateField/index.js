/* eslint-disable no-unused-vars, no-param-reassign, no-undefined -- Отключаем eslint no-unused-vars, no-param-reassign, no-undefined */
import { DatePicker, Form } from "antd";
import IMask from "imask";
import moment from "moment";
import { connectField } from "uniforms";

import styles from "./index.module.scss";

const CustomDateField = connectField(
  ({ value, onChange, required, error, label, id, dateFormat = "DD.MM.YYYY", ...props }) => {
    const masked = IMask.createMask({ mask: Date });

    /**
     * @param {string} str
     * @returns {boolean}
     */
    function isNumber(str) {
      return /\d/u.test(str);
    }

    /**
     * @param {string} str
     * @returns {number}
     */
    const countDots = str => str.split("").filter(c => c === ".").length;

    /**
     * @param {Event} event
     * @returns {void}
     */
    const maskValue = event => {
      if (countDots(event.target.value) === 2) {
        return;
      }

      const text = event.target;

      if (isNumber(event.key) && [2, 5].includes((event.target.value + event.key).length)) {
        const string = text.value;
        const start = text.selectionStart;
        const end = text.selectionEnd + 1;

        text.value = `${string.slice(0, end) + event.key}.`;
        text.focus();
        const position = start;

        text.setSelectionRange(position, position);
        event.target.selectionStart = event.target.selectionEnd = event.target.value.length + 1;
        event.preventDefault();
      } else {
        masked.resolve(event.target.value);
        event.target.value = masked.value;
      }
    };

    return (
      <Form.Item required={required} label={label} htmlFor={id} className={styles.dateField} {...props}>
        <DatePicker
          showTime={false}
          {...props}
          onKeyDown={maskValue}
          id={id}
          style={{ width: "100%" }}
          value={value ? moment.utc(value) : undefined}
          onChange={newValue => {
            if (newValue) {
              newValue = new Date(newValue.format("YYYY-MM-DD"));
            }
            onChange(newValue);
          }}
          format={dateFormat}
          className={props.validateStatus && styles.input}
        />
        {error && (
          <div
            className="ui red fluid basic pointing label"
            style={{ color: "#ff4d4f", fontSize: "14px" }}>
            {error.message}
          </div>
        )}
        {props.help && (
          <>
            <p className={styles.helpText}>{props.help}</p>
            {/* <span className={styles.warningIcon}>{getWarningIcon()}</span>*/}
          </>
        )}
      </Form.Item>
    );
  },
);

export default CustomDateField;
/* eslint-enable no-unused-vars, no-param-reassign, no-undefined -- Возвращаем eslint no-unused-vars, no-param-reassign, no-undefined */
