import {Button, Modal} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import "./booking.css"
import AddBooking from "./AddBooking";
import React, {useState} from 'react';

const Booking = () => {
  const [size, setSize] = useState('large');
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <div>
      这是记账主页
      <Button className="addBooking" type="primary" onClick={() => setModal2Open(true)}
              shape="circle" icon={<EditOutlined/>} size={size}/>
      <Modal
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <AddBooking onClose={() => setModal2Open(false)}></AddBooking>
      </Modal>
    </div>
  );
};
export default Booking;
