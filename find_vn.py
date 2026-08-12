import re
import sys

def find_vietnamese(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    pattern = re.compile(r'[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳýỵỷỹđÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲÝỴỶỸĐ]')
    
    count = 0
    for i, line in enumerate(lines):
        if pattern.search(line):
            # Skip if it's the predefined posts or comments
            if 'Trần Gia Huy' in line or 'Ngọc Diễm' in line or 'Phạm Anh Kiệt' in line or 'Lê Thuỳ Trang' in line or 'Đức Anh' in line or 'Nguyễn Văn An' in line or 'Trần Thị Bích' in line or 'Lê Minh Công' in line or 'CƠ HỘI GIA NHẬP' in line or 'BẠN CÓ MUỐN TỰ TAY' in line:
                continue
            if 'Khóa học UI/UX' in line or 'yêu cầu kinh nghiệm' in line or 'Công ty có làm' in line or 'Spam link' in line or 'Khoá học có cấp' in line or 'Voucher' in line or 'Chào shop' in line or 'Chào bạn' in line or 'Cho mình hỏi' in line or 'Dạ chào bạn' in line or 'Cảm ơn shop' in line or 'link ứng tuyển' in line or 'link ứng dụng' in line or 'chào bạn' in line or 'Cảm ơn anh/chị' in line or 'Dạ mức lương' in line or 'Dạ vâng' in line or 'Em vừa truy cập' in line:
                continue
            # Also skip some comments
            print(f'{file_path}:{i+1}: {line.strip()}')
            count += 1
            if count > 50:
                print('... and more')
                break

find_vietnamese('index.html')
find_vietnamese('app.js')
