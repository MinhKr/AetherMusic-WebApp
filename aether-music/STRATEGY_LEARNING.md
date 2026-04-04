# Chiến lược Học tập & Phát triển: AetherMusic (Independent Path)

Tài liệu này tổng hợp các định hướng và lựa chọn công nghệ tối ưu cho mục đích **học tập (learning)** và **phát triển bền vững**, dựa trên thảo luận của chúng ta.

---

## 1. Tại sao chọn Con đường Độc lập (Independent Path)?

Thay vì chỉ là một "giao diện" cho Spotify, việc xây dựng một ứng dụng nhạc tự chủ mang lại giá trị học tập vượt trội:

- **Làm chủ Hệ thống (Full-stack):** Bạn không chỉ gọi API mà còn học cách thiết kế "xương sống" (Database, Storage, Auth) cho ứng dụng.
- **Tự do Sáng tạo:** Không bị gò bó bởi các chính sách khắt khe, giới hạn người dùng hay yêu cầu tài khoản Premium từ Spotify.
- **Kỹ năng Thực tế:** Các kiến thức về PostgreSQL, File Storage và Custom Auth là những kỹ năng "vàng" mà mọi nhà tuyển dụng đều tìm kiếm.

---

## 2. Bộ Tech Stack Tuyệt vời cho Sinh viên (Càng Free Càng Tốt)

Đây là bộ công nghệ hiện đại, chuyên nghiệp nhưng hoàn toàn có thể sử dụng miễn phí (Zero-cost):

| Thành phần | Công nghệ | Ưu điểm cho Sinh viên |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15+** | Tiêu chuẩn ngành, hiệu năng cao, SEO tốt. |
| **Backend/DB** | **Supabase (PostgreSQL)** | Miễn phí 500MB DB, cực nhanh, tích hợp sẵn Auth. |
| **Lưu trữ file** | **Supabase Storage** | Miễn phí 5GB cho nhạc (.mp3) và ảnh (.jpg). |
| **Xác thực** | **Supabase Auth** | Hỗ trợ Email/Password và Login Google miễn phí. |
| **Giao diện** | **Tailwind CSS** | Thiết kế nhanh, đẹp, không cần viết CSS phức tạp. |
| **Deploy** | **Vercel** | Hosting miễn phí, tự động cập nhật khi bạn đẩy code lên GitHub. |
| **Audio Engine** | **HTML5 Audio API** | Không tốn dung lượng, chạy mượt trên mọi trình duyệt. |

---

## 3. Lợi ích khi triển khai theo hướng này

1. **Chi phí 0đ:** Không bắt buộc dùng thẻ tín dụng để bắt đầu.
2. **Hồ sơ năng lực (Portfolio):** Một dự án thực tế quản lý hàng trăm bài hát, người dùng và dữ liệu phức tạp sẽ giúp bạn nổi bật hơn hẳn các ứng viên khác.
3. **Mở rộng dễ dàng:** Sau này bạn có thể thêm tính năng Upload nhạc cho người dùng, tạo Playlist cá nhân, thậm chí là bán nhạc.

---

## 4. Lộ trình thực hiện (Roadmap)

1. **Giai đoạn 1:** Khởi tạo dự án trên Dashboard Supabase & Kết nối với Next.js qua `supabase-js`.
2. **Giai đoạn 2:** Thiết kế Database (Bảng `songs`, `users`, `liked_songs`).
3. **Giai đoạn 3:** Xây dựng chức năng Upload bài hát vào Storage và lưu thông tin vào Database.
4. **Giai đoạn 4:** Hoàn thiện Player để phát nhạc trực tiếp từ URL của Supabase Storage.

---

## 5. Nhật ký Tiến độ (Progress Log)

| Ngày | Trạng thái | Nội dung đã hoàn thành |
| :--- | :--- | :--- |
| **04/04/2026** | ✅ Hoàn thành | **Chuyển đổi sang Independent Path:** Kết nối thành công Supabase. |
| **04/04/2026** | ✅ Hoàn thành | **Thiết lập Database & Storage:** Tạo bảng `songs` và bucket `songs` để lưu trữ file thật. |
| **04/04/2026** | ✅ Hoàn thành | **Music Player toàn cục:** Quản lý bài hát đang phát trên toàn App bằng `PlayerContext`. |
| **04/04/2026** | ✅ Hoàn thành | **Hệ thống Upload "Nebula":** Trang `/upload` với giao diện Glassmorphism và hiệu ứng Neon, cho phép đẩy nhạc thật (.mp3) và ảnh lên hệ thống. |

---

## 6. Mục tiêu tiếp theo (Next Milestones)

- [ ] **Xác thực người dùng (Auth):** Thiết lập đăng ký/đăng nhập bằng Email/Password qua Supabase Auth để người dùng có Playlist riêng.
- [ ] **Chức năng "Yêu thích":** Cho phép nhấn Tim ❤️ để lưu bài hát vào bảng `liked_songs`.
- [ ] **Quản lý Playlist:** Tạo và chỉnh sửa danh sách phát cá nhân.
- [ ] **Trang Library & Profile:** Hiển thị bài hát đã upload và danh sách yêu thích của riêng từng người dùng.

---

> [!TIP]
> **Lời khuyên:** Sau khi App đã có thể nghe và upload nhạc ngon lành, bạn hãy thử upload khoảng 5-10 bài hát yêu thích nhất của mình để App trông thật sống động và chuyên nghiệp nhé!
