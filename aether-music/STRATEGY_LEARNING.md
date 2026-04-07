# Chiến lược Học tập & Phát triển: AetherMusic (Independent Path)

Tài liệu này tổng hợp các định hướng, công nghệ và nhật ký hành trình xây dựng ứng dụng nhạc độc lập **AetherMusic (Nebula)**.

---

## 🚀 1. Những gì chúng ta đã làm (Accomplishments)

Chúng ta đã chuyển đổi thành công từ một ứng dụng phụ thuộc vào Spotify sang một **Nền tảng Âm nhạc Độc lập** với các tính năng chuyên nghiệp:

### 🔐 Hệ thống Xác thực (Independent Auth)
- **Supabase SSR Auth:** Gỡ bỏ Spotify OAuth, triển khai hệ thống Đăng nhập/Đăng ký bằng Email/Password.
- **Middleware Security:** Bảo vệ các tuyến đường (routes), quản lý session cookie an toàn trên Edge.

### 🎵 Quản lý Âm nhạc (Nebula Cloud)
- **Hệ thống Upload:** Trang `/upload` với giao diện Glassmorphism, hỗ trợ đẩy file nhạc (.mp3) và ảnh bìa bài hát lên Cloud Storage.
- **Global Music Player:** Trình phát nhạc toàn cục sử dụng HTML5 Audio API, điều khiển bằng `PlayerContext`.

### 💖 Hệ thống Yêu thích & Tương tác (Interaction)
- **Tính năng Like:** Hệ thống thả tim thời gian thực (Optimistic UI) với bảng `liked_songs` riêng biệt cho từng user.
- **Context Management:** Tự động đồng bộ trạng thái "Liked" trên toàn bộ ứng dụng (Trang chủ, Thư viện, Playlist).

### 📚 Thư viện & Playlist (Library Dashboard)
- **Redesign Library:** Biến trang Thư viện thành một Dashboard trung tâm quản lý các bộ sưu tập.
- **Custom Playlists:** Tính năng tạo Playlist (Album) cá nhân với Modal chuyên nghiệp.
- **Playlist Management:** Thêm/Xóa bài hát vào Playlist từ bất kỳ đâu thông qua Menu trên `SongCard`.
- **Dynamic Tabs:** Sử dụng Search Params để chuyển đổi giữa Dashboard và Chi tiết Playlist mà không cần load lại trang.

### ✨ Giao diện & Trải nghiệm Người dùng (UX/UI)
- **Toast Notification System:** Hệ thống thông báo thông minh dạng Pill banner (Top-Center) với hiệu ứng Glassmorphism, phản hồi tức thì cho mọi hành động (Upload, Like, Playlist).
- **Race Condition Optimization:** Giải quyết triệt để lỗi duplicate key khi người dùng tương tác nhanh (double-click) bằng cơ chế "Pending Lock" ở Frontend và "Upsert logic" ở Backend.

---

## 🛠️ 2. Tech Stack Hiện tại

| Thành phần | Công nghệ | Mục đích |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15+ (App Router)** | Nền tảng chính, SSR & Client Components. |
| **Backend/DB** | **Supabase (PostgreSQL)** | Lưu trữ dữ liệu bài hát, user và playlist. |
| **Storage** | **Supabase Storage** | Lưu trữ file MP3 và hình ảnh thực tế. |
| **Auth** | **Supabase SSR** | Quản lý người dùng và phiên đăng nhập. |
| **Styling** | **Vanilla CSS + Tailwind** | Thiết kế Glassmorphism & Neon Aesthetics. |
| **State** | **React Context API** | Quản lý Player, Liked Songs, và Playlists. |

---

## 📅 3. Nhật ký Tiến độ (Progress Log)

| Ngày | Trạng thái | Nội dung đã hoàn thành |
| :--- | :--- | :--- |
| **04/04/2026** | ✅ Done | Khởi tạo dự án độc lập, kết nối Supabase, Music Player toàn cục. |
| **04/04/2026** | ✅ Done | Xây dựng hệ thống Upload "Nebula" (Storage & Database). |
| **05/04/2026** | ✅ Done | Chuyển đổi sang Supabase Auth, gỡ bỏ hoàn toàn Spotify dependencies. |
| **05/04/2026** | ✅ Done | Hoàn thiện tính năng **Yêu thích** (Like/Unlike) với Optimistic UI. |
| **05/04/2026** | ✅ Done | Tái thiết kế **Library Dashboard**, gộp Liked Songs và Sidebar. |
| **05/04/2026** | ✅ Done | Triển khai **Custom Playlist System**: Tạo playlist và thêm nhạc linh hoạt. |
| **07/04/2026** | ✅ Done | Thiết lập **Toast Notification System** toàn cục và tối ưu hóa **Race Condition** cho Like/Playlist. |

---

## 🎯 4. Mục tiêu tiếp theo (Next Milestones)

Dựa trên tầm nhìn "Cộng đồng Âm nhạc", chúng ta sẽ tiến tới giai đoạn **Mạng xã hội Âm nhạc**:

- [ ] **Trang Profile Cá nhân:** Tạo không gian riêng cho từng nghệ sĩ/người dùng. Hiển thị danh sách bài hát họ đã Upload và các Playlist họ muốn giới thiệu.
- [ ] **Public Playlist & Sharing:** Thêm tính năng "Công khai/Riêng tư" cho Playlist. Cho phép người dùng khác có thể vào xem và nghe các Playlist được công khai.
- [ ] **Featured Playlists (Discover):** Thêm mục tiêu điểm trên trang chủ để giới thiệu các Playlist nổi bật nhất trong toàn bộ hệ thống Nebula.
- [ ] **Playlist Following:** Cho phép người dùng "Theo dõi" Playlist của người khác để cập nhật nhạc mới thường xuyên.

---

> [!TIP]
> **Ghi chú:** Chúng ta đã đi được một chặng đường rất dài từ một app nghe nhạc bình thường sang một nền tảng có thể quản lý hàng ngàn bài hát và playlist. Hãy giữ vững phong độ này cho các tính năng cộng đồng sắp tới! 🚀
