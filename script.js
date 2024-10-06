document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');
    const animatedTexts = document.querySelectorAll('.animated-text');
    const animatedTextRightToLeft = document.querySelectorAll('.animated-text-right-to-left');
    const toggleButtons = document.querySelectorAll('.toggle-button');

    function revealOnScroll(elements, transform = 'translateY', distance = '50px') {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        elements.forEach(element => {
            if (!element.classList.contains('locked')) {
                const elementTop = element.getBoundingClientRect().top + scrollY;
                const elementHeight = element.offsetHeight;

                if (scrollY + windowHeight > elementTop + elementHeight / 2) {
                    element.style.opacity = 1;
                    element.style.transform = `${transform}(0)`;
                    element.classList.add('locked');
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

    function toggleCollapsibleContent(event) {
        const button = event.target;
        const collapsibleContent = button.nextElementSibling;

        if (collapsibleContent.classList.contains('active')) {
            collapsibleContent.classList.remove('active');
            button.textContent = "Show More";
        } else {
            collapsibleContent.classList.add('active');
            button.textContent = "Show Less";
        }
    }

    // 滚动事件监听，仅在页面加载时锁定
    window.addEventListener('scroll', revealFeatures);
    
    // 绑定点击事件，控制展开动画
    toggleButtons.forEach(button => {
        button.addEventListener('click', toggleCollapsibleContent);
    });

    // 初次加载时触发一次动画检查
    revealFeatures();
});
