
import { Breadcrumb, Button, Card, Col, Form, Input, InputNumber, message, Modal, Popover, Row, Select, Space, Steps, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { FACULTY, LEVEL, FIELD, CONTRACT, MYTOPIC, LECTURER_DETAIL, LECTURES } from "../types/components/Topic/index";
import './lecturer-management.component.css'
import { StarOutlined } from '@ant-design/icons';
import LecturerManagementDetail from './lecturer-management-detail/lecturer-management-detail.component';
// import ListLecturerDetail from './list-lecturer-detail/list-lecturer-detail.component';

interface MyState {
  data: LECTURES[];
  level: LEVEL[];
  filed: FIELD[];
  contract: CONTRACT[];
  lecturerDetail: LECTURER_DETAIL[];
  lecturerId: any;
  visible: boolean;
  faculty: FACULTY[];
}
interface IProps {
}
export default class LecturerManagement extends React.Component<IProps, MyState> {
  divRef:any = React.createRef<HTMLDivElement>();
  constructor(props: MyState) {
    super(props)
    this.state = {
      data: [],
      level: [],
      filed: [],
      contract: [],
      lecturerDetail: [],
      lecturerId: 0,
      visible: false,
      faculty: []
    };
  }

  componentDidMount() {
    this.getLecturer();
    this.getListFaculty();
    this.getListContract();
  }
  dataSource: any;
  filter = {
    search: '',
  }

  getLecturer = () => {
    axios.get(`${environment.url}/lecturer`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        params: { ...this.filter }
      })
      .then(res => {
        const dataSource: LECTURES[] = res.data.contents;
        this.setState({ ...this.state, data: dataSource })
        console.log(this.state.data)
        return this.dataSource;
      })
      .catch(e => console.log(e))
  }

  handleChange = (e: any) => {
    this.filter.search = e.target.value;
  }

  showModal = () => {
    this.setState({ visible: true })
  };

  handleCancel = () => {
    this.divRef.current.resetFields();
    this.setState({ visible: false })
  };
  
  onFinish = (values: any) => {
    console.log("===", values);
    this.createLecturer(values);
    this.divRef.current.resetFields();
    this.setState({ visible: false })
    this.getLecturer();
  };

  
  getListFaculty = () => {
    axios.get(`${environment.url}/faculty/all`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        }
      })
      .then(res => {
        const faculty: FACULTY[] = res.data;
        this.setState({ ...this.state, faculty: faculty })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getListContract = () => {
    axios.get(`${environment.url}/contract/all`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        }
      })
      .then(res => {
        const contract: CONTRACT[] = res.data;
        this.setState({...this.state, contract: contract})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createLecturer = (value: any) => {
    axios({
      method: 'post',
      url: `${environment.url}/user/register`,
      data: value, 
      headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        }
      })
      .then(res => {
          if (res.status === 200) {
              message.success({content: 'Success'})
          }
      }) 
      .catch(error => message.error({content: error.response.data.message}) )
  }


  columns: any = [
    {
        title: "Id",
        dataIndex: "lecturerId",
        key: "lecturerId"
      },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName"
    },
    {
      title: "Faculty Name",
      dataIndex: "faculty",
      key: "faculty"
    },
    {
      title: "Major",
      key: "major",
      dataIndex: "major"
    },
    {
      title: "Contract",
      key: "contract",
      dataIndex: "contract"
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) =>
        this.state.data.length >= 1 ? (
          <div>
            <LecturerManagementDetail id={record.lecturerId}/>
          </div>
        ) : null,
    },
  ];

  render() {

    const validateMessages = {
      required: '${label} is required!',
    }

    return (
      <div>
        
        <Breadcrumb style={{ margin: '16px 15px', fontSize: '20px' }}>
          <div style={{display: 'inline-block', fontWeight: 600}}>All Lecturer Present</div>
          <div style={{ display: 'inline-block', float: 'right' }}>
            <Button  onClick={this.showModal}>Add</Button>
            <Modal 
            footer={null}
            title="Add Lecturer"
            width={800}
             visible={this.state.visible}
              onCancel={this.handleCancel}>
            <Form 
            validateMessages={validateMessages}
            onFinish={this.onFinish}
            ref={this.divRef} 

            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            >
              <Row>
        <Col span={12}>
        <Form.Item name={'username'} 
        rules={[
          {
            required: true,
          },
        ]}
        label="Username">
         <Input />
        </Form.Item>
      </Col>
                <Col span={12}>    
            <Form.Item
            name={'fullName'}
            label="Full Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          </Col>
              </Row>
  <Row>
    <Col span={12}>
    <Form.Item name={'password'} label="Password" 
      rules={[
        {
          required: true,
        },
      ]}
    >
        <Input />
      </Form.Item>
    </Col>
    <Col span={12}>
        <Form.Item name={'major'} label="Major" 
        rules={[
          {
            required: true,
          },
        ]}
        >
        <Input />
        </Form.Item>
      </Col>
  </Row>
     
    <Row>
    <Col span={12}>
    <Form.Item name={'role'} 
    rules={[
      {
        required: true,
      },
    ]}
    label="Role">
          <Select
        >
        <Select.Option value="USER">USER</Select.Option>
        <Select.Option value="ADMIN">ADMIN</Select.Option>
        <Select.Option value="MANAGER">MANAGER</Select.Option>
      </Select>
      </Form.Item>
    </Col>
   
      <Col span={12}>
      <Form.Item
        name={'email'}
        label="Email"
        rules={[
          {
            required: true,
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
          </Col>
    </Row>

    <Row>
    <Col span={12}>
  <Form.Item name='contractId' label="Contract" rules={[{ required: true }]}>
<Select
              allowClear
            >
              {this.state.contract.length > 0
                ? this.state.contract.map((dataInformation: CONTRACT) => (
                  <Select.Option
                    value={dataInformation.contractId}
                    key={dataInformation.nameContract}
                  >
                    {dataInformation.nameContract}
                  </Select.Option>
                ))
                : null}
            </Select>
</Form.Item>
  </Col>
      <Col span={12}>
        <Form.Item name={'degree'}
        rules={[
          {
            required: true,
          },
        ]}
        label="Degree">
        <Input />
        </Form.Item>
      </Col>
    </Row>
<Row>
  <Col span={12}>
           <Form.Item name='facultyId' label="Faculty" rules={[{ required: true }]}>
              <Select
                allowClear
              >
                {this.state.faculty.length > 0
                  ? this.state.faculty.map((dataInformation: FACULTY) => (
                    <Select.Option
                      value={dataInformation.facultyId}
                      key={dataInformation.nameFaculty}
                    >
                      {dataInformation.nameFaculty}
                    </Select.Option>
                  ))
                  : null}
              </Select>
            </Form.Item>
  </Col>
  <Col span={12}>
        <Form.Item name={'position'}
        rules={[
          {
            required: true,
          },
        ]}
        label="Position">
        <Input />
        </Form.Item>
      </Col>

</Row>
      <Form.Item style={{ paddingLeft: '90%'}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
            </Modal>

            <Popover content={<div>
              <div>
                <span style={{ display: 'inline-block', width: '25%' }}>Keyword </span>
                <Input style={{ borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block' }} onChange={this.handleChange} />
              </div>
              <div style={{ padding: '5% 0 5% 69% ' }}>
                <Button onClick={this.getLecturer}>Search</Button>
              </div>
            </div>} title="Search" trigger="click">
              <Button>Search</Button>
            </Popover>


            
          </div>
        </Breadcrumb>



        
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, margin: '0 15px' }}>
          <Table
            columns={this.columns}
            dataSource={this.state.data}
          />
        </div>
      </div>
    )
  }
}