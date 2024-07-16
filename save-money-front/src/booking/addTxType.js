import { Form, Button, Input, Modal, message } from 'antd';
import React from 'react';
import api from "../api"

const AddTxType = (props) => {
  const { isLeaf, fatherName, fatherId, closeModal, kind } = props;
  const onFinish = (values) => {
    console.log('Success:', values);
    api.post("/txType/addTxType", {
        name: values.name,
        subName: values.subName,
        isLeaf: isLeaf,
        fatherId: fatherId,
        kind: kind
    }).then(function (response) {
      console.log("response:", response);
      if (response.code == '2000') {
        message.success({
          content: '新增分类成功',
        }).then(() => closeModal());
      }
    }).catch(function (error) {
      message.error("请求异常：" + error);
    })
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
        name: fatherName
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="分类名称"
        name="name"
        rules={[
          {
            required: true,
            message: '输入分类名称',
          },
        ]}
      >
        <Input disabled={isLeaf} />
      </Form.Item>

      <Form.Item
        label="二级分类名称"
        name="subName"
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )

};
export default AddTxType;