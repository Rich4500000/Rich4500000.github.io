// 管理员后台管理系统主文件
// 初始化变量
let currentUser = null;
let currentTab = 'timeline';

// DOM元素
const loginPage = document.getElementById('loginPage');
const adminPage = document.getElementById('adminPage');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginError = document.getElementById('loginError');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

// 时间轴相关
const timelineModal = document.getElementById('timelineModal');
const closeTimelineModal = document.getElementById('closeTimelineModal');
const addTimelineBtn = document.getElementById('addTimelineBtn');
const timelineForm = document.getElementById('timelineForm');
const timelineList = document.getElementById('timelineList');
const modalTitle = document.getElementById('modalTitle');
const timelineIdInput = document.getElementById('timelineId');
const timelineDateInput = document.getElementById('timelineDate');
const timelineTitleInput = document.getElementById('timelineTitle');
const timelineDescInput = document.getElementById('timelineDesc');

// 相册相关
const photoFileInput = document.getElementById('photoFile');
const uploadBtn = document.getElementById('uploadBtn');
const galleryList = document.getElementById('galleryList');

// 留言板相关
const messagesList = document.getElementById('messagesList');

// 计时器相关
const startDateInput = document.getElementById('startDate');
const saveTimerBtn = document.getElementById('saveTimerBtn');
const timerDisplay = document.getElementById('timerDisplay');

// 初始化应用
function initApp() {
    // 监听Firebase认证状态变化
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // 用户已登录
            currentUser = user;
            showAdminPage();
            loadData();
        } else {
            // 用户未登录
            currentUser = null;
            showLoginPage();
        }
    });

    // 绑定事件监听器
    bindEventListeners();
}

// 绑定事件监听器
function bindEventListeners() {
    // 登录按钮
    loginBtn.addEventListener('click', handleLogin);
    
    // 登出按钮
    logoutBtn.addEventListener('click', handleLogout);
    
    // 标签页切换
    navBtns.forEach(btn => {
        btn.addEventListener('click', switchTab);
    });
    
    // 时间轴模态框
    addTimelineBtn.addEventListener('click', openAddTimelineModal);
    closeTimelineModal.addEventListener('click', closeTimelineModalFunc);
    timelineForm.addEventListener('submit', handleTimelineSubmit);
    
    // 相册上传
    uploadBtn.addEventListener('click', handlePhotoUpload);
    
    // 计时器设置
    saveTimerBtn.addEventListener('click', handleSaveTimer);
    
    // 模态框点击外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === timelineModal) {
            closeTimelineModalFunc();
        }
    });
    
    // 回车键登录
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            passwordInput.focus();
        }
    });
    
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
}

// 显示登录页面
function showLoginPage() {
    loginPage.style.display = 'flex';
    adminPage.style.display = 'none';
}

// 显示管理员页面
function showAdminPage() {
    loginPage.style.display = 'none';
    adminPage.style.display = 'flex';
    adminPage.style.flexDirection = 'column';
}

// 处理登录
function handleLogin() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email || !password) {
        showError('请输入邮箱和密码');
        return;
    }
    
    // 使用Firebase Authentication登录
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // 登录成功
            loginError.textContent = '';
        })
        .catch((error) => {
            // 登录失败
            const errorMessage = error.message;
            showError('登录失败: ' + errorMessage);
        });
}

// 处理登出
function handleLogout() {
    firebase.auth().signOut()
        .then(() => {
            // 登出成功
            resetFormInputs();
        })
        .catch((error) => {
            console.error('登出失败:', error);
        });
}

// 显示错误信息
function showError(message) {
    loginError.textContent = message;
}

// 重置表单输入
function resetFormInputs() {
    emailInput.value = '';
    passwordInput.value = '';
    loginError.textContent = '';
}

// 切换标签页
function switchTab(e) {
    const tabName = e.target.dataset.tab;
    
    // 更新当前标签
    currentTab = tabName;
    
    // 更新导航按钮状态
    navBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // 显示对应标签内容
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabName}Tab`).classList.add('active');
    
    // 加载对应数据
    loadData(tabName);
}

// 加载数据
function loadData(tab = currentTab) {
    switch (tab) {
        case 'timeline':
            loadTimeline();
            break;
        case 'gallery':
            loadGallery();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'timer':
            loadTimer();
            break;
    }
}

// ========== 时间轴管理 ==========

// 加载时间轴数据
function loadTimeline() {
    timelineList.innerHTML = '<div class="loading">加载中...</div>';
    
    // 从Firestore获取时间轴数据
    firebase.db.collection('timeline')
        .orderBy('date', 'asc')
        .get()
        .then(querySnapshot => {
            timelineList.innerHTML = '';
            
            if (querySnapshot.empty) {
                timelineList.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--gray);">暂无时间轴数据</div>';
                return;
            }
            
            querySnapshot.forEach(doc => {
                const item = doc.data();
                const timelineItem = createTimelineItem(doc.id, item);
                timelineList.appendChild(timelineItem);
            });
        })
        .catch(error => {
            console.error('加载时间轴失败:', error);
            timelineList.innerHTML = '<div style="text-align: center; padding: 2rem; color: #e74c3c;">加载失败，请重试</div>';
        });
}

// 创建时间轴项
function createTimelineItem(id, data) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
        <h3>${data.title}</h3>
        <div class="date">${formatDate(data.date.toDate())}</div>
        <div class="desc">${data.description}</div>
        <div class="item-actions">
            <button class="edit-btn" onclick="editTimeline('${id}', ${JSON.stringify(data)})">编辑</button>
            <button class="delete-btn" onclick="deleteTimeline('${id}')">删除</button>
        </div>
    `;
    return item;
}

// 打开添加时间轴模态框
function openAddTimelineModal() {
    modalTitle.textContent = '添加时间点';
    timelineForm.reset();
    timelineIdInput.value = '';
    timelineModal.classList.add('active');
}

// 打开编辑时间轴模态框
function editTimeline(id, data) {
    modalTitle.textContent = '编辑时间点';
    timelineIdInput.value = id;
    timelineDateInput.value = data.date.toDate().toISOString().split('T')[0];
    timelineTitleInput.value = data.title;
    timelineDescInput.value = data.description;
    timelineModal.classList.add('active');
}

// 关闭时间轴模态框
function closeTimelineModalFunc() {
    timelineModal.classList.remove('active');
    timelineForm.reset();
    timelineIdInput.value = '';
}

// 处理时间轴表单提交
function handleTimelineSubmit(e) {
    e.preventDefault();
    
    const id = timelineIdInput.value;
    const date = new Date(timelineDateInput.value);
    const title = timelineTitleInput.value.trim();
    const description = timelineDescInput.value.trim();
    
    if (!title || !description) {
        alert('请填写完整信息');
        return;
    }
    
    const timelineData = {
        title,
        description,
        date,
        createdAt: firebase.timestamp(),
        updatedAt: firebase.timestamp()
    };
    
    // 保存到Firestore
    if (id) {
        // 更新现有数据
        firebase.db.collection('timeline').doc(id)
            .update(timelineData)
            .then(() => {
                showToast('更新成功', 'success');
                closeTimelineModalFunc();
                loadTimeline();
            })
            .catch(error => {
                console.error('更新失败:', error);
                showToast('更新失败', 'error');
            });
    } else {
        // 添加新数据
        firebase.db.collection('timeline').add(timelineData)
            .then(() => {
                showToast('添加成功', 'success');
                closeTimelineModalFunc();
                loadTimeline();
            })
            .catch(error => {
                console.error('添加失败:', error);
                showToast('添加失败', 'error');
            });
    }
}

// 删除时间轴项
function deleteTimeline(id) {
    if (confirm('确定要删除这个时间点吗？')) {
        firebase.db.collection('timeline').doc(id).delete()
            .then(() => {
                showToast('删除成功', 'success');
                loadTimeline();
            })
            .catch(error => {
                console.error('删除失败:', error);
                showToast('删除失败', 'error');
            });
    }
}

// ========== 相册管理 ==========

// 加载相册数据
function loadGallery() {
    galleryList.innerHTML = '<div class="loading">加载中...</div>';
    
    // 从Firestore获取相册数据
    firebase.db.collection('gallery')
        .orderBy('createdAt', 'desc')
        .get()
        .then(querySnapshot => {
            galleryList.innerHTML = '';
            
            if (querySnapshot.empty) {
                galleryList.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--gray);">暂无相册数据</div>';
                return;
            }
            
            querySnapshot.forEach(doc => {
                const item = doc.data();
                const galleryItem = createGalleryItem(doc.id, item);
                galleryList.appendChild(galleryItem);
            });
        })
        .catch(error => {
            console.error('加载相册失败:', error);
            galleryList.innerHTML = '<div style="text-align: center; padding: 2rem; color: #e74c3c;">加载失败，请重试</div>';
        });
}

// 创建相册项
function createGalleryItem(id, data) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
        <img src="${data.url}" alt="${data.name}">
        <div class="gallery-item-info">
            <h3>${data.name}</h3>
            <div class="date">${formatDate(data.createdAt.toDate())}</div>
            <div class="item-actions">
                <button class="delete-btn" onclick="deletePhoto('${id}', '${data.url}')">删除</button>
            </div>
        </div>
    `;
    return item;
}

// 处理图片上传
function handlePhotoUpload() {
    const files = photoFileInput.files;
    
    if (files.length === 0) {
        alert('请选择要上传的图片');
        return;
    }
    
    // 显示加载状态
    uploadBtn.disabled = true;
    uploadBtn.textContent = '上传中...';
    
    // 上传图片
    let uploadedCount = 0;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `gallery/${Date.now()}-${file.name}`;
        const storageRef = firebase.storage().ref(fileName);
        
        storageRef.put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(downloadURL => {
                // 保存到Firestore
                return firebase.db.collection('gallery').add({
                    name: file.name,
                    url: downloadURL,
                    createdAt: firebase.timestamp(),
                    storagePath: fileName
                });
            })
            .then(() => {
                uploadedCount++;
                if (uploadedCount === files.length) {
                    // 全部上传完成
                    showToast(`成功上传 ${uploadedCount} 张图片`, 'success');
                    photoFileInput.value = '';
                    loadGallery();
                    uploadBtn.disabled = false;
                    uploadBtn.textContent = '上传图片';
                }
            })
            .catch(error => {
                console.error('上传失败:', error);
                showToast('上传失败，请重试', 'error');
                uploadBtn.disabled = false;
                uploadBtn.textContent = '上传图片';
            });
    }
}

// 删除图片
function deletePhoto(id, url) {
    if (confirm('确定要删除这张图片吗？')) {
        // 获取图片的storagePath
        firebase.db.collection('gallery').doc(id).get()
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    
                    // 删除storage中的图片
                    const storageRef = firebase.storage().ref(data.storagePath);
                    return storageRef.delete()
                        .then(() => {
                            // 删除Firestore中的记录
                            return firebase.db.collection('gallery').doc(id).delete();
                        });
                }
            })
            .then(() => {
                showToast('删除成功', 'success');
                loadGallery();
            })
            .catch(error => {
                console.error('删除失败:', error);
                showToast('删除失败，请重试', 'error');
            });
    }
}

// ========== 留言管理 ==========

// 加载留言数据
function loadMessages() {
    messagesList.innerHTML = '<div class="loading">加载中...</div>';
    
    // 从Firestore获取留言数据
    firebase.db.collection('messages')
        .orderBy('createdAt', 'desc')
        .get()
        .then(querySnapshot => {
            messagesList.innerHTML = '';
            
            if (querySnapshot.empty) {
                messagesList.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--gray);">暂无留言数据</div>';
                return;
            }
            
            querySnapshot.forEach(doc => {
                const item = doc.data();
                const messageItem = createMessageItem(doc.id, item);
                messagesList.appendChild(messageItem);
            });
        })
        .catch(error => {
            console.error('加载留言失败:', error);
            messagesList.innerHTML = '<div style="text-align: center; padding: 2rem; color: #e74c3c;">加载失败，请重试</div>';
        });
}

// 创建留言项
function createMessageItem(id, data) {
    const item = document.createElement('div');
    item.className = 'message-item';
    
    const replyHtml = data.reply ? `
        <div class="reply">
            <strong>管理员回复:</strong> ${data.reply}
        </div>
    ` : '';
    
    item.innerHTML = `
        <div class="message-item-header">
            <h3>${data.name}</h3>
            <div class="date">${formatDate(data.createdAt.toDate())}</div>
        </div>
        <div class="content">${data.content}</div>
        ${replyHtml}
        <div class="item-actions">
            <button class="reply-btn" onclick="replyMessage('${id}', ${JSON.stringify(data)})">回复</button>
            <button class="delete-btn" onclick="deleteMessage('${id}')">删除</button>
        </div>
    `;
    return item;
}

// 回复留言
function replyMessage(id, data) {
    const reply = prompt('请输入回复内容:', data.reply || '');
    
    if (reply !== null) {
        firebase.db.collection('messages').doc(id).update({
            reply: reply,
            updatedAt: firebase.timestamp()
        })
        .then(() => {
            showToast('回复成功', 'success');
            loadMessages();
        })
        .catch(error => {
            console.error('回复失败:', error);
            showToast('回复失败，请重试', 'error');
        });
    }
}

// 删除留言
function deleteMessage(id) {
    if (confirm('确定要删除这条留言吗？')) {
        firebase.db.collection('messages').doc(id).delete()
            .then(() => {
                showToast('删除成功', 'success');
                loadMessages();
            })
            .catch(error => {
                console.error('删除失败:', error);
                showToast('删除失败，请重试', 'error');
            });
    }
}

// ========== 恋爱计时器 ==========

// 加载计时器设置
function loadTimer() {
    firebase.db.collection('settings').doc('timer')
        .get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data();
                startDateInput.value = data.startDate.toDate().toISOString().split('T')[0];
                updateTimerDisplay(data.startDate.toDate());
            } else {
                // 默认值
                const defaultDate = new Date();
                startDateInput.value = defaultDate.toISOString().split('T')[0];
                updateTimerDisplay(defaultDate);
            }
        })
        .catch(error => {
            console.error('加载计时器设置失败:', error);
        });
}

// 处理保存计时器设置
function handleSaveTimer() {
    const startDate = new Date(startDateInput.value);
    
    if (isNaN(startDate.getTime())) {
        alert('请选择有效的日期');
        return;
    }
    
    firebase.db.collection('settings').doc('timer').set({
        startDate,
        updatedAt: firebase.timestamp()
    })
    .then(() => {
        showToast('保存成功', 'success');
        updateTimerDisplay(startDate);
    })
    .catch(error => {
        console.error('保存失败:', error);
        showToast('保存失败，请重试', 'error');
    });
}

// 更新计时器显示
function updateTimerDisplay(startDate) {
    const now = new Date();
    const diff = now - startDate;
    
    // 计算时间差
    const years = Math.floor(diff / (365 * 24 * 60 * 60 * 1000));
    const months = Math.floor((diff % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
    const days = Math.floor((diff % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);
    
    timerDisplay.innerHTML = `
        <h3>恋爱时长</h3>
        <p>${years}年 ${months}月 ${days}天 ${hours}时 ${minutes}分 ${seconds}秒</p>
    `;
    
    // 每秒更新一次
    setTimeout(() => {
        if (currentTab === 'timer') {
            updateTimerDisplay(startDate);
        }
    }, 1000);
}

// ========== 工具函数 ==========

// 格式化日期
function formatDate(date) {
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// 显示通知
function showToast(message, type = 'success') {
    // 创建通知元素
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 3秒后移除
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 初始化应用
initApp();