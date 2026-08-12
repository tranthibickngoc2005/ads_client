import os
import re

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # index.html multiline/formatting edge cases
    content = re.sub(r'Chọn video hoặc hình\s*ảnh', 'Select video or image', content)
    content = re.sub(r'PNG, JPG, MP4, MOV tối đa 1GB · Tỷ lệ 1:1, 16:9\s*hoặc 9:16', 'PNG, JPG, MP4, MOV max 1GB · Ratio 1:1, 16:9 or 9:16', content)
    content = re.sub(r'Tiêu đề quảng cáo sẽ\s*hiển thị ở đây', 'Ad headline will appear here', content)
    content = re.sub(r'Theo dõi hiệu suất và quản lý toàn bộ chiến dịch quảng cáo đang chạy', 'Track performance and manage all running ad campaigns', content)
    content = re.sub(r'Danh sách chiến dịch', 'Campaign List', content)
    content = re.sub(r'Tạo chiến dịch', 'Create Campaign', content)
    content = re.sub(r'THAO TÁC', 'ACTIONS', content)
    content = re.sub(r'Bấm "Create Post" để bắt đầu', 'Click "Create Post" to start', content)
    content = re.sub(r'Chạy quảng cáo cho bài viết tuyển dụng để tiếp cận nhiều ứng viên tiềm năng\s*hơn', 'Run ads for recruitment posts to reach more potential candidates', content)
    content = re.sub(r'Connect Ads Account để quản lý chiến dịch, ngân sách và theo dõi hiệu quả\s*tuyển dụng trực tiếp\.', 'Connect Ads Account to manage campaigns, budgets and track recruitment performance directly.', content)
    content = re.sub(r'Liên kết tài khoản\s*Quảng cáo', 'Link Ads Account', content)
    content = re.sub(r'Đang hoạt\s*động', 'Active now', content)
    content = re.sub(r'Trạng\s*thái: Ads account linked', 'Status: Ads account linked', content)
    content = re.sub(r'Quyền\s*hạn:', 'Role:', content)
    content = re.sub(r'Chi tiết chiến dịch', 'Campaign Details', content)
    content = re.sub(r'Thiết lập chung', 'General Settings', content)
    content = re.sub(r'Mục tiêu', 'Objective', content)
    content = re.sub(r'Thời gian chạy', 'Run time', content)
    content = re.sub(r'Đối tượng mục tiêu & Location', 'Target Audience & Location', content)
    content = re.sub(r'Location địa lý', 'Geographic Location', content)
    content = re.sub(r'Chi tiết Nội dung', 'Content Details', content)
    content = re.sub(r'Văn bản chính', 'Primary Text', content)
    content = re.sub(r'Nội dung media', 'Media Content', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Processed {file_path}')

process_file('index.html')
process_file('app.js')
