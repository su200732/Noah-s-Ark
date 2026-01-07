// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initPage();
});

/**
 * 初始化页面，添加各种交互效果
 */
function initPage() {
    // 添加页面淡入效果
    addPageFadeIn();
    
    // 设置当前页面的导航高亮
    setActiveNavLink();
    
    // 添加按钮点击效果
    addButtonEffects();
    
    // 添加平滑滚动
    addSmoothScroll();
    
    // 添加导航栏滚动效果
    addNavbarScrollEffect();
}

/**
 * 添加页面淡入效果
 */
function addPageFadeIn() {
    // 获取主内容区域
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        // 初始设置透明度为0
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // 页面加载后显示内容
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
}

/**
 * 设置当前页面的导航高亮
 */
function setActiveNavLink() {
    // 获取当前页面的URL路径
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 遍历导航链接，设置当前页面的链接为active
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * 添加按钮点击效果
 */
function addButtonEffects() {
    // 获取所有按钮
    const buttons = document.querySelectorAll('.setting-btn');
    
    buttons.forEach(button => {
        // 点击效果
        button.addEventListener('click', function(e) {
            // 创建点击波纹效果
            createRipple(e, this);
            
            // 按钮按下效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

/**
 * 创建点击波纹效果
 * @param {Event} e - 点击事件对象
 * @param {HTMLElement} element - 目标元素
 */
function createRipple(e, element) {
    // 创建波纹元素
    const ripple = document.createElement('span');
    
    // 设置波纹样式
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    // 获取点击位置
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    // 设置波纹大小和位置
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // 添加相对定位到父元素
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    // 添加波纹到元素
    element.appendChild(ripple);
    
    // 动画结束后移除波纹
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * 添加平滑滚动效果
 */
function addSmoothScroll() {
    // 获取所有锚点链接
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 平滑滚动到目标位置
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 添加导航栏滚动效果
 */
function addNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            // 滚动超过50px时，添加阴影和背景色变化
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            navbar.style.background = 'rgba(26, 115, 232, 0.95)';
        } else {
            // 恢复初始样式
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            navbar.style.background = '#1a73e8';
        }
    });
}

/**
 * 添加特色卡片的悬停效果
 */
function addFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-item');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * 添加图片加载效果
 */
function addImageLoadEffects() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // 初始设置透明度为0
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // 图片加载完成后显示
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // 如果图片已经加载完成
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 监听窗口大小变化，重新初始化页面
window.addEventListener('resize', function() {
    initPage();
});

// 监听页面可见性变化
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时，重新初始化
        initPage();
    }
});