
function setFormReadOnly(formId, isReadOnly) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Disable form inputs
    const elements = form.querySelectorAll('input, select, textarea');
    elements.forEach(el => {
        el.disabled = isReadOnly;
    });

    // Disable custom elements like toggles and upload zones
    const customEls = form.querySelectorAll('.toggle-btn-option, .upload-zone, .remove-image-btn, .video-dropzone, .suggest-content-link');
    customEls.forEach(el => {
        if (isReadOnly) {
            el.style.pointerEvents = 'none';
            el.style.opacity = '0.6';
        } else {
            el.style.pointerEvents = 'auto';
            el.style.opacity = '1';
        }
    });
}

// app.js - Ezi Talent Facebook Integration Logic

// --- Global State ---
let facebookConnected = true; // Default to connected to show high-fidelity page items
let adsConnected = true; // Default state for Ads Connection

let posts = [
    {
        id: "post-1",
        pageName: "Ezi Talent",
        pageClass: "et-logo",
        content: "🚀 CƠ HỘI GIA NHẬP EZI TEAM - THU NHẬP HẤP DẪN LÊN TỚI 35M\n\nBạn là một React Native Developer đam mê công nghệ và muốn xây dựng các sản phẩm chất lượng cao? Đăng ký ứng tuyển ngay hôm nay!\n\n📌 Yêu cầu chính:\n- Từ 2 năm kinh nghiệm lập trình React Native.\n- Nắm vững JavaScript/TypeScript, React Native CLI.\n- Kinh nghiệm tích hợp API, Firebase, Push Notification.\n\n🎁 Quyền lợi hấp dẫn:\n- Lương cứng cạnh tranh, thưởng KPIs tháng/năm.\n- BHXH đầy đủ, bảo hiểm sức khỏe EziCare.\n- Teambuilding hàng quý, du lịch hàng năm.",
        imagePreset: "hero_bg.png",
        imagePresetClass: "hero-bg",
        imagePresetName: "Marketing Banner",
        time: "2 giờ trước",
        likes: 38,
        comments: 12,
        shares: 4
    },
    {
        id: "post-2",
        pageName: "Ezi Academy",
        pageClass: "ea-logo",
        content: "🎨 BẠN CÓ MUỐN TỰ TAY THIẾT KẾ GIAO DIỆN APP TRIỆU VIEW?\n\nKhóa học UI/UX từ cơ bản đến nâng cao tại Ezi Academy chính thức mở cổng đăng ký! Đào tạo bài bản theo quy trình làm việc thực tế tại doanh nghiệp.\n\n🔥 Điểm đặc biệt của khóa học:\n- Hướng dẫn trực tiếp bởi Senior Designer từ các tập đoàn lớn.\n- Thực hành dự án thật 100% suốt khóa học.\n- Hỗ trợ giới thiệu việc làm ngay sau khi tốt nghiệp tại đối tác Ezitalent.\n\n📩 Inbox fanpage nhận ngay voucher giảm 20% học phí hôm nay!",
        imagePreset: "office_banner.png",
        imagePresetClass: "office-banner-bg",
        imagePresetName: "Văn phòng hiện đại",
        time: "1 ngày trước",
        likes: 54,
        comments: 18,
        shares: 9
    }
];

// --- Comments per Post (key = post id) ---
let comments = {
    "post-1": [
        { id: "cmt-1", author: "Trần Gia Huy", avatar: "H", text: "Cho mình hỏi vị trí này có yêu cầu kinh nghiệm React Native mảng thương mại điện tử không ạ?", time: "1 giờ trước", hidden: false, reply: "" },
        { id: "cmt-2", author: "Ngọc Diễm", avatar: "D", text: "Công ty có làm việc từ xa (remote) không shop ơi?", time: "50 phút trước", hidden: false, reply: "Chào bạn, hiện tại vị trí này làm việc hybrid 3 ngày tại văn phòng bạn nhé!" },
        { id: "cmt-3", author: "Phạm Anh Kiệt", avatar: "K", text: "Spam link web đen, mọi người tránh xa!!!", time: "20 phút trước", hidden: true, reply: "" }
    ],
    "post-2": [
        { id: "cmt-4", author: "Lê Thuỳ Trang", avatar: "T", text: "Khoá học có cấp chứng chỉ sau khi hoàn thành không ạ?", time: "3 giờ trước", hidden: false, reply: "" },
        { id: "cmt-5", author: "Đức Anh", avatar: "Đ", text: "Voucher 20% áp dụng đến khi nào vậy shop?", time: "2 giờ trước", hidden: false, reply: "" }
    ]
};

let activeCommentsPostId = null;

let chats = [
    {
        id: "chat-an",
        name: "Nguyễn Văn An",
        avatar: "A",
        online: true,
        unread: 2,
        pageName: "Ezi Talent",
        messages: [
            { sender: "incoming", text: "Chào shop, vị trí tuyển dụng còn tuyển không ạ?", time: "03:01" },
            { sender: "outgoing", text: "Chào bạn, cảm ơn bạn đã quan tâm! Location vẫn còn, bạn có thể ứng tuyển ngay trên trang web của chúng mình nhé.", time: "03:01" },
            { sender: "incoming", text: "Chào shop, vị trí tuyển dụng còn tuyển không ạ?", time: "03:01" },
            { sender: "incoming", text: "hello", time: "03:19" }
        ],
        lastTime: "03:19"
    },
    {
        id: "chat-bich",
        name: "Trần Thị Bích",
        avatar: "B",
        online: false,
        unread: 0,
        pageName: "Ezi Academy",
        messages: [
            { sender: "incoming", text: "Cho mình hỏi chế độ thử việc bên mình như thế nào ạ?", time: "Hôm qua" },
            { sender: "outgoing", text: "Dạ chào bạn, thời gian thử việc bên mình là 2 tháng, nhận 85% lương cứng cộng đầy đủ phụ cấp cơm trưa bạn nhé.", time: "Hôm qua" },
            { sender: "incoming", text: "Cảm ơn shop đã phản hồi!", time: "Hôm qua" }
        ],
        lastTime: "Hôm qua"
    },
    {
        id: "chat-cong",
        name: "Lê Minh Công",
        avatar: "C",
        online: true,
        unread: 1,
        pageName: "Ezi Talent",
        messages: [
            { sender: "incoming", text: "Cho em xin link ứng tuyển với ạ", time: "2 ngày trước" },
            { sender: "outgoing", text: "Chào Công, em có thể nộp CV qua đường link: ezitalent.vn/jobs/react-native nhé.", time: "2 ngày trước" },
            { sender: "incoming", text: "Cho em xin link ứng dụng nhé", time: "2 ngày trước" }
        ],
        lastTime: "2 ngày trước"
    }
];

let activeChatId = "chat-an";

// --- Tab Routing Logic ---
function switchTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.add('hidden');
    });

    // Show selected tab
    let sectionId = `section-${tabId}`;
    if (tabId === 'settings-policy' || tabId === 'settings-personal') {
        sectionId = 'section-settings';
    }
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
    }

    // Manage active classes on Sidebar items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (tabId !== 'fb-connect' && tabId !== 'ads-connect' && tabId !== 'pixel-manage' && tabId !== 'fb-ads-create' && tabId !== 'fb-ads-list' && tabId !== 'settings' && tabId !== 'settings-policy' && tabId !== 'settings-personal') {
            item.classList.remove('dropdown-active');
        }
    });
    document.querySelectorAll('.submenu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Specific sidebar item activation logic
    if (tabId === 'fb-connect') {
        document.getElementById('menu-resources').classList.add('dropdown-active');
        document.getElementById('menu-fb-connect').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Facebook Account";
        renderFacebookConnectionPanel();
    } else if (tabId === 'ads-connect') {
        document.getElementById('menu-resources').classList.add('dropdown-active');
        document.getElementById('menu-ads-connect').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Ads Account";
        renderAdsConnectionPanel();
    } else if (tabId === 'pixel-manage') {
        document.getElementById('menu-resources').classList.add('dropdown-active');
        document.getElementById('menu-pixel-manage').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Quản lý Pixel Facebook (Meta Pixel)";
        renderPixelTable();
    } else if (tabId === 'fb-posts') {
        document.getElementById('menu-fb-posts').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Post Management Facebook Fanpage";
        renderPosts();
    } else if (tabId === 'fb-create') {
        document.getElementById('menu-fb-create').classList.add('active');
        const editId = document.getElementById('edit-post-id').value;
        document.getElementById('breadcrumb-title').textContent = editId ? "Edit Facebook Post" : "Create New Post";
        updateLivePreview();
    } else if (tabId === 'fb-chat') {
        document.getElementById('menu-fb-chat').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Facebook Messenger Recruitment Inbox";
        renderChatList();
        renderChatViewport();
    } else if (tabId === 'fb-ads-create') {
        document.getElementById('menu-fb-ads').classList.add('dropdown-active');
        document.getElementById('menu-fb-ads-create').classList.add('active');
        const editAdId = document.getElementById('edit-ad-id') ? document.getElementById('edit-ad-id').value : '';
        document.getElementById('breadcrumb-title').textContent = editAdId ? "Edit Facebook Ad" : "Create Facebook Ad";
    } else if (tabId === 'fb-ads-list') {
        document.getElementById('menu-fb-ads').classList.add('dropdown-active');
        document.getElementById('menu-fb-ads-list').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Ads List Facebook";
        renderAdsTable();
    } else if (tabId === 'settings' || tabId === 'settings-policy') {
        const settingsMenu = document.getElementById('menu-settings');
        if (settingsMenu) settingsMenu.classList.add('dropdown-active');
        const policySub = document.getElementById('menu-settings-policy');
        if (policySub) policySub.classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Settings - System Policies";
        switchSettingsSubTab('policy');
    } else if (tabId === 'settings-personal') {
        const settingsMenu = document.getElementById('menu-settings');
        if (settingsMenu) settingsMenu.classList.add('dropdown-active');
        const personalSub = document.getElementById('menu-settings-personal');
        if (personalSub) personalSub.classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Settings - Personal Data";
        switchSettingsSubTab('personal');
    }
}

// --- Sidebar Dropdown Toggle (Settings) ---
function toggleSettingsDropdown(event) {
    const menuItem = document.getElementById('menu-settings');
    if (!menuItem) return;
    const isActive = menuItem.classList.contains('dropdown-active');
    if (isActive && event && event.target.closest('.submenu')) {
        return; // Don't collapse when clicking a sub-item
    }
    if (isActive) {
        menuItem.classList.remove('dropdown-active');
    } else {
        switchTab('settings-policy');
    }
}

function switchSettingsSubTab(subTab) {
    document.querySelectorAll('.settings-subtab-panel').forEach(panel => {
        panel.classList.add('hidden');
    });
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activePanel = document.getElementById(`settings-panel-${subTab}`);
    if (activePanel) activePanel.classList.remove('hidden');

    const activeBtn = document.getElementById(`settings-tab-btn-${subTab}`);
    if (activeBtn) activeBtn.classList.add('active');

    // Also sync sidebar sub-item state
    document.querySelectorAll('#menu-settings .submenu-item').forEach(item => item.classList.remove('active'));
    const subMenuItem = document.getElementById(`menu-settings-${subTab}`);
    if (subMenuItem) subMenuItem.classList.add('active');
}

function exportPersonalData() {
    showToast("Preparing data copy...", "The system is extracting your personal data as a secure file.");
}



function requestDataErasure() {
    showConfirmModal("Are you sure you want to send a request to delete all personal data from the Ezi Talent server?", () => {
        showToast("Data deletion request sent", "Personal Data Deletion Request is being processed by the Technical & Legal Department within 24 hours.");
    });
}

// --- Sidebar Dropdown Toggle (Facebook Ads Management) ---
function toggleAdsDropdown() {
    const menuItem = document.getElementById('menu-fb-ads');
    const isActive = menuItem.classList.contains('dropdown-active');
    if (isActive) {
        menuItem.classList.remove('dropdown-active');
    } else {
        // Mở dropdown và điều hướng luôn tới trang Create Ad nếu chưa ở trong nhóm này
        switchTab('fb-ads-create');
    }
}

// --- Sidebar Dropdown Toggle (Resource Management) ---
function toggleResourcesDropdown() {
    const menuItem = document.getElementById('menu-resources');
    const isActive = menuItem.classList.contains('dropdown-active');
    if (isActive) {
        menuItem.classList.remove('dropdown-active');
    } else {
        switchTab('fb-connect');
    }
}

// --- FB Posts Management CRUD ---
function renderPosts() {
    const container = document.getElementById('posts-container');
    const emptyState = document.getElementById('posts-empty-state');

    // Check search filter and page filter
    const query = document.getElementById('fb-posts-search').value.toLowerCase();
    const pageFilter = document.getElementById('fb-page-filter').value;

    const filteredPosts = posts.filter(post => {
        return post.content.toLowerCase().includes(query) && (pageFilter === 'all' || post.pageName === pageFilter);
    });

    if (filteredPosts.length === 0) {
        container.style.display = 'none';
        emptyState.classList.remove('hidden');
    } else {
        container.style.display = 'grid';
        emptyState.classList.add('hidden');

        container.innerHTML = filteredPosts.map(post => `
            <div class="post-card" id="${post.id}">
                <div class="card-header">
                    <div class="page-avatar ${post.pageClass}">${post.pageName === 'Ezi Talent' ? 'ET' : 'EA'}</div>
                    <div class="header-meta">
                        <span class="meta-name">${post.pageName}</span>
                        <span class="meta-time">${post.time} · 🌐</span>
                    </div>
                </div>
                <div class="card-body-content">
                    <p class="card-post-text" style="font-size: 14.5px; color: var(--text-main); margin-top: 4px;">${post.content}</p>
                    ${post.imagePreset ? (post.imagePreset.startsWith('blob:') ? `<div class="card-media" style="background-image: url('${post.imagePreset}')"></div>` : `<div class="card-media ${post.imagePresetClass}"></div>`) : ''}
                </div>
                <div class="card-metrics">
                    <div class="metrics-likes">
                        <span class="like-badge-icon">👍</span>
                        <span>${post.likes}</span>
                    </div>
                    <div>
                        <span>${post.comments} comments</span>
                        <span>·</span>
                        <span>${post.shares} shares</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="openCommentsModal('${post.id}')">
                        💬 Manage Comments (${(comments[post.id] || []).length})
                    </button>
                    <button class="btn btn-outline" onclick="editPost('${post.id}')">View</button>
                </div>
            </div>
        `).join('');
    }
}

function filterFacebookPosts() {
    renderPosts();
}

function deletePost(id) {
    showConfirmModal(
        "Are you sure you want to delete this post on Facebook Fanpage? This action cannot be undone.",
        () => {
            posts = posts.filter(post => post.id !== id);
            renderPosts();
            showToast("Post deleted", "The system has successfully removed the post from the Facebook Fanpage.");
        }
    );
}

// --- Comment Management for a Post ---
function openCommentsModal(postId) {
    activeCommentsPostId = postId;
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    document.getElementById('comments-modal-page-name').textContent = post.pageName;
    document.getElementById('comments-modal-post-excerpt').textContent =
        post.content.length > 90 ? post.content.slice(0, 90) + '…' : post.content;
    renderCommentsModal();
    document.getElementById('comments-modal-overlay').classList.remove('hidden');
}

function closeCommentsModal() {
    document.getElementById('comments-modal-overlay').classList.add('hidden');
    activeCommentsPostId = null;
}

function renderCommentsModal() {
    const list = comments[activeCommentsPostId] || [];
    const container = document.getElementById('comments-modal-list');
    const emptyState = document.getElementById('comments-modal-empty');

    if (list.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    container.innerHTML = list.map(c => `
        <div class="comment-item ${c.hidden ? 'comment-hidden' : ''}">
            <div class="comment-avatar">${c.avatar}</div>
            <div class="comment-body">
                <div class="comment-meta-row">
                    <span class="comment-author">${c.author}</span>
                    <span class="comment-time">${c.time}</span>
                    ${c.hidden ? '<span class="comment-hidden-tag">Đã ẩn</span>' : ''}
                </div>
                <p class="comment-text">${c.text}</p>

                ${c.reply ? `
                    <div class="comment-reply-block">
                        <span class="comment-reply-label">Your page replied:</span>
                        <p class="comment-reply-text">${c.reply}</p>
                    </div>
                ` : `
                    <div class="comment-reply-form">
                        <input type="text" placeholder="Write a reply as Fanpage..." id="reply-input-${c.id}">
                        <button class="btn btn-outline" onclick="submitCommentReply('${c.id}')">Reply</button>
                    </div>
                `}

                <div class="comment-actions-row">
                    <button class="comment-action-link" onclick="toggleCommentVisibility('${c.id}')">
                        ${c.hidden ? 'Unhide comments' : 'Hide comments'}
                    </button>
                    <button class="comment-action-link danger" onclick="deleteComment('${c.id}')">Delete comments</button>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleCommentVisibility(commentId) {
    const list = comments[activeCommentsPostId] || [];
    const c = list.find(item => item.id === commentId);
    if (!c) return;
    c.hidden = !c.hidden;
    renderCommentsModal();
    showToast(c.hidden ? "Hidden comments" : "Đã bỏ ẩn comments", c.hidden ? "The comment will not be publicly visible on the Fanpage." : "The comment is now visible again on the post.");
}

function deleteComment(commentId) {
    showConfirmModal(
        "Are you sure you want to delete this comment from the Facebook post?",
        () => {
            comments[activeCommentsPostId] = (comments[activeCommentsPostId] || []).filter(c => c.id !== commentId);
            renderCommentsModal();
            renderPosts();
            showToast("Comment deleted", "The comment has been removed from the Fanpage post.");
        }
    );
}

function submitCommentReply(commentId) {
    const input = document.getElementById(`reply-input-${commentId}`);
    if (!input || !input.value.trim()) return;
    const list = comments[activeCommentsPostId] || [];
    const c = list.find(item => item.id === commentId);
    if (!c) return;
    c.reply = input.value.trim();
    renderCommentsModal();
    showToast("Reply sent", "The Fanpage response has been posted under the comment.");
}

function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    // Load form data
    document.getElementById('edit-post-id').value = post.id;
    document.getElementById('post-fanpage').value = post.pageName;
    document.getElementById('post-content').value = post.content;
    document.getElementById('post-image-url').value = post.imagePreset;

    // UI update for view mode
    document.getElementById('create-post-title').textContent = "View Post";
    document.getElementById('create-post-subtitle').textContent = "View the content of the post on Fanpage";
    document.getElementById('submit-post-btn').style.display = 'none';
    setFormReadOnly('fb-create-post-form', true);

    if (post.imagePreset) {
        showSelectedImage(post.imagePreset, post.imagePresetName || 'tệp_đã_tải_lên.png');
    } else {
        removeSelectedImage(null);
    }

    switchTab('fb-create');
}

function cancelPostEdit() {
    resetPostForm();
    switchTab('fb-posts');
}

// Clear out fields and reset back to create post state
function resetPostForm() {
    document.getElementById('fb-create-post-form').reset();
    document.getElementById('edit-post-id').value = '';
    document.getElementById('post-image-url').value = '';

    document.getElementById('create-post-title').textContent = "Create New Post";
    document.getElementById('create-post-subtitle').textContent = "Draft a post and publish it to Facebook Fanpage";
    document.getElementById('submit-post-btn').textContent = "Create Post";
    document.getElementById('submit-post-btn').style.display = 'inline-block';
    setFormReadOnly('fb-create-post-form', false);

    removeSelectedImage(null);
}

function handlePostSubmit(event) {
    event.preventDefault();

    const editId = document.getElementById('edit-post-id').value;
    const pageName = document.getElementById('post-fanpage').value;
    const content = document.getElementById('post-content').value;
    const imagePreset = document.getElementById('post-image-url').value;

    let imagePresetClass = "";
    let imagePresetName = "";
    if (imagePreset === 'office_banner.png') {
        imagePresetClass = 'office-banner-bg';
        imagePresetName = 'Văn phòng hiện đại';
    } else if (imagePreset === 'hero_bg.png') {
        imagePresetClass = 'hero-bg';
        imagePresetName = 'Marketing Banner';
    } else if (imagePreset === 'team_photo.png') {
        imagePresetClass = 'team-photo-bg';
        imagePresetName = 'Active Teamwork';
    } else if (imagePreset.startsWith('blob:')) {
        imagePresetName = 'tệp_đăng.png';
    }

    const pageClass = pageName === 'Ezi Talent' ? 'et-logo' : 'ea-logo';

    if (editId) {
        // Update existing post
        const postIndex = posts.findIndex(p => p.id === editId);
        if (postIndex !== -1) {
            posts[postIndex].pageName = pageName;
            posts[postIndex].pageClass = pageClass;
            posts[postIndex].content = content;
            posts[postIndex].imagePreset = imagePreset;
            posts[postIndex].imagePresetClass = imagePresetClass;
            posts[postIndex].imagePresetName = imagePresetName;
            posts[postIndex].time = "Just edited";
            showToast("Post updated", "The Facebook post has been successfully updated.");
        }
    } else {
        // Create new post
        const newPost = {
            id: `post-${Date.now()}`,
            pageName: pageName,
            pageClass: pageClass,
            content: content,
            imagePreset: imagePreset,
            imagePresetClass: imagePresetClass,
            imagePresetName: imagePresetName,
            time: "Just now",
            likes: 0,
            comments: 0,
            shares: 0
        };
        posts.unshift(newPost);
        showToast("Post created", "A new post has been published to the Facebook Fanpage.");
    }

    resetPostForm();
    switchTab('fb-posts');
}

// --- Live Preview Logic ---
function updateLivePreview() {
    const pageName = document.getElementById('post-fanpage').value;
    const content = document.getElementById('post-content').value;
    const imagePreset = document.getElementById('post-image-url').value;

    // Update Page Info
    document.getElementById('preview-page-name').textContent = pageName;
    const avatarElem = document.getElementById('preview-avatar');
    if (pageName === 'Ezi Academy') {
        avatarElem.textContent = 'EA';
        avatarElem.style.backgroundColor = '#3182ce';
    } else {
        avatarElem.textContent = 'ET';
        avatarElem.style.backgroundColor = 'var(--primary)';
    }

    // Update Text fields
    document.getElementById('preview-post-content').textContent = content || "The detailed content of the post will be updated directly here as you enter the form on the left...";

    // Update Image Preview
    const mediaBox = document.getElementById('preview-media-box');
    const mediaImg = document.getElementById('preview-image-elem');

    if (imagePreset) {
        mediaBox.classList.remove('hidden');
        mediaImg.className = 'fb-media-preview-img'; // clear classes

        if (imagePreset.startsWith('blob:')) {
            mediaImg.style.backgroundImage = `url('${imagePreset}')`;
        } else {
            mediaImg.style.backgroundImage = '';
            if (imagePreset === 'office_banner.png') {
                mediaImg.classList.add('office-banner-bg');
            } else if (imagePreset === 'hero_bg.png') {
                mediaImg.classList.add('hero-bg');
            } else if (imagePreset === 'team_photo.png') {
                mediaImg.classList.add('team-photo-bg');
            }
        }
    } else {
        mediaBox.classList.add('hidden');
        mediaImg.style.backgroundImage = '';
    }
}

// --- Local File Upload Selection ---
function triggerFileUploadSelect() {
    document.getElementById('post-file-input').click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Create object URL for local preview
    const objectUrl = URL.createObjectURL(file);
    document.getElementById('post-image-url').value = objectUrl;

    showSelectedImage(objectUrl, file.name);
    updateLivePreview();
}

function showSelectedImage(fileUrl, filename) {
    const indicator = document.getElementById('selected-image-indicator');
    const thumb = document.getElementById('selected-image-thumb');
    const nameLabel = document.getElementById('selected-image-name');

    indicator.classList.remove('hidden');
    nameLabel.textContent = filename;

    // Set thumbnail background to local file url
    thumb.className = '';
    thumb.style.background = `url('${fileUrl}')`;
    thumb.style.backgroundSize = 'cover';
    thumb.style.backgroundPosition = 'center';
}

function removeSelectedImage(event) {
    if (event) event.stopPropagation();

    // Reset file input
    const fileInput = document.getElementById('post-file-input');
    if (fileInput) fileInput.value = '';

    document.getElementById('post-image-url').value = '';
    document.getElementById('selected-image-indicator').classList.add('hidden');
    updateLivePreview();
}

// --- Messenger CSKH Real-Time Simulator ---
function renderChatList() {
    const container = document.getElementById('chat-list-container');
    if (!container) return;

    const searchInput = document.getElementById('chat-search-input');
    const query = searchInput ? searchInput.value.toLowerCase() : '';

    const pageFilterElem = document.getElementById('chat-page-filter');
    const pageFilter = pageFilterElem ? pageFilterElem.value : 'all';

    const filteredChats = chats.filter(c => {
        const matchesQuery = c.name.toLowerCase().includes(query) || c.messages.some(m => m.text.toLowerCase().includes(query));
        const matchesPage = pageFilter === 'all' || c.pageName === pageFilter;
        return matchesQuery && matchesPage;
    });

    if (filteredChats.length === 0) {
        container.innerHTML = `
            <div style="padding: 24px 16px; text-align: center; color: var(--text-muted); font-size: 13px;">
                No messages found for the selected Fanpage.
            </div>
        `;
        return;
    }

    container.innerHTML = filteredChats.map(c => {
        const lastMsg = c.messages[c.messages.length - 1];
        const lastMsgText = lastMsg ? lastMsg.text : "";
        const isActive = c.id === activeChatId;
        const pageClass = c.pageName === 'Ezi Talent' ? 'badge-ezi-talent' : 'badge-ezi-academy';

        return `
            <div class="chat-item ${isActive ? 'active' : ''} ${c.unread > 0 ? 'unread' : ''}" onclick="selectChat('${c.id}')">
                <div class="chat-item-avatar">
                    ${c.avatar}
                    <span class="status-dot ${c.online ? 'online' : ''}"></span>
                </div>
                <div class="chat-item-details">
                    <div class="chat-item-header">
                        <span class="chat-item-name">${c.name}</span>
                        <span class="chat-item-time">${c.lastTime}</span>
                    </div>
                    <div class="chat-item-subline">
                        <span class="chat-page-tag ${pageClass}">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:3px;">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                            ${c.pageName || 'Ezi Talent'}
                        </span>
                    </div>
                    <div class="chat-item-body">
                        <span class="chat-item-message">${lastMsgText}</span>
                        ${c.unread > 0 && !isActive ? `<span class="chat-item-badge">${c.unread}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterChatList() {
    renderChatList();
}

function selectChat(chatId) {
    activeChatId = chatId;

    // Mark as read
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
        chat.unread = 0;
    }

    renderChatList();
    renderChatViewport();
}

function renderChatViewport() {
    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return;

    // Render active header
    document.getElementById('active-chat-avatar').textContent = chat.avatar;
    document.getElementById('active-chat-name').textContent = chat.name;

    // Update Active Fanpage Name
    const pageNameElem = document.getElementById('active-chat-page-name');
    if (pageNameElem) {
        pageNameElem.textContent = chat.pageName || 'Ezi Talent';
    }

    const statusDot = document.querySelector('.active-status .status-dot');
    if (chat.online) {
        if (statusDot) statusDot.classList.add('online');
        document.querySelector('.active-status').innerHTML = '<span class="status-dot online"></span>Active now';
    } else {
        if (statusDot) statusDot.classList.remove('online');
        document.querySelector('.active-status').innerHTML = '<span class="status-dot"></span>Offline';
    }

    // Render messages list
    const msgBox = document.getElementById('chat-messages-box');
    msgBox.innerHTML = chat.messages.map(m => `
        <div class="message-row ${m.sender === 'incoming' ? 'incoming' : 'outgoing'}">
            <div class="message-bubble">${m.text}</div>
            <div class="message-time">${m.time}</div>
        </div>
    `).join('');

    // Scroll to bottom
    setTimeout(() => {
        msgBox.scrollTop = msgBox.scrollHeight;
    }, 50);
}

function handleSendMessage(event) {
    event.preventDefault();
    const input = document.getElementById('chat-message-input');
    const text = input.value.trim();
    if (!text) return;

    // Clear input
    input.value = '';

    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Add agent message
    chat.messages.push({
        sender: "outgoing",
        text: text,
        time: timeStr
    });
    chat.lastTime = timeStr;

    // Render UI updates
    renderChatViewport();
    renderChatList();

    // Trigger simulation reply
    simulateIncomingReply(chat);
}

function simulateIncomingReply(chat) {
    // Show typing indicator
    const typingIndicator = document.getElementById('chat-typing-indicator');
    const typingAvatar = document.getElementById('typing-user-avatar');

    typingAvatar.textContent = chat.avatar;

    setTimeout(() => {
        // Show typing dot container
        if (activeChatId === chat.id) {
            typingIndicator.classList.remove('hidden');
            const msgBox = document.getElementById('chat-messages-box');
            msgBox.scrollTop = msgBox.scrollHeight;
        }
    }, 600);

    setTimeout(() => {
        // Hide typing indicator
        typingIndicator.classList.add('hidden');

        // Logic response generator
        let replyText = "Cảm ơn anh/chị tuyển dụng, em đã nhận được thông tin ạ. Em sẽ chuẩn bị CV gửi qua link sớm nhất.";
        const lastAgentMsg = chat.messages.filter(m => m.sender === 'outgoing').pop();

        if (lastAgentMsg) {
            const agentTxt = lastAgentMsg.text.toLowerCase();
            if (agentTxt.includes('lương') || agentTxt.includes('thu nhập') || agentTxt.includes('phúc lợi')) {
                replyText = "Dạ mức lương này hấp dẫn quá. Cho em hỏi thêm về lộ trình review lương định kỳ bên mình ạ?";
            } else if (agentTxt.includes('phỏng vấn') || agentTxt.includes('hẹn') || agentTxt.includes('lịch')) {
                replyText = "Dạ vâng, thứ 3 tuần tới lúc 10h sáng em rảnh ạ. Bên mình phỏng vấn trực tiếp hay online ạ?";
            } else if (agentTxt.includes('link') || agentTxt.includes('nộp cv') || agentTxt.includes('website')) {
                replyText = "Em vừa truy cập vào đường link rồi ạ. Em sẽ upload CV lên hệ thống Ezi Talent ngay đây.";
            }
        }

        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        // Add incoming response
        chat.messages.push({
            sender: "incoming",
            text: replyText,
            time: timeStr
        });
        chat.lastTime = timeStr;

        // Render UI updates
        if (activeChatId === chat.id) {
            renderChatViewport();
        } else {
            chat.unread += 1;
        }
        renderChatList();

        // Play notifications sound simulation
        showToast(`Message mới từ ${chat.name}`, replyText);

    }, 2200); // 2.2s total delay
}

// --- Mock Utilities Actions ---
function simulateAttachmentClick() {
    alert("Hệ thống mở Trình quản lý Tệp tin của Ezi Talent để bạn đính kèm CV, JD hoặc hình ảnh...");
}

function simulateSendJobTemplate() {
    const input = document.getElementById('chat-message-input');
    input.value = "Chào bạn! Đây là thông tin chi tiết vị trí React Native Developer: ezitalent.vn/jobs/react-native. Mức lương từ 20M - 35M cùng chế độ EziCare hấp dẫn.";
    input.focus();
}

function syncCandidateProfile() {
    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return;

    alert(`Đã trích xuất thông tin liên hệ và CV từ cuộc trò chuyện của ứng viên "${chat.name}" để lưu vào hệ thống Quản lý Ứng viên Ezi Talent.`);
    showToast("Đã đồng bộ ứng viên", `Hồ sơ ứng viên ${chat.name} đã được lưu thành công vào cơ sở dữ liệu.`);
}

function simulateAddFanpage() {
    const newPage = prompt("Nhập tên Fanpage Facebook muốn liên kết với hệ thống tuyển dụng Ezi Talent:", "Ezi Community");
    if (newPage) {
        alert(`Hệ thống đang mở popup OAuth Facebook... Đã ủy quyền thành công! Connected Fanpage "${newPage}" vào Ezi Talent.`);
        showToast("Liên kết Fanpage mới", `Đã liên kết thành công Fanpage "${newPage}" vào kênh tuyển dụng.`);
    }
}

// --- Custom Confirm Modal (thay cho window.confirm() để không bị đóng quá nhanh) ---
function showConfirmModal(message, onConfirm) {
    const overlay = document.getElementById('confirm-modal-overlay');
    const msgEl = document.getElementById('confirm-modal-message');
    const okBtn = document.getElementById('confirm-modal-ok-btn');
    const cancelBtn = document.getElementById('confirm-modal-cancel-btn');

    msgEl.textContent = message;
    overlay.classList.remove('hidden');

    // Gỡ listener cũ (nếu có) bằng cách thay node, tránh gọi callback trùng nhiều lần
    const newOkBtn = okBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);
    const newCancelBtn = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    function closeModal() {
        overlay.classList.add('hidden');
        overlay.removeEventListener('click', onOverlayClick);
    }

    function onOverlayClick(e) {
        if (e.target === overlay) closeModal();
    }

    newOkBtn.addEventListener('click', () => {
        closeModal();
        onConfirm();
    });
    newCancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', onOverlayClick);
}

// --- Notification Toast Popups ---
function showToast(title, desc) {
    const toast = document.getElementById('toast-notif');
    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-desc').textContent = desc;

    toast.classList.remove('hidden');

    // Auto hide after 5 seconds
    setTimeout(() => {
        closeToast();
    }, 5000);
}

function closeToast() {
    document.getElementById('toast-notif').classList.add('hidden');
}

function triggerNotificationAlert() {
    showToast("Ezi Talent Notification", "There are no new unread system notifications.");
}

// --- Dynamic Real-Time Simulator Trigger ---
// Triggers an incoming message simulation from "Lê Minh Công" after 12 seconds if not active
setTimeout(() => {
    const chat = chats.find(c => c.id === 'chat-cong');
    if (chat && activeChatId !== 'chat-cong') {
        const replyText = "Em vừa gửi CV qua link rồi ạ, shop check giúp em xem hệ thống nhận được chưa nha.";
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        chat.messages.push({
            sender: "incoming",
            text: replyText,
            time: timeStr
        });
        chat.lastTime = timeStr;
        chat.unread += 1;

        renderChatList();
        if (activeChatId === 'chat-cong') {
            renderChatViewport();
        }

        showToast(`Message mới từ ${chat.name}`, replyText);
    }
}, 12000);

// --- Ads Account Connection Simulation ---
let adAccounts = [
    { id: '1', name: 'Ezi Solution Ads', accountId: '678912345678901', logo: 'AD', bg: 'linear-gradient(135deg, #1877f2, #0d6efd)', role: 'Administrator', connected: true },
    { id: '2', name: 'Talent Acquisition Ads', accountId: '123456789012345', logo: 'TA', bg: 'linear-gradient(135deg, #f0703e, #f9a826)', role: 'Administrator', connected: true },
    { id: '3', name: 'HR Dept Campaigns', accountId: '987654321098765', logo: 'HR', bg: 'linear-gradient(135deg, #6b7280, #9ca3af)', role: 'Administrator', connected: false }
];

function renderAdsConnectionPanel() {
    const unconnected = document.getElementById('ads-unconnected-state');
    const connected = document.getElementById('ads-connected-state');
    const listContainer = document.getElementById('ads-connected-list-container');
    const header = document.getElementById('ads-connected-header');
    
    // Check if any accounts are connected
    const connectedAccounts = adAccounts.filter(acc => acc.connected);
    adsConnected = connectedAccounts.length > 0;
    
    if (adsConnected) {
        if (unconnected) unconnected.classList.add('hidden');
        if (connected) connected.classList.remove('hidden');
        if (header) header.classList.remove('hidden');
        
        if (listContainer) {
            listContainer.innerHTML = connectedAccounts.map(acc => `
                <div class="connected-user-badge"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background-color: var(--background); border: 1px solid var(--border); border-radius: var(--radius-md); margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="page-logo-circle"
                            style="background: ${acc.bg}; width: 48px; height: 48px; font-size: 16px; color: white;">
                            ${acc.logo}
                        </div>
                        <div>
                            <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main);">${acc.name}</h4>
                            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Status: Ads account linked</p>
                            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Role: ${acc.role} · ID: ${acc.accountId}</p>
                        </div>
                    </div>
                    <button class="btn btn-outline-danger" style="padding: 6px 12px; font-size: 12px;"
                        onclick="simulateAdsDisconnect('${acc.id}')">Disconnect</button>
                </div>
            `).join('');
        }
    } else {
        if (unconnected) unconnected.classList.remove('hidden');
        if (connected) connected.classList.add('hidden');
    }
}

function renderAdsSelectionModal() {
    const modalList = document.getElementById('ads-selection-modal-list');
    if (!modalList) return;
    
    modalList.innerHTML = adAccounts.map(acc => `
        <div style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div class="page-logo-circle"
                    style="background: ${acc.bg}; width: 40px; height: 40px; font-size: 14px; color: white;">
                    ${acc.logo}</div>
                <div>
                    <div class="page-name-text" style="font-weight: 600; display: inline-block;">${acc.name}</div>
                    <span class="page-id-text" style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">ID: ${acc.accountId}</span>
                </div>
            </div>
            ${acc.connected ? `
            <div>
                <span style="font-size: 13px; color: #10b981; font-weight: 600; display: flex; align-items: center; gap: 4px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Connected
                </span>
            </div>
            ` : `
            <label style="cursor: pointer;">
                <input type="checkbox" name="ad_account_select" value="${acc.id}" class="ad-account-checkbox"
                    style="width: 18px; height: 18px; cursor: pointer;">
            </label>
            `}
        </div>
    `).join('');
}

function simulateAdsOAuth() {
    showToast("Đang tải dữ liệu...", "Đang lấy danh sách tài khoản quảng cáo.");
    setTimeout(() => {
        renderAdsSelectionModal();
        document.getElementById('ads-selection-modal-overlay').classList.remove('hidden');
    }, 800);
}

function closeAdsSelectionModal() {
    document.getElementById('ads-selection-modal-overlay').classList.add('hidden');
}

function confirmAdsConnection() {
    const checkboxes = document.querySelectorAll('.ad-account-checkbox:checked');
    if (checkboxes.length === 0) {
        closeAdsSelectionModal();
        return;
    }
    
    closeAdsSelectionModal();
    showToast("Đang kết nối...", "Đang thiết lập ủy quyền tài khoản quảng cáo.");
    setTimeout(() => {
        checkboxes.forEach(cb => {
            const acc = adAccounts.find(a => a.id === cb.value);
            if (acc) acc.connected = true;
        });
        
        renderAdsConnectionPanel();
        showToast("Kết nối thành công!", "Ads account linked.");
    }, 1000);
}

function simulateAdsDisconnect(id) {
    showConfirmModal(
        "Bạn có chắc chắn muốn hủy liên kết tài khoản quảng cáo này không?",
        () => {
            const acc = adAccounts.find(a => a.id === id);
            if (acc) {
                acc.connected = false;
                renderAdsConnectionPanel();
                showToast("Đã hủy kết nối", "Ads Account đã được gỡ.");
            }
        }
    );
}

// --- Facebook Account Connection Simulation ---
function renderFacebookConnectionPanel() {
    const unconnected = document.getElementById('fb-unconnected-state');
    const connected = document.getElementById('fb-connected-state');
    const settingsFbCard = document.getElementById('settings-fb-pages-list');
    const settingsFbActions = document.getElementById('settings-fb-actions');
    const settingsFbStatus = document.getElementById('settings-fb-status-tag');

    if (facebookConnected) {
        if (unconnected) unconnected.classList.add('hidden');
        if (connected) connected.classList.remove('hidden');

        if (settingsFbCard) settingsFbCard.classList.remove('hidden');
        if (settingsFbActions) {
            settingsFbActions.innerHTML = `
                <button class="btn btn-outline-danger" onclick="simulateFacebookDisconnect()">Disconnect Facebook channel</button>
                <button class="btn btn-outline" onclick="simulateAddFanpage()">+ Add Linked Fanpage</button>
            `;
        }
        if (settingsFbStatus) {
            settingsFbStatus.className = 'connection-status-tag connected';
            settingsFbStatus.textContent = 'Connected';
        }
    } else {
        if (unconnected) unconnected.classList.remove('hidden');
        if (connected) connected.classList.add('hidden');

        if (settingsFbCard) settingsFbCard.classList.add('hidden');
        if (settingsFbActions) {
            settingsFbActions.innerHTML = `
                <button class="btn btn-primary" style="background-color: #1877f2; border-color: #1877f2;" onclick="switchTab('fb-connect')">
                    Connect Facebook Account ngay
                </button>
            `;
        }
        if (settingsFbStatus) {
            settingsFbStatus.className = 'connection-status-tag';
            settingsFbStatus.style.backgroundColor = '#edf2f7';
            settingsFbStatus.style.color = '#718096';
            settingsFbStatus.textContent = 'Not connected';
        }
    }
}

// Cấu hình OAuth Facebook
// LƯU Ý: FB_APP_ID cần được thay bằng App ID thực tế đăng ký trên Meta for Developers
// (developers.facebook.com) khi triển khai production. redirect_uri phải được khai báo
// hợp lệ trong cấu hình app Facebook đó thì luồng OAuth mới hoạt động thật sự.
const FB_APP_ID = 'YOUR_FACEBOOK_APP_ID';
const FB_OAUTH_SCOPES = 'pages_show_list,pages_messaging,pages_manage_posts,pages_read_engagement';

function simulateFacebookOAuth() {
    // Xoá bỏ query/hash cũ (nếu có) để redirect_uri sạch, tránh lặp state
    const redirectUri = window.location.origin + window.location.pathname;

    const oauthUrl = `https://www.facebook.com/v19.0/dialog/oauth`
        + `?client_id=${encodeURIComponent(FB_APP_ID)}`
        + `&redirect_uri=${encodeURIComponent(redirectUri)}`
        + `&scope=${encodeURIComponent(FB_OAUTH_SCOPES)}`
        + `&response_type=code`
        + `&state=ezitalent_fb_connect`;

    showToast("Đang chuyển hướng...", "Đang mở trang Facebook để xác thực và ủy quyền tài khoản Business.");

    // Điều hướng thật sang trang đăng nhập/ủy quyền của Facebook
    window.location.href = oauthUrl;
}

// Kiểm tra khi trang được tải lại sau khi Facebook redirect về (có ?code=... trên URL)
function handleFacebookOAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const errorParam = params.get('error');

    if (errorParam) {
        showToast("Kết nối thất bại", "Bạn đã huỷ hoặc từ chối cấp quyền trên Facebook.");
        // Dọn query string khỏi URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
    }

    if (code && state === 'ezitalent_fb_connect') {
        // Trong thực tế: gửi "code" này về backend để đổi lấy access_token,
        // sau đó gọi Graph API lấy danh sách Fanpage mà user quản lý.
        facebookConnected = true;
        renderFacebookConnectionPanel();
        showToast("Kết nối thành công!", "Đã liên kết tài khoản Facebook Business và đồng bộ các trang Fanpage.");

        // Dọn query string khỏi URL sau khi xử lý xong
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

function simulateFacebookDisconnect() {
    showConfirmModal(
        "Bạn có chắc chắn muốn hủy liên kết tài khoản Facebook Business không? Toàn bộ đồng bộ tin nhắn và bài viết sẽ bị tạm dừng và gỡ các Fanpage khỏi hệ thống.",
        () => {
            facebookConnected = false;
            renderFacebookConnectionPanel();
            showToast("Đã hủy kết nối", "Đã ngắt liên kết tài khoản Facebook Business và các trang Fanpage.");
        }
    );
}

function toggleFanpageSync(fanpageName, checkbox) {
    if (checkbox.checked) {
        showToast("Bật đồng bộ", `Đã bật đồng bộ tin nhắn và bài đăng cho Fanpage ${fanpageName}.`);
    } else {
        showToast("Tắt đồng bộ", `Đã tắt đồng bộ dữ liệu cho Fanpage ${fanpageName}.`);
    }
}

function toggleAdsSync(accountName, checkbox) {
    if (checkbox.checked) {
        showToast("Bật đồng bộ", `Đã bật đồng bộ dữ liệu cho tài khoản quảng cáo ${accountName}.`);
    } else {
        showToast("Tắt đồng bộ", `Đã tắt đồng bộ dữ liệu cho tài khoản quảng cáo ${accountName}.`);
    }
}

function simulateAddAdsAccount() {
    const newAccount = prompt("Nhập tên tài khoản quảng cáo muốn liên kết với hệ thống tuyển dụng Ezi Talent:", "Ezi Talent Ads");
    if (newAccount) {
        alert(`Hệ thống đang mở popup OAuth Facebook... Đã ủy quyền thành công! Connected tài khoản quảng cáo "${newAccount}" vào Ezi Talent.`);
        showToast("Liên kết tài khoản quảng cáo mới", `Đã liên kết thành công tài khoản quảng cáo "${newAccount}" vào kênh tuyển dụng.`);
    }
}

// --- Ads Campaign Management ---
let ads = [
    {
        id: "48293021948",
        name: "Marketing Lead Gen - Q2 2025",
        pageName: "Ezi Talent",
        objective: "engagement",
        objectiveLabel: "Engagement Video",
        destination: "message",
        budgetType: "daily",
        budget: 15000000,
        startDate: "2025-04-01",
        endDate: "2025-06-30",
        status: "running",
        spend: 8240500,
        reach: 240000,
        clicks: 6420,
        ctr: 2.67,
        impressions: 450000
    },
    {
        id: "48293021949",
        name: "Performance Retargeting - Local",
        pageName: "Ezi Talent",
        objective: "traffic",
        objectiveLabel: "Tăng lượt truy cập trang tuyển dụng",
        destination: "website",
        budgetType: "daily",
        budget: 5000000,
        startDate: "2025-05-15",
        endDate: "2025-07-15",
        status: "running",
        spend: 1200000,
        reach: 45200,
        clicks: 1120,
        ctr: 2.48,
        impressions: 125000
    },
    {
        id: "48293021950",
        name: "Brand Awareness - North",
        pageName: "Ezi Academy",
        objective: "reach",
        objectiveLabel: "Tăng lượt tiếp cận bài viết",
        destination: "website",
        budgetType: "lifetime",
        budget: 10000000,
        startDate: "2025-06-01",
        endDate: "2025-12-31",
        status: "paused",
        spend: 10000000,
        reach: 520000,
        clicks: 8540,
        ctr: 1.64,
        impressions: 1200000
    }
];

const AD_OBJECTIVE_LABELS = {
    reach: "Tăng lượt tiếp cận bài viết",
    engagement: "Engagement Video",
    messages: "Thu hút ứng viên nhắn tin qua Messenger",
    traffic: "Tăng lượt truy cập trang tuyển dụng"
};

const AD_DESTINATION_CTA = {
    website: "Tìm hiểu thêm",
    message: "Send message"
};

let adsCurrentPage = 1;
const ADS_PAGE_SIZE = 10;

function selectToggleOption(button, groupId) {
    const group = document.getElementById(groupId);
    group.querySelectorAll('.toggle-btn-option').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const hiddenInputId = groupId.replace('-group', '');
    const hiddenInput = document.getElementById(hiddenInputId);
    if (hiddenInput) hiddenInput.value = button.dataset.value;
}

function handleAdVideoUpload(event) {
    const file = event.target.files[0];
    const filenameEl = document.getElementById('ad-video-filename');
    if (file) {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        filenameEl.textContent = `${isImage ? '🖼️' : isVideo ? '🎬' : '📁'} ${file.name}`;
    } else {
        filenameEl.textContent = "Chọn hình ảnh hoặc video";
    }
    updateAdPreview();
}

function suggestAdContent() {
    showToast("Đang tạo gợi ý nội dung...", "Ezi Talent AI sẽ đề xuất nội dung quảng cáo phù hợp với tin tuyển dụng của bạn trong giây lát.");
}

function renderAdsPage() {
    document.getElementById('fb-create-ad-form').reset();
    resetAdForm();
}

function updateAdPreview() {
    const fanpage = document.getElementById('ad-fanpage') ? document.getElementById('ad-fanpage').value : 'Ezi Talent';
    const primaryText = document.getElementById('ad-primary-text') ? document.getElementById('ad-primary-text').value : '';
    const headline = document.getElementById('ad-headline') ? document.getElementById('ad-headline').value : '';
    const destination = document.getElementById('ad-destination') ? document.getElementById('ad-destination').value : 'message';
    const budgetType = document.getElementById('ad-budget-type') ? document.getElementById('ad-budget-type').value : 'daily';
    const budget = parseInt(document.getElementById('ad-budget') ? document.getElementById('ad-budget').value : 150000, 10) || 0;
    const startDate = document.getElementById('ad-start-date') ? document.getElementById('ad-start-date').value : '';
    const endDate = document.getElementById('ad-end-date') ? document.getElementById('ad-end-date').value : '';
    const radius = document.getElementById('ad-radius') ? document.getElementById('ad-radius').value : 40;

    const mediaInput = document.getElementById('ad-video-input');
    const mediaContainer = document.querySelector('.ad-preview-media');
    const mediaPlaceholder = document.getElementById('ad-preview-media-placeholder');

    document.getElementById('ad-preview-avatar').textContent = fanpage === 'Ezi Talent' ? 'ET' : 'EA';
    document.getElementById('ad-preview-page-name').textContent = fanpage;
    document.getElementById('ad-preview-content').textContent = primaryText || "Select information on the left to preview ad content...";
    document.getElementById('ad-preview-headline').textContent = headline || "Ad headline will appear here";
    document.getElementById('ad-preview-cta').textContent = AD_DESTINATION_CTA[destination] || "Tìm hiểu thêm";

    if (mediaInput && mediaInput.files && mediaInput.files.length > 0) {
        const file = mediaInput.files[0];
        const fileUrl = URL.createObjectURL(file);
        if (file.type.startsWith('image/')) {
            if (mediaContainer) mediaContainer.className = 'ad-preview-media has-image';
            if (mediaPlaceholder) {
                mediaPlaceholder.innerHTML = `<img src="${fileUrl}" style="width:100%; max-height:240px; object-fit:cover; display:block;" alt="Ad Media Preview">`;
            }
        } else if (file.type.startsWith('video/')) {
            if (mediaContainer) mediaContainer.className = 'ad-preview-media has-video';
            if (mediaPlaceholder) {
                mediaPlaceholder.innerHTML = `<video src="${fileUrl}" controls autoplay muted loop style="width:100%; max-height:240px; object-fit:cover; display:block;"></video>`;
            }
        }
    } else {
        if (mediaContainer) mediaContainer.className = 'ad-preview-media';
        if (mediaPlaceholder) {
            mediaPlaceholder.innerHTML = `
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
            `;
        }
    }

    if (document.getElementById('ad-radius-value')) {
        document.getElementById('ad-radius-value').textContent = `${radius} km`;
    }
    if (document.getElementById('ad-primary-text-count')) {
        document.getElementById('ad-primary-text-count').textContent = primaryText.length;
    }
    if (document.getElementById('ad-headline-count')) {
        document.getElementById('ad-headline-count').textContent = headline.length;
    }

    let days = 7;
    if (startDate && endDate) {
        const diff = Math.round((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
        if (diff > 0) days = diff;
    }
    const totalBudget = budgetType === 'lifetime' ? budget : budget * days;

    const dailyReachLow = Math.round((budget / 1000) * 10);
    const dailyReachHigh = Math.round((budget / 1000) * 28);

    const reachEl = document.getElementById('ad-estimate-reach');
    if (reachEl) {
        reachEl.textContent = `${dailyReachLow.toLocaleString('vi-VN')} - ${dailyReachHigh.toLocaleString('vi-VN')} người`;
    }
    const totalEl = document.getElementById('ad-estimate-total');
    if (totalEl) {
        totalEl.textContent = `${totalBudget.toLocaleString('vi-VN')} ₫`;
    }
}

function handleAdSubmit(event) {
    event.preventDefault();

    const editId = document.getElementById('edit-ad-id').value;
    const fanpage = document.getElementById('ad-fanpage').value;
    const name = document.getElementById('ad-name').value || "Chiến dịch chưa đặt tên";
    const objective = document.getElementById('ad-objective').value;
    const destination = document.getElementById('ad-destination').value;
    const budgetType = document.getElementById('ad-budget-type').value;
    const budget = parseInt(document.getElementById('ad-budget').value, 10) || 0;
    const startDate = document.getElementById('ad-start-date').value || new Date().toISOString().slice(0, 10);
    const endDate = document.getElementById('ad-end-date').value || startDate;

    if (editId) {
        const adIndex = ads.findIndex(a => a.id === editId);
        if (adIndex > -1) {
            ads[adIndex] = {
                ...ads[adIndex],
                name: name,
                pageName: fanpage,
                objective: objective,
                objectiveLabel: AD_OBJECTIVE_LABELS ? AD_OBJECTIVE_LABELS[objective] : objective,
                destination: destination,
                budgetType: budgetType,
                budget: budget,
                startDate: startDate,
                endDate: endDate
            };
            showToast("Đã cập nhật quảng cáo!", `Chiến dịch "${name}" đã được lưu thay đổi.`);
        }
    } else {
        const newAd = {
            id: `${Date.now()}`.slice(-11),
            name: name,
            pageName: fanpage,
            objective: objective,
            objectiveLabel: AD_OBJECTIVE_LABELS ? AD_OBJECTIVE_LABELS[objective] : objective,
            destination: destination,
            budgetType: budgetType,
            budget: budget,
            startDate: startDate,
            endDate: endDate,
            status: "running",
            spend: 0,
            reach: Math.round((budget / 1000) * 15),
            clicks: Math.round((budget / 1000) * 1.2),
            ctr: 2.5,
            impressions: Math.round((budget / 1000) * 40)
        };
        ads.unshift(newAd);
        showToast("Đã khởi chạy quảng cáo!", `Chiến dịch "${name}" đang chờ duyệt.`);
    }

    resetAdForm();
    switchTab('fb-ads-list');
}

function resetAdForm() {
    const form = document.getElementById('fb-create-ad-form');
    if (form) form.reset();
    if (document.getElementById('edit-ad-id')) {
        document.getElementById('edit-ad-id').value = '';
    }
    document.getElementById('ad-budget').value = 150000;
    document.getElementById('ad-video-filename').textContent = "Select video or image";
    
    // Đặt lại text UI về trạng thái Tạo mới
    const titleEl = document.getElementById('create-ad-title');
    if(titleEl) titleEl.textContent = "Create Facebook Ad";
    const subtitleEl = document.getElementById('create-ad-subtitle');
    if(subtitleEl) subtitleEl.textContent = "Run ads for recruitment posts to reach more potential candidates";
    const btnEl = document.getElementById('submit-ad-btn');
    if(btnEl) {
        btnEl.textContent = "🚀 Publish Ad";
        btnEl.style.display = 'inline-block';
    }
    setFormReadOnly('fb-create-ad-form', false);

    updateAdPreview();
}

// --- Ads Table (Ads List) ---
function renderAdsTable() {
    const tbody = document.getElementById('ads-table-body');
    const emptyState = document.getElementById('ads-empty-state');
    const wrap = document.querySelector('.ads-table-wrap');
    if (!tbody) return;

    if (ads.length === 0) {
        tbody.innerHTML = '';
        if (wrap) wrap.classList.add('hidden');
        emptyState.classList.remove('hidden');
        document.getElementById('ads-table-count').textContent = "Showing 0 of 0 campaigns";
        return;
    }
    if (wrap) wrap.classList.remove('hidden');
    emptyState.classList.add('hidden');

    const totalPages = Math.max(1, Math.ceil(ads.length / ADS_PAGE_SIZE));
    if (adsCurrentPage > totalPages) adsCurrentPage = totalPages;
    const startIdx = (adsCurrentPage - 1) * ADS_PAGE_SIZE;
    const pageAds = ads.slice(startIdx, startIdx + ADS_PAGE_SIZE);

    tbody.innerHTML = pageAds.map(ad => `
        <tr>
            <td><input type="checkbox" class="ads-row-checkbox" onclick="event.stopPropagation()"></td>
            <td>
                <label class="switch-toggle" onclick="event.stopPropagation()">
                    <input type="checkbox" ${ad.status === 'running' ? 'checked' : ''} onchange="toggleCampaignStatus('${ad.id}', this)">
                    <span class="toggle-slider"></span>
                </label>
            </td>
            <td>
                <div class="ads-table-campaign-name">${ad.name}</div>
                <div class="ads-table-campaign-id">ID: ${ad.id}</div>
            </td>
            <td>${formatAdDate(ad.startDate)}</td>
            <td>${formatAdDate(ad.endDate)}</td>
            <td>${ad.budget.toLocaleString('vi-VN')}</td>
            <td>${ad.spend.toLocaleString('vi-VN')}</td>
            <td>${ad.reach.toLocaleString('vi-VN')}</td>
            <td>${ad.clicks.toLocaleString('vi-VN')}</td>
            <td>${ad.ctr.toFixed(2)}%</td>
            <td>${ad.impressions.toLocaleString('vi-VN')}</td>
            <td>
                <button class="btn btn-outline" style="padding: 4px 8px; font-size: 12px;" onclick="editAd('${ad.id}')">View</button>
            </td>
        </tr>
    `).join('');

    document.getElementById('ads-table-count').textContent =
        `Showing ${pageAds.length} of ${ads.length} campaigns`;
    document.getElementById('ads-page-current').textContent = adsCurrentPage;
    document.getElementById('ads-page-prev').disabled = adsCurrentPage <= 1;
    document.getElementById('ads-page-next').disabled = adsCurrentPage >= totalPages;
}

function editAd(id) {
    const ad = ads.find(a => a.id === id);
    if (!ad) return;

    // Set fields
    document.getElementById('edit-ad-id').value = ad.id;
    document.getElementById('ad-name').value = ad.name;
    document.getElementById('ad-fanpage').value = ad.pageName;
    document.getElementById('ad-objective').value = ad.objective || 'engagement';
    
    // Toggles
    const budgetBtns = document.querySelectorAll('#ad-budget-type-group .toggle-btn-option');
    budgetBtns.forEach(btn => btn.classList.remove('active'));
    const matchedBudgetBtn = Array.from(budgetBtns).find(btn => btn.dataset.value === (ad.budgetType || 'daily'));
    if (matchedBudgetBtn) matchedBudgetBtn.classList.add('active');
    document.getElementById('ad-budget-type').value = ad.budgetType || 'daily';

    const destBtns = document.querySelectorAll('#ad-destination-group .toggle-btn-option');
    destBtns.forEach(btn => btn.classList.remove('active'));
    const matchedDestBtn = Array.from(destBtns).find(btn => btn.dataset.value === (ad.destination || 'message'));
    if (matchedDestBtn) matchedDestBtn.classList.add('active');
    document.getElementById('ad-destination').value = ad.destination || 'message';

    document.getElementById('ad-budget').value = ad.budget;
    document.getElementById('ad-start-date').value = ad.startDate || '';
    document.getElementById('ad-end-date').value = ad.endDate || '';

    // Update UI headers
    const titleEl = document.getElementById('create-ad-title');
    if(titleEl) titleEl.textContent = "View Facebook Ad";
    const subtitleEl = document.getElementById('create-ad-subtitle');
    if(subtitleEl) subtitleEl.textContent = "View campaign information";
    const btnEl = document.getElementById('submit-ad-btn');
    if(btnEl) btnEl.style.display = 'none';
    setFormReadOnly('fb-create-ad-form', true);

    updateAdPreview();
    switchTab('fb-ads-create');
}

function deleteAd(id) {
    showConfirmModal(
        "Bạn có chắc chắn muốn xóa chiến dịch quảng cáo này? Hành động này không thể hoàn tác.",
        () => {
            ads = ads.filter(a => a.id !== id);
            renderAdsTable();
            showToast("Đã xóa chiến dịch", "Hệ thống đã gỡ chiến dịch quảng cáo thành công.");
        }
    );
}

function viewCampaignDetails(id) {
    const ad = ads.find(a => a.id === id);
    if (!ad) return;

    document.getElementById('campaign-details-subtitle').textContent = `ID: ${ad.id}`;
    document.getElementById('campaign-details-name').value = ad.name;
    document.getElementById('campaign-details-objective').value = ad.objectiveLabel || ad.objective || '--';
    document.getElementById('campaign-details-destination').value = ad.destination || '--';
    document.getElementById('campaign-details-budget').value = ad.budget.toLocaleString('vi-VN');
    document.getElementById('campaign-details-page').value = ad.pageName || '--';
    
    document.getElementById('campaign-details-ad-account').value = ad.adAccount || 'Ezi Solution Ads';
    document.getElementById('campaign-details-budget-type').value = ad.budgetType === 'lifetime' ? 'Lifetime Budget' : 'Daily Budget';
    
    // Convert DD/MM/YYYY to YYYY-MM-DD for date inputs if necessary
    const parseDate = (dStr) => {
        if (!dStr) return '';
        if (dStr.includes('-')) return dStr; // already YYYY-MM-DD
        const parts = dStr.split('/');
        if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
        return dStr;
    };
    
    const startDate = parseDate(ad.startDate);
    const endDate = parseDate(ad.endDate);
    
    const formatDateObj = (dStr) => {
        if (!dStr) return '--';
        const parts = dStr.split('-');
        if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
        return dStr;
    };
    
    document.getElementById('campaign-details-time').value = `${formatDateObj(startDate)} - ${formatDateObj(endDate)}`;
    
    document.getElementById('campaign-details-age').value = ad.ageRange || '18 - 45';
    document.getElementById('campaign-details-gender').value = ad.gender || 'All';
    document.getElementById('campaign-details-location').value = ad.location || 'Hà Nội, TP. Hồ Chí Minh';
    document.getElementById('campaign-details-radius').value = ad.radius ? `${ad.radius} km` : '40 km';
    
    document.getElementById('campaign-details-headline').value = ad.headline || 'Tuyển dụng nhân sự tài năng - Thu nhập hấp dẫn';
    document.getElementById('campaign-details-text').value = ad.primaryText || 'Tham gia cùng Ezi Talent để phát triển sự nghiệp của bạn!\nMôi trường làm việc chuyên nghiệp, cơ hội thăng tiến cao.\nỨng tuyển ngay hôm nay!';
    
    document.getElementById('campaign-details-spend').textContent = ad.spend.toLocaleString('vi-VN') + ' đ';
    document.getElementById('campaign-details-reach').textContent = ad.reach.toLocaleString('vi-VN');
    document.getElementById('campaign-details-clicks').textContent = ad.clicks.toLocaleString('vi-VN');
    
    document.getElementById('campaign-details-modal').classList.remove('hidden');
}

function closeCampaignDetailsModal() {
    document.getElementById('campaign-details-modal').classList.add('hidden');
}

function formatAdDate(dateStr) {
    if (!dateStr) return '-';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function changeAdsPage(delta) {
    const totalPages = Math.max(1, Math.ceil(ads.length / ADS_PAGE_SIZE));
    const newPage = adsCurrentPage + delta;
    if (newPage < 1 || newPage > totalPages) return;
    adsCurrentPage = newPage;
    renderAdsTable();
}

function toggleSelectAllAds(checkbox) {
    document.querySelectorAll('.ads-row-checkbox').forEach(cb => {
        cb.checked = checkbox.checked;
    });
}

// --- Initialization ---
window.onload = function () {
    renderFacebookConnectionPanel();
    renderAdsConnectionPanel();
    // Nếu URL có ?code=... (vừa được Facebook redirect về sau khi ủy quyền), xử lý kết nối
    handleFacebookOAuthCallback();
    // Default open Post Management page
    switchTab('fb-posts');
};


function toggleCampaignStatus(id, checkbox) {
    const ad = ads.find(a => a.id === id);
    if (!ad) return;

    const isTurningOn = checkbox.checked;
    
    // Revert visual state immediately
    checkbox.checked = !isTurningOn;

    showConfirmModal(
        `Are you sure you want to turn ${isTurningOn ? 'on' : 'off'} the campaign "${ad.name}"?`,
        () => {
            checkbox.checked = isTurningOn;
            ad.status = isTurningOn ? 'running' : 'paused';
            showToast("Status Updated", `Campaign "${ad.name}" has been turned ${isTurningOn ? 'on' : 'off'}.`);
        }
    );
}

// Danh sách tài khoản quảng cáo (Ads Account) để liên kết với Pixel
const adsAccountList = [
    { id: "act_1001", name: "Tài khoản QC Công ty ABC - Main", currency: "VND" },
    { id: "act_1002", name: "Tài khoản QC ABC Shop", currency: "VND" },
    { id: "act_1003", name: "Tài khoản QC XYZ Store", currency: "VND" },
    { id: "act_1004", name: "Tài khoản QC Fashion House", currency: "VND" },
    { id: "act_1005", name: "Tài khoản QC Beauty Brand", currency: "VND" },
    { id: "act_1006", name: "Tài khoản QC Ezi Talent", currency: "VND" },
];

let pixels = [
    {
        id: "pix-1",
        name: "BM Main Pixel",
        pixelId: "1234567890123456",
        type: "BM",
        accountType: "business",
        owner: "Tài khoản QC Công ty ABC - Main",

        status: "Hoạt động",
        lastActive: "2 phút trước",
        events24h: 1840,
        emq: "8.8 / 10",
        token: "EAABw123456bm_main",
        events: [
            { name: "PageView", url: "https://ezitalent.vn/tuyen-dung", time: "2 phút trước", status: "Hoạt động (200 OK)" },
            { name: "Lead", url: "https://ezitalent.vn/jobs/react-native", time: "14 phút trước", status: "Hoạt động (200 OK)" },
            { name: "ViewContent", url: "https://ezitalent.vn/jobs/uiux-designer", time: "28 phút trước", status: "Hoạt động (200 OK)" },
            { name: "CompleteRegistration", url: "https://ezitalent.vn/register", time: "45 phút trước", status: "Hoạt động (200 OK)" },
            { name: "PageView", url: "https://ezitalent.vn/bang-gia", time: "1 giờ trước", status: "Hoạt động (200 OK)" }
        ]
    },
    {
        id: "pix-2",
        name: "Pixel Page - Easy Auto",
        pixelId: "2234567890123456",
        type: "Page",
        accountType: "personal",
        owner: "Tài khoản QC ABC Shop",
        status: "Hoạt động",
        lastActive: "5 phút trước",
        events24h: 920,
        emq: "8.4 / 10",
        token: "EAABw223456page_easy",
        events: [
            { name: "PageView", url: "https://easyauto.vn/", time: "5 phút trước", status: "Hoạt động (200 OK)" },
            { name: "Contact", url: "https://easyauto.vn/lien-he", time: "18 phút trước", status: "Hoạt động (200 OK)" },
            { name: "ViewContent", url: "https://easyauto.vn/xe-ban", time: "35 phút trước", status: "Hoạt động (200 OK)" }
        ]
    },
    {
        id: "pix-3",
        name: "BM Pixel - ABC Shop",
        pixelId: "3234567890123456",
        type: "BM",
        accountType: "business",
        owner: "Tài khoản QC ABC Shop",
        status: "Hoạt động",
        lastActive: "10 phút trước",
        events24h: 650,
        emq: "8.1 / 10",
        token: "",
        events: [
            { name: "PageView", url: "https://abcshop.com/", time: "10 phút trước", status: "Hoạt động (200 OK)" },
            { name: "AddToCart", url: "https://abcshop.com/san-pham/1", time: "42 phút trước", status: "Hoạt động (200 OK)" }
        ]
    },
    {
        id: "pix-4",
        name: "BM Pixel - XYZ Store",
        pixelId: "4234567890123456",
        type: "BM",
        accountType: "business",
        owner: "Tài khoản QC XYZ Store",
        status: "Lỗi",
        lastActive: "1 ngày trước",
        events24h: 12,
        emq: "4.2 / 10",
        token: "",
        events: [
            { name: "PageView", url: "https://xyzstore.vn/checkout", time: "1 ngày trước", status: "Lỗi: Miền chưa được xác minh" }
        ]
    },
    {
        id: "pix-5",
        name: "BM Pixel - Fashion",
        pixelId: "5234567890123456",
        type: "BM",
        accountType: "business",
        owner: "Tài khoản QC Fashion House",
        status: "Hoạt động",
        lastActive: "15 phút trước",
        events24h: 1230,
        emq: "8.9 / 10",
        token: "EAABw553456page_fashion",
        events: [
            { name: "PageView", url: "https://fashionhouse.vn/summer", time: "15 phút trước", status: "Hoạt động (200 OK)" },
            { name: "Lead", url: "https://fashionhouse.vn/ung-tuyen", time: "22 phút trước", status: "Hoạt động (200 OK)" }
        ]
    },
    {
        id: "pix-6",
        name: "BM Backup Pixel",
        pixelId: "6234567890123456",
        type: "BM",
        accountType: "business",
        owner: "Tài khoản QC Ezi Talent",
        status: "Hoạt động",
        lastActive: "30 phút trước",
        events24h: 420,
        emq: "8.5 / 10",
        token: "EAABw663456bm_backup",
        events: [
            { name: "PageView", url: "https://ezitalent.vn/backup-landing", time: "30 phút trước", status: "Hoạt động (200 OK)" }
        ]
    },
    {
        id: "pix-7",
        name: "BM Pixel - Beauty",
        pixelId: "7234567890123456",
        type: "BM",
        accountType: "business",
        owner: "Tài khoản QC Beauty Brand",
        status: "Không hoạt động",
        lastActive: "3 ngày trước",
        events24h: 0,
        emq: "0 / 10",
        token: "",
        events: []
    }
];

let activeDetailPixelId = null;
let activeMenuPixelId = null;

// Render Bảng Pixel (chỉ Doanh nghiệp BM)
function updatePixelStats() {
    // No segment badges needed anymore
}

// Render Bảng Pixel
function renderPixelTable() {
    updatePixelStats();

    const tbody = document.getElementById('pixel-table-body');
    const emptyState = document.getElementById('pixel-empty-state');
    const countEl = document.getElementById('pixel-table-count');
    if (!tbody) return;

    const searchQuery = (document.getElementById('pixel-search-input')?.value || '').trim().toLowerCase();
    const statusFilter = document.getElementById('pixel-status-filter')?.value || 'all';

    const filtered = pixels.filter(p => {
        // Filter by Status
        if (statusFilter !== 'all' && p.status !== statusFilter) {
            return false;
        }

        // Search by name, pixelId, owner
        if (searchQuery) {
            const matchName = p.name.toLowerCase().includes(searchQuery);
            const matchId = p.pixelId.toLowerCase().includes(searchQuery);
            const matchOwner = p.owner.toLowerCase().includes(searchQuery);
            if (!matchName && !matchId && !matchOwner) return false;
        }

        return true;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        if (countEl) countEl.textContent = 'Không tìm thấy Pixel nào';
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (countEl) countEl.textContent = `Đang hiển thị ${filtered.length} của ${pixels.length} Pixel`;

    tbody.innerHTML = filtered.map(p => {
        // Type Badge Class
        const typeBadgeClass = p.type === 'BM' ? 'pixel-badge-bm' : 'pixel-badge-page';
        
        // Status Badge Class
        let statusBadgeClass = 'pixel-status-active';
        if (p.status === 'Lỗi') statusBadgeClass = 'pixel-status-error';
        else if (p.status === 'Không hoạt động') statusBadgeClass = 'pixel-status-inactive';

        return `
            <tr>
                <td>
                    <div class="pixel-name-cell">
                        <div class="pixel-code-icon" title="Meta Pixel">&lt;/&gt;</div>
                        <div class="pixel-name-title">${p.name}</div>
                    </div>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="pixel-id-text">${p.pixelId}</span>
                        <button class="pixel-copy-btn" onclick="copyPixelId('${p.pixelId}')" title="Sao chép ID Pixel">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
                </td>
                <td>
                    <span class="pixel-type-badge ${typeBadgeClass}">${p.type}</span>
                </td>
                <td>
                    <span style="color: var(--text-main); font-weight: 500;">${p.owner}</span>
                </td>
                <td>
                    <span class="pixel-status-badge ${statusBadgeClass}">${p.status}</span>
                </td>
                <td>
                    <span style="color: var(--text-muted); font-size: 13px;">${p.lastActive}</span>
                </td>
                <td>
                    <div class="pixel-action-cell">
                        <button class="pixel-btn-icon" title="Xem chi tiết & Logs sự kiện" onclick="openPixelDetailsModal('${p.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="pixel-btn-icon" title="Tùy chọn khác" onclick="openPixelActionMenu('${p.id}', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="19" cy="12" r="1"></circle>
                                <circle cx="5" cy="12" r="1"></circle>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Refresh Pixel Data
function refreshPixelData() {
    showToast("Đang đồng bộ Pixel...", "Hệ thống đang kiểm tra trạng thái kết nối và sự kiện từ Meta Graph API.");
    setTimeout(() => {
        renderPixelTable();
        showToast("Đồng bộ hoàn tất", "Dữ liệu Pixel và sự kiện chuyển đổi đã được cập nhật mới nhất.");
    }, 600);
}

function changePixelPage(delta) {
    showToast("Phân trang", "Hiện tại đang ở trang 1.");
}

// Sao chép ID Pixel
function copyPixelId(pixelId) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(pixelId).then(() => {
            showToast("Đã sao chép ID", `ID Pixel: ${pixelId} đã được lưu vào clipboard.`);
        });
    } else {
        showToast("Đã sao chép ID", `ID Pixel: ${pixelId}`);
    }
}

// Mở menu tùy chọn `...`
function openPixelActionMenu(id, event) {
    event.stopPropagation();
    activeMenuPixelId = id;
    const menu = document.getElementById('pixel-action-menu');
    if (!menu) return;

    const rect = event.currentTarget.getBoundingClientRect();
    menu.style.top = `${rect.bottom + 6}px`;
    menu.style.left = `${Math.min(window.innerWidth - 220, rect.left - 150)}px`;
    menu.classList.remove('hidden');
}

function closePixelActionMenu() {
    const menu = document.getElementById('pixel-action-menu');
    if (menu) menu.classList.add('hidden');
}

// Xử lý các action trong dropdown menu
function handleMenuAction(action) {
    const p = pixels.find(item => item.id === activeMenuPixelId);
    closePixelActionMenu();
    if (!p) return;

    if (action === 'details') {
        openPixelDetailsModal(p.id);
    } else if (action === 'test') {
        triggerTestPixelEvent(p.id);
    } else if (action === 'copy') {
        copyPixelId(p.pixelId);
    } else if (action === 'edit') {
        openEditPixelModal(p.id);
    } else if (action === 'delete') {
        deletePixel(p.id);
    }
}

// Đóng menu khi click ngoài
window.addEventListener('click', function (e) {
    const menu = document.getElementById('pixel-action-menu');
    if (menu && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }
});

// --- MODAL THÊM / SỬA PIXEL ---
function openAddPixelModal() {
    document.getElementById('pixel-modal-title').textContent = "Thêm Pixel Doanh nghiệp (BM)";
    document.getElementById('pixel-form-submit-btn').textContent = "Tạo Pixel";
    document.getElementById('pixel-form-id').value = "";
    document.getElementById('pixel-form-name').value = "";
    document.getElementById('pixel-form-pixel-id').value = "";
    document.getElementById('pixel-form-owner').value = "";
    document.getElementById('pixel-form-status').value = "Hoạt động";
    document.getElementById('pixel-form-token').value = "";
    
    // Hide ID field because Facebook automatically generates and assigns it
    const idGroup = document.getElementById('pixel-edit-id-group');
    if (idGroup) idGroup.classList.add('hidden');

    document.getElementById('pixel-form-modal').classList.remove('hidden');
}

function openEditPixelModal(id) {
    const p = pixels.find(item => item.id === id);
    if (!p) return;

    document.getElementById('pixel-modal-title').textContent = "Chỉnh sửa Pixel";
    document.getElementById('pixel-form-submit-btn').textContent = "Cập nhật";
    document.getElementById('pixel-form-id').value = p.id;
    document.getElementById('pixel-form-name').value = p.name;
    document.getElementById('pixel-form-pixel-id').value = p.pixelId;
    document.getElementById('pixel-form-owner').value = p.owner;
    document.getElementById('pixel-form-status').value = p.status;
    document.getElementById('pixel-form-token').value = p.token || "";
    
    // Show ID field as readonly info when editing
    const idGroup = document.getElementById('pixel-edit-id-group');
    if (idGroup) idGroup.classList.remove('hidden');

    document.getElementById('pixel-form-modal').classList.remove('hidden');
}

function closePixelFormModal() {
    document.getElementById('pixel-form-modal').classList.add('hidden');
}

function savePixelForm(e) {
    e.preventDefault();
    const editId = document.getElementById('pixel-form-id').value;
    const name = document.getElementById('pixel-form-name').value.trim();
    const owner = document.getElementById('pixel-form-owner').value.trim();
    const status = document.getElementById('pixel-form-status').value;
    const token = document.getElementById('pixel-form-token').value.trim();

    if (editId) {
        // Edit existing
        const p = pixels.find(item => item.id === editId);
        if (p) {
            p.name = name;
            p.owner = owner;
            p.status = status;
            p.token = token;
            showToast("Cập nhật thành công", `Pixel "${name}" đã được lưu thay đổi.`);
        }
    } else {
        // Create new: Tự động là Pixel Doanh nghiệp (BM) và Facebook cấp ID 16 số
        const generatedPixelId = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString().substring(0, 16);
        
        const newPixel = {
            id: `pix-${Date.now()}`,
            name: name,
            pixelId: generatedPixelId,
            type: 'BM',
            accountType: 'business',
            owner: owner,
            status: status,
            lastActive: "Vừa xong",
            events24h: 1,
            emq: "8.0 / 10",
            token: token,
            events: [
                { name: "PageView", url: "https://ezitalent.vn/", time: "Vừa xong", status: "Hoạt động (200 OK)" }
            ]
        };
        pixels.unshift(newPixel);
        showToast("Tạo Pixel thành công 🎉", `Meta Pixel "${name}" đã được tạo (ID Facebook cấp: ${generatedPixelId}).`);
    }

    closePixelFormModal();
    renderPixelTable();
}

function deletePixel(id) {
    const p = pixels.find(item => item.id === id);
    if (!p) return;

    showConfirmModal(
        `Bạn có chắc chắn muốn xóa Pixel "${p.name}" (ID: ${p.pixelId}) khỏi hệ thống?`,
        () => {
            pixels = pixels.filter(item => item.id !== id);
            renderPixelTable();
            showToast("Đã xóa Pixel", `Pixel "${p.name}" đã được gỡ khỏi danh sách.`);
        }
    );
}

// --- MODAL CHI TIẾT PIXEL & REAL-TIME EVENT STREAM ---
function openPixelDetailsModal(id) {
    const p = pixels.find(item => item.id === id);
    if (!p) return;

    activeDetailPixelId = id;

    // Header info
    document.getElementById('pixel-detail-title').textContent = p.name;
    document.getElementById('pixel-detail-id').textContent = p.pixelId;
    document.getElementById('pixel-detail-owner').textContent = p.owner;
    document.getElementById('pixel-detail-events-count').textContent = (p.events24h || 0).toLocaleString();
    document.getElementById('pixel-detail-emq').textContent = p.emq || '8.5 / 10';
    document.getElementById('pixel-detail-last-active').textContent = p.lastActive;

    // Badges in Header
    const typeBadgeClass = p.type === 'BM' ? 'pixel-badge-bm' : 'pixel-badge-page';
    document.getElementById('pixel-detail-type-badge').innerHTML = `<span class="pixel-type-badge ${typeBadgeClass}">${p.type}</span>`;
    
    let statusBadgeClass = 'pixel-status-active';
    if (p.status === 'Lỗi') statusBadgeClass = 'pixel-status-error';
    else if (p.status === 'Không hoạt động') statusBadgeClass = 'pixel-status-inactive';
    document.getElementById('pixel-detail-status-badge').innerHTML = `<span class="pixel-status-badge ${statusBadgeClass}">${p.status}</span>`;

    // Render Real-time events
    renderPixelEventsList(p);

    // Render Base Code
    const baseCode = `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${p.pixelId}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${p.pixelId}&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`;
    document.getElementById('pixel-base-code-snippet').textContent = baseCode;

    // Default tab
    switchPixelModalTab('events');

    document.getElementById('pixel-details-modal').classList.remove('hidden');
}

function closePixelDetailsModal() {
    document.getElementById('pixel-details-modal').classList.add('hidden');
}

function switchPixelModalTab(tab) {
    const btnEvents = document.getElementById('tab-btn-events');
    const btnCode = document.getElementById('tab-btn-code');
    const viewEvents = document.getElementById('pixel-modal-events-view');
    const viewCode = document.getElementById('pixel-modal-code-view');

    if (tab === 'events') {
        btnEvents.classList.add('active');
        btnCode.classList.remove('active');
        viewEvents.classList.remove('hidden');
        viewCode.classList.add('hidden');
    } else {
        btnCode.classList.add('active');
        btnEvents.classList.remove('active');
        viewCode.classList.remove('hidden');
        viewEvents.classList.add('hidden');
    }
}

function renderPixelEventsList(p) {
    const listContainer = document.getElementById('pixel-detail-events-list');
    if (!listContainer) return;

    if (!p.events || p.events.length === 0) {
        listContainer.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 20px; color: var(--text-muted);">Chưa ghi nhận sự kiện nào gần đây. Hãy gửi sự kiện Test để kiểm tra.</td></tr>`;
        return;
    }

    listContainer.innerHTML = p.events.map(ev => `
        <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 10px 12px; font-weight: 600; color: var(--primary);">
                <span style="display: inline-flex; align-items: center; gap: 6px;">
                    <span style="width: 6px; height: 6px; border-radius: 50%; background: #16a34a;"></span>
                    ${ev.name}
                </span>
            </td>
            <td style="padding: 10px 12px; font-family: monospace; color: var(--text-muted);">${ev.url}</td>
            <td style="padding: 10px 12px; color: var(--text-muted);">${ev.time}</td>
            <td style="padding: 10px 12px; text-align: right; color: ${ev.status.includes('Lỗi') ? 'var(--danger)' : '#16a34a'}; font-weight: 600;">${ev.status}</td>
        </tr>
    `).join('');
}

// Bắn sự kiện Test từ modal
function triggerTestCurrentPixelEvent() {
    if (!activeDetailPixelId) return;
    triggerTestPixelEvent(activeDetailPixelId);
}

function triggerTestPixelEvent(id) {
    const p = pixels.find(item => item.id === id);
    if (!p) return;

    const sampleEvents = ["PageView", "Lead", "CompleteRegistration", "Contact", "SubmitApplication"];
    const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];

    const newEvent = {
        name: randomEvent,
        url: "https://ezitalent.vn/jobs/apply-test",
        time: "Vừa xong",
        status: "Hoạt động (200 OK)"
    };

    if (!p.events) p.events = [];
    p.events.unshift(newEvent);
    p.lastActive = "Vừa xong";
    p.events24h = (p.events24h || 0) + 1;
    if (p.status === 'Không hoạt động') p.status = 'Hoạt động';

    showToast("Đã nhận sự kiện Test 🎉", `Meta Pixel ${p.name} (ID: ${p.pixelId}) vừa bắn thành công sự kiện "${randomEvent}".`);

    // Update table & detail view if open
    renderPixelTable();
    if (activeDetailPixelId === id) {
        document.getElementById('pixel-detail-events-count').textContent = p.events24h.toLocaleString();
        document.getElementById('pixel-detail-last-active').textContent = "Vừa xong";
        renderPixelEventsList(p);
    }
}

function copyCurrentDetailPixelId() {
    const p = pixels.find(item => item.id === activeDetailPixelId);
    if (p) copyPixelId(p.pixelId);
}

function copyPixelBaseCode() {
    const code = document.getElementById('pixel-base-code-snippet')?.textContent;
    if (code && navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
            showToast("Đã sao chép Base Code", "Đoạn mã Pixel đã sẵn sàng để dán vào thẻ <head> website.");
        });
    } else {
        showToast("Đã sao chép", "Đoạn mã Pixel đã được sao chép.");
    }
}

