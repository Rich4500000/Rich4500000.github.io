// 全局变量

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initScrollAnimations();
    initHeroSection();
    initLoveStories();
    initPhotoGallery();
    initMessageBoard();
    initHeartTrail();
    
    // 页面加载完成后执行的其他初始化
    console.log('页面加载完成，welcome to our world！');
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

// 2. 英雄区初始化
function initHeroSection() {
    // 更新英雄区标题
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.textContent = '欢迎来到Rich和Mary的世界';
    }
    
    // 初始化恋爱计时器
    const anniversaryDate = new Date('2022-01-01'); // 固定的恋爱开始日期
    updateTimerDisplay(anniversaryDate);
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

// 3. 爱情故事时间轴初始化
function initLoveStories() {
    // 静态爱情故事数据
    const loveStories = [
        {
            _id: '1',
            date: '2024-08-15',
            title: '我们相遇了',
            description: '高中第一天，我们第一次相遇',
            order: 1
        },

        {
            _id: '3',
            date: '2025-11-28',
            title: '特别的日子',
            description: '在这个特别的日子里，Rich丢失了一个重要的秘密',
            order: 3
        },
        {
            _id: '4',
            date: '2025-12-04',
            title: 'Mary表白了',
            description: 'Rich得到了世界上最可爱的女孩',
            order: 4
        },
        {
            _id: '5',
            date: '2025-12-08',
            title: 'Rich的生日',
            description: '这是Mary陪Rich的第一个生日',
            order: 5
        },
        {
            _id: '6',
            date: '2025-12-31',
            title: '跨年之夜',
            description: '一起倒数，迎接新的一年',
            order: 6
        },
        {
            _id: '7',
            date: '2026-03-22',
            title: '',
            description: '',
            order: 7
        },
        {
            _id: '8',
            date: '',
            title: '',
            description: '',
            order: 8
        },
        {
            _id: '9',
            date: '',
            title: '',
            description: '',
            order: 9
        },
        {
            _id: '11',
            date: '',
            title: '',
            description: '',
            order: 11
        },
        {
            _id: '12',
            date: '',
            title: '',
            description: '',
            order: 12
        },
        {
            _id: '15',
            date: '',
            title: '',
            description: '',
            order: 15
        },
        {
            _id: '16',
            date: '',
            title: '',
            description: '',
            order: 16
        },
        {
            _id: '17',
            date: '',
            title: '',
            description: '',
            order: 17
        },
        {
            _id: '18',
            date: '',
            title: '',
            description: '',
            order: 18
        },
        {
            _id: '19',
            date: '',
            title: '',
            description: '',
            order: 19
        },
        {
            _id: '20',
            date: '',
            title: '',
            description: '',
            order: 20
        }
    ];
    
    const timeline = document.querySelector('.timeline');
    
    if (loveStories.length === 0) {
        timeline.innerHTML = `
            <div style="text-align: center; padding: 4rem; color: var(--gray);">
                <p>还没有添加时间轴数据</p>
            </div>
        `;
        return;
    }
    
    // 渲染时间轴项目
    timeline.innerHTML = '';
    loveStories.forEach((doc, index) => {
        const item = doc;
        const timelineItem = createTimelineItem(item, index);
        timeline.appendChild(timelineItem);
    });
}

// 创建时间轴项目
function createTimelineItem(data, index) {
    const item = document.createElement('div');
    const isLeft = index % 2 === 0;
    item.className = `timeline-item ${isLeft ? 'left' : 'right'}`;
    
    // 格式化日期
    let formattedDate = '';
    if (data.date && data.date.trim() !== '') {
        try {
            const date = new Date(data.date);
            formattedDate = date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        } catch (error) {
            formattedDate = '日期待定';
        }
    } else {
        formattedDate = '日期待定';
    }
    
    item.innerHTML = `
        <div class="timeline-content">
            <h3 class="timeline-date">${formattedDate}</h3>
            <h4 class="timeline-title">${data.title || '未命名事件'}</h4>
            <p class="timeline-desc">${data.description || ''}</p>
            ${data.imageUrl ? `<img src="${data.imageUrl}" alt="${data.title}" class="timeline-image">` : ''}
        </div>
    `;
    
    return item;
}

// 4. 媒体库初始化
function initPhotoGallery() {
    // 从localStorage加载媒体数据
    const galleryMedia = JSON.parse(localStorage.getItem('galleryMedia')) || [
        {
            _id: '1',
            url: 'https://via.placeholder.com/600x400?text=美好回忆1',
            description: '我们的第一次约会',
            loveCount: 10,
            type: 'image',
            createdAt: new Date().toISOString()
        },
        {
            _id: '2',
            url: 'https://via.placeholder.com/600x400?text=美好回忆2',
            description: '一起旅行',
            loveCount: 15,
            type: 'image',
            createdAt: new Date().toISOString()
        },
        {
            _id: '3',
            url: 'https://via.placeholder.com/600x400?text=美好回忆3',
            description: '纪念日',
            loveCount: 20,
            type: 'image',
            createdAt: new Date().toISOString()
        },
        {
            _id: '4',
            url: 'https://via.placeholder.com/600x400?text=美好回忆4',
            description: '冰岛',
            loveCount: 25,
            type: 'image',
            createdAt: new Date().toISOString()
        }
    ];
    
    const photoGrid = document.getElementById('photoGrid');
    
    if (galleryMedia.length === 0) {
        photoGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--gray);">
                <p>还没有添加任何回忆</p>
            </div>
        `;
        return;
    }
    
    // 渲染媒体卡片
    photoGrid.innerHTML = '';
    galleryMedia.forEach((media, index) => {
        const mediaCard = createMediaCard(media, index);
        photoGrid.appendChild(mediaCard);
    });
}

// 创建媒体卡片
function createMediaCard(media, index) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    let mediaElement = '';
    if (media.type === 'video') {
        mediaElement = `<video src="${media.url}" alt="回忆" onclick="openMediaModal('${media.url}', '${media.description || '美好回忆'}', '${media._id}', ${media.loveCount || 0}, '${media.type}')" controls poster="${media.poster || ''}"></video>`;
    } else {
        mediaElement = `<img src="${media.url}" alt="回忆" onclick="openMediaModal('${media.url}', '${media.description || '美好回忆'}', '${media._id}', ${media.loveCount || 0}, '${media.type}')">`;
    }
    
    card.innerHTML = `
        ${mediaElement}
        <div class="photo-info">
            <p class="photo-desc">${media.description || '美好回忆'}</p>
            <div class="photo-actions">
                <button class="love-btn" onclick="toggleLove('${media._id}', this)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span class="love-count">${media.loveCount || 0}</span>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// 切换媒体点赞
function toggleLove(mediaId, btn) {
    // 更新UI
    const loveCountElement = btn.querySelector('.love-count');
    const currentCount = parseInt(loveCountElement.textContent) || 0;
    loveCountElement.textContent = currentCount + 1;
    btn.classList.add('loved');
    
    // 更新localStorage
    const galleryMedia = JSON.parse(localStorage.getItem('galleryMedia')) || [];
    const updatedMedia = galleryMedia.map(media => {
        if (media._id === mediaId) {
            return {
                ...media,
                loveCount: (media.loveCount || 0) + 1
            };
        }
        return media;
    });
    localStorage.setItem('galleryMedia', JSON.stringify(updatedMedia));
    
    showToast('点赞成功', 'success');
}

// 5. 留言板初始化
function initMessageBoard() {
    // 加载留言
    loadMessages();
    
    // 添加留言表单提交事件
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.querySelector('.send-message-btn');
    
    sendBtn.addEventListener('click', addMessage);
    
    // 回车键提交
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addMessage();
        }
    });
}

// 6. 媒体上传功能
function uploadMedia(file, description) {
    return new Promise((resolve, reject) => {
        // 创建FileReader读取文件
        const reader = new FileReader();
        
        reader.onload = (e) => {
            // 将文件数据转换为base64 URL
            const base64Url = e.target.result;
            
            // 创建媒体对象
            const newMedia = {
                _id: Date.now().toString(),
                url: base64Url,
                description: description,
                loveCount: 0,
                type: file.type.startsWith('image/') ? 'image' : 'video',
                createdAt: new Date().toISOString()
            };
            
            // 保存到localStorage
            const galleryMedia = JSON.parse(localStorage.getItem('galleryMedia')) || [];
            galleryMedia.push(newMedia);
            localStorage.setItem('galleryMedia', JSON.stringify(galleryMedia));
            
            resolve(newMedia);
        };
        
        reader.onerror = (error) => {
            reject(error);
        };
        
        // 读取文件为base64
        reader.readAsDataURL(file);
    });
}

// 加载留言
function loadMessages() {
    // 静态留言数据 - 清空所有留言
    const messages = [];
    
    const messageBoard = document.getElementById('messageBoard');
    
    if (messages.length === 0) {
        // 显示空状态
        messageBoard.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--gray);">
                <p>还没有任何留言</p>
            </div>
        `;
        return;
    }
    
    // 渲染留言卡片
    messageBoard.innerHTML = '';
    messages.forEach((message, index) => {
        const messageCard = createMessageCard(message, index);
        messageBoard.appendChild(messageCard);
    });
}

// 创建留言卡片
function createMessageCard(message, index) {
    const card = document.createElement('div');
    card.className = 'message-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // 格式化日期
    const date = new Date(message.createTime);
    const formattedDate = date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    card.innerHTML = `
        <div class="message-header">
            <div class="message-avatar">
                ${message.avatarUrl ? `<img src="${message.avatarUrl}" alt="${message.nickname}">` : `<div class="avatar-placeholder">${message.nickname?.charAt(0) || '访'}</div>`}
            </div>
            <div class="message-meta">
                <div class="message-nickname">${message.nickname || '访客'}</div>
                <div class="message-date">${formattedDate}</div>
            </div>
        </div>
        <div class="message-content">
            <p>${message.content}</p>
        </div>
    `;
    
    return card;
}

// 添加留言
function addMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message === '') {
        showToast('请输入留言内容！', 'error');
        return;
    }
    
    // 静态添加留言，只显示成功提示
    showToast('留言成功，感谢您的祝福！');
    
    // 清空输入框
    messageInput.value = '';
}

// 6. 爱心轨迹效果
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

// 7. 模态框功能
function openMediaModal(url, desc, mediaId, loveCount, type) {
    const modal = document.getElementById('photoModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // 更新模态框内容
    if (type === 'video') {
        modalContent.innerHTML = `
            <span class="close" onclick="closeMediaModal()">&times;</span>
            <video id="modalMedia" src="${url}" alt="回忆" controls style="max-width: 100%; max-height: 70vh;"></video>
            <p id="modalMediaDesc">${desc}</p>
        `;
    } else {
        modalContent.innerHTML = `
            <span class="close" onclick="closeMediaModal()">&times;</span>
            <img id="modalMedia" src="${url}" alt="回忆" style="max-width: 100%; max-height: 70vh;">
            <p id="modalMediaDesc">${desc}</p>
        `;
    }
    
    modal.style.display = 'block';
    
    // 添加点赞功能到模态框
    const loveBtn = document.createElement('button');
    loveBtn.className = 'modal-love-btn';
    loveBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span>${loveCount || 0}</span>
    `;
    loveBtn.onclick = () => toggleModalLove(mediaId, loveBtn);
    modalContent.querySelector('#modalMediaDesc').insertAdjacentElement('afterend', loveBtn);
}

// 模态框点赞功能
function toggleModalLove(mediaId, btn) {
    // 更新UI
    const loveCountElement = btn.querySelector('span');
    const currentCount = parseInt(loveCountElement.textContent) || 0;
    loveCountElement.textContent = currentCount + 1;
    btn.classList.add('loved');
    
    // 更新localStorage
    const galleryMedia = JSON.parse(localStorage.getItem('galleryMedia')) || [];
    const updatedMedia = galleryMedia.map(media => {
        if (media._id === mediaId) {
            return {
                ...media,
                loveCount: (media.loveCount || 0) + 1
            };
        }
        return media;
    });
    localStorage.setItem('galleryMedia', JSON.stringify(updatedMedia));
    
    showToast('点赞成功', 'success');
}

function closeMediaModal() {
    document.getElementById('photoModal').style.display = 'none';
}

// 添加媒体模态框功能
function openAddPhotoModal() {
    document.getElementById('addPhotoModal').style.display = 'block';
}

function closeAddPhotoModal() {
    document.getElementById('addPhotoModal').style.display = 'none';
}

// 点击模态框外部关闭
window.addEventListener('click', function(e) {
    const photoModal = document.getElementById('photoModal');
    const addPhotoModal = document.getElementById('addPhotoModal');
    
    if (e.target === photoModal) {
        closeMediaModal();
    }
    if (e.target === addPhotoModal) {
        closeAddPhotoModal();
    }
});

// 按ESC键关闭模态框
window.addEventListener('keydown', function(e) {
    const photoModal = document.getElementById('photoModal');
    const addPhotoModal = document.getElementById('addPhotoModal');
    
    if (e.key === 'Escape') {
        if (photoModal.style.display === 'block') {
            closeMediaModal();
        }
        if (addPhotoModal.style.display === 'block') {
            closeAddPhotoModal();
        }
    }
});

// 关闭添加媒体模态框
const closeAddPhotoModalBtn = document.querySelector('#addPhotoModal .close');
if (closeAddPhotoModalBtn) {
    closeAddPhotoModalBtn.addEventListener('click', closeAddPhotoModal);
}

// 处理添加媒体表单提交
const addMediaForm = document.getElementById('addMediaForm');
if (addMediaForm) {
    addMediaForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const mediaFile = document.getElementById('mediaFile').files[0];
        const mediaDesc = document.getElementById('mediaDesc').value.trim();
        
        if (!mediaFile) {
            showToast('请选择要上传的媒体文件', 'error');
            return;
        }
        
        if (!mediaDesc) {
            showToast('请填写描述', 'error');
            return;
        }
        
        try {
            // 上传媒体文件
            await uploadMedia(mediaFile, mediaDesc);
            
            // 重新渲染媒体库
            initPhotoGallery();
            
            // 关闭模态框并清空表单
            closeAddPhotoModal();
            addMediaForm.reset();
            
            showToast('媒体上传成功！', 'success');
        } catch (error) {
            console.error('上传失败:', error);
            showToast('上传失败，请稍后重试', 'error');
        }
    });
}

// 8. 显示提示信息
function showToast(message, type = 'success') {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = type === 'success' ? 'success-toast' : 'error-toast';
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 3秒后移除
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
