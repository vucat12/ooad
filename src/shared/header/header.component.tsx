
import * as React from 'react';
import {  Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import {  UserAddOutlined, UserOutlined } from '@ant-design/icons';
// import { Routes } from '../../routes';
// import { Route } from 'react-router-dom';
// import LogIn from '../../log-in/log-in.component';

export interface HomeContent {

}

interface IProps {
  userName?: string;
}

// const getUser =[{
//         name: 'Vu Cat'
//     }]

export class HomePage extends React.Component<IProps, HomeContent> {

  removeStorage() {
    localStorage.removeItem('KeyToken');
  }

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
            <div style={{display: "inline-block", padding: ' 0px 15px'}}>
              <div style={{display: 'inline-block', paddingRight: '15px'}}>
              <UserAddOutlined  style={{paddingRight: '10px'}} /> {this.props.userName}
              </div>
              <Link to="/" onClick={this.removeStorage}>
              <span>Log out</span>  
              </Link>
            </div>
          </div>
        </Col>
    </Row>
    )
  }
}

export default HomePage;
