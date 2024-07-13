import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, TreeSelect, Divider, Modal} from 'antd';
import api from '../api'
import TxType from "./txType";

const txTypeData = [
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
  const [modalOpen2, setModalOpen2] = useState(false);

  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    onClose();
  };

  const dropdownRender = (txTypeData) => (
    <div>
      {txTypeData}
      <Divider
        style={{
          margin: 0,
        }}
      />
      <div
        style={{
          padding: 8,
        }}
      >
        {/*The footer is not very short.*/}
        <Button type="primary" onClick={() => setModalOpen2(true)}>
        新增分类
        </Button>
      </div>
    </div>
  )



  return (
    <div>
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
          treeData={txTypeData}
          dropdownRender={dropdownRender}
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
      <Modal title="分类管理" open={modalOpen2} maskClosable={false} onOk={() => setModalOpen2(false)}
             onCancel={() => setModalOpen2(false)}>
        <TxType></TxType>
      </Modal>
    </div>
  );
};
export default Outcome;