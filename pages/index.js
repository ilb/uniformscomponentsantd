import React, { useState } from 'react';
import { AutoForm } from 'uniforms-antd';
import { ComparisonComponent, createSchemaBridge } from '../src/index';

export default function page() {
  const [fieldText, setFieldText] = useState();

  const comparison = 'test';

  const schema = {
    type: 'object',
    properties: {
      comparisonField: {
        title: 'Сравнение',
        type: 'string',
        maxLength: 10
      }
    }
  };

  return (
    <>
      <AutoForm showInlineError layout="horizontal" schema={createSchemaBridge(schema)}>
        <ComparisonComponent
          valueToCompare={comparison}
          name="comparisonField"
          onChangeCapture={(e) => setFieldText(e.target.value)}
          value={fieldText}
        />
      </AutoForm>
    </>
  );
}
