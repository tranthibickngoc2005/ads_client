import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

new_policy = """
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border);">
        <div>
            <h3 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin: 0;">Chính Sách Quyền Riêng Tư (Privacy Policy)</h3>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Phiên bản chi tiết, Đầy đủ pháp lý - Dành cho Meta App Review & Người dùng cuối</div>
        </div>
        <span style="font-size: 12px; background: var(--primary-light); color: var(--primary); padding: 4px 12px; border-radius: 12px; font-weight: 600;">Cập nhật: August 2026</span>
    </div>

    <!-- Accordion Styling -->
    <style>
        .policy-accordion { margin-bottom: 12px; border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; background-color: #fff; }
        .policy-accordion summary { padding: 14px 16px; background-color: var(--surface-variant); font-size: 15px; font-weight: 700; color: var(--text-main); cursor: pointer; user-select: none; transition: background-color 0.2s; }
        .policy-accordion summary:hover { background-color: #f1f5f9; }
        .policy-accordion[open] summary { border-bottom: 1px solid var(--border); background-color: #f1f5f9; }
        .policy-accordion .accordion-content { padding: 16px; font-size: 14px; color: var(--text-muted); }
        .policy-accordion .accordion-content p { margin-top: 0; margin-bottom: 12px; }
        .policy-accordion .accordion-content p:last-child { margin-bottom: 0; }
        .policy-accordion .accordion-content ul, .policy-accordion .accordion-content ol { margin-top: 0; padding-left: 20px; margin-bottom: 12px; }
        .policy-accordion .accordion-content h4 { font-size: 14px; color: var(--text-main); margin-bottom: 8px; margin-top: 16px; }
    </style>

    <details class="policy-accordion">
        <summary>1. Giới thiệu và Phạm vi áp dụng</summary>
        <div class="accordion-content">
            <p>Chào mừng bạn đến với ứng dụng và dịch vụ của <strong>EZI Tech Solutions</strong> ("chúng tôi", "của chúng tôi"). Việc bảo vệ dữ liệu cá nhân và quyền riêng tư của bạn là cam kết cao nhất của chúng tôi.</p>
            <p>Chính sách Quyền riêng tư này được soạn thảo nhằm giải thích một cách minh bạch, chi tiết và toàn diện nhất về cách thức chúng tôi thu thập, sử dụng, lưu trữ, xử lý và bảo vệ thông tin của bạn khi bạn truy cập trang web, sử dụng phần mềm, hoặc kết nối tài khoản Facebook/Meta của mình với hệ thống của chúng tôi (gọi chung là "Dịch vụ").</p>
            <p>Chính sách này tuân thủ nghiêm ngặt các quy định về quyền riêng tư hiện hành, bao gồm các chính sách dành cho Nhà phát triển Ứng dụng của Meta (Meta App Developer Policies), cũng như các tiêu chuẩn bảo vệ dữ liệu chung. Việc bạn tiếp tục sử dụng Dịch vụ và cho phép đăng nhập qua Facebook đồng nghĩa với việc bạn đã đọc, hiểu và hoàn toàn đồng ý với các điều khoản được nêu dưới đây.</p>
        </div>
    </details>

    <details class="policy-accordion">
        <summary>2. Thông tin và Dữ liệu chúng tôi thu thập</summary>
        <div class="accordion-content">
            <p>Để cung cấp cho bạn một Dịch vụ hoàn chỉnh (bao gồm quản lý Fanpage, đồng bộ quảng cáo, trả lời tin nhắn tự động), chúng tôi chỉ thu thập các dữ liệu cần thiết tối thiểu. Dữ liệu này được chia thành các nhóm sau:</p>
            <h4>2.1. Dữ liệu từ tài khoản Facebook (Thông qua Meta Graph API)</h4>
            <p>Khi bạn thực hiện thao tác "Đăng nhập bằng Facebook" và cấp quyền cho ứng dụng, chúng tôi có thể truy cập vào các dữ liệu sau dựa trên sự cho phép của bạn:</p>
            <ul>
                <li><strong>Dữ liệu Định danh Cơ bản:</strong> Tên hiển thị, ảnh đại diện, địa chỉ email, và Facebook User ID.</li>
                <li><strong>Dữ liệu Quản lý Fanpage (<code>pages_show_list</code>, <code>pages_read_engagement</code>, <code>pages_manage_posts</code>):</strong> Danh sách các Trang (Pages) bạn quản lý, ID của trang, tên trang, phân loại trang, nội dung bài viết, hình ảnh/video bạn đã đăng trên Trang, lượt thích (likes), lượt bình luận (comments), và Access Token của Trang để duy trì kết nối.</li>
                <li><strong>Dữ liệu Hộp thư đến (<code>pages_messaging</code>):</strong> Lịch sử các cuộc hội thoại, tin nhắn văn bản, hình ảnh đính kèm mà khách hàng gửi đến Trang của bạn, cũng như các tin nhắn bạn gửi đi thông qua hệ thống của chúng tôi.</li>
                <li><strong>Dữ liệu Quảng cáo và Doanh nghiệp (<code>ads_management</code>, <code>business_management</code>, <code>ads_read</code>):</strong> ID Tài khoản quảng cáo (Ad Account ID), ID Trình quản lý kinh doanh (Business Manager ID), cấu hình chiến dịch, nhóm quảng cáo, mẫu quảng cáo, và các chỉ số đo lường hiệu quả (Lượt tiếp cận, Hiển thị, Chi phí, Lượt nhấp, Chuyển đổi).</li>
            </ul>
            <h4>2.2. Dữ liệu Do bạn cung cấp trực tiếp</h4>
            <p>Bao gồm các thông tin bạn điền vào form đăng ký tài khoản trên hệ thống của chúng tôi, số điện thoại liên hệ, tên công ty, mã số thuế (nếu có để xuất hóa đơn), và các nội dung yêu cầu hỗ trợ qua email/chat.</p>
            <h4>2.3. Dữ liệu Thu thập tự động (Log & Usage Data)</h4>
            <p>Khi bạn sử dụng ứng dụng, hệ thống của chúng tôi tự động ghi nhận các thông tin kỹ thuật như: Địa chỉ IP, loại trình duyệt, hệ điều hành, thời gian truy cập, các trang/chức năng bạn đã click, và các bản log lỗi (error logs) để phục vụ cho việc chẩn đoán sự cố hệ thống.</p>
        </div>
    </details>

    <details class="policy-accordion">
        <summary>3. Mục đích sử dụng dữ liệu</summary>
        <div class="accordion-content">
            <p>Toàn bộ dữ liệu thu thập từ bạn và từ Meta API được chúng tôi sử dụng <strong>độc quyền</strong> cho các mục đích hợp pháp nhằm cung cấp và nâng cao chất lượng Dịch vụ. Cụ thể:</p>
            <ul>
                <li><strong>Cung cấp tính năng cốt lõi:</strong> Cho phép bạn xem báo cáo, đăng bài viết, đọc và tự động hóa việc trả lời bình luận/tin nhắn trên Fanpage ngay từ nền tảng của chúng tôi.</li>
                <li><strong>Quản lý và Tối ưu Quảng cáo:</strong> Tổng hợp số liệu từ Meta Ads để vẽ biểu đồ báo cáo hiệu quả chiến dịch (Campaign Insights), hỗ trợ bạn lên kịch bản và tạo chiến dịch quảng cáo mới trực tiếp trên giao diện của chúng tôi một cách nhanh chóng.</li>
                <li><strong>Duy trì và Xác thực:</strong> Sử dụng Access Token để duy trì phiên đăng nhập bảo mật giữa hệ thống của chúng tôi và hệ thống của Meta, đảm bảo luồng công việc của bạn không bị gián đoạn.</li>
                <li><strong>Cải thiện Dịch vụ:</strong> Phân tích dữ liệu sử dụng ẩn danh (không gắn với danh tính) để phát hiện các lỗi phần mềm (bugs) và nâng cấp giao diện người dùng (UX/UI).</li>
                <li><strong>Hỗ trợ Khách hàng:</strong> Sử dụng email hoặc số điện thoại của bạn để gửi thông báo về trạng thái tài khoản, cảnh báo bảo mật, hoặc phản hồi các yêu cầu hỗ trợ kỹ thuật từ bạn.</li>
            </ul>
        </div>
    </details>

    <details class="policy-accordion">
        <summary>4. Chia sẻ và Tiết lộ dữ liệu cho Bên thứ ba</summary>
        <div class="accordion-content">
            <p>Chúng tôi tôn trọng tuyệt đối quyền riêng tư và coi dữ liệu của bạn là tài sản cần được bảo vệ nghiêm ngặt.</p>
            <ul>
                <li><strong>Cam kết Không bán Dữ liệu (No Data Selling):</strong> Chúng tôi KHÔNG BÁN, cho thuê, trao đổi, hoặc kiếm tiền từ bất kỳ dữ liệu cá nhân hay dữ liệu Facebook nào của bạn cho bất kỳ bên thứ ba, nhà môi giới dữ liệu (data broker), hay công ty quảng cáo nào.</li>
                <li><strong>Nhà cung cấp Dịch vụ Đám mây (Cloud Providers):</strong> Dữ liệu của bạn được lưu trữ trên các máy chủ đám mây bảo mật cấp doanh nghiệp (như AWS, Google Cloud). Các đối tác này bị ràng buộc bởi các hợp đồng bảo mật nghiêm ngặt và không có quyền truy cập vào dữ liệu của bạn để sử dụng cho mục đích riêng của họ.</li>
                <li><strong>Yêu cầu Pháp lý:</strong> Chúng tôi bảo lưu quyền tiết lộ dữ liệu của bạn khi bắt buộc phải làm vậy theo yêu cầu hợp pháp từ Tòa án, cơ quan điều tra, hoặc để tuân thủ các quy định của pháp luật nhằm ngăn chặn gian lận, bảo vệ quyền lợi hợp pháp của EZI Tech Solutions và sự an toàn của những người dùng khác.</li>
            </ul>
        </div>
    </details>

    <details class="policy-accordion">
        <summary>5. Lưu trữ và Bảo mật Dữ liệu</summary>
        <div class="accordion-content">
            <p>Chúng tôi áp dụng các tiêu chuẩn bảo mật của ngành công nghiệp phần mềm để bảo vệ dữ liệu chống lại sự truy cập, thay đổi, tiết lộ hoặc phá hủy trái phép.</p>
            <ul>
                <li><strong>Mã hóa Truyền tải:</strong> Tất cả các luồng dữ liệu giao tiếp giữa trình duyệt của bạn, máy chủ của chúng tôi và Meta đều được mã hóa theo chuẩn Transport Layer Security (TLS/HTTPS).</li>
                <li><strong>Mã hóa Lưu trữ:</strong> Các dữ liệu nhạy cảm cực kỳ quan trọng như Facebook Access Token, Mật khẩu tài khoản, thông tin thanh toán đều được mã hóa một chiều (hashing) hoặc mã hóa bất đối xứng tại tầng Cơ sở dữ liệu.</li>
                <li><strong>Thời gian lưu trữ (Retention Policy):</strong>
                    <ul>
                        <li>Chúng tôi chỉ lưu giữ dữ liệu của bạn trong thời gian tài khoản của bạn còn hoạt động hoặc cần thiết để thực hiện các nghĩa vụ trong hợp đồng.</li>
                        <li>Lịch sử nội dung (Bài viết/Tin nhắn/Dữ liệu Ads) được lưu trữ tạm thời để phục vụ hiển thị báo cáo. Nếu bạn ngừng sử dụng dịch vụ hoặc ngắt kết nối Fanpage/Ad Account, hệ thống sẽ tự động ngừng thu thập dữ liệu mới.</li>
                        <li>Các bản log hệ thống thường sẽ bị xóa hoặc làm ẩn danh sau 90 ngày.</li>
                    </ul>
                </li>
            </ul>
        </div>
    </details>

    <details class="policy-accordion">
        <summary>6. Quyền của người dùng (User Rights)</summary>
        <div class="accordion-content">
            <p>Dù bạn ở bất kỳ khu vực nào, chúng tôi trao cho bạn các quyền kiểm soát dữ liệu cá nhân của mình ở mức cao nhất:</p>
            <ul>
                <li><strong>Quyền Truy cập:</strong> Bạn có quyền đăng nhập vào ứng dụng và xem tất cả các dữ liệu mà chúng tôi đang lưu trữ về bạn và các Fanpage bạn đã kết nối.</li>
                <li><strong>Quyền Chỉnh sửa:</strong> Bạn có thể cập nhật, sửa đổi thông tin hồ sơ cá nhân của mình bất kỳ lúc nào thông qua phần Cài đặt tài khoản.</li>
                <li><strong>Quyền Từ chối (Opt-out):</strong> Bạn có thể hủy đăng ký nhận email tiếp thị hoặc thông báo không quan trọng từ chúng tôi.</li>
                <li><strong>Quyền Xóa bỏ (Right to Erasure):</strong> Bạn có quyền yêu cầu xóa bỏ hoàn toàn và vĩnh viễn dữ liệu của mình khỏi hệ thống của chúng tôi. (Vui lòng xem chi tiết tại Mục 7).</li>
            </ul>
        </div>
    </details>

    <details class="policy-accordion">
        <summary>7. Hướng dẫn Xóa dữ liệu (Data Deletion Instructions)</summary>
        <div class="accordion-content">
            <p>Nếu bạn không còn muốn sử dụng ứng dụng và muốn xóa toàn bộ dữ liệu mà chúng tôi đã thu thập từ Facebook của bạn, bạn có thể thực hiện theo quy trình minh bạch sau đây:</p>
            <h4>Cách 1: Xóa ngay lập tức thông qua Facebook (Khuyến nghị)</h4>
            <ol>
                <li>Truy cập vào tài khoản Facebook của bạn.</li>
                <li>Đi đến phần <strong>Cài đặt và Quyền riêng tư</strong> > <strong>Cài đặt</strong>.</li>
                <li>Chọn mục <strong>Ứng dụng và Trang web (Apps and Websites)</strong> hoặc <strong>Tiện ích tích hợp cho doanh nghiệp (Business Integrations)</strong>.</li>
                <li>Tìm ứng dụng của chúng tôi trong danh sách, chọn <strong>Gỡ (Remove)</strong>.<br>Ngay khi bạn thực hiện điều này, các Access Token mà chúng tôi đang giữ sẽ ngay lập tức bị vô hiệu hóa, và hệ thống của chúng tôi sẽ không thể truy cập thêm bất kỳ dữ liệu nào từ Facebook của bạn.</li>
            </ol>
            <h4>Cách 2: Gửi Yêu cầu Xóa dữ liệu đến máy chủ của chúng tôi</h4>
            <p>Để đảm bảo toàn bộ dữ liệu lịch sử (bao gồm log, bản sao lưu) được xóa sạch khỏi Cơ sở dữ liệu của chúng tôi:</p>
            <ol>
                <li>Truy cập vào trang <strong><a href="/data-deletion" style="color: var(--primary);">Hướng dẫn Xóa Dữ Liệu</a></strong> trên website của chúng tôi.</li>
                <li>Điền email hoặc Account ID của bạn vào form yêu cầu xóa dữ liệu.</li>
                <li>Chúng tôi sẽ tiếp nhận, xác minh yêu cầu và tiến hành xóa vĩnh viễn mọi dữ liệu liên quan trong vòng tối đa <strong>7 ngày làm việc</strong>. Bạn sẽ nhận được email xác nhận khi quá trình xóa hoàn tất.</li>
            </ol>
        </div>
    </details>

    <details class="policy-accordion">
        <summary>8. Sử dụng Cookie và Công nghệ Theo dõi</summary>
        <div class="accordion-content">
            <p>Chúng tôi sử dụng Cookie (các tệp văn bản nhỏ lưu trên thiết bị của bạn) và các công nghệ tương tự (như LocalStorage, SessionStorage) chỉ với mục đích duy trì phiên đăng nhập (Authentication), ghi nhớ tùy chọn ngôn ngữ/giao diện, và đảm bảo an ninh mạng chống lại các cuộc tấn công giả mạo (CSRF). Bạn hoàn toàn có thể thiết lập trình duyệt của mình để từ chối tất cả cookie, tuy nhiên, điều này có thể làm cho một số tính năng bảo mật của Dịch vụ không thể hoạt động chính xác.</p>
        </div>
    </details>

    <details class="policy-accordion">
        <summary>9. Trẻ em dưới 13 tuổi (Age Restrictions)</summary>
        <div class="accordion-content">
            <p>Dịch vụ của chúng tôi cung cấp công cụ quản lý doanh nghiệp (B2B) và các công cụ quảng cáo. Do đó, Dịch vụ này không được thiết kế và không nhắm mục tiêu đến trẻ em dưới 13 tuổi (hoặc độ tuổi giới hạn theo luật định tại quốc gia của bạn). Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ vị thành niên. Nếu chúng tôi phát hiện ra một tài khoản thuộc về người chưa đủ tuổi hợp pháp, chúng tôi sẽ tiến hành khóa tài khoản và xóa bỏ toàn bộ dữ liệu ngay lập tức.</p>
        </div>
    </details>

    <details class="policy-accordion">
        <summary>10. Chuyển giao dữ liệu Quốc tế</summary>
        <div class="accordion-content">
            <p>Máy chủ cơ sở dữ liệu của chúng tôi có thể được đặt tại nhiều khu vực (Regions) khác nhau do các đối tác Cloud cung cấp. Do đó, dữ liệu của bạn có thể được truyền tải và lưu trữ bên ngoài quốc gia nơi bạn sinh sống. Khi thực hiện các luồng chuyển giao này, chúng tôi luôn đảm bảo việc truyền tải tuân thủ các Cơ chế bảo vệ dữ liệu được pháp luật công nhận, đảm bảo an toàn tuyệt đối.</p>
        </div>
    </details>

    <details class="policy-accordion">
        <summary>11. Cập nhật và Thay đổi Chính sách</summary>
        <div class="accordion-content">
            <p>Chúng tôi bảo lưu quyền sửa đổi và cập nhật Chính sách Quyền riêng tư này vào bất kỳ lúc nào để phản ánh sự thay đổi trong công nghệ, luật pháp, hoặc tính năng Dịch vụ. Bất kỳ sự thay đổi quan trọng nào sẽ được thông báo rõ ràng cho bạn thông qua email (nếu bạn đã cung cấp) hoặc bằng một thông báo nổi bật ngay trên giao diện ứng dụng trước khi thay đổi có hiệu lực. Ngày "Cập nhật lần cuối" ở đầu trang sẽ cho bạn biết thời điểm chính sách này được sửa đổi gần nhất.</p>
        </div>
    </details>

    <details class="policy-accordion">
        <summary>12. Thông tin Liên hệ (Contact Information)</summary>
        <div class="accordion-content">
            <p>Chúng tôi luôn lắng nghe và sẵn sàng giải đáp mọi thắc mắc của bạn về Chính sách Quyền riêng tư này. Nếu bạn có bất kỳ câu hỏi nào, khiếu nại, hoặc muốn thực hiện các quyền riêng tư của mình, xin vui lòng liên hệ với Cán bộ Bảo vệ Dữ liệu (Data Protection Officer) của chúng tôi thông qua:</p>
            <ul>
                <li><strong>Email Hỗ trợ & Pháp lý:</strong> <a href="mailto:contact@ezisolutions.tech" style="color: var(--primary);">contact@ezisolutions.tech</a></li>
                <li><strong>Địa chỉ Trụ sở chính:</strong> EZI Tech Solutions Headquarter, Việt Nam.</li>
            </ul>
            <p><em>Cảm ơn bạn đã tin tưởng và sử dụng Dịch vụ của chúng tôi!</em></p>
        </div>
    </details>
"""

pattern = r'(<div class="policy-content-box"[^>]*>).*?(?=                            </div>\n                        </div>\n                    </div>\n\n                    <!-- TAB 2: DỮ LIỆU CÁ NHÂN -->)'
new_content = re.sub(pattern, r'\1\n' + new_policy + '\n', content, flags=re.DOTALL)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated policy successfully.")
