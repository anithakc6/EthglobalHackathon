import React from 'react';
import { Form, Input, Button, Select, Typography } from 'antd';
import { storeIntoIpfs, retriveDataIpfs } from "../Ipfs/ipfs";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 14,
  },
};

export default function CreateProfile() {
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const onDaoChange = (value) => {
    switch (value) {
      case 'dao1':
        /*form.setFieldsValue({
          note: 'Hi, man!',
        });*/
        return;

      case 'dao2':
        /*form.setFieldsValue({
          note: 'Hi, lady!',
        });*/
        return;

      case 'other':
        /*form.setFieldsValue({
          note: 'Hi there!',
        });*/
    }
  };

  const onCoinChange = (value) => {
    switch (value) {
      case 'dao1':
        /*form.setFieldsValue({
          note: 'Hi, man!',
        });*/
        return;

      case 'dao2':
        /*form.setFieldsValue({
          note: 'Hi, lady!',
        });*/
        return;

      case 'other':
        /*form.setFieldsValue({
          note: 'Hi there!',
        });*/
    }
  };

  const onFinish = (values) => {
    console.log(values);
    storeIntoIpfs (values).then(function (response) {
      console.log(response);
      let previosJobs = JSON.parse(localStorage.getItem('jobs'))
      previosJobs[response] = values
      localStorage.setItem('jobs',  JSON.stringify(previosJobs))
      navigate('/')
    })
    .catch(function (error) {
      console.log(error);
    }); 
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    /*form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });*/
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="dao"
        label="DAO"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onDaoChange}
          allowClear
        >
          <Option value="dao1">dao1</Option>
          <Option value="dao2">dao2</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.dao !== currentValues.dao}
      >
        {({ getFieldValue }) =>
          getFieldValue('dao') === 'other' ? (
            <Form.Item
              name="customizeDao"
              label="Customize Dao"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="projectdetails"
        label="Project Details"
        rules={[
          {
            required: true,
          },
        ]}
      >
         <Input.TextArea />
      </Form.Item>
      
      <Form.Item
        name="githublink"
        label="Github Link"
        rules={[{ required: false }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="coin"
        label="Coin"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onCoinChange}
          allowClear
        >
          <Option value="USD">USD</Option>
          <Option value="USDT">USDT</Option>
          <Option value="DAI">DAI</Option>
        </Select>
        <Form.Item
        name="rate"
        label="Enter Amount"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      </Form.Item>
      

      <Form.Item
        name="skill"
        label="Skill"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};
