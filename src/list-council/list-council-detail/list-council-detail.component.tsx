
import { Button, Card, Col, Row,Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import * as React from 'react';
import { environment } from '../../environment/environment';
import { CONTRACT, DETAIL_FACULTY, DETAIL_TOPIC_LECTURER, FACULTY, FIELD, LEVEL, TEAM } from '../../types/components/Topic';

interface MyState {
  data: DETAIL_TOPIC_LECTURER[];
  team: TEAM[];
  display: boolean;
}
interface IProps {
  id?: any,
}
export class ListCouncilDetail extends React.Component<IProps, MyState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      data: [],
      team: [],
      display: false,
    };
  }

  componentDidMount() {
    this.getLecturerDetail();
  }
  dataSource: any;
  getLecturerDetail = () => {
    axios.get(`${environment.url}/faculty/lecturer/detail/${this.props.id}`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
      })
      .then(res => {

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

  columnsUser: any = [
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
  ];

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
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360}}>

      <Table 
        columns={this.columnsUser} 
        dataSource={this.state.data}
        pagination={false}
        style={{width: '35%'}}
      />

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

export default ListCouncilDetail;