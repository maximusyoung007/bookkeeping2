import {
    Button, Col, Modal, Row,
} from 'antd';
import React, { useState } from 'react';
import AccountLeft from "./left/accountLeft";
import {EditOutlined} from "@ant-design/icons";
import AddAccount from "./addAccount";
import "./account.css"
const Accounting = () => {
    //chooseAccount用来显示当前选中的是哪个账本
  const [chooseAccount, setChooseAccount] = useState("000");
  const [accountModal, setAccountModal] = useState(false);
  const [refreshAccount, setRefreshAccount] = useState(false);
  const [size, setSize] = useState('large');
  const style = {

      padding: '8px 0',
  };
  return (
    <div>
      <Row
        gutter={{
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
        }}
      >
          <Col className="gutter-row" span={12}>
            <div style={style}>
              <AccountLeft addAccount={refreshAccount} ></AccountLeft>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-16</div>
          </Col>
      </Row>
      这是账本主页
      <Button className="addAccount" type="primary" onClick={() => setAccountModal(true)}
              shape="circle" icon={<EditOutlined/>} />
      <Modal
        centered
        open={accountModal}
        onOk={() => setAccountModal(false)}
        onCancel={() => {
          setAccountModal(false)
        }}
      >
        <AddAccount onClose={() => setAccountModal(false)} addAccount={refreshAccount}></AddAccount>
      </Modal>
    </div>
  );
};
export default Accounting;
