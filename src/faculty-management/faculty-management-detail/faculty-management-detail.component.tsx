
import { Button, Card, Col, Row,Table, Tabs, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import * as React from 'react';
import { environment } from '../../environment/environment';
import { LECTURES, TOPIC } from '../../types/components/Topic';

interface MyState {
  data: LECTURES[];
  topic: TOPIC[];
  display: boolean;
}
interface IProps {
  id?: any,
}
export class FacultyManagementDetail extends React.Component<IProps, MyState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      data: [],
      topic: [],
      display: false,
    };
  }

  componentDidMount() {
  }

  getLecturerDetail = () => {
    axios.get(`${environment.url}/faculty/${this.props.id}`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
      })
      .then(res => {
        const dataSource: LECTURES[] = res.data.data.lecturers;
        const dataTopic: TOPIC[] = res.data.data.topics;


        dataTopic.map((ele: TOPIC) => {
            ele.nameFaculty = ele.faculty.nameFaculty;
            ele.nameLevel = ele.level.nameLevel;
            ele.fieldName = ele.fieldTopic.fieldName;
        }
          );
        this.setState({ ...this.state, data: dataSource, topic: dataTopic })

        console.log(this.state.topic)
      })
      .catch(e => console.log(e))
  }

  showModalEdit = () => {
    this.setState({ display: true });
    this.getLecturerDetail();
  }

  columnsTopic: any = [
    {
      title: "ID",
      dataIndex: "topicId",
      key: "topicId"
    },
    {
      title: "Name",
      dataIndex: "nameTopic",
      key: "nameTopic"
    },
    {
      title: "Faculty",
      dataIndex: "nameFaculty",
      key: "nameFaculty"
    },
    {
      title: "Level",
      dataIndex: "nameLevel",
      key: "nameLevel"
    },
    {
      title: "Field",
      key: "fieldName",
      dataIndex: "fieldName"
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
        {status == 'ACTIVE' &&    <Tag color={'green'} key={status}>
                  {status}
                </Tag>
        }   

        {status == 'DELETED' &&    <Tag color={'volcano'} key={status}>
                  {status}
                </Tag>
        }   

        </span>
      ),
    },
    {
      title: "Last Updated",
      key: "updatedAt",
      dataIndex: "updatedAt"
    },
  ];

  columnsLecturer: any = [
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
  ];
  render() {
    
const { TabPane } = Tabs;
    return (
      <div>
        <Button onClick={this.showModalEdit}>Detail </Button>
        <Modal
          visible={this.state.display}
          title="Faculty"
          width="1200px"
          onCancel={() => this.setState({ display: false })}
          footer={null}>

<Tabs defaultActiveKey="1">
    <TabPane tab="List Lecturer" key="1">
    <div style={{overflow: 'hidden', margin: '0 15px' }}>
    <div className="site-layout-background" style={{ padding: 10, minHeight: 360}}>
        <Table 
        columns={this.columnsLecturer} 
        dataSource={this.state.data}
        />
      </div>
    </div>
    </TabPane>
    <TabPane tab="List Topic" key="2">
    <div style={{overflow: 'hidden', margin: '0 15px' }}>
    <div className="site-layout-background" style={{ padding: 10, minHeight: 360}}>
        <Table 
        columns={this.columnsTopic} 
        dataSource={this.state.topic}
        />
      </div>
    </div>
    </TabPane>
  </Tabs>
    </Modal>
    </div>
  );
}
}

export default FacultyManagementDetail;