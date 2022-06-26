import React from 'react'
import { Layout, Typography, Row, Col, Button } from 'antd';
import { useEthers } from '@usedapp/core'
import WalletAddress from '../Utilities/WalletAddress'


export default function Navbar() {
  const { Header } = Layout;
  const { account, activateBrowserWallet } = useEthers();
  const connectWallet = async() => {
    activateBrowserWallet()
  }


  return (
    <Header className="site-layout-sub-header-background" style={{ padding: '0 20px' }} >
      <Row gutter={[16, 24]}>
        <Col flex={1} className="gutter-row">
          <div className="logo">
            <Typography.Title level={3}>Tech Quorum</Typography.Title>
          </div>
        </Col>
        <Col flex={3} className="gutter-row">
        </Col>
        <Col flex={1} className="gutter-row" style={{ alignSelf: 'center', display: 'flex', justifyContent: 'flex-end'}}>
          { account ? <WalletAddress address={account} /> :
            <Button type="primary" size="large" onClick={() => connectWallet()}>
              Connect
            </Button>
          }
        </Col>
      </Row>
    </Header>
  )
}
