// src/components/Dashboard.js
import React from 'react';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';
import moment from 'moment';  // 引入moment库用于日期处理

//引入静态数据用于测试
import scheduleServices from '../static_data_for_test/ScheduleData';

function Dashboard() {

//获取最近的服务日期
  const nextService = scheduleServices
  .filter(service => moment(service.date).isAfter(moment()))  // 过滤掉过去的日期
  .sort((a, b) => moment(a.date).diff(moment(b.date)))  // 按日期排序
  [0];
  
  const UnreadMessage = 2; // 未读消息数量
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
          {UnreadMessage ? (
            <Text fontSize="md" color="red.500">
              You have {UnreadMessage} unread messages.
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
            <Text fontSize="md" color="blue.500">
              Your next service is scheduled on {moment(nextService.date).format('MMMM Do, YYYY')}.
            </Text>
          ) : (
            <Text fontSize="md" color="red.500">
              No service scheduled.
            </Text>
          )}
        </GridItem>
        <GridItem w="100%" h="150px" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg">Discussion</Text>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Dashboard;
