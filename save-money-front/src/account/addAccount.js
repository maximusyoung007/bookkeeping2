import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, TreeSelect, Divider, Modal, DatePicker, message} from 'antd';
import api from "../api";

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
const AddAccount = (props) => {
  let {addAccount, onClose} = props;
  let categories = [];
  let subCategories = [];
  // let txTypeData = [];

  const [txTypeData, setTxTypeData] = useState()

  useEffect(() => {
    console.log("txTypeUseEffect");
    api.post("/txType/getTxType", {
      kind: 2,
    }).then(function (response) {
      // setData(response.data[0]);
      console.log(response);
      console.log(response.data[0])
      //setData(response.data)
      let dataArray = response.data;
      dataArray.forEach(function (item) {
        if (item.id == item.fatherId) {
          categories.push({value: item.id, title: item.name})
        } else {
          subCategories.push({value: item.id, title: item.name, parent: item.fatherId})
        }
      })
      const temp = categories.reduce((acc, category) => {
        // 查找属于该分类的所有子分类
        const children = subCategories.filter(subCategory => subCategory.parent === category.value);

        // 将子分类添加到顶级分类的children属性下
        acc.push({
          ...category,
          children,
        });

        return acc;
      }, []);
      setTxTypeData(temp)
    })
  }, [])
  const [treeValue, setValue] = useState();

  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    api.post("/account/addAccount", {
      accountName: values.accountName,
      accountType: values.accountType,
      balance: values.balance
    }).then(function (response) {
      console.log("response:", response);
      addAccount = !addAccount;
      if (response.code == '2000') {
        message.success({
          content: '增加账户成功',
        }).then(() => onClose());
      }
    }).catch(function (error) {
      message.error("请求异常：" + error);
    })
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
          name="accountName"
          label="账户名称"
          rules={[
            {
              required: true,
              message: '请输入账户名称',
              whitespace: true,
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name="accountType"
          label="类型"
          rules={[
            {
              required: true,
              message: '请选择你要添加的账户类型',
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
          name="balance"
          label="金额"
          rules={[
            {
              required: true,
              message: '余额（单位元）',
              whitespace: true,
            },
          ]}
        >
          <InputNumber min="0" step="0.01" stringMode/>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
};
export default AddAccount;