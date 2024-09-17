import React, { useEffect, useState } from "react";
import { Layout, Input, List, Avatar, Typography, Button, Badge } from 'antd';
import { SendOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { initWebSocket, sendMessage, getMessageBetweenUsers, getContacts,getUserInfo } from "../Api";


const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const MyChat = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [contacts, setContacts] = useState([]);  // 存储联系人列表
  const [messages, setMessages] = useState([]);  // 存储当前聊天的消息
  const [currentContact, setCurrentContact] = useState(null);  // 当前聊天的联系人
  const [newMessage, setNewMessage] = useState("");  // 新消息输入框
  const [socket, setSocket] = useState(null);  // WebSocket 实例
  const [currentUser, setCurrentUser] = useState(''); // 当前用户

  // 获取联系人和消息
  useEffect(() => {
    const fetchContacts = async () => {
      const contactList = await getContacts();  // 从 API 获取联系人列表
      setContacts(contactList.filter(contact => contact.username !== currentUser));  // 过滤掉当前用户
      if (contactList.length > 0) {
        setCurrentContact(contactList[0].username);  // 初次进入时打开第一个联系人的聊天
      }
    };

    // 动态获取当前登录用户
    const fetchCurrentUser = async () => {
      try {
        const userInfo = await getUserInfo(); 
        setCurrentUser(userInfo.username);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    const socketConnection = initWebSocket((newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      updateLatestMessage(newMessage);
    });

    setSocket(socketConnection);
    fetchContacts();
    fetchCurrentUser(); // 获取当前用户

    return () => {
      if (socketConnection) socketConnection.close();  // 清理 WebSocket 连接
    };
  }, [currentUser]);  // 添加 currentUser 依赖

  // 获取当前联系人的消息
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentContact && currentUser) {
        const initialMessages = await getMessageBetweenUsers(currentUser, currentContact);
         // 检查返回的消息格式
        if (initialMessages && initialMessages.length === 0) {
          console.log("No messages found between users.");
        }
        console.log("Fetched messages:", initialMessages); 
        setMessages(initialMessages || []);
      } 
    };
    fetchMessages();
  }, [currentContact, currentUser]);  // 在 currentUser 和 currentContact 改变时获取消息

  // 发送消息
  const handleSend = async () => {
    if (newMessage.trim() && currentContact && currentUser) {
      const messageData = {
        senderUsername: currentUser,  
        receiverUsername: currentContact, 
        content: newMessage,
        timestamp: new Date().toISOString(),  // 生成时间戳
        isRead: false  // 默认未读
      };
      console.log("Sending message:", JSON.stringify(messageData));
      try {
        await sendMessage(messageData);  // 调用 API 发送消息
        socket.send(JSON.stringify(messageData));  // 发送消息到 WebSocket 服务器
        setMessages((prevMessages) => [...prevMessages, messageData]);  // 更新消息列表
        updateLatestMessage(messageData);  // 更新最新消息
      } catch (error) {
        console.error("Failed to send message:", error);
      }
      setNewMessage("");  // 清空输入框
    }
  };

  const updateLatestMessage = (message) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.username === message.receiverUsername || contact.username === message.senderUsername
          ? { ...contact, latestMessage: message.content,
            hasUnread: currentContact !== contact.username && message.senderUsername !== currentUser } // If the message is from another user and the contact is not the active one }
          : contact
      )
    );
  };

  // 选择联系人
  const handleSelectContact = (contact) => {
    setCurrentContact(contact.username);  
    setContacts(
      contacts.map((c) =>
        c.username === contact.username ? { ...c, hasUnread: false } : c
      )
    );
  };

  return (
    <Layout style={{ height: "95vh", overflow: "hidden" }}>
      {/* 左侧联系人列表 */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          backgroundColor: "#f2e7fe",
          padding: collapsed ? "8px" : "16px",
        }}
      >
        <Button
          type="primary"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          style={{
            marginBottom: "16px",
            width: "100%",
            backgroundColor: "#6c63ff",
            border: "none",
          }}
        />
        {!collapsed && <Text strong style={{ marginLeft: "10px" }}>Contacts</Text>}
        <List
          itemLayout="horizontal"
          dataSource={contacts}
          renderItem={(contact) => (
            <List.Item
              onClick={() => handleSelectContact(contact)}
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta
                avatar={
                  <Badge dot={contact.hasUnread}>
                    <Avatar>{contact.username[0]}</Avatar>
                  </Badge>
                }
                title={collapsed ? "" : contact.username}
                description={collapsed ? "" : contact.latestMessage || "No messages yet"} 
              />
            </List.Item>
          )}
        />
      </Sider>

      {/* 右侧聊天窗口 */}
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
          <div style={{ fontWeight: "bold" }}>Chat Room with {currentContact}</div>
        </Header>

        <Content
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          {/* 聊天内容 */}
          <div style={{ flex: 1, overflowY: "auto", marginBottom: "16px" }}>
            {messages.length > 0 ? (
              <List
                dataSource={messages}
                renderItem={(message) => (
                  <List.Item key={message.id}>
                    <List.Item.Meta
                      avatar={<Avatar>{message.senderUsername ? message.senderUsername[0] : "?"}</Avatar>}
                      title={<Text strong>{message.senderUsername || "Unknown"}</Text>}
                      description={<Text>{message.content}</Text>}
                    />
                    <div>{new Date(message.timestamp).toLocaleString()}</div>
                  </List.Item>
                )}
              />
            ) : (
              <div style={{ textAlign: "center", color: "#888" }}>No messages yet</div>  // 提示无消息
            )}
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
