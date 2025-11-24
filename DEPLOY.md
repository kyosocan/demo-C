# GitHub Pages 部署说明

## 部署步骤

### 1. 确保代码已推送到 GitHub

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "准备部署到 GitHub Pages"

# 推送到 GitHub
git push origin main
```

### 2. 在 GitHub 上启用 Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分：
   - 选择 **GitHub Actions** 作为部署源
   - 保存设置

### 3. 配置 Base URL（重要）

根据你的仓库名称，需要设置正确的 base URL：

#### 情况 A：仓库名是 `username.github.io`
- 这是你的个人/组织主页仓库
- 不需要修改配置，base URL 默认为 `/`
- 网站将部署在 `https://username.github.io/`

#### 情况 B：仓库名是其他名称（如 `community_demo`）
- 需要设置 base URL 为 `/仓库名/`
- 有两种方式：

**方式 1：修改 vite.config.ts**
```typescript
export default defineConfig({
  base: '/community_demo/',  // 替换为你的仓库名
  // ... 其他配置
})
```

**方式 2：使用环境变量（推荐）**
在 `.github/workflows/deploy.yml` 中已经配置了自动检测，但如果你需要手动设置，可以在构建时设置环境变量。

### 4. 触发部署

部署会在以下情况自动触发：
- 推送到 `main` 分支
- 手动在 GitHub Actions 中触发

### 5. 查看部署状态

1. 进入你的 GitHub 仓库
2. 点击 **Actions** 标签
3. 查看部署工作流的状态
4. 部署成功后，在 **Settings > Pages** 中可以看到你的网站 URL

## 常见问题

### Q: 部署后页面显示 404？
A: 检查 base URL 是否正确设置。如果仓库名不是 `username.github.io`，需要设置 base 为 `/仓库名/`

### Q: 图片或资源加载失败？
A: 确保所有资源路径使用相对路径，并且 base URL 配置正确

### Q: 如何更新网站？
A: 只需推送新的更改到 `main` 分支，GitHub Actions 会自动重新部署

### Q: 部署需要多长时间？
A: 通常需要 1-3 分钟，你可以在 Actions 标签中查看进度

## 本地测试构建

在部署前，可以在本地测试构建：

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

如果预览正常，部署到 GitHub Pages 也应该没问题。

