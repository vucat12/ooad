import React from 'react';
import { BankOutlined, ContactsOutlined, DesktopOutlined, FileOutlined, FireOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
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
import ListLecturer from '../list-lecturer/list-lecturer.component';
import TopicCouncil from '../council/council.component';
import ListCouncil from '../list-council/list-council.component';
import CouncilReview from '../council-review/council-review.component';

export interface SlideBars {
  isRole: any;
  collapsed: boolean,
  userName: string,
}
interface IProps {
}

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export class SlideBar extends React.Component<IProps, SlideBars> {

  constructor(props: any) {
    super(props);
    this.valueApi = 0;
    this.isLoading = false;
    this.state = {
      isRole: undefined,
      collapsed: false,
      userName: ''
    }
  }

  componentDidMount() {
    this.getUser();
  }

    
  valueApi:number;
  isLoading: boolean;
  data = {};

  getUser = () => {
    axios({
      method: 'get',
      url: `${environment.url}/user/info`,
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
      }
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ isRole: res.data.data.roleCode, userName: res.data.data.fullName})
        }
      }) 
  }
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
          <Menu theme="dark" mode="inline" onClick={(item) => this.getItems(item)} >
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

            {this.state.isRole==='MANAGER' &&
            <SubMenu key="sub1" icon={<UserOutlined />} title="Faculty">
              <Menu.Item key="3">
                <Link to="/list-topic">
                  List Topic
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/list-lecturer">
                 List Lecturer
                </Link>
              </Menu.Item>
            </SubMenu>
            }

            {this.state.isRole==='MANAGER' &&
            <SubMenu key="sub2" icon={<FireOutlined />} title="Council">
              <Menu.Item key="5">
                <Link to="/topic-council">
                 Topic Council 
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/list-council">
                 List Council 
                </Link>
              </Menu.Item>
            </SubMenu>
            }
                <Menu.Item icon={<BankOutlined />} key="7">
                <Link to="/council-review">
                 Council review
                </Link>
              </Menu.Item>
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

            { (this.state.isRole === 'MANAGER' || this.state.isRole === 'ADMIN') &&
            <Menu.Item key="11" icon={<FileOutlined />}>
              <Link to="/assign-topic">
               Assign Topic
              </Link>
            </Menu.Item>
            }

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <HeaderInit userName={this.state.userName}/>
          </Header>
          <Content style={{ margin: '0 16px' }}>
          <Switch>
             <Route path="/home-overview" component={HomeOverview}></Route>
             <Route path="/topic" component={Topic}></Route>     
             {this.state.isRole==='MANAGER' && <Route path="/list-topic" component={ListTopic}></Route>}
             <Route path="/my-faculty" component={MyFaculty}/>
             <Route path="/my-topic" component={MyTopic}></Route>
             {(this.state.isRole === 'MANAGER' || this.state.isRole === 'ADMIN') &&  <Route path="/assign-topic" component={AssignTopic}></Route>}
             {this.state.isRole==='MANAGER' && <Route path="/list-lecturer" component={ListLecturer}></Route>}
             {this.state.isRole==='MANAGER' && <Route path="/topic-council" component={TopicCouncil}></Route>}
             {this.state.isRole==='MANAGER' && <Route path="/list-council" component={ListCouncil}></Route>}
             <Route path="/council-review" component={CouncilReview}></Route>
          </Switch>

          </Content>
        </Layout>
      </Layout>
);
}
}

export default SlideBar;
