# 我们的小宇宙 - 爱情纪念网站

一个精美的爱情纪念网站，包含浪漫的粉蓝渐变主题、平滑的动画效果和完整的静态功能。

## 功能特性

### 前端网站
- **浪漫首页**：粉蓝渐变背景，精美的文字和动画效果
- **爱情故事时间轴**：展示你们的恋爱历程
- **时光相册**：展示你们的照片，支持点赞功能
- **甜蜜留言板**：访客可以留言
- **恋爱计时器**：显示你们的恋爱时长
- **爱心轨迹**：鼠标移动时产生爱心动画效果

## 技术栈

- **前端**：HTML5、CSS3、Vanilla JavaScript（无框架）
- **设计**：粉蓝渐变浪漫主题（主色：#ffb6c1, #87ceeb）
- **动画**：CSS3/JavaScript流畅动画效果

## 部署指南

### 本地开发

1. 在项目根目录启动HTTP服务器
   ```bash
   python3 -m http.server 8000
   ```
2. 在浏览器中访问 `http://localhost:8000`

### 部署到GitHub Pages

1. 创建GitHub仓库
2. 将代码推送到仓库
3. 进入仓库设置，找到"Pages"
4. 选择分支（通常为main），选择根目录
5. 点击"保存"，等待部署完成
6. 访问网站：`https://yourusername.github.io/repository-name`

## 项目结构

```
├── index.html              # 主网站HTML
├── style.css               # 主网站样式
├── script.js               # 主网站JavaScript
├── assets/                 # 资源目录
│   └── images/             # 图片目录
└── README.md               # 项目说明
```

## 自定义修改

### 修改网站内容
- **首页文字**：编辑 `index.html` 中的 `<h1>` 和 `<p>` 标签
- **颜色主题**：修改 `style.css` 中的 CSS 变量（`--pink`, `--blue` 等）
- **字体**：修改 `index.html` 中的 Google Fonts 链接
- **恋爱开始日期**：修改 `script.js` 中的 `anniversaryDate` 变量

### 修改时间轴数据
编辑 `script.js` 中的 `loveStories` 数组，添加或修改时间轴事件。

### 修改相册数据
编辑 `script.js` 中的 `galleryPhotos` 数组，添加或修改照片。

### 修改留言数据
编辑 `script.js` 中的 `messages` 数组，添加或修改留言。

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
