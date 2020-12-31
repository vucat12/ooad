
import { Button, Card, Col, Row,Table, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import * as React from 'react';
import { environment } from '../../environment/environment';
import { CONTRACT, DETAIL_FACULTY, FACULTY, FIELD, LEVEL, TEAM, TOPIC } from '../../types/components/Topic';

interface MyState {
  data: DETAIL_FACULTY[];
  faculty: FACULTY[];
  level: LEVEL[];
  filed: FIELD[];
  contract: CONTRACT[];
  team: TEAM[];
  display: boolean;
}
interface IProps {
  id?: any,
}
export class ListTopicDetail extends React.Component<IProps, MyState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      data: [],
      faculty: [],
      level: [],
      filed: [],
      contract: [],
      team: [],
      display: false,
    };
  }

  componentDidMount() {
   
  }
  dataSource: any;

  pagination = {
    page: 0,
    totalItem: 0,
    amount: 0,
  };
  facultyList: any;
  levelList: any;
  fieldList: any;
  contractList: any;
  clear: any;

  topic = {
        updatedAt: '',
        updatedBy: '',
        topicId: 0,
        nameTopic: '',
        description: '',
        nameFaculty: '',
        nameLevel: '',
        fieldName: ''
  }

  getTopic = () => {
    axios.get(`${environment.url}/faculty/topic/detail/${this.props.id}`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
      })
      .then(res => {
        this.topic = {
          updatedAt: res.data.topic.updatedAt,
          updatedBy: res.data.topic.updatedBy.fullName,
          topicId: res.data.topic.topicId,
          nameTopic: res.data.topic.nameTopic,
          description: res.data.topic.description,
          nameFaculty: res.data.topic.faculty.nameFaculty,
          nameLevel: res.data.topic.level.nameLevel,
          fieldName: res.data.topic.fieldTopic.fieldName
        }
        const dataSource: DETAIL_FACULTY[] = res.data.teamList;
        dataSource.map(x => { x.key = x.teamId })
        this.setState({ ...this.state, data: dataSource })
        return this.dataSource;
      })
      .catch(e => console.log(e))
  }
  
  getMemberDetail(id: any) {
    axios.get(`${environment.url}/team/${id}`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        }
      })
      .then(res => {
        console.log(res.data.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  showModalEdit = () => {
    this.setState({ display: true })
    this.getTopic();
  }

  columns: any = [
    {
      title: "Leader",
      dataIndex: "leader",
      key: "leader"
    },
    {
      title: "Date Approved",
      dataIndex: "dateApproved",
      key: "dateApproved"
    },
    {
      title: "Date Expired",
      dataIndex: "dateExpired",
      key: "dateExpired"
    },
    {
      title: "Date Extend",
      key: "dateExtend",
      dataIndex: "dateExtend"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => (
        <span>
        {status == 'finish' &&    <Tag color={'green'} key={status}>
                  {status.toUpperCase()}
                </Tag>
        }   

        {status == 'process' &&    <Tag color={'blue'} key={status}>
                  {status.toUpperCase()}
                </Tag>
        }   

{status == 'wait' &&    <Tag color={'green'} key={status}>
                  {status.toUpperCase()}
                </Tag>
        }   
        {status == 'error' &&    <Tag color={'volcano'} key={status}>
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
      render: (finish: any) => (
        <span>
        {finish == 'COMPLETED' &&  <Tag color={'green'} key={finish}>
                  {finish}
                </Tag>
        }   

        {finish == 'NOT COMPLETED' &&  <Tag color={'volcano'} key={finish}>
                  {finish}
                </Tag>
        }   

        </span>
      ),
    },
  ];
  render() {
    
    return (
      <div>
        <Button onClick={this.showModalEdit}>Detail </Button>
        <Modal
          visible={this.state.display}
          title="Detail Topic"
          width="1000px"
          onCancel={() => this.setState({ display: false })}
          footer={null}>
      <div style={{overflow: 'hidden', margin: '0 15px' }}>
      <div style={{background: 'white',
                   padding: '0 2%',
                    }}>
<div style={{ color: '#00000073', fontWeight: 'bold', fontSize: '15px', paddingBottom: '8px'}}>Infomation</div>
          <Card style={{ width: "100%" }}>
              <Row>
              <Col span={3}> <span> <strong> Topic ID </strong></span>
                </Col>
                <Col span={9}>
                  {this.topic.topicId}
                </Col>
                <Col span={3}> <span> <strong>Level</strong>  </span>
                </Col>
                <Col span={9}>
                 {this.topic.nameLevel}</Col>
               
              </Row>
              <Row>
              <Col span={3}>
                    <span> <strong>Title</strong>  </span>
                </Col>
                <Col span={9}>
                 {this.topic.nameTopic}
                 </Col>
                 <Col span={3}> <span> <strong>Field</strong>  </span>
                </Col>
                <Col span={9}>
                 {this.topic.fieldName}</Col>
               
              </Row>
              <Row>
              <Col span={3}> <span> <strong> Description </strong></span>
                </Col>
                <Col span={9}>
                 {this.topic.description}</Col>
                
              </Row>
              <Row>
              <Col span={3}>
                   <span> <strong>Faculty</strong> </span>
                </Col>
                <Col span={9}>
                    {this.topic.nameFaculty}
                </Col>
                <Col span={3}> 
                <span> <strong>Updated At</strong>  </span>
                </Col>
                <Col span={3}> 
                {this.topic.updatedAt}
                </Col>
                <Col span={1}> <span> <strong>By</strong> </span>
                </Col>
                <Col span={5}>
                 {this.topic.updatedBy}
                </Col>
              </Row>
          </Card>

      </div>
      <hr style={{
    margin: '32px 0 5px 0',
  }}/>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360}}>
      <div style={{ color: '#00000073', fontWeight: 'bold', fontSize: '15px', paddingBottom: '8px'}}>List Lecturer Register</div>
        <Table 
        columns={this.columns} 
        dataSource={this.state.data} 

        expandable={{
          expandedRowRender: record => <div style={{ margin: 0 }}>
      <div>
      {record.team[0]?.fullName != undefined ? <div style={{display: "inline-block", width: '300px'}}> Full Name: {record.team[0].fullName}</div> : undefined}
      {record.team[0]?.position != undefined ? <div style={{display: "inline-block"}}> Position: {record.team[0].position}</div> : undefined}
      </div>
       <div>
      {record.team[1]?.fullName != undefined ? <div style={{display: "inline-block", width: '300px'}}> Full Name: {record.team[1].fullName}</div> : undefined}
      {record.team[1]?.position != undefined ? <div style={{display: "inline-block"}}> Position: {record.team[1].position}</div> : undefined}
      </div>

      <div>
      {record.team[2]?.fullName != undefined ? <div style={{display: "inline-block", width: '300px'}}> Full Name: {record.team[2].fullName}</div> : undefined}
      {record.team[2]?.position != undefined ? <div style={{display: "inline-block"}}> Position: {record.team[2].position}</div> : undefined}
      </div>

      <div>
      {record.team[3]?.fullName != undefined ? <div style={{display: "inline-block", width: '300px'}}> Full Name: {record.team[3].fullName}</div> : undefined}
      {record.team[3]?.position != undefined ? <div style={{display: "inline-block"}}> Position: {record.team[3].position}</div> : undefined}
      </div>

      <div>
      {record.team[4]?.fullName != undefined ? <div style={{display: "inline-block", width: '300px'}}> Full Name: {record.team[4].fullName}</div> : undefined}
      {record.team[4]?.position != undefined ? <div style={{display: "inline-block"}}> Position: {record.team[4].position}</div> : undefined}
          </div>
          </div>,
          // expandedRowRender: record => () => this.detailMember(record),
        }}
        />
      </div>
    </div>
    </Modal>
    </div>
  );
}
}

export default ListTopicDetail;