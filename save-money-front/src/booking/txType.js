import {Avatar, Divider, List, Skeleton, Button, Modal} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, {useEffect, useState,} from 'react';
import { useNavigate } from 'react-router-dom';
import OutCome from './outcome'
import SubTxType from "./subTxType";
import AddTxType from "./addTxType";

const TxType = () => {
  const data = [
    {email: 't1', name:'Racing '},
    {email: 't2', name:'Japanese'},
    {email: 't3', name: 'Australian '},
    {email:'t4', name:'Man '},
    {email: 't5', name:'Los '},
    {email: 't1', name:'Racing '},
    {email: 't2', name:'Japanese'},
    {email: 't3', name: 'Australian '},
    {email:'t4', name:'Man '},
    {email: 't5', name:'Los '},
    {email: 't1', name:'Racing '},
    {email: 't2', name:'Japanese'},
    {email: 't3', name: 'Australian '},
    {email:'t4', name:'Man '},
    {email: 't5', name:'Los '}
  ];

  const navigate = useNavigate();

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
                key={item.email}
                actions={[
                  <Button type="link">编辑</Button>,
                  <Button type="link" onClick={() => {
                    setFatherTxType(item.email)
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