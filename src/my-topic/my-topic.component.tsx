
import { Breadcrumb, Button, Card, Col, Input, message, Modal, Popover, Row, Space, Steps, Table, Tag } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { FACULTY, LEVEL, FIELD, CONTRACT, MYTOPIC, LECTURER_DETAIL } from "../types/components/Topic/index";
import './my-topic.component.css'
import { CheckCircleOutlined, CloseCircleOutlined, LikeOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined, StarOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';

interface MyState {
  data: MYTOPIC[];
  faculty: FACULTY[];
  level: LEVEL[];
  filed: FIELD[];
  contract: CONTRACT[];
  visible: boolean;
  lecturerDetail: LECTURER_DETAIL[];
}
interface IProps {
}
export default class MyTopic extends React.Component<IProps, MyState> {
  constructor(props: MyState) {
    super(props)
    this.state = {
      data: [],
      faculty: [],
      level: [],
      filed: [],
      contract: [],
      visible: false,
      lecturerDetail: [],
    };
  }

  componentDidMount() {
    this.getTopic();
  }
  dataSource: any;
  teamId: any;
  topicId: any;
  filter = {
    search: '',
  }

  topicDetail = {
    fullName: '',
    nameTopic: '',
    description: '',
    nameFaculty: '',
    nameLevel: '',
    fieldName: '',
    dateApproved: '',
    dateExpired: '',
    dateExtend: '',
    finish: '',
    result: undefined,
  }

  facultyList: any;
  levelList: any;
  fieldList: any;
  contractList: any;
  clear: any;

  stepList = {
    start: '',
    facultyReview: '',
    universityReview: '',
    completed: '',
    current: 0,
    status: '',
  }
  info = {
    nameFaculty: '',
    nameUniversity: '',
    totalTopic: 0,
    totalLecturer: 0
  };

  getTopic = () => {
    axios.get(`${environment.url}/topic/my-topic`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        params: { ...this.filter }
      })
      .then(res => {
        const dataSource: MYTOPIC[] = res.data;
        this.setState({ ...this.state, data: dataSource })
        return this.dataSource;
      })
      .catch(e => console.log(e))
  }

  clearData = () => {
    this.filter = {
      search: '',
    }
    this.getTopic();
  }

  handleChange = (e: any) => {
    this.filter.search = e.target.value;
  }

  showModalEdit = (teamId: any, topicId: any) => {
    this.teamId = teamId;
    this.topicId = topicId;
    this.setState({ visible: true })
    this.getDetailTopic(teamId, topicId)
  }

  onCancel = () => {
    this.setState({ visible: false })
  }

  maintainDetailTopic = () => {
    axios({
        method: 'put',
        url: `${environment.url}/topic/my-topic`,
        headers: {
            Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        data: {
          "topicId": this.topicId,
          "teamId": this.teamId,
          "dateExtend": '6',
        }
        })
        .then(res => {
          if (res.status === 200) {
              message.success({content: 'Success'})
              this.getTopic();
          }
        }) 
        .catch(error => message.error({content: error.response.data.message}) )
    this.setState({ visible: false});
  }

  approveDetailTopic = () => {
    axios({
        method: 'put',
        url: `${environment.url}/topic/my-topic`,
        headers: {
            Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        data: {
          "topicId": this.topicId,
          "teamId": this.teamId,
          "finish": true,
        }
        })
        .then(res => {
          if (res.status === 200) {
              message.success({content: 'Success'})
              this.getTopic();
          }
        }) 
        .catch(error => message.error({content: error.response.data.message}) )
    this.setState({ visible: false});
  }

  getDetailTopic = (teamId: any, topicId: any) => {
    axios.get(`${environment.url}/topic/my-topic/${topicId}/${teamId}`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
      })
      .then(res => {
        const lecturerDetail: LECTURER_DETAIL[] = res.data.team;
        this.topicDetail = {
          fullName: res.data.topic.updatedBy.fullName,
          nameTopic: res.data.topic.nameTopic,
          description: res.data.topic.description,
          nameFaculty: res.data.topic.faculty.nameFaculty,
          nameLevel: res.data.topic.level.nameLevel,
          fieldName: res.data.topic.fieldTopic.fieldName,
          dateApproved:  res.data.dateApproved,
          dateExpired: res.data.dateExpired,
          dateExtend: res.data.dateExtend,
          finish: res.data.finish,
          result: res.data.result,
        }
        
        this.stepList = {
          start: res.data.start,
          facultyReview: res.data.facultyReview,
          universityReview: res.data.universityReview,
          completed: res.data.completed,
          current: res.data.current,
          status: res.data.status
        }


        this.setState({ ...this.state, lecturerDetail: lecturerDetail })
        console.log(this.topicDetail, this.stepList)
      })
      .catch(e => console.log(e))
  }

  columns: any = [
    {
      title: "ID",
      dataIndex: "topicId",
      key: "topicId"
    },
    {
      title: "Name of Topic",
      dataIndex: "nameTopic",
      key: "nameTopic"
    },
    {
      title: "Faculty Name",
      dataIndex: "facultyName",
      key: "facultyName"
    },
    {
      title: "Level Name",
      dataIndex: "levelName",
      key: "levelName"
    },
    {
      title: "Field Topic",
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
        {status == 'Completed' &&    <Tag icon={<CheckCircleOutlined />} color={'success'} key={status}>
                  {status.toUpperCase()}
                </Tag>
        }   

        {status == 'University Review' &&    <Tag icon={<SyncOutlined spin />} color={'processing'} key={status}>
                  {status.toUpperCase()}
                </Tag>
        }  

        {status == 'Faculty Review' &&    <Tag icon={<SyncOutlined spin />} color={'processing'} key={status}>
                  {status.toUpperCase()}
                </Tag>
        }   

          {status == 'Decline' &&    <Tag icon={<CloseCircleOutlined />} color={'red'} key={status}>
                  {status.toUpperCase()}
                </Tag>
        }   
        </span>
      ),
    },
    {
      title: "Finish",
      key: "finish",
      dataIndex: "finish",
      render: (result: any) => (
        <span>
        {result == 'NOT COMPLETED' &&    <Tag color={'volcano'} key={result}>
                  {result}
                </Tag>
        }   

        {result == 'COMPLETED' &&    <Tag color={'green'} key={result}>
                  {result}
                </Tag>
        }  

    
        </span>
      ),
    },
    {
      title: "Result",
      key: "result",
      dataIndex: "result",
      render: (result: any) => (
        <span>
        {result == 'NOT YET RATE' &&    <Tag color={'geekblue'} key={result}>
                  {result}
                </Tag>
        }   

        {result == 'FAIL' &&    <Tag color={'volcano'} key={result}>
                  {result}
                </Tag>
        }  

        {result == 'PASS' &&    <Tag color={'green'} key={result}>
                  {result}
                </Tag>
        }   
        </span>
      ),
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) =>
        this.state.data.length >= 1 ? (
          <div>
            <Button onClick={() => this.showModalEdit(record.teamId, record.topicId)}>Detail</Button>
          </div>
        ) : null,
    },
  ];

  render() {
    const { Step } = Steps;
    return (
      <div>
        <Modal
          visible={this.state.visible}
          title="Detail Register Topic"
          width="1200px"
          onCancel={this.onCancel}
          footer={[
            <Button key="1" type="primary" onClick={this.approveDetailTopic} disabled={this.stepList.status !== "finish" || this.topicDetail.finish == 'COMPLETED' ? true : false}>Complete</Button>,
            <Button key="2" style={{backgroundColor: '#FA8072', color: 'white'}} onClick={this.maintainDetailTopic} disabled={this.stepList.status !== "finish" || this.topicDetail.finish == 'COMPLETED' ? true : false || this.topicDetail.dateExtend != '0' ? true : false}>Maintain</Button>,
            <Button key="3" onClick={this.onCancel}>
                Cancel
            </Button>
          ]}
        >
          <div>
            <Row gutter={[24, 24]}>
              <Col span={12} >
                <Space direction="horizontal">
                  <Card title="List Member" style={{ width: '450px', marginTop: "-24px" }}>
                    <Row gutter={[24, 8]}>
                      <Col span={14}>
                        <span><strong>Member 1: </strong>{this.state.lecturerDetail[0]?.fullName}</span>
                      </Col>
                      <Col span={8}>
                        <span> <strong>Position: </strong>  {this.state.lecturerDetail[0]?.position}</span>
                      </Col>
                      <Col span={2}>
                        <span>{(this.state.lecturerDetail[0]?.primary === true ? <StarOutlined style={{ color: 'red' }} /> : '')}</span>
                      </Col>
                    </Row>
                    <Row gutter={[24, 8]}>
                      <Col span={14}>
                        <span><strong>Member 2: </strong>{this.state.lecturerDetail[1]?.fullName}</span>
                      </Col>
                      <Col span={8}>
                        <span> <strong>Position: </strong>  {this.state.lecturerDetail[1]?.position}</span>
                      </Col>
                      <Col span={2}>
                        <span>{(this.state.lecturerDetail[1]?.primary === true ? <StarOutlined style={{ color: 'red' }} /> : '')}</span>
                      </Col>
                    </Row>
                    <Row gutter={[24, 8]}>
                      <Col span={14}>
                        <span><strong>Member 3: </strong>{this.state.lecturerDetail[2]?.fullName}</span>
                      </Col>
                      <Col span={8}>
                        <span> <strong>Position: </strong>  {this.state.lecturerDetail[2]?.position}</span>
                      </Col>
                      <Col span={2}>
                        <span>{(this.state.lecturerDetail[2]?.primary === true ? <StarOutlined style={{ color: 'red' }} /> : '')}</span>
                      </Col>
                    </Row>
                    <Row gutter={[24, 8]}>
                      <Col span={14}>
                        <span><strong>Member 4: </strong>{this.state.lecturerDetail[3]?.fullName}</span>
                      </Col>
                      <Col span={8}>
                        <span> <strong>Position: </strong>  {this.state.lecturerDetail[3]?.position}</span>
                      </Col>
                      <Col span={2}>
                        <span>{(this.state.lecturerDetail[3]?.primary === true ? <StarOutlined style={{ color: 'red' }} /> : '')}</span>
                      </Col>
                    </Row>
                    <Row gutter={[24, 8]}>
                      <Col span={14}>
                        <span><strong>Member 5: </strong>{this.state.lecturerDetail[4]?.fullName}</span>
                      </Col>
                      <Col span={8}>
                        <span> <strong>Position: </strong>  {this.state.lecturerDetail[4]?.position}</span>
                      </Col>
                      <Col span={2}>
                        <span>{(this.state.lecturerDetail[4]?.primary === true ? <StarOutlined style={{ color: 'red' }} /> : '')}</span>
                      </Col>
                    </Row>
                  </Card>
                  <Card title="Topic Detail" style={{ width: '650px', marginLeft: '45px' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={5}>
                        <span><strong>Last updated by: </strong></span>
                      </Col>
                      <Col span={9}>
                        {this.topicDetail.fullName}
                      </Col>
                      <Col span={5}>
                          <span><strong>Date Approved</strong></span>
                      </Col>
                      <Col span={5}>
                        {this.topicDetail.dateApproved}
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span={5}>
                        <span><strong>Name Topic: </strong> </span>
                      </Col>
                      <Col span={9}>
                        {this.topicDetail.nameTopic}
                      </Col>
                      <Col span={5}>
                        <span><strong>Date Expired </strong> </span>
                      </Col>
                      <Col span={5}>
                      {this.topicDetail.dateExpired} 
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span={5}>
                        <span><strong>Description: </strong> </span>
                      </Col>
                      <Col span={9}>
                        {this.topicDetail.description}
                      </Col>
                      <Col span={5}>
                        <span><strong>Month Maintain </strong> </span>
                      </Col>
                      <Col span={5}>
                      {this.topicDetail.dateExtend} Months
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span={5}>
                        <span><strong>Name Faculty: </strong></span>
                      </Col>
                      <Col span={9}>
                        {this.topicDetail.nameFaculty}
                      </Col>
                      <Col span={5}>
                        <span><strong>Finish </strong> </span>
                      </Col>
                      <Col span={5}>
                      {this.topicDetail.finish == 'COMPLETED' ?  <Tag color={'green'} key={this.topicDetail.finish}>
                  {this.topicDetail.finish}
                </Tag> : <Tag color={'volcano'} key={this.topicDetail.finish}>
                  {this.topicDetail.finish}
                </Tag>}
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span={5}>
                        <span><strong>Name Level: </strong></span>
                      </Col>
                      <Col span={9}>
                        {this.topicDetail.nameLevel}
                      </Col>
                      <Col span={5}>
                        <span><strong>Result </strong> </span>
                      </Col>
                      <Col span={5}>
                      {this.topicDetail.result == 'FAIL' &&  <Tag color={'volcano'} key={this.topicDetail.result}>{this.topicDetail.result}</Tag>}
                      {this.topicDetail.result == 'NOT YET RATE' &&  <Tag color={'geekblue'} key={this.topicDetail.result}>{this.topicDetail.result}</Tag>}
                      {this.topicDetail.result == 'PASS' &&  <Tag color={'green'} key={this.topicDetail.result}>{this.topicDetail.result}</Tag>}
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span={5}>
                        <span><strong>Field Name: </strong></span>
                      </Col>
                      <Col span={19}>
                        {this.topicDetail.fieldName}
                      </Col>
                    </Row>
                  </Card>
                </Space>
              </Col>
              <Col span={12} >

              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              <Col span={24} >
                {this.stepList.universityReview == undefined ?
                  <Steps current={this.stepList.current} percent={60} status= {this.stepList.status == 'error' ? 'error' : this.stepList.status == 'process'? 'process' : "finish"}>
                    <Step title="Start" description="This is a description." />
                    <Step title="Faculty Review" description="This is a description." />
                    <Step title="Accept" description="This is a description." />
                  </Steps>
                  :
                  <Steps current={this.stepList.current} percent={60} status= {this.stepList.status == 'error' ? 'error' : this.stepList.status == 'process'? 'process' : "finish"}>
                    <Step title="Start" description="This is a description." />
                    <Step title="Faculty Review" description="This is a description." />
                    <Step title="University Review" description="This is a description." />
                    <Step title="Accept" description="This is a description." />
                  </Steps>
                }
              </Col>
            </Row>
          </div>
        </Modal>

        <div>
        <Breadcrumb style={{ margin: '16px 15px', fontSize: '20px' }}>
          <div style={{display: 'inline-block', fontWeight: 600}}>My Topic Was Registered</div>
          <div style={{ display: 'inline-block', float: 'right' }}>
            <Popover content={<div>
              <div>
                <span style={{ display: 'inline-block', width: '25%' }}>Keyword </span>
                <Input style={{ borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block' }} onChange={this.handleChange} />
              </div>
              <div style={{ padding: '5% 0 5% 69% ' }}>
                <Button onClick={this.getTopic}>Search</Button>
              </div>
            </div>} title="Search" trigger="click">
              <Button>Search</Button>
            </Popover>
          </div>
          </Breadcrumb>
        </div>
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