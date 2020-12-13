
import * as React from 'react';
import {  Breadcrumb, Button, Col, Divider, Row } from 'antd';
import { Link } from 'react-router-dom';
import {  AimOutlined, DeploymentUnitOutlined, TeamOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import './home-page.component.css'
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
        <Breadcrumb style={{ margin: '16px 0', fontSize: '20px' }}>
          <Breadcrumb.Item>Software management of Science</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ minHeight: 360, margin: '0 2%' }}>
             <Divider orientation="left" plain style={{paddingTop: '10px'}}> <span style={{fontSize: '20px'}}>Tong quan phan mem</span>  </Divider>
             <div style={{height: '100%'}}>
               <Row>
                 <Col span={8} className="col-devided">
                    <AimOutlined style={{fontSize: '100px'}} />
                    <div className="title-col">
                      1. Tong so de tai
                    </div>
                    <div style={{marginBottom: '30px'}}>
                      Xem de tai chi tiet hien dang co
                    </div>
                    <Button>Default</Button>
                 </Col>
                 <Col span={8} className="col-devided">
                    <DeploymentUnitOutlined style={{fontSize: '100px'}} />
                        <div className="title-col">
                        2. Tong so giang vien
                        </div>
                        <div style={{marginBottom: '30px'}}>
                          Danh sach giang vien hien tai
                        </div>
                        <Button>Default</Button>
                 </Col>
                 <Col span={8} className="col-devided">
                    <TeamOutlined style={{fontSize: '100px'}} />
                        <div className="title-col">
                          3. Tong so linh vuc
                        </div>
                        <div style={{marginBottom: '30px'}}>
                         Tong so linh vuc hien dang co
                        </div>
                        <Button>Default</Button>
                 </Col>
               </Row>
             </div>
        </div>
    
        <div className="site-layout-background" 
        style={{minHeight: 360,
                margin: '2%',
                }}>
        <Row>
          <Col span={16}> 
           <Divider orientation="left" plain> <span style={{fontSize: '20px'}}>Tong quan phan mem</span>
           </Divider>
           <ul style={{paddingLeft: '11%'}}>
             <li>1 coascashsakdjhaskdjhsakdashdkjashd</li>
             <li>1 coascashsakdjhaskdjhsakdashdkjashd</li>
             <li>1 coascashsakdjhaskdjhsakdashdkjashd</li>
             <li>1 coascashsakdjhaskdjhsakdashdkjashd</li>
           </ul>
          </Col>
          <Col span={8} style={{borderLeft: '1px solid #F0F2F5'}}> 
           <Divider orientation="left" plain style={{marginLeft: '5px'}}> <span style={{fontSize: '20px'}}>Tong quan phan mem</span> 
            </Divider>
            <ul>
             <li>1 coascashsakdjhaskdjhsakdashdkjashd</li>
             <li>1 coascashsakdjhaskdjhsakdashdkjashd</li>
             <li>1 coascashsakdjhaskdjhsakdashdkjashd</li>
             <li>1 coascashsakdjhaskdjhsakdashdkjashd</li>
           </ul>
            </Col>
        </Row>
        </div>
     </div>
    )
  }
}

export default HomeOverview;
