
import { Breadcrumb, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';

export class Topic extends React.Component {
  dataSource : any;
  columns: any = [
    {
      title: "Name",
      dataIndex: "nameTopic",
      key: "name"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags"
    },
    {
      title: "Action",
      key: "action"
    }
  ];

  // data: any = (async () => {
  //   await axios.get(`${environment.url}/topic`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
  //         }
  //       })
  //       .then(res => {
  //         this.dataSource = res.data.contents;
  //         console.log(this.dataSource)
  //         return this.dataSource;
  //       })
  //       .catch(e => console.log(e))
  //   });

  data: any = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"]
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"]
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    }
  ];

  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0', fontSize: '20px' }}>
          <Breadcrumb.Item>Software management of Science</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Table columns={this.columns} dataSource={this.data}/>
        </div>
      </div>
    )
  }
}

export default Topic;
