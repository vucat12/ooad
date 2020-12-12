
import { Breadcrumb, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { TOPIC } from "../types/components/Topic/index";

interface MyState {
  data: TOPIC[]
}
interface IProps {

}
export default class Topic extends React.Component<IProps, MyState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios.get(`${environment.url}/topic`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        }
      })
      .then(res => {
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
  }
  dataSource: any;
  columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
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
    }
  ];
  render() {
    console.log(this.state.data);
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0', fontSize: '20px' }}>
          <Breadcrumb.Item>Software management of Science</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Table columns={this.columns} dataSource={this.state.data} />
        </div>
      </div>
    )
  }
}