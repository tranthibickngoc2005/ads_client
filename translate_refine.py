import os

html_replacements = {
    'Create Post mới': 'Create New Post',
    'Edit bài viết Facebook': 'Edit Facebook Post',
    'Edit quảng cáo Facebook': 'Edit Facebook Ad',
    'Create Ad Facebook': 'Create Facebook Ad',
    'Settings - Policies hệ thống': 'Settings - System Policies',
    'Request Data Deletion cá nhân': 'Personal Data Deletion Request',
    'Hỗ trợ các định dạng ảnh và video': 'Supports image and video formats',
    'Tạo bài\n                                        viết': 'Create\n                                        Post',
    'Nội dung chi\n                                        tiết bài viết sẽ được cập nhật trực tiếp tại đây khi bạn nhập vào biểu mẫu bên\n                                        trái...': 'The detailed post content will be updated directly here when you input into the form on the left...',
    'Hộp thoại': 'Chat Inbox',
    'Đang hoạt\n                                        động': 'Active\n                                        now',
    'Thiết lập chiến dịch': 'Campaign Setup',
    'Fanpage chạy quảng cáo': 'Fanpage running ads',
    'Loại ngân sách': 'Budget Type',
    'Ngân sách hàng ngày': 'Daily Budget',
    'Ngân sách trọn đời': 'Lifetime Budget',
    'Nhập ngân sách': 'Enter Budget',
    'Mục đích chiến dịch': 'Campaign Objective',
    'Lưu lượng truy cập': 'Traffic',
    'Quản lý comments': 'Manage Comments',
    'Bạn có chắc chắn muốn xóa bài đăng này trên Facebook Fanpage không? Hành động này không thể hoàn tác.': 'Are you sure you want to delete this post on Facebook Fanpage? This action cannot be undone.',
    'Bài viết đã xóa': 'Post deleted',
    'Hệ thống đã gỡ bài đăng khỏi Fanpage Facebook thành công.': 'The system has successfully removed the post from the Facebook Fanpage.',
    'Đã ẩn comments': 'Hidden comments',
    'Bỏ ẩn comments': 'Unhide comments',
    'Ẩn comments': 'Hide comments',
    'Comment sẽ không hiển thị công khai trên Fanpage.': 'The comment will not be publicly visible on the Fanpage.',
    'Comment đã hiển thị trở lại trên bài viết.': 'The comment is now visible again on the post.',
    'Bạn có chắc chắn muốn xóa comments này khỏi bài viết Facebook không?': 'Are you sure you want to delete this comment from the Facebook post?',
    'Đã xóa comments': 'Comment deleted',
    'Comment đã được gỡ khỏi bài viết trên Fanpage.': 'The comment has been removed from the Fanpage post.',
    'Trang của bạn đã trả lời:': 'Your page replied:',
    'Viết trả lời với tư cách Fanpage...': 'Write a reply as Fanpage...',
    'Trả lời': 'Reply',
    'Đã gửi trả lời': 'Reply sent',
    'Phản hồi của Fanpage đã được đăng dưới comments.': 'The Fanpage response has been posted under the comment.',
    'Edit bài viết': 'Edit Post',
    'Vừa chỉnh sửa': 'Just edited',
    'Đã cập nhật bài viết': 'Post updated',
    'Bài đăng Facebook đã được cập nhật thành công.': 'The Facebook post has been successfully updated.',
    'Đã tạo bài viết': 'Post created',
    'Bài viết mới đã được xuất bản lên Facebook Fanpage.': 'A new post has been published to the Facebook Fanpage.',
    'Không tìm thấy tin nhắn thuộc Fanpage đã chọn.': 'No messages found for the selected Fanpage.',
    'Thông báo Ezi Talent': 'Ezi Talent Notification',
    'Không có thông báo hệ thống mới nào chưa đọc.': 'There are no new unread system notifications.'
}

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for vn, en in html_replacements.items():
        content = content.replace(vn, en)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Processed {file_path}')

process_file('index.html')
process_file('app.js')
