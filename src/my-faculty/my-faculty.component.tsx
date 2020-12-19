
import { Breadcrumb, Button, Dropdown, Input, Menu, Popover, Select, Space, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { FACULTY, TOPIC, LEVEL, FIELD, LECTURES, CONTRACT } from "../types/components/Topic/index";
import { getFaculty } from '../types/components/Topic/topic.component.services'
import { DownOutlined } from '@ant-design/icons';
import './my-faculty.component.css'

interface MyState {
  data: LECTURES[];
  faculty: FACULTY[];
  level: LEVEL[];
  filed: FIELD[];
  contract: CONTRACT[];
}
interface IProps {
}
export default class MyFaculty extends React.Component<IProps, MyState> {
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
    this.getListLevel();
    this.getListField();
    this.getListContract();
  }
  dataSource: any;
  filter = {
    search: '',
    contract: undefined,
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
  contractList: any;
  clear: any;
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

  getListContract = () => {
    axios.get(`${environment.url}/contract/all`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        }
      })
      .then(res => {
        const contract: CONTRACT[] = res.data;
        this.setState({...this.state, contract: contract})
        return this.contractList;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getTopic = () => {
    axios.get(`${environment.url}/user/faculty`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        params: { ...this.filter }
      })
      .then(res => {
        console.log(res.data)
        this.pagination.page = res.data.lecturers.page;
        this.pagination.totalItem = res.data.lecturers.totalItem;
        this.pagination.amount = res.data.lecturers.amount;
        console.log(this.pagination)
        const dataSource: LECTURES[] = res.data.lecturers.contents;
        this.setState({ ...this.state, data: dataSource })
        console.log(this.state.data, "==============", dataSource)
        return this.dataSource;
      })
      .catch(e => console.log(e))
      this.filter.page=1;
  }

  clearData = () => {
    this.filter = {
      search: '',
      contract: undefined,
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

  getValueContract = (e: any) => {
    this.filter.contract = e;
  }

  getValueLevel = (e: any) => {
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
      dataIndex: "lecturerId",
      key: "lecturerId"
    },
    {
      title: "Day of birth",
      dataIndex: "dob",
      key: "dob"
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone"
    },
    {
      title: "Contract",
      key: "contract",
      dataIndex: "contract"
    },
    {
      title: "Faculty",
      key: "faculty",
      dataIndex: "faculty"
    },
    {
      title: "Position",
      key: "position",
      dataIndex: "position"
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
      <span style={{width: '25%', display: 'inline-block'}}>Contract</span>
        <Select
              allowClear
              style={{borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block'}}
              onChange={this.getValueContract}
            >
              {this.state.contract.length > 0
                ? this.state.contract.map((dataInformation: CONTRACT) => (
                  <Select.Option
                    value={dataInformation.contractId}
                    key={dataInformation.nameContract}
                  >
                    {dataInformation.nameContract}
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