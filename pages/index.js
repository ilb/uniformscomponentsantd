import React from 'react';
import { AutoForm, SubmitField, AutoField } from 'uniforms-antd';
import { ComparisonComponent, createSchemaBridge } from '../src/index';
import DropdownAntd from '../src/components/DropdownAntd';
import { Card, Col, Divider, Row } from 'antd';
import CustomAutoField from '../src/components/CustomAutoField';
import CustomDateField from '../src/components/CustomDateField';
import FilledSelectField from '../src/components/FilledSelectField';

export default function page() {
  const FirstForm = () => {
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
        },
        patternTextField: {
          title: 'Номер ПТС',
          type: 'string',
          uniforms: {
            pattern: '** ** ******',
            caseMode: 'upperCase'
          }
        }
      }
    };

    return (
      <AutoForm
        showInlineError
        layout="horizontal"
        schema={createSchemaBridge(schema)}
        onSubmit={(data) => alert(JSON.stringify(data))}>
        <AutoField name="login" />
        <CustomAutoField capitalize name="name" />
        <ComparisonComponent
          valueToCompare={'test'}
          name="comparisonField"
          onChange={() => {}}
          caseMode="upperCase"
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
        <CustomAutoField name='patternTextField' />
        <SubmitField value="Войти" />
      </AutoForm>
    );
  };

  const SecondForm = () => {
    const schema = {
      type: 'object',
      properties: {
        divisionCode: {
          title: 'Код подразделения',
          type: 'string',
          uniforms: {
            format: '###-###',
            mask: '_',
            maskedValue: true
          }
        },
        seriesNumber: {
          title: 'Серия и номер',
          type: 'string',
          uniforms: {
            format: '## ## ######'
          }
        },
        manufacturer: {
          title: 'Производитель',
          type: 'string'
        },
        phone: {
          title: 'Контактный телефон',
          type: 'string',
          uniforms: {
            format: '+#(###)#######',
            placeholder: '+7(___)_______',
            mask: '_'
          }
        },
        startDate: {
          title: 'Дата',
          type: 'string'
        }
      },
      required: ['address', 'startDate']
    };

    return (
      <AutoForm schema={createSchemaBridge(schema)} onSubmit={console.log}>
        <Row>
          <Col span={12}>
            <CustomDateField name="startDate" />
          </Col>
          <Col span={12}>
            <CustomAutoField name="divisionCode" />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <CustomAutoField name="phone" />
          </Col>
          <Col span={8}>
            <CustomAutoField name="seriesNumber" />
          </Col>
          <Col span={8}>
            <FilledSelectField
              name="manufacturer"
              options={[
                {
                  value: 'Axe',
                  label: 'Axe'
                },
                {
                  value: 'Akira',
                  label: 'Akira'
                }
              ]}
            />
          </Col>
        </Row>
        <Row className="mt16 right">
          <Col span={24}>
            <SubmitField />
          </Col>
        </Row>
      </AutoForm>
    );
  };

  return (
    <>
      <Card>
        <FirstForm />
      </Card>
      <Divider />
      <Card>
        <SecondForm />
      </Card>
    </>
  );
}
