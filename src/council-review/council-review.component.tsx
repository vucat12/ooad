
import { Button, Card, Col, Input, Modal, Popover, Row, Space, Steps, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { FACULTY, LEVEL, FIELD, CONTRACT, MYTOPIC, LECTURER_DETAIL, LECTURES, COUNCIL_REVIEW } from "../types/components/Topic/index";
import { StarOutlined } from '@ant-design/icons';
import './council-review.component.css'
import CouncilReviewDetail from './council-review-detail/council-review-detail.component';

interface MyState {
  data: COUNCIL_REVIEW[];
  listId: any;
}
interface IProps {
}
export default class CouncilReview extends React.Component<IProps, MyState> {
  constructor(props: MyState) {
    super(props)
    this.state = {
      data: [],
      listId: {
        topicId: undefined,
        councilId: undefined,
        teamId: undefined,
      }
    };
  }

  componentDidMount() {
    this.getCouncilReview();
  }

  getCouncilReview = () => {
    axios.get(`${environment.url}/council/review`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
      })
      .then(res => {
        console.log(res.data)
        const dataSource: COUNCIL_REVIEW[] = res.data;
        this.setState({ ...this.state, data: dataSource })
        console.log(this.state.data)
      })
      .catch(e => console.log(e))
  }

  columns: any = [
    {
        title: "Name Topic",
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
      dataIndex: "fieldTopic",
      key: "fieldTopic"
    },
    {
      title: "Score",
      key: "score",
      dataIndex: "score"
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) =>
        this.state.data.length >= 1 ? (
          <div>
            {record.topicId}
            {record.councilId}
            {record.teamId}
              <CouncilReviewDetail listId={{
                topicId: record.topicId,
                councilId: record.councilId,
                teamId: record.teamId,
              }}/>
          </div>
        ) : null,
    },
  ];

  render() {
    return (
      <div>
        <div style={{ margin: '40px' }}>
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