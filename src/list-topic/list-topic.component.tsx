
import { Breadcrumb, Button, Dropdown, Input, Menu, message, Modal, Popconfirm, Popover, Select, Space, Table, Tag } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { FACULTY, TOPIC, LEVEL, FIELD } from "../types/components/Topic/index";
import './list-topic.component.css'
import ListTopicEdit from './list-topic-edit/list-topic-edit.component';
import ListTopicDetail from './list-topic-detail/list-topic-detail.component';

interface MyState {
  data: TOPIC[];
  faculty: FACULTY[];
  level: LEVEL[];
  filed: FIELD[];
  visible: boolean;
  isShowDetail: boolean;
  isShowEdit: boolean;
  dataDetail: TOPIC[];
  id: any;
  topicDetail: any;
}
interface IProps {
}
export default class ListTopic extends React.Component<IProps, MyState> {
  constructor(props: MyState) {
    super(props)
    this.state = {
      data: [],
      faculty: [],
      level: [],
      filed: [],
      visible: false,
      isShowEdit: false,
      dataDetail: [],
      id: undefined,
      isShowDetail: false,
      topicDetail: {
        nameTopic: '',
        facultyId: undefined,
        nameFaculty: '',
        levelId: undefined,
        nameLevel: '',
        fieldId: undefined,
        fieldName: '',
        description: '',
      }
    };
  }

  componentDidMount() {
    this.getTopic();
    this.getListLevel();
    this.getListField();
  }
  dataSource: any;



  filter = {
    search: '',
    facultyId: undefined,
    levelId: undefined,
    fieldId: undefined,
    deleted: undefined,
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
  parent: any;

  getListField = () => {
    axios.get(`${environment.url}/field/all`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        }
      })
      .then(res => {
        const field: FIELD[] = res.data;
        this.setState({ ...this.state, filed: field })
        return this.fieldList;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getTopic = () => {
    axios.get(`${environment.url}/faculty/topic`,
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
    // this.filter.page=1;
  }

  searchData = () => {
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
        this.setState({ ...this.state, level: level })
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
    this.filter.levelId = e;
  }

  getValueFiled = (e: any) => {
    this.filter.fieldId = e;
  }

  changePagination = (e: any, a: any) => {
    this.filter.page = e.current;
    this.getTopic();
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  showModalEdit = (topicId: any, record: any) => {
    this.setState({ visible: true, id: topicId })
  }

  showModalDetail = (topicId: any) => {
    this.setState({ isShowDetail: true, id: topicId });
  }

  onCancelDetail = () => {
    window.location.href = "/list-topic";
    this.setState({ isShowDetail: false });
  }

  editTopic = () => {
    this.setState({ isShowEdit: true })
  }

  editOk = () => {
    this.setState({ isShowEdit: false })
  }

  editCancel = () => {
    this.setState({ isShowEdit: false })
  }

  onCancel = () => {
    this.setState({ visible: false })
  }

  handleDelete = (topicId: any) => {
    axios({
      method: 'delete',
      url: `${environment.url}/topic`,
      data: {
        "topicId": topicId,
      },
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.getTopic();
          message.success({content: 'Success'})
        }
      })
      .catch(error => message.error({content: error.response.data.message}))
  }

  getStatusField = (e: any) => {
    this.filter.deleted = e;
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
     // width: '15%',
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
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (text: any, record: any) =>
        this.state.data.length >= 1 ? (
          <div style={{ display: 'inline-block' }}>
            <div style={{display: 'inline-block'}}>
              <ListTopicDetail id={record.topicId}/>
            </div>
            <div style={{display: 'inline-block'}}>
            <ListTopicEdit topicDetail={{
              nameTopic: record.nameTopic,
              facultyId: record.faculty.facultyId,
              nameFaculty: record.faculty.nameFaculty,
              levelId: record.level.levelId,
              nameLevel: record.level.nameLevel,
              fieldId: record.fieldTopic.fieldId,
              fieldName: record.fieldTopic.fieldName,
              description: record.description,
            }} id={record.topicId}
            />
            </div>
            <Popconfirm style={{ display: 'inline-block' }} title="Sure to delete?" onConfirm={() => this.handleDelete(record.topicId)}>
              <Button>Delete</Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 15px', fontSize: '20px' }}>
        <div style={{display: 'inline-block', fontWeight: 600}}>List Topic Of Faculty</div>
          <div style={{ display: 'inline-block', float: 'right' }}>
            <div style={{display: 'inline-block'}}>
            <ListTopicEdit text="Add" topicDetail={this.state.topicDetail}/>
            </div>
            <Popover content={<div>
              <div>
                <span style={{ display: 'inline-block', width: '25%' }}>Keyword </span>
                <Input style={{ borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block' }} onChange={this.handleChange} />
              </div>
           <div style={{ marginTop: '5%' }}>
                <span style={{ width: '25%', display: 'inline-block' }}>Level</span>
                <Select
                  allowClear
                  style={{ borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block' }}
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

              <div style={{ marginTop: '5%' }}>
                <span style={{ width: '25%', display: 'inline-block' }}>Field</span>
                <Select
                  allowClear
                  style={{ borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block' }}
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

              <div style={{ marginTop: '5%' }}>
                <span style={{ width: '25%', display: 'inline-block' }}>Status</span>
                <Select
                  allowClear
                  style={{ borderRadius: '7px', width: '70%', marginLeft: '5%', display: 'inline-block' }}
                  onChange={this.getStatusField}
                >
                  <Select.Option value="0">ACTIVE</Select.Option>
                  <Select.Option value="1">DELETED</Select.Option>
                </Select>
              </div>
              <div style={{ padding: '5% 0 5% 69% ' }}>
                <Button onClick={this.searchData}>Search</Button>
              </div>
            </div>} title="Search" trigger="click">
              <Button style={{display: 'inline-block'}}>Search</Button>
            </Popover>
          </div>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, margin: '0 15px' }}>
          <Table
            columns={this.columns}
            dataSource={this.state.data}
            pagination={
              {
                size: 'small',
                current: this.pagination.page,
                total: this.pagination.totalItem,
                pageSize: this.pagination.amount,
              }
            }
            onChange={this.changePagination}
          />
        </div>
      </div>
    )
  }
}