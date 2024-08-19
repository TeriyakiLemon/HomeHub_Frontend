import React, {useState} from 'react';
import {ChakraProvider,
     Box, Flex, Text, IconButton, 
     Avatar, VStack, HStack, Icon, 
     Button, Grid, GridItem,Menu,MenuItem,
     MenuButton,MenuList} from '@chakra-ui/react';

import { MenuOutlined, TeamOutlined,PayCircleOutlined, DashboardOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, ChatIcon } from '@chakra-ui/icons';
import Dashboard from '../Component/Dashboard';
import My_Calendar from '../Component/My_Calendar';


function MainPage(){

    //使用useNavigate hook来导航到其他页面
    const navigate = useNavigate();

    //定义一个状态变量isSidebarOpen，用于记录侧边栏是否展开
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    //定义一个状态变量activeContent，用于记录当前显示的内容
    const [activeContent, setActiveContent] = useState('default');

    //定义一个状态变量activeMenuItem，用于记录当前选中的菜单项
    const [activeMenuItem, setActiveMenuItem] = useState('default');

    //根据activeContent渲染不同的内容
    const renderContent = () => {
        switch (activeContent) {
          case "Chat":
            //hardcode chat content, 未来获取chat component
            return <Text>Chat Content</Text>;
          case "Calendar":
            //calendar component
            return <My_Calendar/>;
          case "Discussion":
            //hardcode discussion content, 未来获取discussion component
            return <Text>Discussion Content</Text>;
          case "Payment":
            //hardcode payment content, 未来获取payment component
            return <Text >Payment Content</Text>;
          case "Dashboard":
            //dashboard component
            return <Dashboard/>;
            //默认状态下显示dashboard component
          default:
            return <Dashboard/>;
        }
      };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    //处理菜单点击事件
    const handlemenuClick = (content) => {
        setActiveContent(content);
        setActiveMenuItem(content);
    }

    const handleLogout = () => {
        //执行登出操作
        //localStorage.removeItem('token');
        navigate('/');
    };

    return(
        <ChakraProvider>
            <Flex h = "100vh" flexDirection="column">
                {/* 顶部栏 */}
                <Flex
                as= "header"
                w = "full"
                h = "16"
                px = "4"
                bg="white"
                align="center"
                justify="space-between"
                boxShadow="md"
                >   
                {/* 左侧标题 */}
                    <Text 
                    fontSize = "2xl" fontWeight = "bold" color = "orange.400">
                        Home Hub
                    </Text> 

                    {/* 右侧用户信息 */}
                    <Flex align="center">
                        <Menu>
                            <MenuButton
                             as={Button}
                             variant="link"
                             cursor="pointer"
                             minW={0}
                            >
                            <Avatar size="sm" name='Username' mr="3" />
                            </MenuButton>
                            {/* 下拉菜单 */}
                            <MenuList minW="100px">
                                <MenuItem  onClick={handleLogout}>
                                    Logout
                                </MenuItem> 
                            </MenuList>
                        </Menu>
                         {/* hardcode username, 未来需要从后端获取用户名 */}
                        <Text>Username</Text>
                    </Flex>
                </Flex>

                {/* 主体内容 */}
                <Flex flex="1" h = "full" bg = "gray.50">
                    <Box as = "nav" w = {isSidebarOpen ? "250px" : "60px"}  h="full" bg="purple.50" boxShadow="md" p="4" 
                    display="flex" flexDirection="column"justifyContent="space-between" transition= "width 0.1s" >
                        <VStack align="start" spacing= "4">
                        <IconButton
                            aria-label="Menu"
                            icon as = {MenuOutlined}
                            variant="ghost"
                            size="lg"
                            onClick={toggleSidebar}
                        />
                        <Button
                            variant="ghost"
                            justifyContent="flex-start"
                            leftIcon ={<DashboardOutlined/>}
                            width="full"
                            colorScheme={activeMenuItem === "Dashboard" ? "orange" : "purple"}
                            display={isSidebarOpen ? "flex" : "none"}
                            onClick={() => handlemenuClick("Dashboard")}
                        >
                            Dashboard
                        </Button>
                        <Button
                            variant="ghost"
                            justifyContent="flex-start"
                            leftIcon ={<ChatIcon/>}
                            width="full"
                            colorScheme={activeMenuItem === "Chat" ? "orange" : "purple"}
                            display={isSidebarOpen ? "flex" : "none"}
                            onClick={() => handlemenuClick("Chat")}
                        >
                            Chat
                        </Button>
                        <Button 
                            variant="ghost"
                            justifyContent="flex-start"
                            leftIcon={<CalendarIcon/>}
                            width="full"
                            colorScheme={activeMenuItem === "Calendar" ? "orange" : "purple"}
                            display={isSidebarOpen ? "flex" : "none"}
                            onClick={() => handlemenuClick("Calendar")}
                        >
                            Calendar
                        </Button>
                        <Button 
                            variant="ghost"
                            justifyContent="flex-start"
                            leftIcon ={<TeamOutlined/>}
                            width="full"
                            colorScheme={activeMenuItem === "Discussion" ? "orange" : "purple"}
                            display={isSidebarOpen ? "flex" : "none"}
                            onClick={() => handlemenuClick("Discussion")}
                        >
                            Discussion
                        </Button>

                        <Button 
                            variant="ghost"
                            justifyContent="flex-start"
                            leftIcon ={<PayCircleOutlined/>}
                            width="full"
                            colorScheme={activeMenuItem === "Payment" ? "orange" : "purple"}
                            display={isSidebarOpen ? "flex" : "none"}
                            onClick={() => handlemenuClick("Payment")}
                        >
                            Payment
                        </Button>
                        </VStack>
                    </Box>
                    {/* 主体内容区域*/}
                    <Box
                        flex="1"
                        p="8"
                        bg="purple.40"
                        boxShadow="md"
                        borderRadius="md"
                        ml="4"
                    >
                        {renderContent()}
                    </Box>
                </Flex>

            </Flex>
        </ChakraProvider>
    )
}

export default MainPage;