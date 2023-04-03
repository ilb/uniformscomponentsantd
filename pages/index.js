import React, { useState } from 'react';
import { AutoForm, SubmitField, AutoField } from 'uniforms-antd';
import { ComparisonComponent, createSchemaBridge } from '../src/index';

export default function page() {
  const schema = {
    type: 'object',
    properties: {
      login: { title: 'Логин', type: 'string', isNotEmpty: true },
      name: { title: 'Имя', type: 'string', isNotEmpty: true },
      comparisonField: {
        title: 'Сравнение с test',
        type: 'string'
      },
      password: { title: 'Пароль', type: 'string', isNotEmpty: true }
    }
  };

  return (
    <>
      <AutoForm
        showInlineError
        layout="horizontal"
        schema={createSchemaBridge(schema)}
        onSubmit={(data) => alert(JSON.stringify(data))}>
        <AutoField name="login" />
        <AutoField name="name" />
        <ComparisonComponent
          valueToCompare={'test'}
          name="comparisonField"
          getValue={(value) => console.log('Получено с поля: ' + value)}
          value={'text'}
        />
        <AutoField name="password" type="password" />
        <SubmitField value="Войти" />
      </AutoForm>
    </>
  );
}
