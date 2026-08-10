// app.js - Ezi Talent Facebook Integration Logic

// --- Global State ---
let facebookConnected = true; // Default to connected to show high-fidelity page items

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
            { sender: "outgoing", text: "Chào bạn, cảm ơn bạn đã quan tâm! Vị trí vẫn còn, bạn có thể ứng tuyển ngay trên trang web của chúng mình nhé.", time: "03:01" },
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
    const activeSection = document.getElementById(`section-${tabId}`);
    if (activeSection) {
        activeSection.classList.remove('hidden');
    }

    // Manage active classes on Sidebar items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (tabId !== 'fb-ads-create' && tabId !== 'fb-ads-list') {
            item.classList.remove('dropdown-active');
        }
    });
    document.querySelectorAll('.submenu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Specific sidebar item activation logic
    if (tabId === 'fb-connect') {
        document.getElementById('menu-fb-connect').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Kết nối tài khoản Facebook";
        renderFacebookConnectionPanel();
    } else if (tabId === 'fb-posts') {
        document.getElementById('menu-fb-posts').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Quản lý bài viết Facebook Fanpage";
        renderPosts();
    } else if (tabId === 'fb-create') {
        document.getElementById('menu-fb-create').classList.add('active');
        const editId = document.getElementById('edit-post-id').value;
        document.getElementById('breadcrumb-title').textContent = editId ? "Chỉnh sửa bài viết Facebook" : "Tạo bài viết mới";
        updateLivePreview();
    } else if (tabId === 'fb-chat') {
        document.getElementById('menu-fb-chat').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Inbox tuyển dụng Facebook Messenger";
        renderChatList();
        renderChatViewport();
    } else if (tabId === 'fb-ads-create') {
        document.getElementById('menu-fb-ads').classList.add('dropdown-active');
        document.getElementById('menu-fb-ads-create').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Tạo quảng cáo Facebook";
        renderAdsPage();
    } else if (tabId === 'fb-ads-list') {
        document.getElementById('menu-fb-ads').classList.add('dropdown-active');
        document.getElementById('menu-fb-ads-list').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Danh sách quảng cáo Facebook";
        renderAdsTable();
    } else if (tabId === 'settings') {
        document.getElementById('menu-settings').classList.add('active');
        document.getElementById('breadcrumb-title').textContent = "Cài đặt cấu hình";
    }
}

// --- Sidebar Dropdown Toggle (Quản lý quảng cáo Facebook) ---
function toggleAdsDropdown() {
    const menuItem = document.getElementById('menu-fb-ads');
    const isActive = menuItem.classList.contains('dropdown-active');
    if (isActive) {
        menuItem.classList.remove('dropdown-active');
    } else {
        // Mở dropdown và điều hướng luôn tới trang Tạo quảng cáo nếu chưa ở trong nhóm này
        switchTab('fb-ads-create');
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
                        <span>${post.comments} bình luận</span>
                        <span>·</span>
                        <span>${post.shares} lượt chia sẻ</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="openCommentsModal('${post.id}')">
                        💬 Quản lý bình luận (${(comments[post.id] || []).length})
                    </button>
                    <button class="btn btn-outline" onclick="editPost('${post.id}')">Chỉnh sửa</button>
                    <button class="btn btn-outline-danger" onclick="deletePost('${post.id}')">Xóa</button>
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
        "Bạn có chắc chắn muốn xóa bài đăng này trên Facebook Fanpage không? Hành động này không thể hoàn tác.",
        () => {
            posts = posts.filter(post => post.id !== id);
            renderPosts();
            showToast("Bài viết đã xóa", "Hệ thống đã gỡ bài đăng khỏi Fanpage Facebook thành công.");
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
                        <span class="comment-reply-label">Trang của bạn đã trả lời:</span>
                        <p class="comment-reply-text">${c.reply}</p>
                    </div>
                ` : `
                    <div class="comment-reply-form">
                        <input type="text" placeholder="Viết trả lời với tư cách Fanpage..." id="reply-input-${c.id}">
                        <button class="btn btn-outline" onclick="submitCommentReply('${c.id}')">Trả lời</button>
                    </div>
                `}

                <div class="comment-actions-row">
                    <button class="comment-action-link" onclick="toggleCommentVisibility('${c.id}')">
                        ${c.hidden ? 'Bỏ ẩn bình luận' : 'Ẩn bình luận'}
                    </button>
                    <button class="comment-action-link danger" onclick="deleteComment('${c.id}')">Xóa bình luận</button>
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
    showToast(c.hidden ? "Đã ẩn bình luận" : "Đã bỏ ẩn bình luận", c.hidden ? "Bình luận sẽ không hiển thị công khai trên Fanpage." : "Bình luận đã hiển thị trở lại trên bài viết.");
}

function deleteComment(commentId) {
    showConfirmModal(
        "Bạn có chắc chắn muốn xóa bình luận này khỏi bài viết Facebook không?",
        () => {
            comments[activeCommentsPostId] = (comments[activeCommentsPostId] || []).filter(c => c.id !== commentId);
            renderCommentsModal();
            renderPosts();
            showToast("Đã xóa bình luận", "Bình luận đã được gỡ khỏi bài viết trên Fanpage.");
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
    showToast("Đã gửi trả lời", "Phản hồi của Fanpage đã được đăng dưới bình luận.");
}

function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    // Load form data
    document.getElementById('edit-post-id').value = post.id;
    document.getElementById('post-fanpage').value = post.pageName;
    document.getElementById('post-content').value = post.content;
    document.getElementById('post-image-url').value = post.imagePreset;
    
    // UI update for edit mode
    document.getElementById('create-post-title').textContent = "Chỉnh sửa bài viết";
    document.getElementById('create-post-subtitle').textContent = "Cập nhật lại nội dung bài đăng trên Fanpage";
    document.getElementById('submit-post-btn').textContent = "Cập nhật bài viết";

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
    
    document.getElementById('create-post-title').textContent = "Tạo bài viết mới";
    document.getElementById('create-post-subtitle').textContent = "Soạn thảo bài viết và đăng lên Fanpage Facebook";
    document.getElementById('submit-post-btn').textContent = "Tạo bài viết";
    
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
        imagePresetName = 'Hoạt động Teamwork';
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
            posts[postIndex].time = "Vừa chỉnh sửa";
            showToast("Đã cập nhật bài viết", "Bài đăng Facebook đã được cập nhật thành công.");
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
            time: "Vừa xong",
            likes: 0,
            comments: 0,
            shares: 0
        };
        posts.unshift(newPost);
        showToast("Đã tạo bài viết", "Bài viết mới đã được xuất bản lên Facebook Fanpage.");
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
    document.getElementById('preview-post-content').textContent = content || "Nội dung chi tiết bài viết sẽ được cập nhật trực tiếp tại đây khi bạn nhập vào biểu mẫu bên trái...";

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
                Không tìm thấy tin nhắn thuộc Fanpage đã chọn.
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
        document.querySelector('.active-status').innerHTML = '<span class="status-dot online"></span>Đang hoạt động';
    } else {
        if (statusDot) statusDot.classList.remove('online');
        document.querySelector('.active-status').innerHTML = '<span class="status-dot"></span>Ngoại tuyến';
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
        showToast(`Tin nhắn mới từ ${chat.name}`, replyText);

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
        alert(`Hệ thống đang mở popup OAuth Facebook... Đã ủy quyền thành công! Đã kết nối Fanpage "${newPage}" vào Ezi Talent.`);
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
    showToast("Thông báo Ezi Talent", "Không có thông báo hệ thống mới nào chưa đọc.");
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
        
        showToast(`Tin nhắn mới từ ${chat.name}`, replyText);
    }
}, 12000);

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
                <button class="btn btn-outline-danger" onclick="simulateFacebookDisconnect()">Hủy kết nối kênh Facebook</button>
                <button class="btn btn-outline" onclick="simulateAddFanpage()">+ Thêm Fanpage liên kết</button>
            `;
        }
        if (settingsFbStatus) {
            settingsFbStatus.className = 'connection-status-tag connected';
            settingsFbStatus.textContent = 'Đã kết nối';
        }
    } else {
        if (unconnected) unconnected.classList.remove('hidden');
        if (connected) connected.classList.add('hidden');
        
        if (settingsFbCard) settingsFbCard.classList.add('hidden');
        if (settingsFbActions) {
            settingsFbActions.innerHTML = `
                <button class="btn btn-primary" style="background-color: #1877f2; border-color: #1877f2;" onclick="switchTab('fb-connect')">
                    Kết nối tài khoản Facebook ngay
                </button>
            `;
        }
        if (settingsFbStatus) {
            settingsFbStatus.className = 'connection-status-tag';
            settingsFbStatus.style.backgroundColor = '#edf2f7';
            settingsFbStatus.style.color = '#718096';
            settingsFbStatus.textContent = 'Chưa kết nối';
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
    message: "Gửi tin nhắn"
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
        filenameEl.textContent = `✅ ${file.name}`;
    } else {
        filenameEl.textContent = "Chọn video";
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
    const videoInput = document.getElementById('ad-video-input');
    const hasVideo = videoInput && videoInput.files && videoInput.files.length > 0;

    document.getElementById('ad-preview-avatar').textContent = fanpage === 'Ezi Talent' ? 'ET' : 'EA';
    document.getElementById('ad-preview-page-name').textContent = fanpage;
    document.getElementById('ad-preview-content').textContent = primaryText || "Chọn thông tin bên trái để xem trước nội dung quảng cáo...";
    document.getElementById('ad-preview-headline').textContent = headline || "Tiêu đề quảng cáo sẽ hiển thị ở đây";
    document.getElementById('ad-preview-cta').textContent = AD_DESTINATION_CTA[destination] || "Tìm hiểu thêm";

    const mediaPlaceholder = document.getElementById('ad-preview-media-placeholder');
    if (mediaPlaceholder) {
        mediaPlaceholder.parentElement.classList.toggle('has-video', hasVideo);
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

    const fanpage = document.getElementById('ad-fanpage').value;
    const name = document.getElementById('ad-name').value || "Chiến dịch chưa đặt tên";
    const objective = document.getElementById('ad-objective').value;
    const destination = document.getElementById('ad-destination').value;
    const budgetType = document.getElementById('ad-budget-type').value;
    const budget = parseInt(document.getElementById('ad-budget').value, 10) || 0;
    const startDate = document.getElementById('ad-start-date').value || new Date().toISOString().slice(0, 10);
    const endDate = document.getElementById('ad-end-date').value || startDate;

    const newAd = {
        id: `${Date.now()}`.slice(-11),
        name: name,
        pageName: fanpage,
        objective: objective,
        objectiveLabel: AD_OBJECTIVE_LABELS[objective],
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
    resetAdForm();
    showToast("Đã khởi chạy quảng cáo!", `Chiến dịch "${name}" đang chờ Facebook duyệt và sẽ sớm hiển thị trong Danh sách quảng cáo.`);
    switchTab('fb-ads-list');
}

function resetAdForm() {
    const form = document.getElementById('fb-create-ad-form');
    if (form) form.reset();
    document.getElementById('ad-budget').value = 150000;
    document.getElementById('ad-video-filename').textContent = "Chọn video";
    updateAdPreview();
}

// --- Ads Table (Danh sách quảng cáo) ---
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
            <td><input type="checkbox" class="ads-row-checkbox"></td>
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
        </tr>
    `).join('');

    document.getElementById('ads-table-count').textContent =
        `Showing ${pageAds.length} of ${ads.length} campaigns`;
    document.getElementById('ads-page-current').textContent = adsCurrentPage;
    document.getElementById('ads-page-prev').disabled = adsCurrentPage <= 1;
    document.getElementById('ads-page-next').disabled = adsCurrentPage >= totalPages;
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
window.onload = function() {
    renderFacebookConnectionPanel();
    // Nếu URL có ?code=... (vừa được Facebook redirect về sau khi ủy quyền), xử lý kết nối
    handleFacebookOAuthCallback();
    // Default open Post Management page
    switchTab('fb-posts');
};
