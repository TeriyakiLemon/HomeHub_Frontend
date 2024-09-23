// src/components/Dashboard.js
import React, {useEffect, useState} from 'react';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';
import moment from 'moment';  // 引入moment库用于日期处理

//引入静态数据用于测试
import scheduleServices from '../static_data_for_test/ScheduleData';
import {getUnreadMessageCount, getUserInfo, getUnreadReplyCount} from '../Api';



function Dashboard() {
  
  const[username,setUsername] = useState(''); // 用户名状态
  const [unreadReplyCount, setUnreadReplyCount] = useState(0);  // 未读回复状态
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);  // 未读消息状态



  // 当组件加载时调用 getUserInfo API 来获取用户名
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userInfo = await getUserInfo();
        setUsername(userInfo.username);  // 设置用户名
      } catch (error) {
        console.error('Failed to fetch username:', error);
      }
    };

    fetchUsername();  // 调用函数获取用户名
  }, []);

  useEffect(() => {
    if (username) {  // 确保用户名已获取
      const fetchUnreadMessageCount = async () => {
        try {
          const count = await getUnreadMessageCount(username);  // 调用 API 获取未读消息数量
          setUnreadMessageCount(count);  // 将结果设置到状态中
        } catch (error) {
          console.error("Failed to fetch unread message count:", error);
        }
      };

      fetchUnreadMessageCount();  // 在用户名获取后调用
    }
  }, [username]);  // 当用户名变化时重新调用

  useEffect(() => {
    const fetchUnreadReplies = async () => {
      try {
        const count = await getUnreadReplyCount(username);  // 获取未读回复的数量
        console.log("API response for unread replies:", count);  // 添加日志查看 API 返回的数据
        setUnreadReplyCount(count);  // 更新状态
      } catch (error) {
        console.error('Failed to fetch unread replies:', error);
      }
    };
  
    fetchUnreadReplies();
  }, [username]);

//获取最近的服务日期
  const nextService = scheduleServices
  .filter(service => moment(service.date).isAfter(moment()))  // 过滤掉过去的日期
  .sort((a, b) => moment(a.date).diff(moment(b.date)))  // 按日期排序
  [0];
  
  return (

    // Dashboard component content 目前只是简单的展示了一个Grid布局，包含四个GridItem

    <Box p="8">
      <Box bg="blue.100" p={4} mb={4} borderRadius="md">
        Announcement: Welcome to Home Hub!
      </Box>
      <Text fontSize="2xl" mb={4}>Dashboard</Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="100%" h="auto" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Message</Text>
          {/* 如果有未读消息，显示未读消息数量，否则显示没有未读消息 */}
          {unreadMessageCount > 0 ? (
            <Text fontSize="md" color="red.500">
              You have {unreadMessageCount} unread messages.
            </Text>
          ) : (
            <Text fontSize="md" color="green.500">
              You have no unread messages.
            </Text>
          )}
        </GridItem>
        <GridItem w="100%" h="150px" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg">Payment</Text>
        </GridItem>
        {/* dashboard section show next service date */}
        <GridItem w="100%" h="auto" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="md" mb={2}>Next Service</Text>
          {/* 如果有下一个服务，显示下一个服务的日期，否则显示没有服务 */}
          {nextService ? (
            <Text fontSize="md" color="red.500">
              Your next service is scheduled on {moment(nextService.date).format('MMMM Do, YYYY')}.
            </Text>
          ) : (
            <Text fontSize="md" color="green.500">
              No service scheduled.
            </Text>
          )}
        </GridItem>
        <GridItem w="100%" h="150px" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg">Discussion</Text>
          
              {unreadReplyCount > 0 ? (
                <Text fontSize="md" color="red.500">
                  You have {unreadReplyCount} new replies to your discussions !
                </Text>
              ) : (
                <Text fontSize="md" color="green.500">
                  You have no new replies.
                </Text>
              )}
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Dashboard;
