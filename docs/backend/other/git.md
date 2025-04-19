# Git 使用

## 1. 什么是 Git

Git 是一个分布式版本控制系统，用于跟踪文件的变化并协调多人协作开发。它由 Linus Torvalds 在 2005 年创建，主要用于 Linux 内核开发。

### 1.1 Git 的特点

- **分布式**：每个开发者都有完整的代码仓库副本
- **高效**：快速的分支切换和合并操作
- **安全**：使用 SHA-1 哈希确保数据完整性
- **灵活**：支持多种工作流程和分支策略

### 1.2 Git 的基本概念

- **仓库（Repository）**：存储项目代码和版本历史的地方
- **提交（Commit）**：记录文件变化的快照
- **分支（Branch）**：用于并行开发的独立代码线
- **标签（Tag）**：标记重要的版本点
- **远程仓库（Remote）**：托管在服务器上的仓库副本

## 2. 为什么需要 Git

### 2.1 版本控制的重要性

- **追踪变化**：记录代码的每次修改
- **协作开发**：多人同时工作而不冲突
- **代码备份**：防止代码丢失
- **版本回退**：可以回到之前的任何版本
- **分支管理**：支持并行开发和实验

### 2.2 Git 的优势

- **离线工作**：可以在没有网络时继续工作
- **快速操作**：大多数操作在本地完成
- **分支管理**：轻量级分支，快速切换
- **完整性保证**：使用 SHA-1 确保数据安全
- **开源工具**：免费且社区支持强大

## 3. 常用的 Git 命令

### 3.1 基础命令

```bash
# 初始化仓库
git init

# 克隆仓库
git clone <repository-url>

# 查看状态
git status

# 添加文件到暂存区
git add <file>
git add .  # 添加所有文件

# 提交更改
git commit -m "commit message"

# 查看提交历史
git log
git log --oneline  # 简洁显示
git log --graph    # 图形化显示
```

### 3.2 分支操作

```bash
# 创建分支
git branch <branch-name>

# 切换分支
git checkout <branch-name>
git switch <branch-name>  # 新版本推荐

# 创建并切换分支
git checkout -b <branch-name>
git switch -c <branch-name>  # 新版本推荐

# 删除分支
git branch -d <branch-name>
git branch -D <branch-name>  # 强制删除

# 合并分支
git merge <branch-name>

# 变基操作
git rebase <branch-name>
```

### 3.3 远程操作

```bash
# 添加远程仓库
git remote add <name> <url>

# 查看远程仓库
git remote -v

# 拉取远程更新
git pull <remote> <branch>

# 推送本地更新
git push <remote> <branch>

# 获取远程更新
git fetch <remote>
```

### 3.4 撤销操作

```bash
# 撤销工作区修改
git checkout -- <file>

# 撤销暂存区修改
git reset HEAD <file>

# 撤销最近一次提交
git reset --soft HEAD^  # 保留修改
git reset --hard HEAD^  # 丢弃修改

# 修改最后一次提交
git commit --amend
```

## 4. 如何使用 Git

### 4.1 基本工作流程

1. **初始化项目**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **日常开发**

   ```bash
   # 创建功能分支
   git checkout -b feature/new-feature

   # 开发并提交
   git add .
   git commit -m "Add new feature"

   # 合并到主分支
   git checkout main
   git merge feature/new-feature
   ```

3. **团队协作**

   ```bash
   # 获取最新代码
   git pull origin main

   # 推送更改
   git push origin feature/new-feature

   # 创建 Pull Request
   # 在 GitHub/GitLab 等平台操作
   ```

### 4.2 分支策略

1. **Git Flow**

   - `main`：主分支，用于生产环境
   - `develop`：开发分支，用于集成
   - `feature/*`：功能分支
   - `release/*`：发布分支
   - `hotfix/*`：紧急修复分支

2. **GitHub Flow**

   - `main`：主分支，保持可部署状态
   - 功能分支：从 `main` 创建，完成后合并
   - 部署：合并到 `main` 后立即部署

3. **GitLab Flow**
   - `production`：生产环境分支
   - `pre-production`：预生产环境分支
   - `main`：主开发分支
   - 环境分支：对应不同部署环境

### 4.3 最佳实践

1. **提交规范**

   ```bash
   # 提交信息格式
   <type>(<scope>): <subject>

   # 类型
   feat: 新功能
   fix: 修复bug
   docs: 文档更新
   style: 代码格式
   refactor: 重构
   test: 测试相关
   chore: 构建过程或辅助工具的变动
   ```

2. **分支管理**

   - 保持分支简洁
   - 及时删除已合并的分支
   - 避免在公共分支上直接提交

3. **代码审查**

   - 使用 Pull Request
   - 保持小的提交
   - 提供清晰的描述

4. **冲突处理**

   ```bash
   # 解决冲突步骤
   1. 拉取最新代码
   git pull origin main

   2. 解决冲突
   # 编辑冲突文件

   3. 标记解决
   git add <resolved-file>

   4. 完成合并
   git commit -m "Resolve conflicts"
   ```

## 5. 总结

### 5.1 Git 的核心价值

- **版本控制**：追踪和管理代码变化
- **团队协作**：支持多人并行开发
- **代码管理**：组织和管理项目代码
- **历史记录**：保存完整的开发历史

### 5.2 学习建议

1. **循序渐进**

   - 先掌握基础命令
   - 再学习分支管理
   - 最后了解高级特性

2. **实践为主**

   - 创建个人项目练习
   - 参与开源项目
   - 解决实际问题

3. **持续学习**
   - 关注 Git 新特性
   - 学习最佳实践
   - 参与社区讨论

### 5.3 推荐资源

- **官方文档**：https://git-scm.com/doc
- **Pro Git 书籍**：https://git-scm.com/book
- **GitHub 指南**：https://guides.github.com
- **在线教程**：https://learngitbranching.js.org
