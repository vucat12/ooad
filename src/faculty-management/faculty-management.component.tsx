
import { Breadcrumb, Button, Card, Col, Form, Input, message, Modal, Popover, Row, Space, Steps, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { FACULTY, LEVEL, FIELD, CONTRACT, MYTOPIC, LECTURER_DETAIL, LECTURES, LIST_COUNCIL, FACULTY_MANAGEMENT } from "../types/components/Topic/index";
import './faculty-management.component.css'
import FacultyManagementDetail from './faculty-management-detail/faculty-management-detail.component';
// import ListCouncilDetail from './list-council-detail/list-council-detail.component';

interface MyState {
  data: FACULTY_MANAGEMENT[];
  visible: boolean;
}
interface IProps {
}
export default class FacultyManagement extends React.Component<IProps, MyState> {
  divRef:any = React.createRef<HTMLDivElement>();
  constructor(props: MyState) {
    super(props)
    this.state = {
      data: [],
      visible: false
    };
  }

  componentDidMount() {
    this.getFaculty();
  }

  filter = {
    search: '',
  }

  createFaculty = (value: any) => {
    axios({
      method: 'post',
      url: `${environment.url}/faculty`,
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

  getFaculty = () => {
    axios.get(`${environment.url}/faculty`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        params: { ...this.filter }
      })
      .then(res => {
        const dataSource: FACULTY_MANAGEMENT[] = res.data.contents;
        this.setState({ ...this.state, data: dataSource })
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
    this.createFaculty(values)
    this.divRef.current.resetFields();
    this.setState({ visible: false })
    this.getFaculty();
  };
  
  columns: any = [
    {
        title: "Faculty Id",
        dataIndex: "facultyId",
        key: "facultyId"
      },
    {
      title: "Name Faculty",
      dataIndex: "nameFaculty",
      key: "nameFaculty"
    },
    {
      title: "Name University",
      dataIndex: "nameUniversity",
      key: "nameUniversity"
    },
    {
      title: "Total Topic",
      dataIndex: "totalTopic",
      key: "totalTopic"
    },
    {
        title: "Total Lecturer",
        dataIndex: "totalLecturer",
        key: "totalLecturer"
      },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) =>
        this.state.data.length >= 1 ? (
          <div>
            <FacultyManagementDetail id={record.facultyId}/>
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
          <div style={{display: 'inline-block', fontWeight: 600}}>All Faculty Present</div>
          <div style={{ display: 'inline-block', float: 'right' }}>

          <Button  onClick={this.showModal}>Add</Button>
            <Modal 
            footer={null}
            title="Add Faculty"
            width={500}
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
        <Form.Item name={'nameFaculty'} 
        rules={[
          {
            required: true,
          },
        ]}
        label="Faculty">
         <Input />
        </Form.Item>
            <Form.Item
            name={'nameUniversity'}
            label="University"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item style={{ paddingLeft: '83%'}}>
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
                <Button onClick={this.getFaculty}>Search</Button>
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