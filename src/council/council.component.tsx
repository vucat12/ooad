
import { Breadcrumb, Button, Form, Input, message, Select, Space, Table, Tag } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { NameLecturer, TOPIC } from "../types/components/Topic/index";
import './council.component.css'
import Modal from 'antd/lib/modal/Modal';

interface MyState {
  data: TOPIC[];
  visible: boolean;
  userDetail: NameLecturer[];
  topicId: number;
}
interface IProps {
}
export default class TopicCouncil extends React.Component<IProps, MyState> {
  divRef:any = React.createRef<HTMLDivElement>();
  constructor(props: MyState) {
    super(props)
    this.state = {
      data: [],
      visible: false,
      userDetail: [],
      topicId: 0,
    };
  }

  componentDidMount() {
    this.getTopic();
  }
  dataSource: any;
  getTopic = () => {
    axios.get(`${environment.url}/council/topic`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
      })
      .then(res => {
        const dataSource: TOPIC[] = res.data;
        dataSource.map((el: any) => {
            el.key = el.id;
        })
        this.setState({ ...this.state, data: dataSource })
        console.log(this.state.data)
        return this.dataSource;

      })
      .catch(e => console.log(e))
  }

  getListUser = (id: any) => {
    axios.get(`${environment.url}/lecturer/find-create-council/${id}`,
    {
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
      }, 
    })
    .then(res => {
      console.log(res)
      const userDetail: NameLecturer[] = res.data;
      this.setState({...this.state, userDetail: userDetail})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  createUser =  async (topicId: any, data: any) => {
    await axios({
      method: 'post',
      url: `${environment.url}/council/create-council/${topicId}`,
      data: data, 
      headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        }
      })
      .then(res => {
          if (res.status === 200) {
              message.success({ content: 'Success'})
          }
      }) 
      .catch(error => message.error({content: error.response.data.message}) )
  }

  showModal = (record: any) => {
    this.getListUser(record.topicId)
    this.setState({ visible: true, topicId: record.topicId })
  }

  onCancel = () => {
    this.setState({ visible: false })
    this.divRef.current.resetFields();
  }

  onFinish = async(values: any) => {
    const fullMember = [{
      "username": values.username,
      "positionId": 1,
    }, {
      "username": values.username1,
      "positionId": 2,
    }, {
      "username": values.username2,
      "positionId": 3,
    }, {
      "username": values.username3,
      "positionId": 4,
    }, {
      "username": values.username4,
      "positionId": 5,
    }]
    await this.createUser(this.state.topicId, fullMember);
    await this.getTopic();
    await this.setState({ visible: false })
    
  }

  columns: any = [
    {
      title: "Name",
      dataIndex: "nameTopic",
      key: "nameTopic"
    },
    {
      title: "Faculty",
      dataIndex: "facultyName",
      key: "facultyName"
    },
    {
      title: "Level",
      dataIndex: "levelName",
      key: "levelName"
    },
    {
      title: "Field",
      key: "fieldTopic",
      dataIndex: "fieldTopic"
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year"
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status: any) => (
        <span>
        {status == 'COMPLETED' &&    <Tag color={'green'} key={status}>
                  {status.toUpperCase()}
                </Tag>
        }   

        {status == 'NOT COMPLETED' &&    <Tag color={'volcano'} key={status}>
                  {status.toUpperCase()}
                </Tag>
        }   

        </span>
      ),
    },{
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => this.showModal(record)}>Create Council</Button>
        </Space>
      ),
    }
  ];

  render() {
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    return (
      <div>
       <Breadcrumb style={{ margin: '16px 15px', fontSize: '20px' }}>
          <div style={{display: 'inline-block', fontWeight: 600}}>List Topic Need To Create New Council</div>
      </Breadcrumb>        
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, margin: '0 15px' }}>
          <Table 
          columns={this.columns} 
          dataSource={this.state.data} 
          expandable={{
            expandedRowRender: record => <div style={{ margin: 0 }}>
             <div>
            {record.members[0]?.fullName != undefined ? <div style={{ width: '385px', display: 'inline-block' }}> Full Name: {record.members[0].fullName}</div> : undefined}
            {record.members[0]?.position != undefined ? <div style={{ display: 'inline-block' }}> Position: {record.members[0].position}</div> : undefined}
            </div>
             <div>
            {record.members[1]?.fullName != undefined ? <div style={{ width: '385px', display: 'inline-block' }}> Full Name: {record.members[1].fullName}</div> : undefined}
            {record.members[1]?.position != undefined ? <div style={{ display: 'inline-block' }}> Position: {record.members[1].position}</div> : undefined}
            </div>
            <div>
            {record.members[2]?.fullName != undefined ? <div style={{ width: '385px', display: 'inline-block' }}> Full Name: {record.members[2].fullName}</div> : undefined}
            {record.members[2]?.position != undefined ? <div style={{ display: 'inline-block' }}> Position: {record.members[2].position}</div> : undefined}
            </div>
      
            <div>
            {record.members[3]?.fullName != undefined ? <div style={{ width: '385px', display: 'inline-block' }}> Full Name: {record.members[3].fullName}</div> : undefined}
            {record.members[3]?.position != undefined ? <div style={{ display: 'inline-block' }}> Position: {record.members[3].position}</div> : undefined}
            </div>
      
            <div>
            {record.members[4]?.fullName != undefined ? <div style={{ width: '385px', display: 'inline-block' }}> Full Name: {record.members[4].fullName}</div> : undefined}
            {record.members[4]?.position != undefined ? <div style={{ display: 'inline-block' }}> Position: {record.members[4].position}</div> : undefined}
            </div>
            </div>,
            // expandedRowRender: record => () => this.detailMember(record),
          }}
          />
        </div>
        <Modal
          visible={this.state.visible}
          title="Create New Council"
          footer={null}
          width="36%"
          onCancel={this.onCancel}
          > 
            <div>
            <Form name="complex-form" onFinish={this.onFinish}
            validateMessages={validateMessages}
            ref={this.divRef} >
                <Form.Item
                name="username"
                label="President of Council"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', margin: '0 2%', width: '96%'}}
                >
                <Select
                allowClear
                showSearch
                >
                {this.state.userDetail.length > 0
                ? this.state.userDetail.map((dataInformation: NameLecturer) => (
                  <Select.Option
                    value={dataInformation.username}
                    key={dataInformation.username}
                  >
                    {dataInformation.username}
                  </Select.Option>
                ))
                : null}
              </Select>
                </Form.Item>
                <Form.Item
                name="username1"
                label="Reviewer 1"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: '96% ', margin: '0 2%'}}
                >
                <Select
                allowClear
                showSearch
                >
                {this.state.userDetail.length > 0
                ? this.state.userDetail.map((dataInformation: NameLecturer) => (
                  <Select.Option
                    value={dataInformation.username}
                    key={dataInformation.username}
                  >
                    {dataInformation.username}
                  </Select.Option>
                ))
                : null}
                </Select>

                </Form.Item>
              
                <Form.Item
                name="username2"
                label="Reviewer 2"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: '96% ', margin: '0 2%'}}
                >
                  <Select
                allowClear
                showSearch
                
                >
                {this.state.userDetail.length > 0
                ? this.state.userDetail.map((dataInformation: NameLecturer) => (
                  <Select.Option
                    value={dataInformation.username}
                    key={dataInformation.username}
                  >
                    {dataInformation.username}
                  </Select.Option>
                ))
                : null}
                </Select>
                </Form.Item>
                <Form.Item
                name="username3"
                label="Secretary"
                style={{ display: 'inline-block', width: '96% ', margin: '0 2%'}}
                >
                 <Select
                allowClear
                showSearch
                
                >
                {this.state.userDetail.length > 0
                ? this.state.userDetail.map((dataInformation: NameLecturer) => (
                  <Select.Option
                    value={dataInformation.username}
                    key={dataInformation.username}
                  >
                    {dataInformation.username}
                  </Select.Option>
                ))
                : null}
                </Select>
                </Form.Item>
                <Form.Item
                name="username4"
                label="Commissioner"
                style={{ display: 'inline-block', width: '96%', margin: '0 2%'}}
                >
                  <Select
                allowClear
                showSearch
                
                >
                {this.state.userDetail.length > 0
                ? this.state.userDetail.map((dataInformation: NameLecturer) => (
                  <Select.Option
                    value={dataInformation.username}
                    key={dataInformation.username}
                  >
                    {dataInformation.username}
                  </Select.Option>
                ))
                : null}
                </Select>
                </Form.Item>
              
              <Form.Item
               colon={false}
              >
                <div style={{float: 'right', paddingRight: '1.5%', paddingTop: '2%', transform: 'translateY(40%)'}}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button style={{marginLeft: 5}}  type="ghost" onClick={this.onCancel}>
                  Cancel
                </Button>
                </div>
              </Form.Item>
            </Form>
            </div>
          </Modal>
      

      </div>
    )
  }
}