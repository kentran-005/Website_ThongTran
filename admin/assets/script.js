// Mobile Sidebar Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.admin-sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Toggle between Add Student Form and Student List
function toggleStudentList() {
    const formSection = document.querySelector('.content-section:not(#studentListSection)');
    const listSection = document.getElementById('studentListSection');
    
    if (listSection.style.display === 'none') {
        listSection.style.display = 'block';
        formSection.style.display = 'none';
    } else {
        listSection.style.display = 'none';
        formSection.style.display = 'block';
    }
}

// Add Student Form Submission
const addStudentForm = document.getElementById('addStudentForm');
if (addStudentForm) {
    addStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(addStudentForm);
        const studentData = Object.fromEntries(formData);
        
        // Validation
        if (!studentData.studentId || !studentData.studentName || !studentData.studentEmail) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(studentData.studentEmail)) {
            alert('Email không hợp lệ!');
            return;
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        const phone = studentData.studentPhone.replace(/\s/g, '');
        if (phone && !phoneRegex.test(phone)) {
            alert('Số điện thoại không hợp lệ!');
            return;
        }

        // Success
        console.log('Student Data:', studentData);
        
        // Add student to table
        addStudentToTable(studentData);
        
        alert('Thêm sinh viên thành công!');
        addStudentForm.reset();
        
        // Switch to student list view
        toggleStudentList();
    });
}

// Add student to table
function addStudentToTable(data) {
    const tbody = document.getElementById('studentTableBody');
    if (!tbody) return;
    
    const majorNames = {
        'cs': 'Khoa Học Máy Tính',
        'it': 'Công Nghệ Thông Tin',
        'eng': 'Kỹ Thuật',
        'business': 'Kinh Doanh',
        'design': 'Thiết Kế'
    };
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="checkbox"></td>
        <td><strong>${data.studentId}</strong></td>
        <td>
            <div class="student-info">
                <div class="avatar-small">${data.studentGender === 'male' ? '👨‍🎓' : '👩‍🎓'}</div>
                <span>${data.studentName}</span>
            </div>
        </td>
        <td>${data.studentEmail}</td>
        <td>${majorNames[data.studentMajor] || data.studentMajor}</td>
        <td>Năm ${data.studentYear}</td>
        <td><span class="status-badge active">Đang học</span></td>
        <td class="action-buttons">
            <button class="btn-icon" title="Xem" onclick="viewStudent('${data.studentId}')">👁️</button>
            <button class="btn-icon" title="Sửa" onclick="editStudent('${data.studentId}')">✏️</button>
            <button class="btn-icon" title="Xóa" onclick="deleteStudent(this)">🗑️</button>
        </td>
    `;
    
    tbody.insertBefore(row, tbody.firstChild);
    
    // Animate new row
    row.style.opacity = '0';
    row.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
    }, 10);
}

// View Student Details
function viewStudent(studentId) {
    alert(`Xem chi tiết sinh viên: ${studentId}\n\n(Chức năng này sẽ mở modal hiển thị thông tin chi tiết)`);
}

// Edit Student
function editStudent(studentId) {
    alert(`Chỉnh sửa sinh viên: ${studentId}\n\n(Chức năng này sẽ load dữ liệu vào form để chỉnh sửa)`);
}

// Delete Student
function deleteStudent(button) {
    if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
        const row = button.closest('tr');
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(100px)';
        
        setTimeout(() => {
            row.remove();
            alert('Đã xóa sinh viên thành công!');
        }, 300);
    }
}

// Search functionality
const searchInputs = document.querySelectorAll('.search-box input, .search-control input');
searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll('.data-table tbody tr');
        
        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

// Table row selection
document.addEventListener('DOMContentLoaded', () => {
    const tableCheckboxes = document.querySelectorAll('.data-table tbody input[type="checkbox"]');
    const headerCheckbox = document.querySelector('.data-table thead input[type="checkbox"]');
    
    if (headerCheckbox) {
        headerCheckbox.addEventListener('change', (e) => {
            tableCheckboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
            });
        });
    }
    
    tableCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const allChecked = Array.from(tableCheckboxes).every(cb => cb.checked);
            const someChecked = Array.from(tableCheckboxes).some(cb => cb.checked);
            
            if (headerCheckbox) {
                headerCheckbox.checked = allChecked;
                headerCheckbox.indeterminate = someChecked && !allChecked;
            }
        });
    });
});

// Notification click
const notifications = document.querySelector('.notifications');
if (notifications) {
    notifications.addEventListener('click', () => {
        alert('Thông báo:\n\n• 3 sinh viên mới đăng ký\n• 5 bài tập cần chấm\n• 2 tin nhắn mới');
    });
}

// Sidebar navigation active state
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Remove active from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        // Add active to clicked item
        item.classList.add('active');
    });
});

// Auto-hide sidebar on mobile after clicking nav item
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 1024 && sidebar) {
            sidebar.classList.remove('active');
        }
    });
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && sidebar) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Form animations
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach((group, index) => {
    group.style.opacity = '0';
    group.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        group.style.transition = 'all 0.3s ease';
        group.style.opacity = '1';
        group.style.transform = 'translateY(0)';
    }, index * 50);
});

// Console message
console.log('%c🔐 Admin Panel Loaded Successfully', 'color: #ff6b35; font-size: 18px; font-weight: bold;');
console.log('%cWelcome, Administrator!', 'color: #666; font-size: 14px;');