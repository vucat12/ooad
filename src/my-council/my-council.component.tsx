
import { Breadcrumb, Button, Card, Col, Input, Modal, Popover, Row, Space, Steps, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { LIST_COUNCIL } from "../types/components/Topic/index";
import './my-council.component.css'
import MyCouncilDetail from './my-council-detail/my-council-detail.component';

interface MyState {
  data: LIST_COUNCIL[];
}
interface IProps {
}
export default class MyCouncil extends React.Component<IProps, MyState> {
  constructor(props: MyState) {
    super(props)
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getListCouncil();
  }

  getListCouncil = () => {
    axios.get(`${environment.url}/council/my-council`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
      })
      .then(res => {
        const dataSource: LIST_COUNCIL[] = res.data;
        this.setState({ ...this.state, data: dataSource })
        console.log(this.state.data)
      })
      .catch(e => console.log(e))
  }
  columns: any = [
    {
        title: "Council Id",
        dataIndex: "councilId",
        key: "councilId"
      },
    {
      title: "Name Topic",
      dataIndex: "nameTopic",
      key: "nameTopic"
    },
    {
      title: "President Of Council",
      dataIndex: "presidentOfCouncil",
      key: "presidentOfCouncil"
    },
    {
      title: "Total Register",
      dataIndex: "totalRegister",
      key: "totalRegister"
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) =>
        this.state.data.length >= 1 ? (
          <div>
            <MyCouncilDetail id={record.councilId}/>
          </div>
        ) : null,
    },
  ];

  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 15px', fontSize: '20px' }}>
        <div style={{display: 'inline-block', fontWeight: 600}}>My Council</div>
        </Breadcrumb>
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