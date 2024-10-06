document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');
    const animatedTexts = document.querySelectorAll('.animated-text');
    const animatedTextRightToLeft = document.querySelectorAll('.animated-text-right-to-left');
    const expandableContent = document.querySelector('.extra-content'); // 获取展开内容

    function revealOnScroll(elements, transform = 'translateY', distance = '50px') {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        elements.forEach(element => {
            if (!element.classList.contains('locked')) { // 如果尚未锁定
                const elementTop = element.getBoundingClientRect().top + scrollY;
                const elementHeight = element.offsetHeight;

                if (scrollY + windowHeight > elementTop + elementHeight / 2) {
                    element.style.opacity = 1;
                    element.style.transform = `${transform}(0)`;
                    element.classList.add('locked'); // 标记为已锁定
                } else {
                    element.style.opacity = 0;
                    element.style.transform = `${transform}(${distance})`;
                }
            }
        });
    }

    function revealFeatures() {
        revealOnScroll(features);
        revealOnScroll(animatedTexts, 'translateY', '50px');
        revealOnScroll(animatedTextRightToLeft, 'translateX', '50px');
    }

    function toggleExpandableContent() {
        expandableContent.classList.toggle('active'); // 独立的展开动画，不受锁定逻辑影响
    }

    // 滚动事件监听，仅在页面加载时锁定
    window.addEventListener('scroll', revealFeatures);
    
    // 绑定点击事件，控制展开动画
    document.querySelector('.content-text.clickable').addEventListener('click', toggleExpandableContent);

    // 初次加载时触发一次动画检查
    revealFeatures();
});
