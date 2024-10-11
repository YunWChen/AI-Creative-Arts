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
        revealOnScroll(toggleButtons, 'translateY', '50px');
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

    function toggleContent() {
        const hiddenContent = document.getElementById('hidden-content');
        const button = document.querySelector('.toggle-button');

        if (hiddenContent.classList.contains('active')) {
            hiddenContent.classList.remove('active');
            button.textContent = "Show More";
        } else {
            hiddenContent.classList.add('active');
            button.textContent = "Show Less";
        }
    }

    // 滚动事件监听，仅在页面加载时锁定
    window.addEventListener('scroll', revealFeatures);
    
    // 绑定点击事件，控制展开动画
    toggleButtons.forEach(button => {
        button.addEventListener('click', toggleCollapsibleContent);
    });

    // 绑定点击事件，控制隐藏内容的展开和隐藏
    const toggleButton = document.querySelector('.toggle-button');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleContent);
    }

    // 初次加载时触发一次动画检查
    revealFeatures();

    // 在隐藏内容中添加图片和 bullet point 列表
    const hiddenContent = document.getElementById('hidden-content');
    if (hiddenContent) {
        hiddenContent.style.display = 'flex';
        hiddenContent.style.flexDirection = 'row';
        hiddenContent.style.alignItems = 'center';
        hiddenContent.style.gap = '20px';

        const ul = document.createElement('ul');
        ul.style.listStyleType = 'disc';
        ul.style.paddingLeft = '20px';
        ul.innerHTML = `
            <li>AI is transforming various industries.</li>
            <li>Predictive analysis enhances decision making.</li>
            <li>Automation improves efficiency.</li>
        `;
        hiddenContent.appendChild(ul);

        const img = document.createElement('img');
        img.src = 'path/to/your/image.jpg'; // 替换为你的图片路径
        img.alt = 'Description of the image';
        img.style.marginTop = '15px';
        img.style.maxWidth = '50%'; // 缩小图片
        hiddenContent.appendChild(img);
    }
    const tables = document.querySelectorAll('.animated-table');

    // 在 revealFeatures() 函数中添加
    revealOnScroll(tables, 'translateY', '50px');

});