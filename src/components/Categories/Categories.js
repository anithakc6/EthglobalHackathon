import React from 'react'
import { Typography, Row, Col, Button } from 'antd';
import Icon, { FolderFilled } from '@ant-design/icons';
import { Table, Tag, Space } from 'antd';
import { useEthers } from '@usedapp/core'


export default function Categories() {

  const { account } = useEthers();

  // Apply Code here
  const handleApply = (cid) => {

    alert(`Please handle ${cid}`)
  }

  const columns = [
    {
      title: 'DAO',
      dataIndex: 'dao',
      key: 'dao',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Skill',
      dataIndex: 'skill',
      key: 'skill',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleApply(record.cid)}>Apply</Button>
        </Space>
      ),
    },
  ];
  
  const jobs = JSON.parse(localStorage.getItem('jobs'))
  var data = []
  Object.entries(jobs).forEach(([key, obj]) => {
    data.push({ cid: key, dao: obj.dao, name: obj.name, details: obj.projectdetails, fee: `${obj.rate}`, skill: obj.skill  })
  });


  
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '30px' }}>
      <Row gutter={[16, 24]}>
        <Col flex={1} className="gutter-row">
          <Typography.Title  type={"primary"} level={3}><FolderFilled /> Jobs</Typography.Title>
        </Col>
        <Col flex={3} className="gutter-row">
        </Col>
        <Col flex={1} className="gutter-row" style={{ alignSelf: 'center', display: 'flex', justifyContent: 'flex-end'}}>
        </Col>
      </Row>
      
      <Table columns={columns} dataSource={data} />
    </Space>
  )
}