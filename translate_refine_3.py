import os

html_replacements = {
    # Fix messed up replacements
    'Malee': 'Name',
    'Việt Name': 'Việt Nam',
    'imagePresetNamee': 'imagePresetName',
    
    # Ad Creation Section
    'Tiêu đề (Headline)': 'Headline',
    'Tải lên hình ảnh hoặc video': 'Upload image or video',
    'Chọn video hoặc hình ảnh': 'Select video or image',
    'PNG, JPG, MP4, MOV tối đa 1GB · Tỷ lệ 1:1, 16:9 hoặc 9:16': 'PNG, JPG, MP4, MOV max 1GB · Ratio 1:1, 16:9 or 9:16',
    'Đăng quảng cáo': 'Publish Ad',
    'Xem trước quảng cáo': 'Ad Preview',
    'Được tài trợ': 'Sponsored',
    'Chọn thông tin\n                                        bên trái để xem trước nội dung quảng cáo...': 'Select information on the left to preview ad content...',
    'Tiêu đề quảng cáo sẽ hiển thị ...': 'Ad headline will appear here...',
    'Gửi tin nhắn': 'Send message',
    'Loại ngân sách': 'Budget Type',
    'Ngân sách hàng ngày': 'Daily Budget',
    'Ngân sách trọn đời': 'Lifetime Budget',
    'Mục đích chiến dịch': 'Campaign Objective',
    'Lưu lượng truy cập': 'Traffic',
    'Đích đến': 'Destination',
    
    # Settings Section
    'Policies bảo mật & Điều khoản sử dụng': 'Security Policies & Terms of Use',
    'Quy định về bảo mật dữ liệu, tích hợp Facebook Messenger API và bảo vệ thông\n                                            tin ứng viên.': 'Regulations on data security, Facebook Messenger API integration and candidate information protection.',
    'Chính Sách Quyền Riêng Tư (Privacy Policy)': 'Privacy Policy',
    'Phiên bản chi tiết, Đầy đủ pháp lý - Dành cho Meta App Review & Người\n                                                dùng cuối': 'Detailed, full legal version - For Meta App Review & End Users',
    'Cập\n                                            nhật: August 2026': 'Updated: August 2026',
    '1. Giới thiệu và Phạm vi áp dụng': '1. Introduction and Scope',
    '2. Thông tin và Dữ liệu chúng tôi thu thập': '2. Information and Data we collect',
    '3. Mục đích sử dụng dữ liệu': '3. Purpose of data use',
    '4. Share và Tiết lộ dữ liệu cho Bên thứ ba': '4. Sharing and Disclosing data to Third parties',
    '5. Lưu trữ và Bảo mật Dữ liệu': '5. Data Storage and Security',
    '6. Quyền của người dùng (User Rights)': '6. User Rights',
    '7. Hướng dẫn Delete dữ liệu (Data Deletion Instructions)': '7. Data Deletion Instructions',
    '8. Sử dụng Cookie và Công nghệ Theo dõi': '8. Use of Cookies and Tracking Technologies',
    '9. Trẻ em dưới 13 tuổi (Age Restrictions)': '9. Age Restrictions',
    '10. Chuyển giao dữ liệu Quốc tế': '10. International Data Transfer',
    '11. Cập nhật và Thay đổi Policies': '11. Policy Updates and Changes',
    '12. Thông tin Liên hệ (Contact Information)': '12. Contact Information',
    'Quản lý Quyền riêng tư & Personal Data': 'Privacy & Personal Data Management',
    'Kiểm soát quyền dữ liệu cá nhân, sao lưu thông tin và bảo mật tài khoản.': 'Control personal data rights, backup information and secure account.',
    'Tải\n                                                    xuống bản sao dữ liệu cá nhân': 'Download personal data copy',
    'Xuất\n                                                    toàn bộ lịch sử hoạt động, bài viết và báo cáo cá nhân dạng CSV/PDF.': 'Export all activity history, posts and personal reports in CSV/PDF format.',
    'Tải dữ\n                                                liệu': 'Download Data',
    'Delete dữ\n                                                    liệu cá nhân': 'Delete Personal Data',
    'Delete toàn bộ hồ\n                                                    sơ dữ liệu cá nhân khỏi máy chủ hệ thống Ezi Talent.': 'Delete all personal data records from the Ezi Talent system servers.',
    'Xoá dữ\n                                                liệu cá nhân': 'Delete Personal Data',
    
    # Specific texts missed due to formatting
    'Chọn thông tin\n                                        bên trái để xem trước nội dung quảng cáo...': 'Select information on the left to preview ad content...',
    'Tiêu đề quảng cáo sẽ hiển thị ...': 'Ad headline will appear here...',
    'Đang chuẩn bị bản sao dữ liệu...': 'Preparing data copy...',
    'Hệ thống đang trích xuất dữ liệu cá nhân của bạn dưới dạng tệp bảo mật.': 'The system is extracting your personal data as a secure file.',
    'Bạn có chắc chắn muốn gửi yêu cầu xóa toàn bộ dữ liệu cá nhân khỏi máy chủ Ezi Talent không?': 'Are you sure you want to send a request to delete all personal data from the Ezi Talent server?',
    'Đã gửi yêu cầu xóa dữ liệu': 'Data deletion request sent',
    'của bạn đang được Bộ phận Kỹ thuật & Pháp lý xử lý trong vòng 24h.': 'is being processed by the Technical & Legal Department within 24 hours.'
}

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Basic replacements
    for vn, en in html_replacements.items():
        content = content.replace(vn, en)
        
    # Also do regex for the multiline texts to handle arbitrary whitespaces
    import re
    content = re.sub(r'Tải\s+xuống bản sao dữ liệu cá nhân', 'Download personal data copy', content)
    content = re.sub(r'Xuất\s+toàn bộ lịch sử hoạt động, bài viết và báo cáo cá nhân dạng CSV/PDF\.', 'Export all activity history, posts and personal reports in CSV/PDF format.', content)
    content = re.sub(r'Tải dữ\s+liệu', 'Download Data', content)
    content = re.sub(r'Delete dữ\s+liệu cá nhân', 'Delete Personal Data', content)
    content = re.sub(r'Delete toàn bộ hồ\s+sơ dữ liệu cá nhân khỏi máy chủ hệ thống Ezi Talent\.', 'Delete all personal data records from the Ezi Talent system servers.', content)
    content = re.sub(r'Xoá dữ\s+liệu cá nhân', 'Delete Personal Data', content)
    content = re.sub(r'Chọn thông tin\s+bên trái để xem trước nội dung quảng cáo\.\.\.', 'Select information on the left to preview ad content...', content)
    content = re.sub(r'Quy định về bảo mật dữ liệu, tích hợp Facebook Messenger API và bảo vệ thông\s+tin ứng viên\.', 'Regulations on data security, Facebook Messenger API integration and candidate information protection.', content)
    content = re.sub(r'Phiên bản chi tiết, Đầy đủ pháp lý - Dành cho Meta App Review & Người\s+dùng cuối', 'Detailed, full legal version - For Meta App Review & End Users', content)
    content = re.sub(r'Cập\s+nhật: August 2026', 'Updated: August 2026', content)

    # Some missed translations
    content = content.replace('Xóa dữ liệu cá nhân', 'Delete Personal Data')
    content = content.replace('Tải dữ liệu', 'Download Data')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Processed {file_path}')

process_file('index.html')
process_file('app.js')
