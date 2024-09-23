import axios from 'axios';

// Create an axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Send cookies when cross-domain requests
});
// Add a response interceptor
const handleResponse = (response) => response.data;

// Add a error interceptor
const handleError = (error) => {
    if (error.response) {
        // 服务器返回错误响应，获取错误消息
        throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
        // 请求已发出，但没有收到响应（如网络问题）
        throw new Error('Network error');
    } else {
        // 其他错误，如设置问题
        throw new Error('Error: ' + error.message);
    }
};

// Define the register API calls
export const register = async (user) => {
    try {
        const response = await apiClient.post('/register', user);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

// Define the login API calls
export const login = async (user) => {
    try {
        // 创建 FormData 对象
        const formData = new FormData();
        formData.append('usernameOrEmail', user.usernameOrEmail);
        formData.append('password', user.password);

        // 使用 FormData 发送 POST 请求
        const response = await apiClient.post('/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Network error');
        }
    }
};

// Define the logout API calls
export const handleLogout = async () => {
    try {
        // 向后端发送登出请求
        const response = await apiClient.post('/logout', {}, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true // 这是 axios 中等同于 fetch 的 credentials: 'include'
        });

        if (response.status === 200) {
            // 成功登出，清除本地存储的用户数据（如 token）
            localStorage.removeItem('token'); // 如果使用 token 存储在 localStorage
            sessionStorage.removeItem('token'); // 如果使用 sessionStorage

            // 重定向用户到登录页面
            window.location.href = '/';
        } else {
            console.error("Logout failed");
        }
    } catch (error) {
        console.error("Error occurred during logout", error);
    }
};

// 获取用户信息
export const getUserInfo = async () => {
    try {
        // 发送 GET 请求到 /username 端点
        const response = await apiClient.get('/username', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true 
        });

        // 返回用户名数据
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Network error');
        }
    }
};

//调用发送信息API

export const sendMessage = async (message) => {
    try {
    const response = await apiClient.post('/messages/Send', message);
    return handleResponse(response);
  } catch (error) {
    console.error("Error sending message:", error.response ? error.response.data : error.message);
    handleError(error);
  }
};

//调用获取信息API

export const getMessageBetweenUsers = async (username1,username2) => {
    try {
        const response = await apiClient.get(`messages/${username1}/${username2}`);
        return response.data || [];  // 保证返回一个数组
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return [];  // 如果是找不到记录，则返回空数组
        }
        handleError(error);
      }
}

//初始化websocket
export const initWebSocket = (onMessageReceived) => {
    const socket = new WebSocket('ws://localhost:8080/chat'); 
    socket.onopen = () => {
        console.log('WebSocket is open now.');
    };

    socket.onmessage = (event) => {
        console.log('Raw WebSocket message received:', event.data);
  
        try {
            // 尝试解析 JSON 数据
            const message = JSON.parse(event.data);
            onMessageReceived(message);  // 调用消息处理回调
            console.log('Parsed WebSocket message:', message);
        } catch (error) {
            // 如果解析失败，打印错误信息
            console.error('Failed to parse WebSocket message:', error);
        }
        };

    socket.onerror = (error) => {
        console.error('WebSocket error: ' , error);
    };

    socket.onclose = () => {
        console.log('WebSocket is closed now.');
    };

    return socket;
};

//获取联系人列表

export const getContacts = async () => {
    try {
        const response = await apiClient.get('/GetUserBycommunityName');
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

//标记信息已读
export const markMessageRead = async (messageId) => {
    try {
        const response = await apiClient.put(`/messages/${messageId}/Read`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

//获取未读信息数量
export const getUnreadMessageCount = async (username) => {
    try {
        const response = await apiClient.get(`/messages/UnreadCount/${username}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

//Discussion API
//获取讨论列表

export const getDiscussions = async () => {
    try {
        const response = await apiClient.get('discussions/getAllDiscussions');
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

//创建讨论
export const createDiscussion = async (discussion) => {
    try {
        const response = await apiClient.post('discussions/Create', discussion);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

//删除讨论
export const deleteDiscussion = async (discussionId) => {
    try {
        const response = await apiClient.delete(`discussions/Delete/${discussionId}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

//创建回复
export const createReply = async (reply) => {
    try {
        const response = await apiClient.post('replies/create', reply);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

//获取讨论回复
export const getReplies = async (discussionId) => {
    try {
        const response = await apiClient.get(`replies/getRepliesByDiscussionId/${discussionId}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

//删除回复
export const deleteReply = async (replyId) => {
    try {
        const response = await apiClient.delete(`replies/Delete/${replyId}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

//获取未读回复数量
export const getUnreadReplyCount = async (username) => {
    try {
        const response = await apiClient.get(`replies/countUnreadReplies/${username}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

//标记回复已读
export const markReplyRead = async (username) => {
    try {
        const response = await apiClient.put(`replies/markAsRead/${username}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}
 






