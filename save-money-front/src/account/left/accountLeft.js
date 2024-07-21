import {
  Card,
  Statistic,
  List,
  Avatar
} from 'antd';
import React, {useEffect, useState} from 'react';
import{ WalletOutlined,AccountBookOutlined} from '@ant-design/icons';
import api from "../../api";

const AccountLeft = (refreshAccount) => {
  const [totalAmount, setTotalAmount] = useState(19.2)
  const [data, setData] = useState()

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    console.log("进来啦");
    api.post("/account/getAccount", {

    }).then(function (response) {
      // setData(response.data[0]);
      console.log(response);
      console.log(response.data.list)
      setTotalAmount(response.data.totalBalance);
      setData(response.data.list);
    })
  }, [refreshAccount])

  const clickRows = (val) => {
    console.log("选中了某一行")
    console.log(val);
  }

  return (
    <div>
      <Card
        style={{
          width: '100%',
        }}
      >
        <Statistic title="净资产（CNY）" prefix={"¥"} value={totalAmount} precision={2} />

      </Card>
      <br/>
      <Card
        style={{
          width: '100%',
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item onClick={() => clickRows(item.accountName)}
                       onMouseEnter={handleMouseEnter}
                       onMouseLeave={handleMouseLeave}
                       className={hovered ? 'hovered' : ''}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<WalletOutlined />} />}
                title={<a>{item.accountName}</a>}
                description={item.accountTypeName}
              />
              <div>{"¥" + item.balance}</div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};
export default AccountLeft;
