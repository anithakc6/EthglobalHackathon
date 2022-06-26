import './App.css';
import React from 'react'
import Routes from './routes/Routes';
import { Layout, Typography, Row, Col } from 'antd';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import { useNavigate, useLocation } from "react-router-dom";
import { useEthers } from '@usedapp/core'
import { login } from '../src/components/Lens/Api'
import { getProfilesRequest } from '../src/components/Lens/ApolloRequest'

function App() {
  const { Content } = Layout;
  const {  account, activateBrowserWallet } = useEthers();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getAccessToken = async () => {
    if( account ){
      await login()
      const { data } = await getProfilesRequest({ ownedBy: account })
      if( data.profiles.items.length === 0 ){
        navigate('/create_profile')
      }else{
        localStorage.setItem('profile_id', data.profiles.items[0].id)
        localStorage.setItem('wallet', data.profiles.items[0].ownedBy)
        navigate('/')
      }
      localStorage.setItem('jobs', {})
    }
  }

  React.useEffect(async() => {
    if( ! localStorage.getItem('access_token')  ){
      getAccessToken()

    }
  }, [account]);

  return (
    <div className="App">
      <Layout>
        <Navbar />
        <Layout>
        { account &&  <Sidebar /> }
          <Content>
            <div>
              <Routes />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
