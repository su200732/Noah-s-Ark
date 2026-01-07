// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initPage();
    
    // 初始化主题切换
    initThemeSwitch();
});

/**
 * 初始化页面，添加各种交互效果
 */
function initPage() {
    // 设置当前页面的导航高亮
    setActiveNavLink();
    
    // 添加页面淡入效果
    addPageFadeIn();
    
    // 添加按钮点击效果
    addButtonEffects();
    
    // 添加平滑滚动
    addSmoothScroll();
    
    // 添加特色卡片悬停效果
    addFeatureCardEffects();
    
    // 添加图片加载效果
    addImageLoadEffects();
    
    // 初始化主题
    initTheme();
}

/**
 * 添加页面淡入效果 - 苹果风格的流畅动画
 */
function addPageFadeIn() {
    // 获取主内容区域
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        // 使用CSS变量存储动画参数
        mainContent.style.setProperty('--fade-in-delay', '0.1s');
        
        // 初始设置透明度为0
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(30px)';
        mainContent.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // 页面加载后显示内容
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                        mainContent.style.transform = 'translateY(0)';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(mainContent);
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
 * 添加按钮点击效果 - 苹果风格的反馈
 */
function addButtonEffects() {
    // 获取所有按钮
    const buttons = document.querySelectorAll('.setting-btn');
    
    buttons.forEach(button => {
        // 点击效果
        button.addEventListener('click', function(e) {
            // 创建点击波纹效果
            createRipple(e, this);
            
            // 按钮按下效果 - 苹果风格的弹性反馈
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 150);
        });
        
        // 鼠标悬停效果
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

/**
 * 创建点击波纹效果 - 苹果风格的扩散动画
 */
function createRipple(e, element) {
    // 创建波纹元素
    const ripple = document.createElement('span');
    
    // 设置波纹样式 - 苹果风格的柔和扩散
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.7)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    ripple.style.pointerEvents = 'none';
    ripple.style.userSelect = 'none';
    
    // 获取点击位置
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
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
    }, 800);
}

/**
 * 添加平滑滚动效果 - 苹果风格的自然滚动
 */
function addSmoothScroll() {
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 苹果风格的平滑滚动
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 页面内导航链接的平滑滚动
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // 添加页面切换前的淡出效果
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.style.opacity = '0';
                mainContent.style.transform = 'translateY(20px)';
                mainContent.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    });
}

/**
 * 添加特色卡片悬停效果 - 苹果风格的微妙动画
 */
function addFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-item');
    
    featureCards.forEach((card, index) => {
        // 设置延迟，创建交错动画效果
        card.style.setProperty('--card-index', index);
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.01)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

/**
 * 添加图片加载效果 - 苹果风格的渐进式显示
 */
function addImageLoadEffects() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // 初始设置
        img.style.opacity = '0';
        img.style.transform = 'scale(0.98)';
        img.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // 图片加载完成后显示
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // 如果图片已经加载完成
        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }
        
        // 使用Intersection Observer实现图片懒加载
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 图片进入视口时加载
                    const img = entry.target;
                    const src = img.getAttribute('data-src') || img.src;
                    if (src) {
                        img.src = src;
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        observer.observe(img);
    });
}

// 添加CSS动画样式 - 苹果风格的动画曲线
const style = document.createElement('style');
style.textContent = `
    /* 苹果风格的波纹动画 */
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* 苹果风格的缓动函数 */
    .apple-ease {
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* 增强的悬停效果 */
    .feature-item {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// 优化滚动性能 - 使用requestAnimationFrame
let ticking = false;

function updateScrollEffects() {
    // 这里可以添加滚动时的效果，如导航栏变化等
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

// 监听滚动事件
window.addEventListener('scroll', requestTick, { passive: true });

// 监听页面可见性变化
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时，刷新页面效果
        initPage();
    }
});

// 优化窗口大小变化处理
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // 窗口大小变化完成后执行
        initPage();
    }, 250);
});

/**
 * 初始化主题 - 从本地存储或系统偏好加载主题
 */
function initTheme() {
    // 从本地存储获取主题偏好
    const savedTheme = localStorage.getItem('theme');
    
    // 如果有保存的主题，使用它
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // 否则检测系统偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDark ? 'dark' : 'light';
        applyTheme(defaultTheme);
    }
}

/**
 * 初始化主题切换开关
 */
function initThemeSwitch() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // 设置开关初始状态
        const savedTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        themeToggle.checked = savedTheme === 'dark';
        
        // 添加主题切换事件监听器
        themeToggle.addEventListener('change', function() {
            toggleTheme();
        });
    }
}

/**
 * 切换主题
 */
function toggleTheme() {
    // 获取当前主题
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    // 切换到相反主题
    const newTheme = isDarkTheme ? 'light' : 'dark';
    applyTheme(newTheme);
    
    // 保存主题偏好
    saveThemePreference(newTheme);
}

/**
 * 应用主题
 * @param {string} theme - 主题名称 ('light' 或 'dark')
 */
function applyTheme(theme) {
    // 更新body类名
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    
    // 更新主题切换开关状态
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = theme === 'dark';
    }
    
    // 添加主题切换过渡效果
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

/**
 * 保存主题偏好到本地存储
 * @param {string} theme - 主题名称 ('light' 或 'dark')
 */
function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}

/**
 * 监听系统主题变化
 */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    // 只有当没有手动设置主题时，才跟随系统主题
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
    }
});