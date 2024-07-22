import {Calendar, Alert, message, List, Button} from 'antd';
import React, {useEffect, useState} from 'react';
import moment from 'moment'
import api from "../api";

const DailyBooking = () => {
  const [selectedValue, setSelectedValue] = useState(() => moment('2017-01-25'));
  const [data, setData] = useState()
  const onSelect = (newValue) => {
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue) => {
  };
  useEffect(()=>{
    console.log(selectedValue.format("YYYYMMDD"))
    api.post("/booking/getDailyBooking", {
      date: selectedValue.format("YYYYMMDD")
    }).then(function (response) {
      console.log(response.data);
      setData(response.data);
    }).catch(function (error) {
      message.error("请求异常：" + error);
    })

  }, [selectedValue])
  return (
    <div>
      <div className="site-calendar-demo-card">
        <Calendar onSelect={onSelect} fullscreen={false} onPanelChange={onPanelChange} />
      </div>
      <div style={{paddingLeft: 20, paddingRight: 20}}>
        <List
          dataSource={data}
          renderItem={(item) => (

            <List.Item
              key={item.txType}
              // actions={[
              //   // <Button type="link">编辑</Button>,
              //   // <Button type="link" onClick={() => {}}>详情</Button>,
              //   // <Button type="link" danger>删除</Button>
              // ]}
            >
              <List.Item.Meta
                title={item.goodsName} style={{right: 20}}
              />
              <div>{item.inOrOut == 1 ? "-¥" + item.amount : "+¥" + item.amount}</div>
            </List.Item>

          )}
        />
      </div>
    </div>
  );

};
export default DailyBooking;