
import { Breadcrumb, Button, Descriptions, Dropdown, Input, Menu, Popover, Select, Space, Table } from 'antd';
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
  info = {
    nameFaculty: '',
    nameUniversity: '',
    totalTopic: 0,
    totalLecturer: 0
  };
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
        this.info = res.data.info;
        this.info = {
          nameFaculty: res.data.info.nameFaculty,
          nameUniversity: res.data.info.nameUniversity,
          totalTopic: res.data.info.totalTopic,
          totalLecturer: res.data.info.totalLecturer,
        }
        console.log(this.info)
        this.pagination.page = res.data.lecturers.page;
        this.pagination.totalItem = res.data.lecturers.totalItem;
        this.pagination.amount = res.data.lecturers.amount;
        const dataSource: LECTURES[] = res.data.lecturers.contents;
        this.setState({ ...this.state, data: dataSource })
        return this.dataSource;
      })
      .catch(e => console.log(e))
      this.filter.page=1;
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
    {
      title: "Degree",
      key: "degree",
      dataIndex: "degree"
    },
  ];


  render() {
    return (
      <div>
        <div style={{background: 'white',
                     margin: '4% 1.5%',
                     padding: '2%',
                      }}>
          <Descriptions title="INFOMATION FACULTY">
            <Descriptions.Item label={<label style={{ fontWeight: 'bold' }}>Name of Faculty</label>}>{this.info.nameFaculty}</Descriptions.Item>
            <Descriptions.Item label={<label style={{ fontWeight: 'bold' }}>Name of University</label>}>{this.info.nameUniversity}</Descriptions.Item>
          <br/>
            <Descriptions.Item label={<label style={{ fontWeight: 'bold' }}>Total Topic</label>}>{this.info.totalTopic}</Descriptions.Item>
            <Descriptions.Item label={<label style={{ fontWeight: 'bold' }}>Total Lecturer</label>}>{this.info.totalLecturer}</Descriptions.Item>
          </Descriptions>
        </div>
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