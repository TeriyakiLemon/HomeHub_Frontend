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
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

import LoginImage from '../Resources/Login_image.png';

function LoginPage() {
  // 使用 useNavigate hook 來導航到其他頁面
    const navigate = useNavigate(); 

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
                <Input type="text" placeholder="Enter your username" />
              </InputGroup>
            </FormControl>
            {/* 密码输入 */}
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement children={<LockIcon color="gray.500" />} />
                <Input type="password" placeholder="Enter your password" />
              </InputGroup>
              {/* 忘记密码链接 */}
              <Flex justify="flex-end">
                <Link color="orange.400" mt={2}>
                  Forgot Password?
                </Link>
              </Flex>
            </FormControl>
            {/* 登陆按钮 */}
            <Button colorScheme="orange" size="lg" width="full">
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
