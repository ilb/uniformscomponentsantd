/* eslint-disable prettier/prettier */
import React from 'react';
import { AutoForm, SubmitField, AutoField } from 'uniforms-antd';
import { ComparisonComponent, createSchemaBridge } from '../src/index';
import DropdownAntd from '../src/components/DropdownAntd';

export default function page() {
  const schema = {
    type: 'object',
    properties: {
      login: { title: 'Логин', type: 'string' },
      name: { title: 'Имя', type: 'string' },
      comparisonField: {
        title: 'Сравнение с test',
        type: 'string'
      },
      password: { title: 'Пароль', type: 'string' },
      dropdownSearchField: {
        title: 'Селект с поиском',
        type: 'string'
      }
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
        <DropdownAntd
          showSearch={true}
          name="dropdownSearchField"
          resource={() => {
            return [
              {
                text: 'Option 1',
                value: 'Option 1'
              },
              {
                text: 'Option 2',
                value: 'Option 2'
              }
            ];
          }}
        />
        <SubmitField value="Войти" />
      </AutoForm>
    </>
  );
}
