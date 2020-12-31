
import * as React from 'react';
import {  Breadcrumb, Button, Col, Divider, Row } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import {  AimOutlined, DeploymentUnitOutlined, TeamOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import './home-page.component.css'
import Topic from '../topic/topic.component';
import MyFaculty from '../my-faculty/my-faculty.component';
import MyCouncil from '../my-council/my-council.component';
// import { Routes } from '../../routes';
// import { Route } from 'react-router-dom';
// import LogIn from '../../log-in/log-in.component';

export interface HomeContent {

}

// const getUser =[{
//         name: 'Vu Cat'
//     }]

export class HomeOverview extends React.Component<HomeContent> {
  render() {
    return (
     <div>
        <Breadcrumb style={{ margin: '16px 22px 16px 22px', fontSize: '20px' }}>
          <div style={{display: 'inline-block', fontWeight: 600}}>Dashboard</div>
        </Breadcrumb>
        <div className="site-layout-background" style={{ minHeight: 350, margin: '2%' }}>
             <Divider orientation="left" plain style={{padding: '20px 0'}}> <span style={{fontSize: '20px'}}>Overview</span>  </Divider>
             <div style={{height: '100%', padding: '32px 0'}}>
               <Row>
                 <Col span={8} className="col-devided">
                    <AimOutlined style={{fontSize: '100px'}} />
                    <div className="title-col">
                      1. TOPIC
                    </div>
                    <div style={{margin: '0 auto', marginBottom: '30px', fontWeight:500, width: 200,height: 80}}>
                        See list of topics from a variety of fields, such as: Sciences, Music, Medicine, Economics, Sport, ...
                    </div>
                    <Button>
                      <Link to="/topic">  View</Link>
                    
                      </Button>
                 </Col>
                 <Col span={8} className="col-devided">
                    <DeploymentUnitOutlined style={{fontSize: '100px'}} />
                        <div className="title-col">
                        2. FACULTY
                        </div>
                        <div style={{margin: '0 auto', marginBottom: '30px', fontWeight:500, width: 200,height: 80}}>
                        See information about your department, including information and its members
                        </div>
                        <Button>
                          <Link to="/my-faculty">
                          View

                          </Link>
                          
                          </Button>
                 </Col>
                 <Col span={8} className="col-devided">
                    <TeamOutlined style={{fontSize: '100px'}} />
                        <div className="title-col">
                          3. COUNCIL
                        </div>
                        <div style={{margin: '0 auto', marginBottom: '30px', fontWeight:500, width: 200,height: 80}}>
                        See the details of the participating judges and the results of each topic
                        </div>
                        <Button>
                          <Link to="/my-council">
                            View

                          </Link></Button>
                 </Col>
               </Row>
             
                <Row>
                  <Col span={24}>
                    <div style={{textAlign: 'center', color: '#00000073', paddingTop: '40px'}}>
                      Course Project: Object Oriented Analysis and Design <br/>
                      Created by: Team 3
                    </div>
                    </Col>
                </Row>
             </div>

             <Switch>
              <Route path="/topic" component={Topic}></Route>    
              <Route path="/my-faculty" component={MyFaculty}/> 
              <Route path="/my-council" component={MyCouncil}></Route>
          </Switch>
        </div>
     </div>
    )
  }
}

export default HomeOverview;
