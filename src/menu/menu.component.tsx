import React from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
import './menu.component.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import HeaderInit from '../shared/header/header.component';
import axios from 'axios';

export interface SlideBars {}

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export class SlideBar extends React.Component<SlideBars> {

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };

  getItems(item: any){
      if (item.key) {
        axios.get('http://4e0b6502f6fb.ngrok.io/topic', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2dWtoYW5oIiwiZXhwIjoxNjA3NDY0ODM4LCJpYXQiOjE2MDc0NDY4Mzh9.H9BQIkMnkl64YP25-gSCPnNBrLkBGbhFwRXS4gPyKIZG9ts6fmfyUA3CP2-0Y95hNLOk-ckedCG_toQszEfqpQ'
         } 
        })
          .then(res => {
            console.log(res.data)
          })
          .catch(e => console.log(e))
      }
  }


  render() {
    const { collapsed } = this.state;
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"   onClick={(item) => this.getItems(item)} >
            <Menu.Item key="1" icon={<PieChartOutlined/>} >
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >

            <HeaderInit/>

          </Header>
          <Content style={{ margin: '0 16px' }}>

            <Breadcrumb style={{ margin: '16px 0', fontSize: '20px' }}>
              <Breadcrumb.Item>Software management of Science</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
            
          </Content>
        </Layout>
      </Layout>
);
}
}

export default SlideBar;
