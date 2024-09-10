import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Link,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Image,
  Stack,
  useToast
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { login } from '../Api';

import LoginImage from '../Resources/Login_image.png';

function LoginPage() {
  // 使用 useNavigate hook 來導航到其他頁面
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toasts = useToast();
  const handleLogin = async () => {
    if (!username || !password) {
      toasts({
          title: 'Missing Information',
          description: 'Please enter both username and password',
          status: 'warning',
          duration: 5000,
          isClosable: true,
      });
      return;
  }
    try {
      // 调用 login API
      await login({
        usernameOrEmail: username,
        password,
      });
      // 登陆成功，显示成功消息
      toasts({
        title: 'Login Success',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // 登陆成功后，导航到主页
      navigate('/MainPage');
    } catch (error) {
      // 登陆失败，显示失败消息
      toasts({
        title: 'Login Failed',
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
      {/* 内层容器，用于登陆表单和图片展示 */}
      <Flex
        bg="white"
        p={8}
        rounded="lg"
        boxShadow="lg"
        width="100%" 
        maxW="1200px" 
        mx="auto"
        alignItems="center"
        justifyContent="space-between" 
        direction={{ base: 'column', md: 'row' }} 
      >
        {/* 左侧容器：包含标题，登陆表单和注册按钮 */}
        <Box
          width={{ base: '100%', md: '45%' }} 
          textAlign={{ base: 'center', md: 'left' }}
          mb={{ base: 8, md: 0 }} 
        >
          {/* 标题 */}
          <Heading mb={6} color="orange.400">
            Home Hub
          </Heading>

          {/* 登陆表单提示文本 */}
          <Text mb={4} fontSize="lg" fontWeight="bold" color ="black">
            Login into your account
          </Text>

          {/* 登陆表单 */}
          <Stack spacing={4}>
            {/* 用户名输入 */}
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <InputGroup>
                <InputLeftElement children={<EmailIcon color="gray.500" />} />
                <Input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </InputGroup>
            </FormControl>
            {/* 密码输入 */}
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement children={<LockIcon color="gray.500" />} />
                <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </InputGroup>
              {/* 忘记密码链接 */}
              <Flex justify="flex-end">
                <Link color="orange.400" mt={2}>
                  Forgot Password?
                </Link>
              </Flex>
            </FormControl>
            {/* 登陆按钮 */}
            <Button colorScheme="orange" size="lg" width="full" onClick={handleLogin}>
              Login Now
            </Button>
          </Stack>

          <Text mt={6} fontWeight="bold" color ="black">
            OR
          </Text>
          
            {/* 注册按钮 */}
          <Button colorScheme="orange" variant="outline" mt={4} width="full" onClick={() => navigate('/Register')}>
            Signup Now
          </Button>
        </Box>
        
          {/* 右侧容器：用于展示登陆页面图片 */}
        <Box
          width={{ base: '100%', md: '50%' }} 
          textAlign="center"
        >
          {/* 登陆插图 */}
          <Image
            src={LoginImage} 
            alt="Illustration"
            maxH="500px"
            mx="auto"
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
