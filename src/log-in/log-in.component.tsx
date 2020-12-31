
import * as React from 'react';
import { Form, Input, Button, Divider, Row, Col, message } from 'antd';
import axios from 'axios';
import './log-in.component.scss';
import { environment } from '../environment/environment'


export interface LogIns {

}


const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};

const onFinish = (values: any) => {

  const { remember, ...postLogin } = values;

  console.log(postLogin);

  axios({
    method: 'post',
    url: `${environment.url}/login`,
    data: postLogin,
    headers: { 'Content-Type': 'application/json' }
  })

    .then(res => {
      if (res.status === 200) {
        window.localStorage.setItem("KeyToken", res.data.accessToken);
        message.success({ content: 'Success' })
        window.location.href = "/home-overview"
      }
    })
    .catch(error => {
      message.error({ content: error.response.data?.message })
    })
};



const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export class LogIn extends React.Component<LogIns> {

  render() {
    return (
      <div className="bg-image" style={{ height: '100vh' }}>
        <Row
          style={{
            padding: '8% 15%',
            height: '100%'
          }}>

          <Col span={14} >
            <div className="bg-inside">
            </div>
          </Col>

          <Col
            span={10}
            style={{
              backgroundColor: 'white',
              borderBottomRightRadius: '20px',
              borderTopRightRadius: '20px',
              boxShadow: ' 0 4px 8px 0 rgba(10,21,27,0.3), 0 6px 20px 0 rgba(10,21,27,0.3)',
              paddingTop:"1.5rem"
            }}
          >
            <Divider type="vertical"
              style={{
                padding: 30,
                width: "100%",
                textAlign: "center",
                fontWeight: 400
              }}
            >
              <span style={{ fontSize: '25px', minWidth: '20px', maxWidth: '20px',margin: "1rem 0" }}>Good morning</span></Divider>
            <Divider type="vertical"
              style={{ padding: '20px',width:"100%",textAlign:"center" }}
            >
              <span style={{ fontSize: '.8rem',margin: ".8rem 0" }}>How is the weather today ?</span></Divider>
            <Divider type="vertical"
              style={{ padding: '20px', width:"100%",textAlign:"center",fontSize:"2rem",fontWeight:700 ,margin: ".8rem 0",fontStyle: "italic"}}
            >
              <span>Log In Your Account</span></Divider>
            <Form
            className="login-form"
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
              name="username"
              style={{ marginTop: '1rem' }}
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input autoComplete='false' placeholder="Username"/>
              </Form.Item>

              <Form.Item
              name="password"
              style={{ marginTop: '1rem' }}
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password  autoComplete='false'  placeholder="Password" />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button style={{ marginTop: '1rem' }} type="primary" htmlType="submit" >
                  Submit
              </Button>
              </Form.Item>
            </Form>
          </Col>

        </Row>
      </div>

    );
  }
}

export default LogIn;