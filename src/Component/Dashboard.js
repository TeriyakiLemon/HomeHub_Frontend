// src/components/Dashboard.js
import React from 'react';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';

function Dashboard() {
  return (
    // Dashboard component content 目前只是简单的展示了一个Grid布局，包含四个GridItem
    <Box p="8">
      <Text fontSize="2xl" mb={4}>Dashboard</Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="100%" h="150px" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg">Message</Text>
        </GridItem>
        <GridItem w="100%" h="150px" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg">Payment</Text>
        </GridItem>
        <GridItem w="100%" h="150px" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg">Calendar</Text>
        </GridItem>
        <GridItem w="100%" h="150px" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg">Discussion</Text>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Dashboard;
