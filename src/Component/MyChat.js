import React, {useState} from "react";
import { Layout, Input, List, Avatar, Typography, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;


const MyChat = () => {
  const [collapsed, setCollapsed] = useState(false);
  // 静态联系人列表
  const [contacts] = useState(["user1", "user2", "user3"]);

  // 静态消息记录，每个联系人有自己独立的消息数组
  const [messages, setMessages] = useState({
    user1: [{ user: "user1", content: "Hello", time: "10:00" }],
    user2: [{ user: "user2", content: "Hi", time: "10:01" }],
    user3: [], // user3 目前没有消息
  });

  // 当前选中的联系人，默认选中user1
  const [currentContact, setCurrentContact] = useState("user1");

  // 新消息的输入内容
  const [newMessage, setNewMessage] = useState("");

  // 发送消息，将消息保存到当前联系人的消息记录中
  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages({
        ...messages,
        [currentContact]: [
          ...messages[currentContact],
          { user: "Me", content: newMessage, time: "10:02 AM" }, // 模拟时间
        ],
      });
      setNewMessage(""); // 清空输入框
    }
  };

  return (
    <Layout style={{ height: "95vh", display: "flex", flexDirection: "row", overflow: "hidden" }}>
      {/* 左侧联系人列表，占三分之一宽度 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "33%",
          backgroundColor: "#f0eaff", // 淡紫色背景
          padding: "16px",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <Text strong>Contacts</Text>
        <List
          itemLayout="horizontal"
          dataSource={contacts}
          renderItem={(contact) => (
            <List.Item onClick={() => setCurrentContact(contact)} style={{ cursor: "pointer" }}> {/* 点击切换联系人 */}
              <List.Item.Meta
                avatar={<Avatar>{contact[0]}</Avatar>} // 显示联系人名的第一个字母
                title={contact}
              />
            </List.Item>
          )}
        />
      </div>

      {/* 右侧聊天窗口，占三分之二宽度 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#f0f2f5",
          padding: "0 16px",
        }}
      >
        <Header style={{ background: "#f0f2f5", padding: "0 16px" }}>
          <div style={{ fontWeight: "bold" }}>Chat Room with {currentContact}</div> {/* 显示当前聊天的联系人 */}
        </Header>

        <Content
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden", // 防止内容溢出
          }}
        >
          {/* 聊天内容，设置最大高度和滚动条 */}
          <div style={{ flex: 1, overflowY: "auto", marginBottom: "16px" }}>
            <List
              dataSource={messages[currentContact]} // 提取当前联系人的消息列表
              renderItem={(message) => (
                <List.Item key={message.time}>
                  <List.Item.Meta
                    avatar={<Avatar>{message.user ? message.user[0] : "?"}</Avatar>}
                    title={<Text strong>{message.user || "Unknown"}</Text>}
                    description={<Text>{message.content}</Text>}
                  />
                  <div>{message.time}</div>
                </List.Item>
              )}
            />
          </div>

          {/* 消息输入框 */}
          <div style={{ display: "flex", padding: "8px 0" }}>
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onPressEnter={handleSend}
              style={{ marginRight: "8px", flex: 1 }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              style={{ backgroundColor: "orange", borderColor: "orange" }}
            >
              Send
            </Button>
          </div>
        </Content>
      </div>
    </Layout>
  );
};

export default MyChat;