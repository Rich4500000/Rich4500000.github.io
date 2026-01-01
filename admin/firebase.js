// Firebase初始化文件
// 引入Firebase配置
const firebaseConfig = window.firebaseConfig || {
    // 默认配置（在实际部署时会被替换）
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// 初始化Firebase
const app = firebase.initializeApp(firebaseConfig);

// 初始化Firebase服务
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// 配置Firestore
// 启用时间戳
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// 导出服务以便其他文件使用
window.firebase = {
    app,
    auth,
    db,
    storage,
    timestamp
};

// 导出给模块使用（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        app,
        auth,
        db,
        storage,
        timestamp
    };
}