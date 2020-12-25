
import { Button, Card, Col, Row,Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import * as React from 'react';
import { environment } from '../../environment/environment';
import { CONTRACT, DETAIL_FACULTY, DETAIL_TOPIC_LECTURER, FACULTY, FIELD, LEVEL, TEAM } from '../../types/components/Topic';

interface MyState {
  data: DETAIL_TOPIC_LECTURER[];
  level: LEVEL[];
  filed: FIELD[];
  contract: CONTRACT[];
  team: TEAM[];
  display: boolean;
}
interface IProps {
  id?: any,
}
export class ListLecturerDetail extends React.Component<IProps, MyState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      data: [],
      level: [],
      filed: [],
      contract: [],
      team: [],
      display: false,
    };
  }

  componentDidMount() {
    // this.getLecturerDetail();
  }
  dataSource: any;

  pagination = {
    page: 0,
    totalItem: 0,
    amount: 0,
  };

  lecturer= {
    lecturerId: undefined,
    dob: '',
    fullName: '',
    major: '',
    email: '',
    phone: '',
    degree: '',
    contract: '',
    faculty: '',
    position: ''
  }

  getLecturerDetail = () => {
    axios.get(`${environment.url}/faculty/lecturer/detail/${this.props.id}`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
      })
      .then(res => {

        this.lecturer = {
          lecturerId: res.data.lecturer.lecturerId,
          dob: res.data.lecturer.dob,
          fullName: res.data.lecturer.fullName,
          major: res.data.lecturer.major,
          email: res.data.lecturer.email,
          phone: res.data.lecturer.phone,
          degree: res.data.lecturer.degree,
          contract: res.data.lecturer.contract,
          faculty: res.data.lecturer.faculty,
          position: res.data.lecturer.position
        }

        const dataSource: DETAIL_TOPIC_LECTURER[] = res.data.listTopicRegister;
        dataSource.map((el: any) => {
          el.topicId = el.topic.topicId;
          el.nameTopic = el.topic.nameTopic;
          el.year = el.topic.year;
          el.nameFaculty = el.topic.faculty.nameFaculty;
        })
        this.setState({ ...this.state, data: dataSource })
        console.log(this.state.data)
        return this.dataSource;
      })
      .catch(e => console.log(e))
  }

  showModalEdit = () => {
    this.setState({ display: true });
    this.getLecturerDetail();
  }

  columns: any = [
    {
      title: "Id",
      dataIndex: "topicId",
      key: "topicId"
    },
    {
      title: "Name Topic",
      dataIndex: "nameTopic",
      key: "nameTopic"
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year"
    },
    {
      title: "Name Faculty",
      dataIndex: "nameFaculty",
      key: "nameFaculty"
    },
    {
      title: "Date Register",
      dataIndex: "dateRegister",
      key: "dateRegister"
    },
    {
      title: "Date Approve",
      dataIndex: "dateApprove",
      key: "dateApprove"
    },
    {
      title: "Finish",
      key: "finish",
      dataIndex: "finish"
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result"
    },
  ];
  render() {
    
    return (
      <div>
        <Button onClick={this.showModalEdit}>Detail </Button>
        <Modal
          visible={this.state.display}
          title="Add Topic"
          width="1200px"
          onCancel={() => this.setState({ display: false })}
          footer={null}>
      <div style={{overflow: 'hidden', margin: '0 15px' }}>
      <div style={{background: 'white',
                   margin: '4% 1.5%',
                   padding: '2%',
                    }}>

          <Card style={{ width: "100%" }}>
              <Row>
                <Col span={3}>
                    <span> <strong>Lecturer Id</strong>  </span>
                </Col>
                <Col span={9}>
                  {this.lecturer.lecturerId}
                </Col>
                <Col span={3}> 
                <span> <strong>Full Name</strong>  </span>
                </Col>
                <Col span={9}> 
                {this.lecturer.fullName}
                </Col>
              </Row>
              <Row>
                <Col span={3}> <span> <strong>Day of birth</strong></span>
                </Col>
                <Col span={9}>
                 {this.lecturer.dob}
                 </Col>
                <Col span={3}> <span> <strong>Email</strong> </span>
                </Col>
                <Col span={9}>
                 {this.lecturer.email}
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                   <span> <strong>Phone</strong> </span>
                </Col>
                <Col span={9}>
                    {this.lecturer.phone}
                </Col>
                <Col span={3}> <span> <strong>Major</strong>  </span>
                </Col>
                <Col span={9}>
                 {this.lecturer.major}</Col>
              </Row>
              <Row>
                <Col span={3}> <span> <strong>Degree</strong>  </span>
                </Col>
                <Col span={9}>
                 {this.lecturer.degree}</Col>
                <Col span={3}> <span> <strong>Faculty</strong></span>
                </Col>
                <Col span={9}>
                 {this.lecturer.faculty}</Col>
              </Row>
              <Row>
                <Col span={3}> <span> <strong>Contract</strong>  </span>
                </Col>
                <Col span={9}>
                 {this.lecturer.contract}</Col>
                <Col span={3}> <span> <strong>Position</strong></span>
                </Col>
                <Col span={9}>
                 {this.lecturer.position}</Col>
              </Row>
          </Card>

      </div>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360}}>
        <Table 
        columns={this.columns} 
        dataSource={this.state.data}
        pagination={false}
        />
      </div>
    </div>
    </Modal>
    </div>
  );
}
}

export default ListLecturerDetail;