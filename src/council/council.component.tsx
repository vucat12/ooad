
import { Breadcrumb, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { TOPIC } from "../types/components/Topic/index";
import './council.component.css'

interface MyState {
  data: TOPIC[];
}
interface IProps {
}
export default class TopicCouncil extends React.Component<IProps, MyState> {
  constructor(props: MyState) {
    super(props)
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getTopic();
  }
  dataSource: any;
  getTopic = () => {
    axios.get(`${environment.url}/council/topic`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
      })
      .then(res => {
        const dataSource: TOPIC[] = res.data;
        dataSource.map((el: any) => {
            el.key = el.id;
        })
        this.setState({ ...this.state, data: dataSource })
        console.log(this.state.data)
        return this.dataSource;

      })
      .catch(e => console.log(e))
  }

  columns: any = [
    {
      title: "Name",
      dataIndex: "nameTopic",
      key: "nameTopic"
    },
    {
      title: "Faculty",
      dataIndex: "facultyName",
      key: "facultyName"
    },
    {
      title: "Level",
      dataIndex: "levelName",
      key: "levelName"
    },
    {
      title: "Field",
      key: "fieldTopic",
      dataIndex: "fieldTopic"
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year"
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

        <Breadcrumb style={{ margin: '16px 0', fontSize: '20px' }}>
          <Breadcrumb.Item>Software management of Science</Breadcrumb.Item>
        </Breadcrumb>

        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, margin: '0 15px' }}>
          <Table 
          columns={this.columns} 
          dataSource={this.state.data} 
        //   onChange= {this.changePagination}
        expandable={{
            expandedRowRender: record => <div style={{ margin: 0 }}>
             <div>
            {record.members[0]?.fullName != undefined ? <div style={{ width: '385px', display: 'inline-block' }}> Full Name: {record.members[0].fullName}</div> : undefined}
            {record.members[0]?.position != undefined ? <div style={{ display: 'inline-block' }}> Position: {record.members[0].position}</div> : undefined}
            </div>
             <div>
            {record.members[1]?.fullName != undefined ? <div style={{ width: '385px', display: 'inline-block' }}> Full Name: {record.members[1].fullName}</div> : undefined}
            {record.members[1]?.position != undefined ? <div style={{ display: 'inline-block' }}> Position: {record.members[1].position}</div> : undefined}
            </div>
            <div>
            {record.members[2]?.fullName != undefined ? <div style={{ width: '385px', display: 'inline-block' }}> Full Name: {record.members[2].fullName}</div> : undefined}
            {record.members[2]?.position != undefined ? <div style={{ display: 'inline-block' }}> Position: {record.members[2].position}</div> : undefined}
            </div>
      
            <div>
            {record.members[3]?.fullName != undefined ? <div style={{ width: '385px', display: 'inline-block' }}> Full Name: {record.members[3].fullName}</div> : undefined}
            {record.members[3]?.position != undefined ? <div style={{ display: 'inline-block' }}> Position: {record.members[3].position}</div> : undefined}
            </div>
      
            <div>
            {record.members[4]?.fullName != undefined ? <div style={{ width: '385px', display: 'inline-block' }}> Full Name: {record.members[4].fullName}</div> : undefined}
            {record.members[4]?.position != undefined ? <div style={{ display: 'inline-block' }}> Position: {record.members[4].position}</div> : undefined}
            </div>
            </div>,
            // expandedRowRender: record => () => this.detailMember(record),
          }}
          />
        </div>
      </div>
    )
  }
}