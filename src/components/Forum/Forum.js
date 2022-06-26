import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import { Form, Input, Button } from 'antd';
import { storeIntoIpfs, retriveDataIpfs, updateUpvote } from "../Ipfs/ipfs";
import moment from 'moment';
import { submitPost, upVote, getVoteCount } from './ethersUtils';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { notification } from 'antd';

const openNotification = () => {
  notification.open({
    message: 'Congratulations !!',
    description:
      'Congratulations for the correct answer, your reward is on your way !!!',
    className: 'custom-class',
    style: {
      width: 600,
    },
  });
};
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
export default function Forum() {
  const [likes, setLikes] = useState(0);
  const [tokenId, setTokenId] = useState(0);
  const [action, setAction] = useState(null);
  const [ansTokenId, setAnswerTokenId] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const [form] = Form.useForm();
  let counter
  const MAX_COUNT = 1;
  const onFinish = (values) => {
    console.log(values);
    storeIntoIpfs (values).then(function (response) {
      console.log(response);
      
      submitPost(response).then(function (response) {
        console.log("Token ID",response.id);
        setTokenId(response.id);
      })
    })
    .catch(function (error) {
      console.log(error);
    }); 
    
  };

  const onFinishAnswer = (values) => {
    console.log(values);
    storeIntoIpfs (values).then(function (response) {
      console.log(response,"Update called");
      updateUpvote(response);
      submitPost(response).then(function (response) {
        console.log("Token ID",response.id);
        setAnswerTokenId(response.id);
      })
    })
    .catch(function (error) {
      console.log(error);
    }); 
    
  };
  
  const like = async () => {   
    counter = likes
    counter++
    setLikes(counter);
    await upVote(ansTokenId, 1)
    let voteCount  = await getVoteCount(ansTokenId)
    console.log("TotalVoteCount",voteCount)
    //setVoteCount(voteCount)
    if( voteCount == MAX_COUNT) {
        openNotification()
        // Integrate SuperFuild, stream some money
    }
    //setDislikes(counter--);
    setAction('liked');
  };

  /*const dislike = () => {
    //setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };*/

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    /*<Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,*/
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <Comment
      actions={actions}
      author={<a>Han Solo</a>}
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
      content={
        <p>
         <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="Question"
        label="Question"
        rules={[
          {
            required: false,
          },
        ]}
      >
         <Input.TextArea />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Post
        </Button>
      </Form.Item>
    </Form>
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinishAnswer}>
      <Form.Item
        name="Answer"
        label="Answer"
        rules={[
          {
            required: false,
          },
        ]}
      >
         <Input.TextArea />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Post
        </Button>
      </Form.Item>
    </Form>
        </p>
        
      }
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};