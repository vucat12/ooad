
import * as React from 'react';
import { Form, Input, Button, Checkbox, Divider, Row, Col } from 'antd';
import axios from 'axios';
import './log-in.component.css';
import { environment } from '../environment/environment'

export interface LogIns {

}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const tailLayout = {
wrapperCol: { offset: 8, span: 16 },
};
  
const onFinish = (values: any) => {

    const {remember, ...postLogin} = values;

    console.log(postLogin);

    axios({
      method: 'post',
      url: `${environment.url}/login`,
      data: postLogin,
      headers: {'Content-Type': 'application/json' }
      })
      .then(res => {
        console.log(res)
      })

    // axios.get(`http://cf6ee9b1d3b0.ngrok.io/topic`)
    // .then(res => {
    //   console.log(res.data);
    // })
    // .catch(error => console.log(error));

      
};
  
const onFinishFailed = (errorInfo: any) => {
console.log('Failed:', errorInfo);
};

export class LogIn extends React.Component<LogIns> {

  
  render() {
    return (
      <div className="bg-image">
        <Row
            style={{padding: '8% 15%',
                    height: '100%'
                  }}>

          <Col span={14} >
            <div className="bg-inside">
            </div>
          </Col>

          <Col 
            span={10}
            style={{backgroundColor: 'white',
                    borderBottomRightRadius: '20px',
                    borderTopRightRadius: '20px',
                    boxShadow: ' 0 4px 8px 0 rgba(10,21,27,0.3), 0 6px 20px 0 rgba(10,21,27,0.3)'
                  }}
          >
          <Divider type="vertical"
                    style={{padding : '30px'}}
          > 
          <span style={{fontSize: '30px', minWidth: '20px', maxWidth: '20px'}}>Good morning</span></Divider>
          <Divider type="vertical"
                    style={{padding : '20px'}}
          > 
          <span style={{fontSize: '20px'}}>How is the weather today ?</span></Divider>
          <Divider type="vertical"
                    style={{padding : '30px'}}
          > 
          <span>Log In Your Account</span></Divider>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{paddingTop: '5%'}}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input style={{width: '80%'}}/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password style={{width: '80%'}}/>
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" >
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