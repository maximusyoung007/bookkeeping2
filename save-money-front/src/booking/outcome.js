import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, TreeSelect, Divider, Modal, DatePicker, message} from 'antd';
import TxType from "./txType";
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
const Outcome = ({onClose}) => {

  let categories = [];
  let subCategories = [];
  // let txTypeData = [];

  const [txTypeData, setTxTypeData] = useState()

  useEffect(() => {
    console.log("txTypeUseEffect");
    api.post("/txType/getTxType", {
      kind: 1,
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
      console.log(categories)
      console.log(subCategories)
      console.log("txType2:" + txTypeData)
      setTxTypeData(temp)
    })
  }, [])
  const [treeValue, setValue] = useState();
  const [modalOpen2, setModalOpen2] = useState(false);

  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    api.post("/booking/addBooking", {
      txType: values.txType,
      accountNumber: values.accountNumber,
      amount: values.amount,
      counterparty: values.counterparty,
      goodsName: values.goodsName,
      date: values['date-picker'].format('YYYYMMDD'),
    }).then(function (response) {
      console.log("response:", response);
      if (response.code == '2000') {
        message.success({
          content: '记账成功',
        }).then(() => onClose());
      }
    }).catch(function (error) {
      message.error("请求异常：" + error);
    })
    // console.log('Received values of form: ', values);
    // console.log(values['date-picker'].format('YYYY-MM-DD'));
    // onClose();
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

      <Form.Item name="date-picker" label="DatePicker"
                 rules={[
                   {
                     type: 'object',
                     required: true,
                     message: 'Please select time!',
                   },
                 ]}
      >
        <DatePicker />
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