// iOS 및 모바일 터치 방지 설정
document.addEventListener('DOMContentLoaded', function() {
    // 컨텍스트 메뉴(우클릭, 롱프레스) 방지
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 드래그 방지
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 이미지와 비디오 선택 방지
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            e.preventDefault();
            return false;
        }
    });
    
    // iOS Safari 확대 방지 (두 번 탭)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // 이미지 저장 관련 키보드 단축키 방지
    document.addEventListener('keydown', function(e) {
        // Ctrl+S (저장), F12 (개발자도구), Ctrl+Shift+I (개발자도구) 등
        if ((e.ctrlKey && e.key === 's') || 
            e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault();
            return false;
        }
    });
    

});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        
        // Handle logo click (href="#") - scroll to top
        if (target === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Handle other anchor links
            const targetElement = document.querySelector(target);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Pricing toggle functionality
const pricingToggle = document.querySelector('.pricing-toggle');
const toggleButtons = document.querySelectorAll('.toggle-btn');
const pricingCards = document.querySelectorAll('.pricing-card');

if (pricingToggle) {
    pricingToggle.addEventListener('click', function(e) {
        if (e.target.classList.contains('toggle-btn')) {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Toggle pricing display
            const isYearly = e.target.textContent.includes('Yearly');
            updatePricing(isYearly);
        }
    });
}

function updatePricing(isYearly) {
    const basicPrice = isYearly ? '$160' : '$19';
    const proPrice = isYearly ? '$410' : '$49';
    const period = isYearly ? '/year' : '/month';
    
    // Update price displays
    const priceElements = document.querySelectorAll('.price');
    if (priceElements[0]) {
        priceElements[0].innerHTML = `${basicPrice} <span>${period}</span>`;
    }
    if (priceElements[1]) {
        priceElements[1].innerHTML = `${proPrice} <span>${period}</span>`;
    }
}

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('h3');
    const answer = item.querySelector('p');
    
    if (question && answer) {
        question.style.cursor = 'pointer';
        question.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('p');
                if (otherAnswer) {
                    otherAnswer.style.display = 'none';
                }
            });
            
            // Toggle current item
            answer.style.display = isOpen ? 'none' : 'block';
        });
        
        // Initially hide all answers
        answer.style.display = 'none';
    }
});

// Scroll animations removed

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Form validation for buttons (simulate)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add loading state
        if (this.textContent.includes('Start') || this.textContent.includes('Get')) {
            e.preventDefault();
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                // You can add actual form submission logic here
                alert('Thank you for your interest! This is a demo website.');
            }, 1500);
        }
    });
});

// All scroll animations and effects removed 

// Teacher section interactive functionality
const teacherData = {
    teacher1: {
        name: "나래 강사님",
        description: "국내 항공사 채용 • 이미지 컨설팅 전문<br/>前 대한항공 근무 • 제주항공 등 국내 LCC 항공사 합격",
        quote: {
            mobile: '"면접에서 중요한 건<br/>\'정답\'이 아니라 그 사람만의<br/>\'결\'이 드러나는 답이에요."',
            desktop: '"면접에서 중요한 건 \'정답\'이 아니라<br/>그 사람만의 \'결\'이 드러나는 답이에요."'
        }
    },
    teacher2: {
        name: "Serena 강사님",
        description: "해외 항공사 채용 전문<br/>現 Flydubai 근무 • 前 Emirates Airlines • 아시아 및 중동, 유럽 외항사 합격 지도",
        quote: {
            mobile: '"자신감은 준비에서<br/>나옵니다. 완벽한 준비가<br/>완벽한 결과를 만들어요."',
            desktop: '"자신감은 준비에서 나옵니다.<br/>완벽한 준비가 완벽한 결과를 만들어요."'
        }
    },
    teacher3: {
        name: "Philip 강사님",
        description: "해외 기업 면접 전문<br/>現 싱가포르 소재 기업 근무 • 아시아 기업 면접 지도",
        quote: {
            mobile: '"좋은 답보다 더 중요한 건,<br/>그 답이 \'진짜 나\'에게서<br/>나왔다는 거예요."',
            desktop: '"좋은 답보다 더 중요한 건,<br/>그 답이 \'진짜 나\'에게서 나왔다는 거예요."'
        }
    }
};

// Initialize teacher section
document.addEventListener('DOMContentLoaded', function() {
    const teacherImg1 = document.getElementById('teacher-img-1');
    const teacherImg2 = document.getElementById('teacher-img-2');
    const teacherImg3 = document.getElementById('teacher-img-3');
    const teacherName = document.getElementById('teacher-name');
    const teacherDescription = document.getElementById('teacher-description');
    const teacherQuote = document.getElementById('teacher-quote');
    
    const allTeacherImages = [teacherImg1, teacherImg2, teacherImg3];
    
    // Set initial active state for teacher1 (나래)
    if (teacherImg1) {
        teacherImg1.classList.add('border-black');
    }
    
    function updateTeacherInfo(teacher) {
        if (teacherName) teacherName.innerHTML = teacher.name;
        if (teacherDescription) teacherDescription.innerHTML = teacher.description;
        if (teacherQuote) {
            const mobileQuote = teacherQuote.querySelector('.block.md\\:hidden');
            const desktopQuote = teacherQuote.querySelector('.hidden.md\\:block');
            if (mobileQuote) mobileQuote.innerHTML = teacher.quote.mobile;
            if (desktopQuote) desktopQuote.innerHTML = teacher.quote.desktop;
        }
    }
    
    function setActiveImage(activeImg) {
        // Remove active state from all images
        allTeacherImages.forEach(img => {
            if (img) {
                img.classList.remove('border-black');
                img.classList.add('border-transparent');
            }
        });
        
        // Set active state for clicked image
        activeImg.classList.add('border-black');
        activeImg.classList.remove('border-transparent');
    }
    
    // Add click events
    if (teacherImg1) {
        teacherImg1.addEventListener('click', function() {
            updateTeacherInfo(teacherData.teacher1);
            setActiveImage(teacherImg1);
        });
    }
    
    if (teacherImg2) {
        teacherImg2.addEventListener('click', function() {
            updateTeacherInfo(teacherData.teacher2);
            setActiveImage(teacherImg2);
        });
    }
    
    if (teacherImg3) {
        teacherImg3.addEventListener('click', function() {
            updateTeacherInfo(teacherData.teacher3);
            setActiveImage(teacherImg3);
        });
    }
    
    // Force image slider animation
    function initImageSlider() {
        const sliderTrack = document.querySelector('.slider-track');
        if (sliderTrack) {
            // Force animation with JavaScript if CSS animation fails
            let position = 0;
            const speed = 0.33; // pixels per frame (reduced from 0.5 to match 90s cycle)
            const maxPosition = sliderTrack.scrollWidth / 2;
            
            function animate() {
                position += speed;
                if (position >= maxPosition) {
                    position = 0;
                }
                sliderTrack.style.transform = `translateX(-${position}px)`;
                requestAnimationFrame(animate);
            }
            
            // Check if CSS animation is working after 1 second
            setTimeout(() => {
                const computedStyle = window.getComputedStyle(sliderTrack);
                const animationName = computedStyle.animationName;
                
                if (animationName === 'none' || !animationName || animationName === '') {
                    console.log('CSS animation not working, starting JavaScript animation');
                    animate();
                } else {
                    console.log('CSS animation is working:', animationName);
                }
            }, 1000);
        }
    }
    
    // Initialize image slider
    initImageSlider();
});