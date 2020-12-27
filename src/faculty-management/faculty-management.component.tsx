
import { Button, Card, Col, Input, Modal, Popover, Row, Space, Steps, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { FACULTY, LEVEL, FIELD, CONTRACT, MYTOPIC, LECTURER_DETAIL, LECTURES, LIST_COUNCIL, FACULTY_MANAGEMENT } from "../types/components/Topic/index";
import './faculty-management.component.css'
import FacultyManagementDetail from './faculty-management-detail/faculty-management-detail.component';
// import ListCouncilDetail from './list-council-detail/list-council-detail.component';

interface MyState {
  data: FACULTY_MANAGEMENT[];
}
interface IProps {
}
export default class FacultyManagement extends React.Component<IProps, MyState> {
  constructor(props: MyState) {
    super(props)
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getFaculty();
  }

  filter = {
    search: '',
  }

  getFaculty = () => {
    axios.get(`${environment.url}/faculty`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        params: { ...this.filter }
      })
      .then(res => {
        const dataSource: FACULTY_MANAGEMENT[] = res.data.contents;
        this.setState({ ...this.state, data: dataSource })
      })
      .catch(e => console.log(e))
  }

  handleChange = (e: any) => {
    this.filter.search = e.target.value;
  }
  
  columns: any = [
    {
        title: "Faculty Id",
        dataIndex: "facultyId",
        key: "facultyId"
      },
    {
      title: "Name Faculty",
      dataIndex: "nameFaculty",
      key: "nameFaculty"
    },
    {
      title: "Name University",
      dataIndex: "nameUniversity",
      key: "nameUniversity"
    },
    {
      title: "Total Topic",
      dataIndex: "totalTopic",
      key: "totalTopic"
    },
    {
        title: "Total Lecturer",
        dataIndex: "totalLecturer",
        key: "totalLecturer"
      },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) =>
        this.state.data.length >= 1 ? (
          <div>
            <FacultyManagementDetail id={record.facultyId}/>
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
                <Button onClick={this.getFaculty}>Search</Button>
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