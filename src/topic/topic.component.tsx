
import { Breadcrumb, Table } from 'antd';
import * as React from 'react';
import { environment } from '../environment/environment';
import axios from 'axios';

export class Topic extends React.Component {
  constructor(props: any) {
    super(props);
    this.getTopic = () => {
      axios.get(`${environment.url}/topic`,
        {
          headers: {
            Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
          }
        })
        .then(res => {
          this.dataSource = res.data.contents;
          console.log("aaaaaaaa", this.dataSource)
        })
        .catch(e => console.log(e))
    }
  }

  dataSource: any;
  getTopic() { };


  getBut = () => {
    console.log(this.dataSource);
    console.log(this.dataSource[0].nameTopic);
  }

  render() {
    this.getTopic();
    const columns = [
      {
        title: "Name",
        dataIndex: "nameTopic",
        // sorter: {
        //   compare: (a: any, b: any) => a.createdAt - b.createdAt
        // }
      },
    ];

    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0', fontSize: '20px' }}>
          <Breadcrumb.Item>Software management of Science
          aaaaabbb
              </Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <button onClick={this.getBut}></button>

          {/* <Table  dataSource={data} columns={columns}/> */}
        </div>
      </div>
    )
  }
}

export default Topic;
