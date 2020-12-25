
import { Button, Card, Col, Input, Modal, Popover, Row, Space, Steps, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { FACULTY, LEVEL, FIELD, CONTRACT, MYTOPIC, LECTURER_DETAIL, LECTURES } from "../types/components/Topic/index";
import './list-lecturer.component.css'
import { StarOutlined } from '@ant-design/icons';
import ListLecturerDetail from './list-lecturer-detail/list-lecturer-detail.component';

interface MyState {
  data: LECTURES[];
  level: LEVEL[];
  filed: FIELD[];
  contract: CONTRACT[];
  lecturerDetail: LECTURER_DETAIL[];
  lecturerId: any;
}
interface IProps {
}
export default class ListLecturer extends React.Component<IProps, MyState> {
  constructor(props: MyState) {
    super(props)
    this.state = {
      data: [],
      level: [],
      filed: [],
      contract: [],
      lecturerDetail: [],
      lecturerId: 0,
    };
  }

  componentDidMount() {
    this.getLecturer();
  }
  dataSource: any;
  filter = {
    search: '',
  }

  getLecturer = () => {
    axios.get(`${environment.url}/faculty/lecturer`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        params: { ...this.filter }
      })
      .then(res => {
        const dataSource: LECTURES[] = res.data.contents;
        this.setState({ ...this.state, data: dataSource })
        console.log(this.state.data)
        return this.dataSource;
      })
      .catch(e => console.log(e))
  }

  handleChange = (e: any) => {
    this.filter.search = e.target.value;
  }

  columns: any = [
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
      title: "Day of birth",
      dataIndex: "dob",
      key: "dob"
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
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) =>
        this.state.data.length >= 1 ? (
          <div>
            <ListLecturerDetail id={record.lecturerId}/>
          </div>
        ) : null,
    },
  ];

  render() {
    return (
      <div>
        <div style={{ margin: '40px' }}>
          <div style={{ float: 'right', margin: '10px 40px 30px 0' }}>
            <Popover content={<div>
              <div>
                <span style={{ display: 'inline-block', width: '25%' }}>Keyword </span>
                <Input style={{ borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block' }} onChange={this.handleChange} />
              </div>
              <div style={{ padding: '5% 0 5% 69% ' }}>
                <Button onClick={this.getLecturer}>Search</Button>
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