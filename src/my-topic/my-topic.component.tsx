
import { Breadcrumb, Button, Descriptions, Dropdown, Input, Menu, Popover, Select, Space, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { FACULTY, TOPIC, LEVEL, FIELD, LECTURES, CONTRACT, MYTOPIC } from "../types/components/Topic/index";
import { getFaculty } from '../types/components/Topic/topic.component.services'
import { DownOutlined } from '@ant-design/icons';
import './my-topic.component.css'

interface MyState {
  data: MYTOPIC[];
  faculty: FACULTY[];
  level: LEVEL[];
  filed: FIELD[];
  contract: CONTRACT[];
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
    };

  }

  componentDidMount() {
    this.getTopic();
  }
  dataSource: any;
  filter = {
    search: '',
  }
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
        console.log(res.data)
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
  ];

  render() {
    return (
      <div>
        <div style={{margin: '40px'}}>
          <div style={{ float: 'right', margin: '10px 40px 30px 0' }}>
            <Popover content={<div>
         <div>
        <span style={{display: 'inline-block', width: '25%'}}>Keyword </span>
        <Input style={{ borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block' }} onChange={this.handleChange} />
      </div>
      <div style={{padding: '5% 0 5% 69% '}}>
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