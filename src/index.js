import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import ajv from './ajv.mjs';
import localize from 'ajv-i18n';
import ErrorFormatter from './ErrorFormatter.mjs';

export { default as ComparisonComponent } from './components/ComparisonComponent';
export { default as Dropdown } from './components/DropdownAntd';

export { default as CustomAutoField } from './components/CustomAutoField';
export { default as CustomDateField } from './components/CustomDateField';
export { default as CustomNumericField } from './components/CustomNumericField';
export { default as CustomPatternField } from './components/CustomPatternField';
export { default as CustomSelectField } from './components/CustomSelectField';
export { default as FilledSelectField } from './components/FilledSelectField';

const createValidator = (schema, additionalValidator) => {
  const validator = ajv.compile(schema);

  return (model) => {
    let errors = [];

    validator(model);

    if (validator.errors && validator.errors.length) {
      errors = validator.errors;
    }

    if (additionalValidator) {
      errors = errors.concat(additionalValidator(model));
    }

    if (errors.length) {
      localize.ru(errors);
      return { details: ErrorFormatter.make(errors, schema) };
    }
  };
};

export const createSchemaBridge = (schema, additionalValidator) => {
  const schemaValidator = createValidator(schema, additionalValidator);

  return new JSONSchemaBridge(schema, schemaValidator);
};
