
import * as React from 'react';
import {  Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import {  UserAddOutlined, UserOutlined } from '@ant-design/icons';
// import { Routes } from '../../routes';
// import { Route } from 'react-router-dom';
// import LogIn from '../../log-in/log-in.component';

export interface HomeContent {

}

// const getUser =[{
//         name: 'Vu Cat'
//     }]

export class HomePage extends React.Component<HomeContent> {
  render() {
    return (
      <Row style={{fontSize: '15px', fontWeight: 'bold', position: 'relative'}}>
        <Col span={12} >
        {window.location.pathname.substring(0, 5) === "/admin" ?
            <div style={{ textAlign: 'left', paddingLeft: '5%'}} >
            </div> :
            <div>
              <div style={{ width: "100%", height: "30px", color: "#8B8B8B", fontWeight: 'bold', paddingLeft: '5%'}} onClick={() => { }} >LOGO HERE</div>
            </div>
        }
        </Col>
        <Col span={11} >
          <div  style={{float: 'right'}}>
            <div style={{display: "inline-block"}}>
              <Link to='/login'>
                <UserOutlined style={{paddingRight: '10px'}} />
                <span>Dang nhap</span>
              </Link>
            </div>
            <div style={{display: "inline-block", padding: ' 0px 15px'}}>
              <UserAddOutlined  style={{paddingRight: '10px'}} />
              <span>Dang ky</span>
            </div>
          </div>
        </Col>
    </Row>
    )
  }
}

export default HomePage;
