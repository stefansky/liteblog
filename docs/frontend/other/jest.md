# 前端测试学习笔记

> 本文档整理前端测试的流程、测试内容及常见测试库的使用示例，涵盖 Vue 和 React 项目，提供示例测试用例，方便复制至本地笔记。

---

## 一、前端测试流程

1. **需求分析**：根据功能需求与设计文档，确定测试目标与覆盖范围。
2. **测试设计**：编写测试计划、测试用例，确认测试场景（边界条件、异常路径）。
3. **环境搭建**：安装并配置测试框架、断言库、工具（如 Jest、Mocha、Cypress）。
4. **编写测试**：根据测试用例实现单元测试、集成测试或端到端测试。
5. **执行测试**：本地或 CI 环境运行测试用例，并查看报告。
6. **结果分析**：定位失败用例原因，修复问题。重跑测试直到通过。
7. **覆盖率报告**：生成并审查覆盖率报告，补齐关键路径测试。
8. **持续集成**：将测试集成到 CI/CD 流水线，确保每次提交触发测试。

---

## 二、测试内容划分

| 测试类型       | 测试内容                                                      |
|--------------|--------------------------------------------------------------|
| 单元测试       | 纯函数、工具库、组件方法（无 DOM）、Vue/React 逻辑函数          |
| 组件测试       | 组件渲染、交互行为、输入输出、生命周期、UI 结构                |
| 集成测试       | 多组件配合、服务层调用、路由跳转、状态管理                     |
| 端到端（E2E） | 用户场景驱动：表单提交、页面流转、接口联调、完整业务流程         |
| 性能测试       | 页面加载时间、交互响应、内存占用                               |

---

## 三、Vue 项目测试

### 3.1 常见框架与工具
- **单元测试**：Jest + @vue/test-utils
- **集成测试**：同上 + vuex-mock-store
- **端到端测试**：Cypress / TestCafe / Playwright
- **覆盖率**：`jest --coverage`

### 3.2 Jest + vue-test-utils 示例

```bash
npm install --save-dev jest @vue/test-utils vue-jest babel-jest
```

```js
// MyButton.vue
<template><button @click="onClick">{{ label }}</button></template>
<script>export default { props: ['label'], methods: { onClick() { this.$emit('click') } } }</script>
```

```js
// __tests__/MyButton.spec.js
import { shallowMount } from '@vue/test-utils'
import MyButton from '../src/components/MyButton.vue'

describe('MyButton.vue', () => {
  it('renders label', () => {
    const wrapper = shallowMount(MyButton, { props: { label: 'Click Me' } })
    expect(wrapper.text()).toBe('Click Me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = shallowMount(MyButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
```

### 3.3 E2E 测试示例（Cypress）

```bash
npm install --save-dev cypress
```

```js
// cypress/integration/login.spec.js
describe('Login Flow', () => {
  it('logs in successfully', () => {
    cy.visit('/login')
    cy.get('input[name=email]').type('test@example.com')
    cy.get('input[name=password]').type('password')
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/dashboard')
  })
})
```

---

## 四、React 项目测试

### 4.1 常见框架与工具
- **单元 & 组件测试**：Jest + React Testing Library
- **集成测试**：同上 + Mock Service Worker (MSW)
- **端到端测试**：Cypress / Playwright
- **覆盖率**：`jest --coverage`

### 4.2 Jest + React Testing Library 示例

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom babel-jest
```

```jsx
// Greeting.jsx
import React from 'react';
export default function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>
}
```

```js
// Greeting.test.js
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Greeting from './Greeting'

describe('Greeting Component', () => {
  it('renders greeting message', () => {
    render(<Greeting name="World" />)
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })
})
```

### 4.3 Mock Service Worker 示例（API 模拟）

```bash
npm install --save-dev msw
```

```js
// src/api.js
export async function fetchUser() {
  const res = await fetch('/api/user')
  return res.json()
}
```

```js
// __tests__/fetchUser.test.js
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fetchUser } from '../src/api'

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ id: 1, name: 'Alice' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('fetches user data', async () => {
  const data = await fetchUser()
  expect(data).toEqual({ id: 1, name: 'Alice' })
})
```

---

## 五、总结与最佳实践

- **测试金字塔**：单元测试 > 集成测试 > 端到端测试
- **高覆盖率不等于高质量**：关注关键业务路径和边界场景
- **Mock vs 实际**：单元测试中依赖注入与 Mock；E2E 测试中使用真实后端或 MSW
- **集成到 CI/CD**：确保每次提交都经过测试，避免回归
- **测试文档化**：结合测试用例保持测试文档和业务文档一致

---
