import { Button, Input, List, Card, Typography, Form, message } from 'antd';
import React,{useState, useEffect} from 'react';
import { createDiscussion, getDiscussions,  markReplyRead} from '../Api';
import DiscussionDetail from './DiscussionDetail';


const {TextArea} = Input;
const {Title} = Typography;
const DiscussionBoard = () => {
    const [discussions, setDiscussions] = useState([]);
    const [selectDiscussion, setSelectDiscussion] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        // fetch discussions from API
        const fetchDiscussions = async () => {
            const response = await getDiscussions();
            setDiscussions(response);
        }
        fetchDiscussions();
    }, []);

    const handleCreateDiscussion = async (values) => {
        try {
            await createDiscussion(values);
            message.success('Discussion created successfully!');
            form.resetFields();
            const response = await getDiscussions();
            setDiscussions(response);
        } catch (error) {
            message.error('Failed to create discussion.');
        }
    };

    const handleDiscussionClick = async (discussion) => {
        setSelectDiscussion(discussion);

        // 调用 markAsRead API
        try {
            await markReplyRead(discussion.author);
            message.success('Marked discussion as read.');
        } catch (error) {
            message.error('Failed to mark discussion as read.');
        }
    };

    

    return (
        <div style={{padding:"20px"}}>
            <Title level={2}>Discussion board</Title>
            <Card title="Create a New Discussion" style={{ marginBottom: '20px' }}>
                <Form form={form} layout="vertical" onFinish={handleCreateDiscussion}>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input the discussion title!' }]}
                    >
                        <Input placeholder="Enter discussion title" />
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please input the discussion content!' }]}
                    >
                        <TextArea rows={4} placeholder="Enter discussion content" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{backgroundColor:'orange', borderColor: 'orange'}}>
                            Create Discussion
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card title="All Discussions">
                <List
                    itemLayout="horizontal"
                    dataSource={discussions}
                    renderItem={(discussion) => (
                        <List.Item onClick={() => handleDiscussionClick(discussion)}>
                            <List.Item.Meta
                                title={<a>{discussion.title}</a>}
                                description={`Author: ${discussion.author}`}
                            />
                        </List.Item>
                    )}
                />
            </Card>

                {selectDiscussion && <DiscussionDetail discussion={selectDiscussion} />}
  
        </div>
    )
};

export default DiscussionBoard;

