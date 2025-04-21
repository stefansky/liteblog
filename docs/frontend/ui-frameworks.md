
# 常见前端 UI 框架使用笔记

## 一、主流 UI 框架介绍及链接

| 框架名称       | 官网链接                                      | 备注                   |
|----------------|-----------------------------------------------|------------------------|
| Element Plus   | https://element-plus.org/                     | Vue 3 主流组件库       |
| Ant Design     | https://ant.design/                           | React 生态主流 UI 框架 |
| Naive UI       | https://www.naiveui.com/                      | 轻量、风格现代         |
| Arco Design    | https://arco.design/                          | 字节跳动出品 UI 库     |
| Vuetify        | https://vuetifyjs.com/                        | Vue + Material Design  |
| Chakra UI      | https://chakra-ui.com/                        | React + 主题友好       |
| MUI (Material) | https://mui.com/                              | React + Material Design|
| Quasar         | https://quasar.dev/                           | Vue + 多平台           |

---

## 二、常用组件使用示例

### 1. 表单 Form

#### Ant Design 示例
```tsx
<Form form={form} layout="vertical" onFinish={handleSubmit}>
  <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
    <Input />
  </Form.Item>
  <Form.Item name="gender" label="性别">
    <Select options={[{ label: '男', value: 'male' }, { label: '女', value: 'female' }]} />
  </Form.Item>
  <Form.Item>
    <Button htmlType="submit">提交</Button>
  </Form.Item>
</Form>
```

#### Element Plus 示例
```vue
<el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
  <el-form-item label="姓名" prop="name">
    <el-input v-model="form.name" />
  </el-form-item>
  <el-form-item label="性别" prop="gender">
    <el-select v-model="form.gender" placeholder="请选择">
      <el-option label="男" value="male" />
      <el-option label="女" value="female" />
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submit">提交</el-button>
  </el-form-item>
</el-form>
```

---

### 2. 表格 Table

#### Ant Design
```tsx
<Table dataSource={data} columns={columns} rowKey="id" pagination />
```

#### Element Plus
```vue
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="name" label="姓名" />
  <el-table-column prop="age" label="年龄" />
</el-table>
```

---

### 3. 弹框 Dialog / Modal

#### Ant Design
```tsx
<Modal title="提示" visible={visible} onCancel={close} onOk={confirm}>
  <p>确定要删除吗？</p>
</Modal>
```

#### Element Plus
```vue
<el-dialog title="提示" v-model="visible">
  <p>确定要删除吗？</p>
  <template #footer>
    <el-button @click="close">取消</el-button>
    <el-button type="primary" @click="confirm">确定</el-button>
  </template>
</el-dialog>
```

---

### 4. 消息提示

#### Ant Design
```ts
message.success('操作成功');
message.error('操作失败');
```

#### Element Plus
```ts
ElMessage.success('操作成功');
ElMessage.error('操作失败');
```

---

## 三、二次开发常见组件封装

### ✅ 封装表单组件（Form）

**封装点：**
- 动态 schema 配置
- 内部支持校验、loading、字典联动、布局适配
- 表单值初始化、回显

**结构示例：**
```tsx
<SchemaForm
  schema={[{ label: '用户名', field: 'name', component: 'Input' }]}
  onSubmit={handleSubmit}
/>
```

---

### ✅ 分页表格封装

**封装点：**
- 自动分页请求
- 查询表单结合
- loading 状态绑定
- 权限控制

**结构示例：**
```vue
<ProTable
  columns="..."
  api="getList"
  pagination
  searchForm
/>
```

---

### ✅ 弹框表单封装

**封装点：**
- Form 与 Modal 组合
- 支持新增/编辑模式
- 自动校验、loading 提交

```tsx
<ModalForm
  title="编辑用户"
  visible={visible}
  onFinish={handleSubmit}
  initialValues={record}
/>
```

---

### ✅ 通用组件封装列表

| 组件名         | 用途说明                                       |
|----------------|------------------------------------------------|
| ConfirmDialog  | 封装确认弹窗                                  |
| UploadImage    | 支持预览、裁剪的图片上传组件                   |
| EmptyWrapper   | 无数据提示 + 自定义内容展示                    |
| SearchForm     | 支持表单查询与重置的表单模块                   |
| Auth           | 按钮/操作权限控制组件                          |
| GlobalLoading  | 全局 loading 控制器                            |
| LangSwitcher   | 多语言切换组件，结合 i18n 实现                 |

---

### ✅ 封装请求工具 + Loading

**配合 axios 封装**
```ts
request.get('/api/user', {
  showLoading: true,
  handleError: true,
});
```

---

### ✅ 多语言 / 主题 / 全局配置难点说明

| 难点     | 解决思路                                                 |
|----------|----------------------------------------------------------|
| 多语言   | 使用 i18n 插件（vue-i18n、react-i18next），封装组件文本、下拉、表格 |
| 主题     | 使用 CSS Variables + 主题配置文件，全局样式自动切换     |
| 全局配置 | 使用 context / provide 注入配置，如请求头、权限开关、UI 默认值 |

---
