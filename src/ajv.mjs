import Ajv from 'ajv';

import ajv_errors from 'ajv-errors';

const ajv = new Ajv({ allErrors: true, jsonPointers: true });
ajv_errors(ajv);

ajv.addKeyword('maskedNumberLengthStrict', {
  type: 'string',
  errors: true,
  validate: function validate(length, data) {
    validate.errors = [
      {
        keyword: 'maskedNumberLength',
        message: 'должно быть длинной ' + length + ' символов',
        params: { keyword: 'maskedNumberLength' }
      }
    ];

    const numsLength = data.replace(/\D/g, '').length;

    return numsLength === length;
  }
});

ajv.addKeyword('isNotEmpty', {
  type: 'string',
  errors: true,
  validate: function validate(schema, data, parent, key) {
    validate.errors = [
      {
        keyword: 'isNotEmpty',
        message: 'должно иметь обязательное поле ' + key,
        params: { keyword: 'isNotEmpty' }
      }
    ];

    return typeof data === 'string' && data.trim() !== '';
  }
});

export default ajv;
