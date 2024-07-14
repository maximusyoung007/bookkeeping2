import {List, Button, Modal} from 'antd';
import React, {useEffect, useState,} from 'react';
import SubTxType from "./subTxType";
import AddTxType from "./addTxType";
import api from "../api"

const TxType = () => {
  const [data, setData] = useState();

  //useEffect第2个数组为空，则可以只执行一次
  useEffect(() => {
    console.log("进来啦");
    api.post("/txType/getTxType", {
      kind: 1,
      isLeaf: 0
    }).then(function (response) {
      // setData(response.data[0]);
      console.log(response);
      console.log(response.data[0])
      setData(response.data)
    })
  }, [])

  const [modalOpen3, setModalOpen3] = useState(false);
  const [addTxTypeModal, setAddTxTypeModal] = useState(false);

  const [fatherTxType, setFatherTxType] = useState(0);

  return (
    <div>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >

          <List
            dataSource={data}
            renderItem={(item) => (

              <List.Item
                key={item.id}
                actions={[
                  <Button type="link">编辑</Button>,
                  <Button type="link" onClick={() => {
                    setFatherTxType(item.id)
                    setModalOpen3(true)}
                  }>详情</Button>,
                  <Button type="link" danger>删除</Button>
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                />
              </List.Item>

            )}
          />
        <Modal title="二级分类管理" open={modalOpen3} onOk={() => setModalOpen3(false)}
               onCancel={() => setModalOpen3(false)}>
          <SubTxType fatherTxType={fatherTxType}></SubTxType>
        </Modal>
        <Modal title="新增分类" open={addTxTypeModal} onOk={() => setAddTxTypeModal(false)}
               onCancel={() => setAddTxTypeModal(false)}>
          <AddTxType isLeaf={false} fatherName={""} closeModal={() => setAddTxTypeModal(false)}></AddTxType>
        </Modal>
      </div>
      <div><Button onClick={() => setAddTxTypeModal(true)}>新增分类</Button></div>
    </div>
  );

};
export default TxType;