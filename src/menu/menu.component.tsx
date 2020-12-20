import React from 'react';
import { ContactsOutlined, DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
import './menu.component.css';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import HeaderInit from '../shared/header/header.component';
import Topic from '../topic/topic.component';
import { Link, Route, Switch } from 'react-router-dom';
import HomeOverview from '../home-page/home-page.component';
import ListTopic from '../list-topic/list-topic.component';
import axios from 'axios';
import { environment } from '../environment/environment';
import MyFaculty from '../my-faculty/my-faculty.component';
import MyTopic from '../my-topic/my-topic.component';
import AssignTopic from '../assign-topic/assign-topic.component';

export interface SlideBars {}

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export class SlideBar extends React.Component<SlideBars> {
  
  valueApi:number;
  isLoading: boolean;
  data = {};
  constructor(props: any) {
    super(props);
    this.valueApi = 0;
    this.isLoading = false;
  }

  componentDidMount() {
    // this.getUser();
  }

  getUser = () => {
    axios({
      method: 'post',
      url: `${environment.url}/user/info`,
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
      }
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res)
        }
      }) 
  }
  
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };


  getItems(item: any){
    this.valueApi = item.key;
      if (this.valueApi == 1) {
        console.log(item.key)
      }
  }


  render() {
    const { collapsed } = this.state;
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" mode="inline"   onClick={(item) => this.getItems(item)} >
            <Menu.Item key="1" icon={<PieChartOutlined/>} >
              <Link to="/home-overview">
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/topic">
                All Topic
              </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Faculty">
              <Menu.Item key="3">
                <Link to="/list-topic">
                  List Topic
                </Link>
              </Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<ContactsOutlined />}>
              <Link to="/my-faculty">
              My Faculty
              </Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<FileOutlined />}>
              <Link to="/my-topic">
               My Topic
              </Link>
            </Menu.Item>
            <Menu.Item key="11" icon={<FileOutlined />}>
              <Link to="/assign-topic">
               Assign Topic
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <HeaderInit/>
          </Header>
          <Content style={{ margin: '0 16px' }}>

          <Switch>
             <Route path="/home-overview" component={HomeOverview}></Route>
             <Route path="/topic" component={Topic}></Route>     
             <Route path="/list-topic" component={ListTopic}></Route>   
             <Route path="/my-faculty" component={MyFaculty}/>
             <Route path="/my-topic" component={MyTopic}></Route>
             <Route path="/assign-topic" component={AssignTopic}></Route>
          </Switch>

          </Content>
        </Layout>
      </Layout>
);
}
}

export default SlideBar;
