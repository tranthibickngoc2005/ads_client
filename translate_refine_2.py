import os

html_replacements = {
    'Chạy quảng cáo cho bài viết tuyển dụng để tiếp cận nhiều ứng viên tiềm năng\n                                    hơn': 'Run ads for recruitment posts to reach more potential candidates',
    'ĐỐI TƯỢNG MỤC TIÊU': 'TARGET AUDIENCE',
    'Độ tuổi': 'Age',
    'Giới tính': 'Gender',
    'Tất cả': 'All',
    'Nữ': 'Female',
    'Nam': 'Male',
    'Vị trí': 'Location',
    'Phạm vi bán kính': 'Radius range',
    'Xây dựng nội dung quảng cáo': 'Build Ad Content',
    'Văn bản chính (Primary Text)': 'Primary Text',
    'Gợi ý nội dung': 'Suggest content',
    'Đã liên kết tài khoản quảng cáo': 'Ads account linked',
    'Quản trị viên': 'Administrator',
    'Đã kết nối': 'Connected',
    'Chưa kết nối': 'Not connected',
    'Lượt tương tác': 'Engagement',
    'Đích đến': 'Destination',
    'Tin nhắn': 'Message',
    'Tìm kiếm...': 'Search...',
    'Đính kèm ảnh': 'Attach image',
    'Tin tuyển dụng mẫu': 'Sample recruitment message',
    'Enter Budget (VNĐ)': 'Enter Budget (VND)',
    'Disconnect kênh Facebook': 'Disconnect Facebook channel'
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
