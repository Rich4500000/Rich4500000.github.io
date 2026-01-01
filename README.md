# 我们的小宇宙 - 爱情纪念网站

一个精美的爱情纪念网站，包含后台管理系统，使用Firebase作为后端服务。

## 功能特性

### 前端网站
- **浪漫首页**：粉蓝渐变背景，精美的文字和动画效果
- **爱情故事时间轴**：展示你们的恋爱历程，支持从后台动态编辑
- **时光相册**：展示你们的照片，支持从后台上传和删除
- **甜蜜留言板**：访客可以留言，管理员可以回复
- **恋爱计时器**：显示你们的恋爱时长
- **爱心轨迹**：鼠标移动时产生爱心动画效果

### 后台管理系统
- **管理员登录/登出**：使用Firebase Authentication
- **爱情故事管理**：添加、编辑、删除时间轴事件
- **相册管理**：上传、删除照片
- **留言管理**：查看、回复、删除留言
- **计时器设置**：设置恋爱开始日期

## 技术栈

- **前端**：HTML5、CSS3、Vanilla JavaScript（无框架）
- **后端**：Firebase
  - Firebase Authentication：用户管理
  - Firestore：数据存储
  - Firebase Storage：图片存储

## Firebase配置指南

### 1. 创建Firebase项目

1. 访问 [Firebase 控制台](https://console.firebase.google.com/)
2. 点击"添加项目"，输入项目名称
3. 按照提示完成项目创建

### 2. 配置Firebase服务

#### 2.1 启用Firebase Authentication

1. 在Firebase控制台中，选择"Authentication"
2. 点击"开始使用"
3. 选择"电子邮件/密码"登录方式
4. 启用"电子邮件/密码"，点击"保存"
5. 点击"用户"标签，添加管理员用户（用于登录后台）

#### 2.2 创建Firestore数据库

1. 在Firebase控制台中，选择"Firestore数据库"
2. 点击"创建数据库"
3. 选择"测试模式"（用于开发，生产环境请设置安全规则）
4. 选择地理位置，点击"启用"

#### 2.3 配置Firebase Storage

1. 在Firebase控制台中，选择"Storage"
2. 点击"开始使用"
3. 选择"测试模式"（用于开发，生产环境请设置安全规则）
4. 点击"完成"

### 3. 获取Firebase配置

1. 在Firebase控制台中，点击项目设置（齿轮图标）
2. 在"你的应用"部分，点击"Web应用"图标（</>）
3. 输入应用名称，点击"注册应用"
4. 复制生成的配置代码

### 4. 更新配置文件

将复制的Firebase配置更新到以下文件：

1. **主网站配置**：`/firebase-config.js`
2. **后台配置**：`/admin/config.js`

配置示例：
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
```

## 部署指南

### 本地开发

1. 在项目根目录启动HTTP服务器
   ```bash
   python3 -m http.server 8000
   ```
2. 在浏览器中访问 `http://localhost:8000`
3. 访问后台管理系统：`http://localhost:8000/admin`

### 部署到GitHub Pages

1. 创建GitHub仓库
2. 将代码推送到仓库
3. 进入仓库设置，找到"Pages"
4. 选择分支（通常为main），选择根目录
5. 点击"保存"，等待部署完成
6. 访问网站：`https://yourusername.github.io/repository-name`
7. 访问后台：`https://yourusername.github.io/repository-name/admin`

## 项目结构

```
├── index.html              # 主网站HTML
├── style.css               # 主网站样式
├── script.js               # 主网站JavaScript
├── firebase-config.js      # 主网站Firebase配置
├── admin/                  # 后台管理系统
│   ├── index.html          # 后台HTML
│   ├── style.css           # 后台样式
│   ├── admin.js            # 后台JavaScript
│   ├── config.js           # 后台Firebase配置
│   └── firebase.js         # 后台Firebase初始化
├── assets/                 # 资源目录
│   └── images/             # 图片目录
└── README.md               # 项目说明
```

## 自定义修改

### 修改网站内容
- **首页文字**：编辑 `index.html` 中的 `<h1>` 和 `<p>` 标签
- **颜色主题**：修改 `style.css` 中的 CSS 变量（`--pink`, `--blue` 等）
- **字体**：修改 `index.html` 中的 Google Fonts 链接

### 修改后台设置
- **管理员用户**：在Firebase控制台的Authentication中管理
- **数据安全规则**：在Firebase控制台中配置Firestore和Storage的安全规则

## 安全注意事项

1. **生产环境**：请务必将Firestore和Storage的规则从"测试模式"改为"生产模式"
2. **管理员密码**：请使用强密码，并定期更换
3. **数据备份**：定期导出Firestore数据，以防数据丢失

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎联系作者。

---

**祝你们的爱情永远甜蜜！** 💖