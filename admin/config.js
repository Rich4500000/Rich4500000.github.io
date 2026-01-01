// Firebase配置文件
// 请将以下配置替换为您自己的Firebase项目配置
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// 导出配置以便其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = firebaseConfig;
}