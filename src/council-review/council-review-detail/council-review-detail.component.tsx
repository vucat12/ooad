
import { Button, Card, Col, Row,Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import * as React from 'react';
import { environment } from '../../environment/environment';
import { CONTRACT, DETAIL_FACULTY, DETAIL_TOPIC_LECTURER, FACULTY, FIELD, LEVEL, NameLecturer, TEAM } from '../../types/components/Topic';

interface MyState {
  data: NameLecturer[];
  team: TEAM[];
  display: boolean;
}
interface IProps {
  listId?: any;
}
export class CouncilReviewDetail extends React.Component<IProps, MyState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      data: [],
      team: [],
      display: false,
    };
  }

  topic ={
    updatedAt: '',
    fullName: '',
    topicId: undefined,
    nameTopic: '',
    year: undefined,
    description: '',
    nameFaculty: '',
    nameLevel: '',
    fieldName: '',
    status: ''
  }

  componentDidMount() {
  }

  getCouncilReview = () => {
      axios.get(`${environment.url}/council/review-detail`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        params:{ ...this.props.listId }
      })
      .then(res => {
        console.log(res.data)
        const dataSource: NameLecturer[] = res.data.members;
        this.setState({ ...this.state, data: dataSource })



        this.topic = {
          updatedAt: res.data.topic.updatedAt,
          fullName: res.data.topic.updatedBy.fullName,
          topicId: res.data.topic.topicId,
          nameTopic:  res.data.topic.nameTopic,
          year: res.data.topic.year,
          description: res.data.topic.description,
          nameFaculty: res.data.topic.faculty.nameFaculty,
          nameLevel: res.data.topic.level.nameLevel,
          fieldName: res.data.topic.fieldTopic.fieldName,
          status: res.data.topic.status
        }
        console.log(this.topic)
      })
      .catch(e => console.log(e))
  }

  showModalEdit = () => {
    console.log(this.props.listId)
    this.setState({ display: true });
    this.getCouncilReview();
  }

  columns: any = [
    {
      title: "Name Lecturer",
      dataIndex: "nameLecturer",
      key: "nameLecturer"
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position"
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score"
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment"
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

export default CouncilReviewDetail;