// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initScrollAnimations();
    initPhotoGallery();
    initMessageBoard();
    initHeartTrail();
    initTimer();
});

// 1. 滚动动画初始化
function initScrollAnimations() {
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        // 显示时间轴项目
        showTimelineItems();
        // 显示其他需要动画的元素
        showFadeInElements();
    });
}

// 显示时间轴项目
function showTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        const isVisible = (itemTop < window.innerHeight - 100) && (itemBottom >= 0);
        
        if (isVisible) {
            item.classList.add('visible');
        }
    });
}

// 显示淡入元素
function showFadeInElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const isVisible = (elementTop < window.innerHeight - 100);
        
        if (isVisible) {
            element.classList.add('visible');
        }
    });
}

// 2. 照片库初始化
function initPhotoGallery() {
    // 从Firebase加载照片
    loadPhotosFromFirebase();
}

// 从Firebase加载照片
function loadPhotosFromFirebase() {
    const photoGrid = document.getElementById('photoGrid');
    photoGrid.innerHTML = '<div class="loading">加载中...</div>';
    
    // 从Firestore获取照片数据
    firebase.db.collection('gallery')
        .orderBy('createdAt', 'desc')
        .get()
        .then(querySnapshot => {
            photoGrid.innerHTML = '';
            
            if (querySnapshot.empty) {
                photoGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--gray);">
                        <p>还没有添加任何回忆，管理员可以在后台添加照片</p>
                    </div>
                `;
                return;
            }
            
            // 渲染照片卡片
            querySnapshot.forEach((doc, index) => {
                const photo = doc.data();
                const photoCard = createPhotoCard(photo, index);
                photoGrid.appendChild(photoCard);
            });
        })
        .catch(error => {
            console.error('加载照片失败:', error);
            photoGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--gray);">
                    <p>加载失败，请稍后重试</p>
                </div>
            `;
        });
}

// 创建照片卡片
function createPhotoCard(photo, index) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <img src="${photo.url}" alt="回忆" onclick="openPhotoModal('${photo.url}', '${photo.name}')">
        <div class="photo-info">
            <p class="photo-desc">${photo.name}</p>
        </div>
    `;
    
    return card;
}

// 3. 留言板初始化
function initMessageBoard() {
    // 加载留言
    loadMessagesFromFirebase();
    
    // 添加留言表单提交事件
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.querySelector('.send-message-btn');
    
    sendBtn.addEventListener('click', addMessageToFirebase);
    
    // 回车键提交
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addMessageToFirebase();
        }
    });
}

// 从Firebase加载留言
function loadMessagesFromFirebase() {
    const messageBoard = document.getElementById('messageBoard');
    messageBoard.innerHTML = '<div class="loading">加载中...</div>';
    
    // 从Firestore获取留言数据
    firebase.db.collection('messages')
        .orderBy('createdAt', 'desc')
        .get()
        .then(querySnapshot => {
            messageBoard.innerHTML = '';
            
            if (querySnapshot.empty) {
                // 添加默认留言
                const defaultMessages = [
                    "宝贝，我爱你，永远永远！",
                    "和你在一起的每一天都是最美好的回忆。",
                    "谢谢你给我带来的幸福和快乐。",
                    "我会一直陪在你身边，无论发生什么。",
                    "你是我生命中最重要的人。"
                ];
                
                // 渲染默认留言
                defaultMessages.forEach((message, index) => {
                    const messageCard = createDefaultMessageCard(message, index);
                    messageBoard.appendChild(messageCard);
                });
            } else {
                // 渲染留言卡片
                querySnapshot.forEach((doc, index) => {
                    const message = doc.data();
                    const messageCard = createMessageCard(message, index);
                    messageBoard.appendChild(messageCard);
                });
            }
        })
        .catch(error => {
            console.error('加载留言失败:', error);
            messageBoard.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--gray);">
                    <p>加载失败，请稍后重试</p>
                </div>
            `;
        });
}

// 创建默认留言卡片
function createDefaultMessageCard(message, index) {
    const card = document.createElement('div');
    card.className = 'message-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <p class="message-text">${message}</p>
    `;
    
    return card;
}

// 创建留言卡片
function createMessageCard(message, index) {
    const card = document.createElement('div');
    card.className = 'message-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const replyHtml = message.reply ? `
        <div class="reply">
            <strong>管理员回复:</strong> ${message.reply}
        </div>
    ` : '';
    
    card.innerHTML = `
        <p class="message-text">${message.content}</p>
        ${replyHtml}
    `;
    
    return card;
}

// 添加留言到Firebase
function addMessageToFirebase() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message === '') {
        alert('请输入留言内容！');
        return;
    }
    
    // 保存到Firestore
    firebase.db.collection('messages').add({
        name: '访客',
        content: message,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(() => {
        // 清空输入框
        messageInput.value = '';
        
        // 重新加载留言
        loadMessagesFromFirebase();
        
        // 显示成功提示
        showToast('留言成功，感谢您的祝福！');
    })
    .catch(error => {
        console.error('添加留言失败:', error);
        alert('留言失败，请稍后重试');
    });
}

// 4. 恋爱计时器初始化
function initTimer() {
    // 从Firebase加载计时器设置
    loadTimerFromFirebase();
}

// 从Firebase加载计时器设置
function loadTimerFromFirebase() {
    firebase.db.collection('settings').doc('timer')
        .get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data();
                const startDate = data.startDate.toDate();
                updateTimerDisplay(startDate);
            } else {
                // 使用默认日期（今天）
                const defaultDate = new Date();
                updateTimerDisplay(defaultDate);
            }
        })
        .catch(error => {
            console.error('加载计时器设置失败:', error);
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
    
    // 查找计时器元素并更新
    const timerElement = document.getElementById('timerDisplay');
    if (timerElement) {
        timerElement.innerHTML = `
            <p>${years}年 ${months}月 ${days}天 ${hours}时 ${minutes}分 ${seconds}秒</p>
        `;
    }
    
    // 每秒更新一次
    setTimeout(() => {
        updateTimerDisplay(startDate);
    }, 1000);
}

// 5. 爱心轨迹效果
function initHeartTrail() {
    // 监听鼠标移动事件
    document.addEventListener('mousemove', function(e) {
        // 随机生成爱心，概率1/10
        if (Math.random() < 0.1) {
            createHeartParticle(e.clientX, e.clientY);
        }
    });
}

// 创建爱心粒子
function createHeartParticle(x, y) {
    const heartTrail = document.getElementById('heartTrail');
    const particle = document.createElement('div');
    particle.className = 'heart-particle';
    
    // 设置位置
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // 添加到DOM
    heartTrail.appendChild(particle);
    
    // 动画结束后移除
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// 6. 时间轴初始化（从Firebase加载）
function showTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        const isVisible = (itemTop < window.innerHeight - 100) && (itemBottom >= 0);
        
        if (isVisible) {
            item.classList.add('visible');
        }
    });
}

// 7. 模态框功能
function openPhotoModal(url, desc) {
    const modal = document.getElementById('photoModal');
    const modalPhoto = document.getElementById('modalPhoto');
    const modalPhotoDesc = document.getElementById('modalPhotoDesc');
    
    modalPhoto.src = url;
    modalPhotoDesc.textContent = desc;
    modal.style.display = 'block';
}

function closePhotoModal() {
    document.getElementById('photoModal').style.display = 'none';
}

// 点击模态框外部关闭
window.addEventListener('click', function(e) {
    const modal = document.getElementById('photoModal');
    if (e.target === modal) {
        closePhotoModal();
    }
});

// 按ESC键关闭模态框
window.addEventListener('keydown', function(e) {
    const modal = document.getElementById('photoModal');
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closePhotoModal();
    }
});

// 8. 显示提示信息
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(90deg, var(--dark-pink), var(--dark-blue));
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        box-shadow: var(--shadow);
        z-index: 1000;
        animation: slideUp 0.3s ease;
        font-weight: 600;
    `;
    toast.textContent = message;
    
    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 3秒后移除
    setTimeout(() => {
        toast.remove();
        style.remove();
    }, 3000);
}

// 9. 页面加载完成后执行的其他初始化
window.addEventListener('load', function() {
    console.log('页面加载完成，欢迎来到我们的小宇宙！');
    
    // 从Firebase加载时间轴数据
    loadTimelineFromFirebase();
});

// 从Firebase加载时间轴数据
function loadTimelineFromFirebase() {
    const timeline = document.querySelector('.timeline');
    
    // 从Firestore获取时间轴数据
    firebase.db.collection('timeline')
        .orderBy('date', 'asc')
        .get()
        .then(querySnapshot => {
            // 清空现有时间轴
            timeline.innerHTML = '';
            
            if (querySnapshot.empty) {
                timeline.innerHTML = `
                    <div style="text-align: center; padding: 4rem; color: var(--gray);">
                        <p>还没有添加时间轴数据，管理员可以在后台添加</p>
                    </div>
                `;
                return;
            }
            
            // 渲染时间轴项目
            querySnapshot.forEach((doc, index) => {
                const item = doc.data();
                const timelineItem = createTimelineItem(item, index);
                timeline.appendChild(timelineItem);
            });
        })
        .catch(error => {
            console.error('加载时间轴失败:', error);
            timeline.innerHTML = `
                <div style="text-align: center; padding: 4rem; color: var(--gray);">
                    <p>加载失败，请稍后重试</p>
                </div>
            `;
        });
}

// 创建时间轴项目
function createTimelineItem(data, index) {
    const item = document.createElement('div');
    const isLeft = index % 2 === 0;
    item.className = `timeline-item ${isLeft ? 'left' : 'right'}`;
    
    const date = data.date.toDate().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    
    item.innerHTML = `
        <div class="timeline-content">
            <h3 class="timeline-date">${date}</h3>
            <h4 class="timeline-title">${data.title}</h4>
            <p class="timeline-desc">${data.description}</p>
        </div>
    `;
    
    return item;
}