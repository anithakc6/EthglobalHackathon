import React, { useState, useEffect } from 'react'
import { Typography, Row, Col, Space } from 'antd';
import PostCard from './PostCard';
import {
  BarChartOutlined,
} from '@ant-design/icons';
import { useEthers } from '@usedapp/core';
import { getProfilesRequest } from '../Lens/ApolloRequest'

export default function Trending() {
  const [ daos, setDaos] = useState([])
  const {  account } = useEthers();

  React.useEffect(async() => {
    if( account ){
      const { data } = await getProfilesRequest({ ownedBy: "0xbdAC7706C6432eDbA399510b7285A0f27Dd6E4B6" })
      setDaos(data.profiles.items)
    }
  }, [account]);

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row gutter={[16, 24]}>
        <Col flex={1} className="gutter-row">
          <Typography.Title  type={"primary"} level={3}><BarChartOutlined /> Top Trending Now</Typography.Title>
        </Col>
        <Col flex={3} className="gutter-row">
        </Col>
        <Col flex={1} className="gutter-row" style={{ alignSelf: 'center', display: 'flex', justifyContent: 'flex-end'}}>
        </Col>
      </Row>
      <Row gutter={16}>
        { daos.map((d) => (
          <Col span={8}>
            <PostCard dao={d} />
          </Col>
        ))}
        
      </Row>
    </Space>

  )
}
