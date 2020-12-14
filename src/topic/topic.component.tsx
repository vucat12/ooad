
import { Breadcrumb, Button, Dropdown, Input, Menu, Popover, Select, Space, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { FACULTY, TOPIC, LEVEL, FIELD } from "../types/components/Topic/index";
import { getFaculty } from '../types/components/Topic/topic.component.services'
import { DownOutlined } from '@ant-design/icons';
import './topic.component.css'

interface MyState {
  data: TOPIC[];
  faculty: FACULTY[];
  level: LEVEL[];
  filed: FIELD[];
}
interface IProps {
}
export default class Topic extends React.Component<IProps, MyState> {
  constructor(props: MyState) {
    super(props)
    this.state = {
      data: [],
      faculty: [],
      level: [],
      filed: [],
    };

  }
  
  // facultyList: any = [{
  //   facutyId: 0,
  //   nameFaculty: 'Cong nghe thong tin'
  // },{
  //   facutyId: 1,
  //   nameFaculty: 'Cong nghe thong tin 1'
  // },{
  //   facutyId: 2,
  //   nameFaculty: 'Cong nghe thong tin 2'
  // }];


  componentDidMount() {
    this.getTopic();
    this.getListFaculty()
    this.getListLevel();
    this.getListField();
  }
  dataSource: any;
  filter = {
    search: '',
    facultyId: undefined,
    levelId: undefined,
    fieldId: undefined,
    page: 1,
  }
  pagination = {
    page: 0,
    totalItem: 0,
    amount: 0,
  };
  facultyList: any;
  levelList: any;
  fieldList: any;
  clear: any;

  getListFaculty = () => {
    axios.get(`${environment.url}/faculty/all`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        }
      })
      .then(res => {
        const faculty: FACULTY[] = res.data;
        this.setState({...this.state, faculty: faculty})
        return this.facultyList;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getListField = () => {
    axios.get(`${environment.url}/field/all`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        }
      })
      .then(res => {
        const field: FIELD[] = res.data;
        this.setState({...this.state, filed: field})
        return this.fieldList;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getTopic = () => {
    axios.get(`${environment.url}/topic`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        params: { ...this.filter }
      })
      .then(res => {
        this.pagination.page = res.data.page;
        this.pagination.totalItem = res.data.totalItem;
        this.pagination.amount = res.data.amount;
        console.log(this.pagination)
        const dataSource: TOPIC[] = res.data.contents;
        dataSource.map((ele: TOPIC) => {
          ele.nameFaculty = ele.faculty.nameFaculty;
          ele.nameLevel = ele.level.nameLevel;
          ele.fieldName = ele.fieldTopic.fieldName
        }
        );
        this.setState({ ...this.state, data: dataSource })
        return this.dataSource;
      })
      .catch(e => console.log(e))
      this.filter.page=1;
  }

  clearData = () => {
    this.filter = {
      search: '',
      facultyId: undefined,
      levelId: undefined,
      fieldId: undefined,
      page: 1,
    }
    this.getTopic();
  }

  getListLevel = () => {
    axios.get(`${environment.url}/level/all`,
    {
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
      }
    })
    .then(res => {
      const level: LEVEL[] = res.data;
      this.setState({...this.state, level: level})
      return this.levelList;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  handleChange = (e: any) => {
    this.filter.search = e.target.value;
  }

  getValueFaculty = (e: any) => {
    this.filter.facultyId = e;
  }

  getValueLevel = (e: any) => {
    console.log(e)
    this.filter.levelId = e;
  }

  getValueFiled = (e: any) => {
    this.filter.fieldId =  e;
  }

  changePagination = (e: any, a: any) => {
    console.log('aaaaa', e)
    this.filter.page = e.current;
    this.getTopic();
  }

  columns: any = [
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
      title: "Last Updated",
      key: "updatedAt",
      dataIndex: "updatedAt"
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button>Register</Button>
        </Space>
      ),
    },
  ];


  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0', fontSize: '20px' }}>
          <Breadcrumb.Item>Software management of Science</Breadcrumb.Item>
          <div style={{ display: 'inline-block', float: 'right' }}>
            <Popover content={<div>
      <div>
        <span style={{display: 'inline-block', width: '25%'}}>Keyword </span>
        <Input style={{ borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block' }} onChange={this.handleChange} />
      </div>
      <div style={{marginTop: '5%'}}>
      <span style={{width: '25%', display: 'inline-block'}}>Faculty</span>
        <Select
              allowClear
              style={{borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block'}}
              onChange={this.getValueFaculty}
            >
              {this.state.faculty.length > 0
                ? this.state.faculty.map((dataInformation: FACULTY) => (
                  <Select.Option
                    value={dataInformation.facultyId}
                    key={dataInformation.nameFaculty}
                  >
                    {dataInformation.nameFaculty}
                  </Select.Option>
                ))
                : null}
            </Select>
      </div>
      <div style={{marginTop: '5%'}}>
      <span style={{width: '25%', display: 'inline-block'}}>Level</span>
        <Select
              allowClear
              style={{borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block'}}
              onChange={this.getValueLevel}
            >
              {this.state.level.length > 0
                ? this.state.level.map((dataInformation: LEVEL) => (
                  <Select.Option
                    value={dataInformation.levelId}
                    key={dataInformation.nameLevel}
                  >
                    {dataInformation.nameLevel}
                  </Select.Option>
                ))
                : null}
            </Select>
      </div>

      <div style={{marginTop: '5%'}}>
      <span style={{width: '25%', display: 'inline-block'}}>Field</span>
        <Select
               allowClear
              style={{borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block'}}
              onChange={this.getValueFiled}
            >
              {this.state.filed.length > 0
                ? this.state.filed.map((dataInformation: FIELD) => (
                  <Select.Option
                    value={dataInformation.fieldId}
                    key={dataInformation.fieldName}
                  >
                    {dataInformation.fieldName}
                  </Select.Option>
                ))
                : null}
            </Select>
      </div>
      <div style={{padding: '5% 0 5% 69% '}}>
        <Button onClick={this.getTopic}>Search</Button>
      </div>
    </div>} title="Search" trigger="click">
              <Button>Search</Button>
            </Popover>
          </div>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, margin: '0 15px' }}>
          <Table 
          columns={this.columns} 
          dataSource={this.state.data} 
          pagination = {
            {
              size: 'small',
              current: this.pagination.page,
              total: this.pagination.totalItem,
              pageSize: this.pagination.amount,
            }
          }
          onChange= {this.changePagination}
          />
        </div>
      </div>
    )
  }
}