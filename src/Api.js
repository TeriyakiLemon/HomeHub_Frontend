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





