import {Calendar, Alert, message, List, Button} from 'antd';
import React, {useEffect, useState} from 'react';
import moment from 'moment'
import api from "../api";

const DailyBooking = () => {
  const [selectedValue, setSelectedValue] = useState(() => moment('2017-01-25'));
  const [dayOfWeek, setDayOfWeek] = useState()
  const [data, setData] = useState()
  const onSelect = (newValue) => {
    setSelectedValue(newValue);
    let temp = newValue.format("YYYY-MM-DD");
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    const date = new Date(temp);
    let newDayOfWeek = days[date.getDay()]
    setDayOfWeek(newDayOfWeek);
  };
  const [incomeValue, setIncomeValue] = useState()
  const [outcomeValue, setOutcomeValue] = useState()

  const onPanelChange = (newValue) => {
  };
  useEffect(()=>{
    console.log(selectedValue.format("YYYYMMDD"))
    api.post("/booking/getDailyBooking", {
      date: selectedValue.format("YYYYMMDD")
    }).then(function (response) {
      console.log(response.data);

      setIncomeValue(response.data.income)
      setOutcomeValue(response.data.outcome)
     setData(response.data.bookingVOList);
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
          header={
            <div>{selectedValue.format("YYYY-MM-DD")}  {dayOfWeek}
              <div style={{float: 'right'}}><span> 收入：{incomeValue} </span></div>
              <div style={{float: 'right'}}><span> 支出：{outcomeValue} </span></div>
            </div>}
          renderItem={(item) => (

            <List.Item

              key={item.txType}
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