import React from 'react'
import {  Menu, Layout } from 'antd';
import{ HomeFilled, PlusCircleFilled, LogoutOutlined, CommentOutlined } from '@ant-design/icons';
import { useEthers } from '@usedapp/core'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const { Sider } = Layout;
  const {  deactivate } = useEthers();
  const navigate = useNavigate();
  const logOut = () => {
    deactivate()
    navigate('/')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('access_token')
  }

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<HomeFilled />} onClick={() => navigate('/')}>
          Home
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusCircleFilled />} onClick={() => navigate('/hire')}>
          Create Job
        </Menu.Item>
        <Menu.Item key="3" icon={<PlusCircleFilled />} onClick={() => navigate('/create_dao')}>
          Create DAO
        </Menu.Item>
        <Menu.Item key="4" icon={<CommentOutlined />} onClick={() => navigate('/create_dao')}>
          Forum
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick={() => logOut()}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
