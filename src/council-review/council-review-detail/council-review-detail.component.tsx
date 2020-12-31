
import { Button, Card, Col, Form, Input, message, Row,Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import * as React from 'react';
import { environment } from '../../environment/environment';
import { NameLecturer, TEAM } from '../../types/components/Topic';

interface MyState {
  data: NameLecturer[];
  team: TEAM[];
  display: boolean;
  score: number;
}
interface IProps {
  listId?: any;
  score?: any;
  comment?: any;
}
export class CouncilReviewDetail extends React.Component<IProps, MyState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      data: [],
      team: [],
      display: false,
      score: 0
    };
  }

  topic ={
    updatedAt: '',
    fullName: '',
    topicId: undefined,
    nameTopic: '',
    year: undefined,
    description: '',
    nameFaculty: '',
    nameLevel: '',
    fieldName: '',
    status: ''
  }

  componentDidMount() {
  }

  getCouncilReview = () => {
      axios.get(`${environment.url}/council/review-detail`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        params:{ ...this.props.listId }
      })
      .then(res => {
        this.setState({ score: res.data.score})
        this.topic = {
          updatedAt: res.data.topic.updatedAt,
          fullName: res.data.topic.updatedBy.fullName,
          topicId: res.data.topic.topicId,
          nameTopic:  res.data.topic.nameTopic,
          year: res.data.topic.year,
          description: res.data.topic.description,
          nameFaculty: res.data.topic.faculty.nameFaculty,
          nameLevel: res.data.topic.level.nameLevel,
          fieldName: res.data.topic.fieldTopic.fieldName,
          status: res.data.topic.status
        }
        const dataSource: NameLecturer[] = res.data.members;
        this.setState({ ...this.state, data: dataSource})
      })
      .catch(e => console.log(e))
  }

  postScoreComment = (value: any) => {
    axios({
      method: 'post',
      url: `${environment.url}/council/review-detail`,
      headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        },
        data: value
      })
      .then(res => {
        message.success({content: 'Success'})
      }) 
      .catch(error => message.error({content: error.response.data.message}) )
  this.setState({ display: false});
  }

  showModalEdit = () => {
    this.setState({ display: true });
    this.getCouncilReview();
  }

  onFinish = (values: any) => {
    let init = {
    ...values,
    ...this.props.listId
        }
    this.postScoreComment(init)

    this.setState({ display: false })
    window.location.href = '/council-review'

  }

  onCancel = () => {

    this.setState({ display: false});
  }

  columns: any = [
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
  render() {
        const validateMessages = {
      required: '${label} is required!',
    };
    return (
      <div>
        <Button onClick={this.showModalEdit}>Detail </Button>
        <Modal
          visible={this.state.display}
          title="Topic Review"
          width="1200px"
          onCancel={this.onCancel}
          footer={null}>
      <div style={{overflow: 'hidden', margin: '0 15px' }}>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 360}}>
        <Row>
          <Col span={12}>
          <Card  title="Topic Detail" style={{ width: 500, backgroundColor: '#fdfaf7' }}  type="inner">
            <p><div> <div style={{width: '150px', display: 'inline-block', fontWeight:'bold'}}>Update at:</div >  {this.topic.updatedAt}</div></p>
            <p><div> <div style={{width: '150px', display: 'inline-block', fontWeight:'bold'}}> Topic Id:</div> {this.topic.topicId}</div></p>
            <p><div> <div style={{width: '150px', display: 'inline-block', fontWeight:'bold'}}>Name Topic:</div>  {this.topic.nameTopic}</div></p>
            <p><div> <div style={{width: '150px', display: 'inline-block', fontWeight:'bold'}}>Year:</div>  {this.topic.year}</div></p>
            <p><div> <div style={{width: '150px', display: 'inline-block', fontWeight:'bold'}}>Description:</div>  {this.topic.description}</div></p>
            <p><div> <div style={{width: '150px', display: 'inline-block', fontWeight:'bold'}}>Name Faculty: </div> {this.topic.nameFaculty}</div></p>
            <p><div> <div style={{width: '150px', display: 'inline-block', fontWeight:'bold'}}>Name Level: </div> {this.topic.nameLevel}</div></p>
            <p><div> <div style={{width: '150px', display: 'inline-block', fontWeight:'bold'}}>Field Name:</div>  {this.topic.fieldName}</div></p>
            <p><div> <div style={{width: '150px', display: 'inline-block', fontWeight:'bold'}}> Status:</div> {this.topic.status}</div></p>
          </Card>
          </Col>
          <Col span={12} >
              <Table 
              columns={this.columns} 
              dataSource={this.state.data}
              pagination={false}
              />
        <div style={{paddingTop: '40px'}}>
              <Form
               validateMessages={validateMessages}
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
           name="basic"
      initialValues={{
        score: this.props.score,
        commnet: this.props.comment
      }}
      onFinish={this.onFinish}
    >
      <Form.Item
        label="Score"
        name="score"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number"  min="1" max={100} disabled={this.props.score != undefined ? true : false}/>
      </Form.Item>
        <Form.Item
          label="Comment"
          name="comment"
        >
          <TextArea  disabled={this.props.score != undefined ? true : false}/>
        </Form.Item>

        <Form.Item style={{float : 'right'}}>
          <Button type="primary" htmlType="submit" disabled={this.props.score != undefined ? true : false}>
            Submit
          </Button>

        </Form.Item>
      </Form>
              </div>
          </Col>
        </Row>
        </div>
    </div>
    </Modal>
    </div>
  );
}
}

export default CouncilReviewDetail;