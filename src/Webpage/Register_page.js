import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  Stack,
  RadioGroup,
  Radio,
  Link,
  useToast,
} from '@chakra-ui/react';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { register } from '../Api';

function RegisterPage() {
  //使用 useState hook 來保存用户类型的状态
  const [userType, setUserType] = useState('Resident');
  const [communityName, setCommunityName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toasts = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        toasts({
          title: 'Register Failed',
          description: 'Passwords do not match',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // 调用 register API
      await register({
        userType,
        communityName,
        email,
        username,
        password,
        confirmPassword,
      });
      // 注册成功，显示成功消息
      toasts({
        title: 'Register Success',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // 跳转到登录页面
      navigate('/');
    } catch (error) {
      // 注册失败，显示错误消息
      toasts({
        title: 'Register Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }


  return (
    // 外层容器，设置全屏高度，垂直居中，背景颜色，内边距
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      p={8}
    >
      {/* 内层容器，用于注册表单 */}
      <Box
        bg="white"
        p={8}
        rounded="lg"
        boxShadow="lg"
        width="100%"
        maxW="600px" 
        mx="auto"
      >
        {/* 注册表单标题 */}
        <Box textAlign="center">
          <Heading mb={6} color="orange.400">
            Home Hub
          </Heading>
          <Text mb={4} fontSize="lg" fontWeight="bold" color="black">
            Sign up your account
          </Text>
        </Box>

        {/* 注册表单 */}  
        <Stack spacing={4}>
          <FormControl as="fieldset">
            <FormLabel as="legend">Who are you?</FormLabel>
            <RadioGroup
              defaultValue={userType}
              onChange={(value) => setUserType(value)}
            >
              <Stack direction="row" spacing={4}>
                <Radio value="Resident">Resident</Radio>
                <Radio value="Property Company">Property Company</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          {/* 社区名称输入 */}  
          <FormControl id="communityName">
            <FormLabel>Community Name</FormLabel>
            <Input type="text" placeholder="Enter your community name" value={communityName} onChange={(e) => setCommunityName(e.target.value)}/>
          </FormControl>

          {/* 邮箱地址输入框，用于找回密码 */}
          <FormControl id="Email">
            <FormLabel>Email</FormLabel>
            <Input type="text" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>

          {/* 用户名输入框 */}
          <FormControl id="username">
            <FormLabel>User Name</FormLabel>
            <Input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </FormControl>
            
          {/* 密码输入框 */}
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </FormControl>

          {/* 确认密码输入框 */}
          <FormControl id="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" placeholder="Enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </FormControl>

          {/* 注册按钮 */}
          <Button colorScheme="orange" size="lg" width="full" onClick={handleRegister}>
            Sign up
          </Button>

          {/* 返回链接 */}
          <Text mt={4} textAlign="center">
            <Link as={RouterLink} to="/" color="orange.400">
              Go back
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}

export default RegisterPage;
