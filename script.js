// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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
    }
};

// Initialize teacher section
document.addEventListener('DOMContentLoaded', function() {
    const teacherImg1 = document.getElementById('teacher-img-1');
    const teacherImg2 = document.getElementById('teacher-img-2');
    const teacherName = document.getElementById('teacher-name');
    const teacherDescription = document.getElementById('teacher-description');
    const teacherQuote = document.getElementById('teacher-quote');
    
    // Set initial active state for teacher2 (Serena)
    if (teacherImg2) {
        teacherImg2.classList.add('border-black');
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
    
    function setActiveImage(activeImg, inactiveImg) {
        activeImg.classList.add('border-black');
        activeImg.classList.remove('border-transparent');
        inactiveImg.classList.remove('border-black');
        inactiveImg.classList.add('border-transparent');
    }
    
    // Add click events
    if (teacherImg1) {
        teacherImg1.addEventListener('click', function() {
            updateTeacherInfo(teacherData.teacher1);
            setActiveImage(teacherImg1, teacherImg2);
        });
    }
    
    if (teacherImg2) {
        teacherImg2.addEventListener('click', function() {
            updateTeacherInfo(teacherData.teacher2);
            setActiveImage(teacherImg2, teacherImg1);
        });
    }
});