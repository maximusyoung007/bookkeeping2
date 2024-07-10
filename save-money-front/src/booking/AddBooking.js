import { Tabs } from 'antd';
import React from 'react';
import OutCome from './outcome'

const AddBooking = ({onClose}) => {

  const items = [
    { label: '支出', key: 'outcome', children: <OutCome onClose={onClose}/> }, // 务必填写 key
    { label: '收入', key: 'income', children: '内容 2' },
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={items}
    />
  )

};
export default AddBooking;