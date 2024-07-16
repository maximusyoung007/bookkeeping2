import {Button, Modal, Col, Row, Calendar} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import "./booking.css"
import AddBooking from "./AddBooking";
import React, {useState} from 'react';
import DailyBooking from "./dailyBooking";

const Booking = () => {
  const [size, setSize] = useState('large');
  const [modal2Open, setModal2Open] = useState(false);
  const style = {
    background: '#0092ff',
    padding: '8px 0',
  };
  return (
    <div>
      <Row
        gutter={{
          xs: 8,
          sm: 8,
          md: 8,
          lg: 8,
        }}
      >
        <Col className="gutter-row" span={8}>
          <div style={style}>col-8</div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div style={style}>col-8</div>
        </Col>
        <Col className="gutter-row" span={8}>
          <DailyBooking></DailyBooking>
        </Col>
      </Row>
      这是记账主页
      <Button className="addBooking" type="primary" onClick={() => setModal2Open(true)}
              shape="circle" icon={<EditOutlined/>} size={size}/>
      <Modal
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => {
          setModal2Open(false)
          console.log("第一层modal状态：", modal2Open)
        }}
      >
        <AddBooking onClose={() => setModal2Open(false)}></AddBooking>
      </Modal>
    </div>
  );
};
export default Booking;
