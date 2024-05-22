/* eslint-disable camelcase -- Отключаем eslint camelcase */
import Ajv from "ajv";
import ajv_errors from "ajv-errors";

const ajv = new Ajv({ allErrors: true, jsonPointers: true });

ajv_errors(ajv);

ajv.addKeyword("maskedNumberLengthStrict", {
  type: "string",
  errors: true,
  /**
   * @param {number} length
   * @param {string} validateData
   * @returns {boolean}
   */
  validate: function validate(length, validateData) {
    validate.errors = [
      {
        keyword: "maskedNumberLength",
        message: `должно быть длинной ${length} символов`,
        params: { keyword: "maskedNumberLength" },
      },
    ];

    const numsLength = validateData.replace(/\D/gu, "").length;

    return numsLength === length;
  },
});

ajv.addKeyword("isNotEmpty", {
  type: "string",
  errors: true,
  /**
   * @param {Object} schema
   * @param {string} validateData
   * @param {Object} parent
   * @param {string} key
   * @returns {boolean}
   */
  validate: function validate(schema, validateData, parent, key) {
    validate.errors = [
      {
        keyword: "isNotEmpty",
        message: `должно иметь обязательное поле ${key}`,
        params: { keyword: "isNotEmpty" },
      },
    ];

    return typeof validateData === "string" && validateData.trim() !== "";
  },
});

export default ajv;
/* eslint-enable camelcase -- Возвращаем eslint camelcase */
