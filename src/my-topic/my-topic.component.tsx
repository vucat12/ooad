
import { Button, Card, Col, Input, Modal, Popover, Row, Space, Steps, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { FACULTY, LEVEL, FIELD, CONTRACT, MYTOPIC, LECTURER_DETAIL } from "../types/components/Topic/index";
import './my-topic.component.css'
import { LikeOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';

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
  filter = {
    search: '',
  }

  topicDetail = {
    fullName: '',
    nameTopic: '',
    description: '',
    nameFaculty: '',
    nameLevel: '',
    fieldName: ''
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
    this.setState({ visible: true })
    console.log("==========teamId============", teamId, "----topicId---", topicId)
    this.getDetailTopic(teamId, topicId)
  }

  onOk = () => {
    this.setState({ visible: false })
  }

  onCancel = () => {
    this.setState({ visible: false })
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
          fieldName: res.data.topic.fieldTopic.fieldName
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
      title: "Description",
      key: "description",
      dataIndex: "description"
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status"
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
          title="Add Topic"
          width="1200px"
          onCancel={this.onCancel}
          onOk={this.onOk}
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
                      <Col span={19}>
                        {this.topicDetail.fullName}
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span={5}>
                        <span><strong>Name Topic: </strong> </span>
                      </Col>
                      <Col span={19}>
                        {this.topicDetail.nameTopic}
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span={5}>
                        <span><strong>Description: </strong> </span>
                      </Col>
                      <Col span={19}>
                        {this.topicDetail.description}
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span={5}>
                        <span><strong>Name Faculty: </strong></span>
                      </Col>
                      <Col span={19}>
                        {this.topicDetail.nameFaculty}
                      </Col>
                    </Row>

                    <Row gutter={[8, 8]}>
                      <Col span={5}>
                        <span><strong>Name Level: </strong></span>
                      </Col>
                      <Col span={19}>
                        {this.topicDetail.nameLevel}
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
                {/* Here */}
                {this.stepList.universityReview == undefined ?
                  <Steps current={this.stepList.current} status= {this.stepList.status == 'error' ? 'error' : this.stepList.status == 'process'? 'process' : "finish"}>
                    <Step title="Start" description="This is a description." />
                    <Step title="Faculty Review" description="This is a description." />
                    <Step title="Accept" description="This is a description." />
                  </Steps>
                  :
                  <Steps current={this.stepList.current} status= {this.stepList.status == 'error' ? 'error' : this.stepList.status == 'process'? 'process' : "finish"}>
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

        <div style={{ margin: '40px' }}>
          <div style={{ float: 'right', margin: '10px 40px 30px 0' }}>
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