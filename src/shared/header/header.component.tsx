
import * as React from 'react';
import {  Col, Popover, Row } from 'antd';
import { Link } from 'react-router-dom';
import {  UserAddOutlined, UserOutlined } from '@ant-design/icons';
// import { Routes } from '../../routes';
// import { Route } from 'react-router-dom';
// import LogIn from '../../log-in/log-in.component';

export interface HomeContent {

}

interface IProps {
  userName?: string;
  facultyName?: string;
  isRole?:string;
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
              <div style={{ width: "100%", height: "30px", color: "#8B8B8B", fontWeight: 'bold', paddingLeft: '5%', fontSize: '20px'}} onClick={() => { }} >Software Management of Science</div>
            </div>
        }
        </Col>
        <Col span={12} >
          <div  style={{float: 'right'}}>
            <div style={{display: "inline-block", padding: ' 0px 30px'}}>
              <div style={{display: 'inline-block', paddingRight: '15px'}}>
                <UserAddOutlined  style={{paddingRight: '10px'}} /> 
                <Popover content={
                  <div style={{textAlign:'end'}}>
                   <p>{this.props.facultyName}</p>
                   <p>{this.props.isRole}</p>
                 </div>
                  }
                   title={<p style={{textAlign: 'end'}}>Detail</p>} >
                <span>{this.props.userName}</span>
                </Popover>
                {/* <p>{this.props.facultyName}</p>
                <p>ADMIN</p> */}
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
