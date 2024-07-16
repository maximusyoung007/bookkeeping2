import { Tabs } from 'antd';
import React from 'react';
import OutCome from './outcome'
import InCome from "./income";

const AddBooking = ({onClose}) => {

  const items = [
    { label: '支出', key: 'outcome', children: <OutCome onClose={onClose}/> }, // 务必填写 key
    { label: '收入', key: 'income', children: <InCome onclose={onClose}/> },
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