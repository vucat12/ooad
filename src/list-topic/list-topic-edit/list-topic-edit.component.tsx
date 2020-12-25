
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, TimePicker } from 'antd';
import axios from 'axios';
import * as React from 'react';
import { environment } from '../../environment/environment';
import { FACULTY, FIELD, LEVEL, TOPIC } from '../../types/components/Topic';

export interface MyState {
  faculty: FACULTY[];
  level: LEVEL[];
  filed: FIELD[];
  display: boolean;
}
interface IProps {
  id?: any,
  topicDetail?: any;
  text?: string
}
export class ListTopicEdit extends React.Component<IProps, MyState> {
  constructor(props: Readonly<IProps>) {
    super(props)
    this.state = {
      faculty: [],
      level: [],
      filed: [],
      display: false
    };
    // this.getTopicId(this.props.id)
    console.log("====id=======", this.props.id)
    console.log("======topicDetail======", this.props.topicDetail)
  }
  facultyList: any;
  shouldComponentUpdate(nextProps: IProps, nextState: MyState) {
    return true;
  }
  componentDidMount() {
 
    if (this.props.id !== undefined) {
      // this.getTopicId(this.props.id)
    }
  }

  getListFaculty = () => {
    axios.get(`${environment.url}/faculty/all`,
      {
        headers: {
          Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
        }
      })
      .then(res => {
        const faculty: FACULTY[] = res.data;
        this.setState({ ...this.state, faculty: faculty })
        return this.facultyList;
      })
      .catch((error) => {
        console.error(error);
      });
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
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTopic = (value: any) => {
    axios({
      method: 'post',
      url: `${environment.url}/topic`,
      data: value,
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          alert("Ok")
          window.location.href = "/list-topic"
        }
      })
      .catch(error => alert("Wrong"))
  }

  editTopic = (value: any) => {
    axios({
      method: 'put',
      url: `${environment.url}/topic`,
      data: value,
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          alert("Ok")
          window.location.href = "/list-topic"
        }
      })
      .catch(error => alert("Wrong"))
  }

  onReset = () => {
    this.setState({ display: false })
  };


  getValueFaculty = (e: any) => {
    console.log("aaaa")
  }
  getValueLevel = (e: any) => {
    console.log("aaaaaaaa")
  }
  getValueFiled = (e: any) => {
    console.log("aaaaa")
  }
  onFinish = (values: any) => {
    const topicId = this.props.id;
    const editValue = {
      topicId,
      ...values,
    }

    if (this.props.id != undefined) {
      this.editTopic(editValue)
    }
    else {
      this.createTopic(values);
    }
  };

  showModalEdit = () => {
    this.getListFaculty();
    this.getListLevel();
    this.getListField();
    this.setState({ display: true });
  }

  render() {
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    const detail = {

    }
    return (
      <div>
        <Button onClick={this.showModalEdit}>{!this.props.text ? "Edit" : this.props.text} </Button>
        <Modal
          visible={this.state.display}
          title="Add Topic"
          onCancel={() => this.setState({ display: false })}
          footer={null}>
          <Form
            onFinish={this.onFinish}
            validateMessages={validateMessages}
            initialValues={{
              nameTopic: this.props.topicDetail.nameTopic,
              facultyId: this.props.topicDetail.facultyId,
              levelId: this.props.topicDetail.levelId,
              fieldId: this.props.topicDetail.fieldId,
              description: this.props.topicDetail.description,
            }}
          >
            <Form.Item name='nameTopic' label="Title" rules={[{ required: true }]}>
              <Input style={{ float: 'right', width: '370px' }} />
            </Form.Item>
            <Form.Item name='facultyId' label="Faculty" rules={[{ required: true }]}>
              <Select
                style={{ float: 'right', width: '370px' }}
                allowClear
                onChange={this.getValueFaculty}
              >
                {this.state.faculty.length > 0
                  ? this.state.faculty.map((dataInformation: FACULTY) => (
                    <Select.Option
                      value={dataInformation.facultyId}
                      key={dataInformation.nameFaculty}
                    >
                      {dataInformation.nameFaculty}
                    </Select.Option>
                  ))
                  : null}
              </Select>
            </Form.Item>
            <Form.Item name='levelId' label="Level" rules={[{ required: true }]}>
              <Select
                allowClear
                style={{ float: 'right', width: '370px' }}
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
            </Form.Item>

            <Form.Item name='fieldId' label="Field" rules={[{ required: true }]}>
              <Select
                allowClear
                style={{ float: 'right', width: '370px' }}
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
            </Form.Item>
            {/* <Form.Item name={['year']} label="Year"
       rules={[
        {
          type: 'number',
          min: 2015,
          max: 2020,
          required: true
        },
      ]}>
        <InputNumber style={{float: 'right', width: '370px'}} />
      </Form.Item> */}
            <Form.Item name='description' label="Description" rules={[{ required: true }]}>
              <Input.TextArea style={{ float: 'right', width: '370px' }} />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" >
                Submit
        </Button>
              <Button type="dashed" onClick={this.onReset} >
                Cancel
        </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ListTopicEdit;