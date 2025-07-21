// PWA Installation and Service Worker Registration

// Sticky Navigation Effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Enhanced Button Interactions and Floating Elements
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-base, .theme-toggle, .install-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Create enhanced floating elements
    createFloatingElements();
});

// Create Enhanced Floating Elements
function createFloatingElements() {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-elements';
    
    // Python and programming related symbols
    const symbols = [
        '🐍', '💻', '⚡', '🔥', '✨', '💡', '🚀', '⭐', '🎯', '🔧',
        '📊', '📈', '🎨', '🔮', '💎', '🌟', '⚙️', '🎪', '🎭', '🎨',
        'def', 'if', 'for', 'while', 'class', 'import', 'print', 'return', 'try', 'except',
        '{}', '[]', '()', '==', '!=', '<=', '>=', '&&', '||', '//',
        'λ', 'π', '∞', '∑', '∆', '∇', '∈', '∉', '⊂', '⊃'
    ];
    
    // Create 35 floating elements with variety
    for (let i = 0; i < 35; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Add random classes for variety
        const sizeClasses = ['', 'large', 'small'];
        const colorClasses = ['', 'python-color', 'code-color'];
        
        const randomSize = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
        const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];
        
        if (randomSize) element.classList.add(randomSize);
        if (randomColor) element.classList.add(randomColor);
        
        // Set random symbol
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        element.textContent = randomSymbol;
        
        // Set CSS custom properties for animation
        element.style.setProperty('--delay', `${i * 2}s`);
        element.style.setProperty('--max-opacity', `${0.05 + Math.random() * 0.08}`);
        
        floatingContainer.appendChild(element);
    }
    
    document.body.appendChild(floatingContainer);
}

// Add ripple CSS
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'flex';
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installBtn.style.display = 'none';
        }
        deferredPrompt = null;
    }
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', savedTheme === 'dark');
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Font Size Controller
const fontIncrease = document.getElementById('font-increase');
const fontDecrease = document.getElementById('font-decrease');
let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 16;

document.documentElement.style.fontSize = currentFontSize + 'px';

fontIncrease.addEventListener('click', () => {
    if (currentFontSize < 24) {
        currentFontSize += 2;
        document.documentElement.style.fontSize = currentFontSize + 'px';
        localStorage.setItem('fontSize', currentFontSize);
    }
});

fontDecrease.addEventListener('click', () => {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.documentElement.style.fontSize = currentFontSize + 'px';
        localStorage.setItem('fontSize', currentFontSize);
    }
});

// Mobile Navigation
const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
const navOverlay = document.getElementById('nav-overlay');

hamburgerMenu.addEventListener('click', () => {
    mobileNavDrawer.classList.toggle('active');
    navOverlay.classList.toggle('active');
});

navOverlay.addEventListener('click', () => {
    mobileNavDrawer.classList.remove('active');
    navOverlay.classList.remove('active');
});

// Mind Map Functionality
const mindmapBtn = document.getElementById('mindmap-btn');
const mindmapOverlay = document.getElementById('mindmap-overlay');
const mindmapClose = document.getElementById('mindmap-close');

mindmapBtn.addEventListener('click', () => {
    mindmapOverlay.classList.add('active');
});

mindmapClose.addEventListener('click', () => {
    mindmapOverlay.classList.remove('active');
});

mindmapOverlay.addEventListener('click', (e) => {
    if (e.target === mindmapOverlay) {
        mindmapOverlay.classList.remove('active');
    }
});

// Python Compiler Shortcut Functionality
const compilerBtn = document.getElementById('compiler-btn');

compilerBtn.addEventListener('click', () => {
    const pythonEditorSection = document.getElementById('python-editor-section');
    if (pythonEditorSection) {
        pythonEditorSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Optional: Add a visual highlight effect
        pythonEditorSection.style.animation = 'highlight 2s ease-in-out';
        setTimeout(() => {
            pythonEditorSection.style.animation = '';
        }, 2000);
    }
});

// Study Order Navigation
const studyOrderItems = document.querySelectorAll('.study-order li');
studyOrderItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        if (target) {
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Progress Tracking System
let userProgress = JSON.parse(localStorage.getItem('userProgress')) || {};
let userXP = parseInt(localStorage.getItem('userXP')) || 0;
let userLevel = parseInt(localStorage.getItem('userLevel')) || 1;

function updateProgress() {
    const checkboxes = document.querySelectorAll('.progress-checkbox');
    const totalItems = checkboxes.length;
    let completedItems = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            completedItems++;
        }
    });

    const progressPercentage = Math.round((completedItems / totalItems) * 100);
    
    // Update main progress bar
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill && progressText) {
        progressFill.style.width = progressPercentage + '%';
        progressText.textContent = `پیشرفت: ${progressPercentage}%`;
    }

    // Update card progress
    updateCardProgress();
    
    // Update XP system
    updateXPSystem(completedItems);
}

function updateCardProgress() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const cardCheckboxes = card.querySelectorAll('.progress-checkbox');
        const cardTotal = cardCheckboxes.length;
        let cardCompleted = 0;
        
        cardCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                cardCompleted++;
            }
        });
        
        const cardProgress = Math.round((cardCompleted / cardTotal) * 100);
        const cardProgressFill = card.querySelector('.card-progress-fill');
        const cardProgressText = card.querySelector('.card-progress-text');
        
        if (cardProgressFill && cardProgressText) {
            cardProgressFill.style.width = cardProgress + '%';
            cardProgressText.textContent = `${cardCompleted}/${cardTotal} تکمیل شده`;
        }
        
        // Update card progress attribute
        card.setAttribute('data-card-progress', cardProgress);
        
        // Show achievement badge if card is completed
        if (cardProgress === 100) {
            const badge = card.querySelector('.achievement-badge');
            if (badge) {
                badge.style.display = 'block';
            }
        }
    });
}

function updateXPSystem(completedItems) {
    const newXP = completedItems * 10; // 10 XP per completed item
    const newLevel = Math.floor(newXP / 100) + 1; // Level up every 100 XP
    
    // Always update XP (can increase or decrease)
    const oldXP = userXP;
    const oldLevel = userLevel;
    
    userXP = newXP;
    userLevel = newLevel;
    
    // Show achievement only if level increased
    if (newLevel > oldLevel && newXP > oldXP) {
        showAchievement('🎉', 'سطح جدید!', `تبریک! شما به سطح ${newLevel} رسیدید!`);
    }
    
    // Save to localStorage
    localStorage.setItem('userXP', userXP);
    localStorage.setItem('userLevel', userLevel);
    
    // Update XP display
    const xpText = document.getElementById('xp-text');
    const xpFill = document.getElementById('xp-fill');
    const userLevelElement = document.getElementById('user-level');
    
    if (xpText && xpFill && userLevelElement) {
        const currentLevelXP = userXP % 100;
        const nextLevelXP = 100;
        
        xpText.textContent = `${currentLevelXP} / ${nextLevelXP} XP`;
        xpFill.style.width = (currentLevelXP / nextLevelXP) * 100 + '%';
        userLevelElement.textContent = `سطح ${userLevel}`;
    }
}

function showAchievement(icon, title, text) {
    const popup = document.getElementById('achievement-popup');
    const iconElement = document.getElementById('achievement-icon');
    const titleElement = document.getElementById('achievement-title');
    const textElement = document.getElementById('achievement-text');
    
    if (popup && iconElement && titleElement && textElement) {
        iconElement.textContent = icon;
        titleElement.textContent = title;
        textElement.textContent = text;
        
        popup.classList.add('show');
        
        setTimeout(() => {
            popup.classList.remove('show');
        }, 4000);
    }
}

function closeAchievementPopup() {
    const popup = document.getElementById('achievement-popup');
    if (popup) {
        popup.classList.remove('show');
    }
}

// Search Functionality
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Enhanced Search Functionality with Category Support
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        resetSearchHighlights();
        return;
    }

    const cards = document.querySelectorAll('.card');
    const searchResults = [];
    let found = false;

    cards.forEach((card, cardIndex) => {
        const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
        const cardItems = card.querySelectorAll('.item-text');
        const cardCodes = card.querySelectorAll('.item-code');
        let cardMatches = false;
        const matchedItems = [];

        // Check card title
        if (cardTitle.includes(query)) {
            cardMatches = true;
            matchedItems.push({
                type: 'title',
                text: card.querySelector('.card-title').textContent,
                element: card
            });
        }

        // Check items within the card
        cardItems.forEach((item, itemIndex) => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(query)) {
                cardMatches = true;
                matchedItems.push({
                    type: 'item',
                    text: item.textContent,
                    element: item.closest('.clickable-item'),
                    parent: card
                });
            }
        });

        // Check code snippets
        cardCodes.forEach((code, codeIndex) => {
            const codeText = code.textContent.toLowerCase();
            if (codeText.includes(query)) {
                cardMatches = true;
                matchedItems.push({
                    type: 'code',
                    text: code.textContent,
                    element: code.closest('.clickable-item'),
                    parent: card
                });
            }
        });

        if (cardMatches) {
            searchResults.push({
                card: card,
                matches: matchedItems
            });
            found = true;
        }
    });

    if (!found) {
        showSearchNotification('موردی یافت نشد!', 'error');
        resetSearchHighlights();
    } else {
        displaySearchResults(searchResults);
        showSearchNotification(`${searchResults.length} نتیجه یافت شد`, 'success');
    }
}

function displaySearchResults(results) {
    resetSearchHighlights();
    
    // Highlight first result and scroll to it
    if (results.length > 0) {
        const firstResult = results[0];
        firstResult.card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Highlight all matching cards
        results.forEach(result => {
            result.card.classList.add('search-highlight');
            
            // Highlight individual matching items
            result.matches.forEach(match => {
                if (match.element) {
                    match.element.classList.add('search-item-highlight');
                }
            });
        });
        
        // Dim non-matching cards
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            if (!results.some(r => r.card === card)) {
                card.style.opacity = '0.3';
            }
        });
    }
}

function resetSearchHighlights() {
    // Remove all search highlights
    document.querySelectorAll('.search-highlight').forEach(el => {
        el.classList.remove('search-highlight');
    });
    
    document.querySelectorAll('.search-item-highlight').forEach(el => {
        el.classList.remove('search-item-highlight');
    });
    
    // Reset card opacity
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '1';
    });
}

function showSearchNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `search-notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});
// Modal System
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for modal triggers
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('clickable-item') || e.target.closest('.clickable-item')) {
        const item = e.target.classList.contains('clickable-item') ? e.target : e.target.closest('.clickable-item');
        const modalTarget = item.getAttribute('data-modal-target');
        if (modalTarget) {
            openModal(modalTarget.substring(1)); // Remove the # from the target
        }
    }
    
    if (e.target.classList.contains('modal-close-btn') || e.target.closest('.modal-close-btn')) {
        const modal = e.target.closest('.modal-overlay');
        if (modal) {
            closeModal(modal);
        }
    }
    
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(e.target);
    }
});

// ========================================= //
// Bookmark System
// ========================================= //

let userBookmarks = JSON.parse(localStorage.getItem('userBookmarks')) || [];

function toggleBookmark(itemId, itemTitle, cardTitle) {
    const existingIndex = userBookmarks.findIndex(bookmark => bookmark.id === itemId);
    
    if (existingIndex > -1) {
        // Remove bookmark
        userBookmarks.splice(existingIndex, 1);
        showSearchNotification('از علاقه‌مندی‌ها حذف شد', 'info');
    } else {
        // Add bookmark
        userBookmarks.push({
            id: itemId,
            title: itemTitle,
            category: cardTitle,
            timestamp: new Date().toISOString()
        });
        showSearchNotification('به علاقه‌مندی‌ها اضافه شد', 'success');
    }
    
    localStorage.setItem('userBookmarks', JSON.stringify(userBookmarks));
    updateBookmarkButtons();
}

function updateBookmarkButtons() {
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    bookmarkButtons.forEach(btn => {
        const itemId = btn.getAttribute('data-item-id');
        const isBookmarked = userBookmarks.some(bookmark => bookmark.id === itemId);
        
        btn.classList.toggle('bookmarked', isBookmarked);
        btn.innerHTML = isBookmarked ? '❤️' : '🤍';
        btn.title = isBookmarked ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها';
    });
}

function showBookmarks() {
    if (userBookmarks.length === 0) {
        showSearchNotification('هیچ علاقه‌مندی ذخیره نشده است', 'info');
        return;
    }
    
    // Create bookmarks modal
    const modal = createBookmarksModal();
    document.body.appendChild(modal);
    modal.classList.add('active');
}

function createBookmarksModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay bookmarks-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="bookmarks-header">
                <h3>📚 علاقه‌مندی‌های من</h3>
                <button class="clear-bookmarks-btn">پاک کردن همه</button>
            </div>
            <div class="bookmarks-list">
                ${userBookmarks.map(bookmark => `
                    <div class="bookmark-item" data-bookmark-id="${bookmark.id}">
                        <div class="bookmark-info">
                            <h4>${bookmark.title}</h4>
                            <p>${bookmark.category}</p>
                            <small>${new Date(bookmark.timestamp).toLocaleDateString('fa-IR')}</small>
                        </div>
                        <div class="bookmark-actions">
                            <button class="goto-bookmark-btn" data-item-id="${bookmark.id}">برو به</button>
                            <button class="remove-bookmark-btn" data-bookmark-id="${bookmark.id}">حذف</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add event listeners
    modal.querySelector('.modal-close-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('.clear-bookmarks-btn').addEventListener('click', () => {
        if (confirm('آیا مطمئن هستید که می‌خواهید همه علاقه‌مندی‌ها را پاک کنید؟')) {
            userBookmarks = [];
            localStorage.setItem('userBookmarks', JSON.stringify(userBookmarks));
            updateBookmarkButtons();
            modal.remove();
            showSearchNotification('همه علاقه‌مندی‌ها پاک شدند', 'info');
        }
    });
    
    modal.querySelectorAll('.goto-bookmark-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = btn.getAttribute('data-item-id');
            const element = document.querySelector(`[data-item="${itemId}"]`);
            if (element) {
                const card = element.closest('.card');
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    card.classList.add('search-highlight');
                    setTimeout(() => card.classList.remove('search-highlight'), 2000);
                }
            }
            modal.remove();
        });
    });
    
    modal.querySelectorAll('.remove-bookmark-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const bookmarkId = btn.getAttribute('data-bookmark-id');
            const index = userBookmarks.findIndex(b => b.id === bookmarkId);
            if (index > -1) {
                userBookmarks.splice(index, 1);
                localStorage.setItem('userBookmarks', JSON.stringify(userBookmarks));
                updateBookmarkButtons();
                btn.closest('.bookmark-item').remove();
                showSearchNotification('از علاقه‌مندی‌ها حذف شد', 'info');
            }
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    return modal;
}


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved progress
    const checkboxes = document.querySelectorAll('.progress-checkbox');
    checkboxes.forEach(checkbox => {
        const itemId = checkbox.getAttribute('data-item');
        if (userProgress[itemId]) {
            checkbox.checked = true;
        }
        
        checkbox.addEventListener('change', () => {
            userProgress[itemId] = checkbox.checked;
            localStorage.setItem('userProgress', JSON.stringify(userProgress));
            updateProgress();
        });
    });
    
    // Add bookmark buttons to all items
    const clickableItems = document.querySelectorAll('.clickable-item');
    clickableItems.forEach(item => {
        const itemData = item.querySelector('.progress-checkbox');
        if (itemData) {
            const itemId = itemData.getAttribute('data-item');
            const itemTitle = item.querySelector('.item-text').textContent;
            const cardTitle = item.closest('.card').querySelector('.card-title').textContent;
            
            // Add bookmark button
            const bookmarkBtn = document.createElement('button');
            bookmarkBtn.className = 'bookmark-btn';
            bookmarkBtn.setAttribute('data-item-id', itemId);
            bookmarkBtn.innerHTML = '🤍';
            bookmarkBtn.title = 'افزودن به علاقه‌مندی‌ها';
            
            bookmarkBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleBookmark(itemId, itemTitle, cardTitle);
            });
            
            item.appendChild(bookmarkBtn);
        }
    });
    
    
    // Update bookmark buttons
    updateBookmarkButtons();
    
    // Add bookmarks button to navigation
    const navRight = document.querySelector('.nav-right');
    if (navRight) {
        const bookmarksBtn = document.createElement('button');
        bookmarksBtn.className = 'bookmarks-nav-btn tooltip';
        bookmarksBtn.setAttribute('data-tooltip', 'مشاهده علاقه‌مندی‌ها');
        bookmarksBtn.innerHTML = '📚';
        bookmarksBtn.addEventListener('click', showBookmarks);
        
        navRight.insertBefore(bookmarksBtn, navRight.firstChild);
    }
    
    // Initial progress update and XP system initialization
    updateProgress();
    
    // Initialize XP display on page load
    const xpText = document.getElementById('xp-text');
    const xpFill = document.getElementById('xp-fill');
    const userLevelElement = document.getElementById('user-level');
    
    if (xpText && xpFill && userLevelElement) {
        const currentLevelXP = userXP % 100;
        const nextLevelXP = 100;
        
        xpText.textContent = `${currentLevelXP} / ${nextLevelXP} XP`;
        xpFill.style.width = (currentLevelXP / nextLevelXP) * 100 + '%';
        userLevelElement.textContent = `سطح ${userLevel}`;
    }
    
    console.log('All functionality restored and enhanced with new features!');
});

// Python Code Editor Functionality
class PythonEditor {
    constructor() {
        this.pyodide = null;
        this.isLoading = false;
        this.initializeElements();
        this.setupEventListeners();
        this.loadPyodide();
    }

    initializeElements() {
        this.codeEditor = document.getElementById('python-code-editor');
        this.outputDiv = document.getElementById('python-output');
        this.runBtn = document.getElementById('run-code-btn');
        this.clearBtn = document.getElementById('clear-code-btn');
        this.exampleBtn = document.getElementById('example-code-btn');
        this.statusText = document.getElementById('editor-status-text');
        this.loadingSpinner = document.getElementById('loading-spinner');
    }

    setupEventListeners() {
        this.runBtn.addEventListener('click', () => this.runCode());
        this.clearBtn.addEventListener('click', () => this.clearCode());
        this.exampleBtn.addEventListener('click', () => this.loadExample());
        
        // Keyboard shortcuts
        this.codeEditor.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.runCode();
            }
        });
    }

    async loadPyodide() {
        try {
            this.setStatus('در حال بارگذاری مفسر پایتون...', true);
            this.pyodide = await loadPyodide();
            this.setStatus('آماده برای اجرا', false);
        } catch (error) {
            this.setStatus('خطا در بارگذاری مفسر پایتون', false);
            this.showOutput('خطا: نتوانستیم مفسر پایتون را بارگذاری کنیم.\\n' + error.message, 'error');
        }
    }

    setStatus(message, loading = false) {
        this.statusText.textContent = message;
        this.loadingSpinner.style.display = loading ? 'flex' : 'none';
        this.runBtn.disabled = loading;
    }

    showOutput(text, type = 'normal') {
        this.outputDiv.innerHTML = '';
        const outputElement = document.createElement('div');
        outputElement.textContent = text;
        
        if (type === 'error') {
            outputElement.className = 'error-output';
        } else if (type === 'success') {
            outputElement.className = 'success-output';
        }
        
        this.outputDiv.appendChild(outputElement);
    }

    async runCode() {
        if (!this.pyodide) {
            this.showOutput('مفسر پایتون هنوز بارگذاری نشده است. لطفاً صبر کنید...', 'error');
            return;
        }

        if (this.isLoading) {
            return;
        }

        const code = this.codeEditor.value.trim();
        if (!code) {
            this.showOutput('لطفاً کدی بنویسید تا اجرا شود.', 'error');
            return;
        }

        this.isLoading = true;
        this.setStatus('در حال اجرای کد...', true);

        try {
            // Capture output
            let output = '';
            let errorOutput = '';

            // Redirect stdout and stderr
            this.pyodide.runPython(`
import sys
from io import StringIO

# Create string buffers for output
stdout_buffer = StringIO()
stderr_buffer = StringIO()

# Redirect stdout and stderr
sys.stdout = stdout_buffer
sys.stderr = stderr_buffer
            `);

            // Handle input() function
            this.pyodide.globals.set('js_input', (prompt) => {
                return window.prompt(prompt || 'ورودی:') || '';
            });

            this.pyodide.runPython(`
# Replace input function with JavaScript prompt
import builtins
builtins.input = js_input
            `);

            // Run user code
            this.pyodide.runPython(code);

            // Get output
            output = this.pyodide.runPython('stdout_buffer.getvalue()');
            errorOutput = this.pyodide.runPython('stderr_buffer.getvalue()');

            // Reset stdout and stderr
            this.pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
            `);

            if (errorOutput) {
                this.showOutput(errorOutput, 'error');
            } else if (output) {
                this.showOutput(output, 'success');
            } else {
                this.showOutput('کد با موفقیت اجرا شد (بدون خروجی)', 'success');
            }

            this.setStatus('اجرا تکمیل شد', false);

        } catch (error) {
            this.showOutput(`خطا در اجرای کد:\\n${error.message}`, 'error');
            this.setStatus('خطا در اجرا', false);
        } finally {
            this.isLoading = false;
        }
    }

    clearCode() {
        this.codeEditor.value = '';
        this.outputDiv.innerHTML = '<div class="output-placeholder">خروجی کد شما اینجا نمایش داده می‌شود...</div>';
        this.setStatus('آماده برای اجرا', false);
        this.codeEditor.focus();
    }

    loadExample() {
        const examples = [
            `# مثال 1: سلام دنیا
print("سلام دنیا!")
name = input("نام شما چیست؟ ")
print(f"سلام {name}! خوش آمدید.")`,

            `# مثال 2: محاسبه مساحت دایره
import math

radius = float(input("شعاع دایره را وارد کنید: "))
area = math.pi * radius ** 2
print(f"مساحت دایره: {area:.2f}")`,

            `# مثال 3: کار با لیست
numbers = [1, 2, 3, 4, 5]
print("اعداد اصلی:", numbers)

# اضافه کردن عدد جدید
numbers.append(6)
print("بعد از اضافه کردن 6:", numbers)

# محاسبه مجموع
total = sum(numbers)
print(f"مجموع اعداد: {total}")`,

            `# مثال 4: حلقه و شرط
print("اعداد زوج از 1 تا 10:")
for i in range(1, 11):
    if i % 2 == 0:
        print(i, end=" ")
print()  # خط جدید`,

            `# مثال 5: تابع
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

num = int(input("عددی برای محاسبه فاکتوریل وارد کنید: "))
result = factorial(num)
print(f"فاکتوریل {num} = {result}")`
        ];

        const randomExample = examples[Math.floor(Math.random() * examples.length)];
        this.codeEditor.value = randomExample;
        this.codeEditor.focus();
        this.setStatus('مثال بارگذاری شد', false);
    }
}

// Initialize Python Editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if the editor section exists
    if (document.getElementById('python-editor-section')) {
        new PythonEditor();
    }
});
