import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, TreeSelect} from 'antd';

const txType = [
  {
    value: 'food',
    title: '餐饮',
    children: [
      {
        value: 'meal',
        title: '三餐',
      },
    ],
  },
  {
    value: 'study',
    title: '学习',
    children: [
      {
        value: 'books',
        title: '书籍',
      },
      {
        value: 'class',
        title: '培训班'
      }
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Outcome = ({onClose}) => {
  const [treeValue, setValue] = useState();

  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    onClose();
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '86',
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="txType"
        label="类型"
        rules={[
          {
            required: true,
            message: '请选择你的支出类型',
          },
        ]}
      >
        <TreeSelect
          showSearch
          style={{width: '100%'}}
          value={treeValue}
          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
          allowClear
          onChange={onChange}
          treeData={txType}
        />
      </Form.Item>

      <Form.Item
        name="counterparty"
        label="交易对方"
        rules={[
          {
            required: true,
            message: '请输入你的交易对方',
            whitespace: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="amount"
        label="金额"
        rules={[
          {
            required: true,
            message: '金额（单位元）',
            whitespace: true,
          },
        ]}
      >
        <InputNumber min="0" step="0.01" stringMode/>
      </Form.Item>

      <Form.Item
        name="accountNumber"
        label="账户号码"
        rules={[
          {
            required: true,
            message: '请输入这笔支出的账户',
            whitespace: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="goodsName"
        label="商品名称"
        rules={[
          {
            required: true,
            message: '请输入商品名称',
            whitespace: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Outcome;