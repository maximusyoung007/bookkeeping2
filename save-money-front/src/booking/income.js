import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, TreeSelect, Divider, Modal, DatePicker, message, Select} from 'antd';
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
const InCome = ({onClose}) => {

  let categories = [];
  let subCategories = [];

  let options = [{value:"000", label:"默认不关联账户"}];

  const [txTypeData, setTxTypeData] = useState();
  const [accountList, setAccountList] = useState();

  useEffect(() => {
    api.post("/txType/getTxType", {
      kind: 0,
    }).then(function (response) {
      // setData(response.data[0]);
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

    api.post("/account/getAccount", {

    }).then(function (response) {
      response.data.list.forEach(function (item) {
        options.push({value: item.accountNo, label: item.accountName})
      })
      setAccountList(options)
    })
  }, [])
  const [treeValue, setValue] = useState();
  const [modalOpen2, setModalOpen2] = useState(false);

  const onChange = (newValue) => {
    setValue(newValue);
  };


  const onAccountChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onAccountSearch = (value) => {
    console.log('search:', value);
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("values:" + values)
    api.post("/booking/addBooking", {
      txType: values.txType,
      accountNo: values.accountNumber,
      amount: values.amount,
      counterparty: values.counterparty,
      goodsName: values.goodsName,
      date: values['date-picker'].format('YYYYMMDD'),
      inOrOut: 0
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
        name="income"
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
          label="账户"
          rules={[
            {
              required: true,
              message: '请输入这笔收入的账户',
              whitespace: true,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="选择一个账户"

            onChange={onAccountChange}
            onSearch={onAccountSearch}

            defaultValue={"000"}
            options={accountList}
          />
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
        <TxType kind={0}></TxType>
      </Modal>
    </div>
  );
};
export default InCome;