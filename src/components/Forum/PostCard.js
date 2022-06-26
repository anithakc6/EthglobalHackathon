import React from 'react'
import { Badge, Card, Typography, Row, Col, Avatar, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { follow } from '../Lens/Api';

export default function PostCard({dao}) {
  const { Text } = Typography;

  const handleFollow= async(dao) => {
    debugger;
    try{
      let followRequest = [{
        profile: dao.id,
      }]
      await follow(followRequest)
      message.success(`Your are following ${dao.handle} sucessfully.`);
      
    }catch(error){
      debugger;
      console.log(error)
    }
  }
  return (
    <Badge.Ribbon text={`@${dao.handle}`} color="orange" >
      <Card className='post-card' style={{ background: `url(${dao.coverPicture ? dao.coverPicture : "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"})`}} >
        <Typography.Title className="post-title" level={4}>{ dao.name ? dao.name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " }</Typography.Title>
        <Row justify="start" align="middle" className="post-user">
          <Col span={5} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <Typography.Text style={{color: '#fff', fontWeight: 'bolder'}}>{ dao.stats.totalFollowers }</Typography.Text>
            <Avatar size={36} style={{ backgroundColor: "#f56a00", verticalAlign: 'middle' }} shape="square" icon={<UserOutlined />} />
          </Col>
          <Col span={18} style={{display: 'flex', alignItems: 'middle', justifyContent: 'flex-end'}}>
            <Button type="primary" shape="round" onClick={() => handleFollow(dao)}>Follow</Button>
          </Col>
        </Row>
      </Card>
    </Badge.Ribbon>
  )
}
