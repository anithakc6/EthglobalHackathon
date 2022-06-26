import React, { useState } from 'react'
import { create_Profile } from '../Lens/Api';

import { Form, Input, Button, Select } from 'antd';
import { storeIntoIpfs, retriveDataIpfs } from "../Ipfs/ipfs";

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

  
export default function CreateDao() {
  const [form] = Form.useForm();
  const [daoNameState, setDAONameState] = useState("");
  const [feesState,setFeesState] = useState("");  

  const feeStructure = {
    feeFollowModule: {
    amount: {
        currency: "0x3C68CE8504087f89c640D02d133646d98e64ddd9", //WETH address
        value: feesState,
        //  decimals: parseInt(6)
    },
    recipient: "0x3aa821cEE6194C4aD7e3F3d6E393F646D1Cd65Db" // Protocol Owned Account
}

};
const createProfileRequest = 
{ 
    handle: daoNameState, 
    
    followModule: feeStructure
}
  const onLanguageChange = (value) => {
    switch (value) {
      case 'java':
        /*form.setFieldsValue({
          note: 'Hi, man!',
        });*/
        return;

      case 'javascript':
        /*form.setFieldsValue({
          note: 'Hi, lady!',
        });*/
        return;

      case 'reactjs':
        /*form.setFieldsValue({
          note: 'Hi there!',
        });*/
    }
  };


  const onFinish = async(values) => {
    console.log(values);
    
    let response = await storeIntoIpfs (values);
  
    let profile = await create_Profile(createProfileRequest);
    console.log(response, profile)
  };
  

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
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
        name="language"
        label="LANGUAGE"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select language option"
          onChange={onLanguageChange}
          allowClear
        >
          <Option value="java">Java</Option>
          <Option value="javascript">JavaScript</Option>
          <Option value="reactjs">Reactjs</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.dao !== currentValues.dao}
      >
        {({ getFieldValue }) =>
          getFieldValue('java') === 'other' ? (
            <Form.Item
              name="customizeJava"
              label="Customize Java"
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
        name="aboutdao"
        label="About DAO"
        rules={[
          {
            required: false,
          },
        ]}
      >
         <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="fees"
        label="Fees (in WETH)"
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
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};
