# Axios 使用指南

## 1. 基础使用

### 1.1 安装与配置

```bash
# 安装
npm install axios
# 或
yarn add axios
```

```javascript
// 基本配置
axios.defaults.baseURL = "https://api.example.com";
axios.defaults.timeout = 5000;
axios.defaults.headers.common["Authorization"] = "Bearer token";

// 自定义配置
const instance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

### 1.2 请求方法

```javascript
// GET 请求
axios.get("/user", {
  params: {
    ID: 12345,
  },
});

// POST 请求
axios.post("/user", {
  firstName: "Fred",
  lastName: "Flintstone",
});

// PUT 请求
axios.put("/user/12345", {
  firstName: "Fred",
  lastName: "Flintstone",
});

// DELETE 请求
axios.delete("/user/12345");

// 并发请求
axios
  .all([axios.get("/user/12345"), axios.get("/user/12345/permissions")])
  .then(
    axios.spread((userResp, permResp) => {
      // 两个请求都完成
    })
  );
```

### 1.3 请求配置

```javascript
// 完整配置示例
axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone",
  },
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  responseType: "json",
  withCredentials: true,
  auth: {
    username: "janedoe",
    password: "s00pers3cret",
  },
});
```

## 2. 高级特性

### 2.1 拦截器

```javascript
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，跳转到登录页
          break;
        case 403:
          // 禁止访问
          break;
        case 404:
          // 资源不存在
          break;
        case 500:
          // 服务器错误
          break;
      }
    }
    return Promise.reject(error);
  }
);
```

### 2.2 取消请求

```javascript
// 创建取消令牌
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// 发送请求
axios
  .get("/user/12345", {
    cancelToken: source.token,
  })
  .catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // 处理错误
    }
  });

// 取消请求
source.cancel("Operation canceled by the user.");
```

## 3. 项目应用

### 3.1 请求封装

```javascript
// api/request.js
import axios from "axios";
import { message } from "antd";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("请求错误:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      message.error(res.message || "请求失败");
      return Promise.reject(new Error(res.message || "请求失败"));
    }
    return res;
  },
  (error) => {
    console.error("响应错误:", error);
    message.error(error.message || "请求失败");
    return Promise.reject(error);
  }
);

export default service;
```

### 3.2 API 模块化

```javascript
// api/user.js
import request from "./request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function getUserInfo() {
  return request({
    url: "/user/info",
    method: "get",
  });
}

export function updateUserInfo(data) {
  return request({
    url: "/user/info",
    method: "put",
    data,
  });
}
```

## 4. 原生请求封装

### 4.1 Fetch 封装

```javascript
// utils/fetch.js
class Fetch {
  constructor(baseURL = "", timeout = 5000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  async request(url, options = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(this.baseURL + url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("请求超时");
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  get(url, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`${url}?${queryString}`);
  }

  post(url, data) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put(url, data) {
    return this.request(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete(url) {
    return this.request(url, {
      method: "DELETE",
    });
  }
}

export default new Fetch(process.env.REACT_APP_API_URL);
```

### 4.2 XMLHttpRequest 封装

```javascript
// utils/xhr.js
class XHR {
  constructor(baseURL = "", timeout = 5000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  request(method, url, data = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const fullUrl = this.baseURL + url;

      xhr.open(method, fullUrl, true);
      xhr.timeout = this.timeout;

      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error("解析响应失败"));
          }
        } else {
          reject(new Error(`HTTP error! status: ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error("网络错误"));
      };

      xhr.ontimeout = () => {
        reject(new Error("请求超时"));
      };

      xhr.send(data ? JSON.stringify(data) : null);
    });
  }

  get(url, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request("GET", `${url}?${queryString}`);
  }

  post(url, data) {
    return this.request("POST", url, data);
  }

  put(url, data) {
    return this.request("PUT", url, data);
  }

  delete(url) {
    return this.request("DELETE", url);
  }
}

export default new XHR(process.env.REACT_APP_API_URL);
```

## 5. 最佳实践

### 5.1 错误处理

```javascript
// 统一错误处理
const handleError = (error) => {
  if (error.response) {
    // 请求已发出，服务器响应状态码不在 2xx 范围内
    console.error("响应错误:", error.response.data);
    console.error("状态码:", error.response.status);
    console.error("响应头:", error.response.headers);
  } else if (error.request) {
    // 请求已发出，但没有收到响应
    console.error("请求错误:", error.request);
  } else {
    // 发送请求时出了点问题
    console.error("错误:", error.message);
  }
  console.error("错误配置:", error.config);
};
```

### 5.2 请求重试

```javascript
// 请求重试机制
const retryRequest = async (config, retries = 3) => {
  try {
    return await axios(config);
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return retryRequest(config, retries - 1);
    }
    throw error;
  }
};
```

### 5.3 请求缓存

```javascript
// 请求缓存
const cache = new Map();

const cachedRequest = async (config) => {
  const key = JSON.stringify(config);

  if (cache.has(key)) {
    const { data, timestamp } = cache.get(key);
    // 缓存有效期 5 分钟
    if (Date.now() - timestamp < 5 * 60 * 1000) {
      return data;
    }
  }

  const response = await axios(config);
  cache.set(key, {
    data: response.data,
    timestamp: Date.now(),
  });

  return response.data;
};
```

## 6. 性能优化

### 6.1 并发控制

```javascript
// 并发请求控制
class RequestQueue {
  constructor(maxConcurrent = 5) {
    this.maxConcurrent = maxConcurrent;
    this.queue = [];
    this.running = 0;
  }

  async add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      this.run();
    });
  }

  async run() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { request, resolve, reject } = this.queue.shift();

    try {
      const result = await request();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.run();
    }
  }
}

const queue = new RequestQueue(5);
```

### 6.2 请求合并

```javascript
// 请求合并
class RequestMerger {
  constructor() {
    this.cache = new Map();
    this.timer = null;
  }

  add(key, request) {
    if (!this.cache.has(key)) {
      this.cache.set(key, {
        requests: [],
        timer: null,
      });
    }

    const entry = this.cache.get(key);
    entry.requests.push(request);

    if (!entry.timer) {
      entry.timer = setTimeout(() => {
        this.execute(key);
      }, 100);
    }
  }

  async execute(key) {
    const entry = this.cache.get(key);
    const requests = entry.requests;
    entry.requests = [];
    entry.timer = null;

    try {
      const result = await axios.all(requests.map((req) => req()));
      requests.forEach((_, index) => {
        requests[index].resolve(result[index]);
      });
    } catch (error) {
      requests.forEach((req) => {
        req.reject(error);
      });
    }
  }
}
```

## 7. 常见问题

### 7.1 跨域问题

- CORS 配置
- 代理配置
- 跨域解决方案

### 7.2 错误处理

- 网络错误
- 超时错误
- 服务器错误
- 业务错误

### 7.3 性能优化

- 请求合并
- 请求缓存
- 请求取消
- 并发控制

## 8. 与其他工具集成

### 8.1 与 Vue 集成

- Vue 插件
- 请求封装
- 错误处理
- 类型支持

### 8.2 与 React 集成

- 自定义 Hook
- 请求封装
- 错误处理
- 类型支持

## 9. 测试

### 9.1 单元测试

- 请求测试
- 响应测试
- 错误测试
- Mock 数据

### 9.2 集成测试

- 接口测试
- 错误处理测试
- 性能测试
- 安全测试
