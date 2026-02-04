// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(255, 107, 53, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(255, 107, 53, 0.1)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.feature-card, .content-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Email không hợp lệ!');
            return;
        }

        // Show success message
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
        contactForm.reset();
    });
}

// Login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);
        
        if (!data.username || !data.password) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Simulate login
        console.log('Login attempt:', data);
        alert('Đăng nhập thành công! (Demo)');
        // In a real application, you would send this to a server
        // window.location.href = 'index.html';
    });
}

// Register form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!data.firstName || !data.lastName || !data.email || !data.phone || 
            !data.username || !data.password || !data.confirmPassword || !data.role) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Email không hợp lệ!');
            return;
        }

        // Password validation
        if (data.password.length < 8) {
            alert('Mật khẩu phải có ít nhất 8 ký tự!');
            return;
        }

        if (data.password !== data.confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        if (!data.terms) {
            alert('Vui lòng đồng ý với điều khoản sử dụng!');
            return;
        }

        // Simulate registration
        console.log('Registration data:', data);
        alert('Đăng ký thành công!');
        window.location.href = 'success.html';
    });
}

// Smooth scrolling for anchor links
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

// Add hover effect to buttons
document.querySelectorAll('.btn-primary, .btn-submit').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Card hover effect enhancement
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Console welcome message
console.log('%c🎉 Welcome to MyWebsite! 🎉', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ and modern web technologies', 'color: #666; font-size: 14px;');