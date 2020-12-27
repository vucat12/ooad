
import { Button, Card, Col, Divider, Row,Table, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import * as React from 'react';
import { environment } from '../../environment/environment';
import { LECTURES, NameLecturer, TEAM, TEAM_TOPIC } from '../../types/components/Topic';
import './council-management-detail.css';

interface MyState {
  data: TEAM_TOPIC[];
  team: TEAM[];
  display: boolean;
  dataLectures: LECTURES[];
  recordList: NameLecturer[];
}
interface IProps {
  id?: any,
}
export class CouncilMangementDetail extends React.Component<IProps, MyState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      data: [],
      team: [],
      display: false,
      dataLectures: [],
      recordList: []
    };
  }

  componentDidMount() {
    this.getLecturerDetail();
  }
  dataSource: any;
  getLecturerDetail = () => {
    axios.get(`${environment.url}/council/${this.props.id}`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
      })
      .then(res => {

        const dataLectures: LECTURES[] = res.data.members;
        this.setState({ dataLectures: dataLectures})

        const dataSource: TEAM_TOPIC[] = res.data.reviewList;
        dataSource.map((el: any) => {
          el.key = el.teamId
        })
      
        this.setState({ ...this.state, data: dataSource })
        return this.dataSource;
      })
      .catch(e => console.log(e))
  }

  showModalEdit = () => {
    this.setState({ display: true });
    this.getLecturerDetail();
  }

  columnsUser: any = [
    {
      title: "Id",
      dataIndex: "lecturerId",
      key: "lecturerId"
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName"
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position"
    },
  ];

  columnsDetail: any = [
    {
      title: "Name Lecturer",
      dataIndex: "nameLecturer",
      key: "nameLecturer"
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position"
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score"
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment"
    },
  ];

  columns: any = [
    {
      title: "Name Topic",
      dataIndex: "nameTopic",
      key: "nameTopic"
    },
    
      {
        title: "Leader Team",
        dataIndex: "leader",
        key: "leader"
      },
    {
      title: "Level Name",
      dataIndex: "levelName",
      key: "levelName"
    },
    {
      title: "Field Topic",
      dataIndex: "fieldTopic",
      key: "fieldTopic"
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year"
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      render: (result: any) => (
        <span>
        {result == 'NOT RATE' &&    <Tag color={'geekblue'} key={result}>
                  {result}
                </Tag>
        }   

        {result == 'FAIL' &&    <Tag color={'volcano'} key={result}>
                  {result}
                </Tag>
        }  

        {result == 'PASS' &&    <Tag color={'green'} key={result}>
                  {result}
                </Tag>
        }   
        </span>
      ),
    },
  ];
  render() {
    
    return (
      <div>
        <Button onClick={this.showModalEdit}>Detail </Button>
        <Modal
          visible={this.state.display}
          title="Council Detail"
          width="1200px"
          onCancel={() => this.setState({ display: false })}
          footer={null}>
      <div style={{overflow: 'hidden', margin: '0 15px' }}>
      <div className="site-layout-background" style={{ padding: '0 10px', minHeight: 360}}>
      <div style={{ color: '#00000073', fontWeight: 'bold', fontSize: '15px', paddingBottom: '8px'}}>Council Member</div>
      <Table 
        columns={this.columnsUser} 
        dataSource={this.state.dataLectures}
        pagination={false}
        style={{width: '35%'}}
      />
  <hr style={{
    margin: '16px 0'
  }}/>
      <div style={{ color: '#00000073', fontWeight: 'bold', fontSize: '15px', paddingBottom: '8px'}}>Council Topic Review</div>
        <Table 
        columns={this.columns} 
        dataSource={this.state.data}
        expandable={  {expandedRowRender: record => 
          <Table
            className="style"
            columns={this.columnsDetail}
            dataSource={record.recordList}
            />
        } }
        />
      </div>
    </div>
    </Modal>
    </div>
  );
}
}

export default CouncilMangementDetail;