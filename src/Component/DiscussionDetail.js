import React, { useState, useEffect } from 'react';
import { Card, List, Input, Button, Form, message } from 'antd';
import { getReplies, createReply } from '../Api';

const { TextArea } = Input;

const DiscussionDetail = ({ discussion }) => {
    const [replies, setReplies] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchReplies = async () => {
            const response = await getReplies(discussion.id);
            setReplies(response);
        };
        fetchReplies();
    }, [discussion.id]);

    const handleCreateReply = async (values) => {
        try {
            await createReply({ ...values, discussionId: discussion.id });
            message.success('Reply created successfully!');
            form.resetFields();
            const response = await getReplies(discussion.id);
            setReplies(response);
        } catch (error) {
            message.error('Failed to create reply.');
        }
    };



    return (
        <div style={{ marginTop: '20px' }}>
            <Card title={discussion.title} style={{ marginBottom: '20px' }}>
                <p>{discussion.content}</p>
                <p><strong>Author:</strong> {discussion.author}</p>
            </Card>

            <Card title="Replies">
                <List
                    itemLayout="horizontal"
                    dataSource={replies}
                    renderItem={(reply) => (
                        <List.Item>
                            <List.Item.Meta
                                title={reply.author}
                                description={reply.content}
                            />
                        </List.Item>
                    )}
                />
            </Card>

            <Card title="Add a Reply" style={{ marginTop: '20px' }}>
                <Form form={form} layout="vertical" onFinish={handleCreateReply}>
                    <Form.Item
                        label="Reply"
                        name="content"
                        rules={[{ required: true, message: 'Please input your reply!' }]}
                    >
                        <TextArea rows={3} placeholder="Enter your reply" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{backgroundColor:'orange', borderColor: 'orange'}}>
                            Submit Reply
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};


export default DiscussionDetail;