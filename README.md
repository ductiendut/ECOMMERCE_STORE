<div align="center">
  <h1>Bandai / Gundam Store (MERN)</h1>
  <strong>Full-stack ecommerce demo for scale model & figure products (Gunpla, Figures, Model Kits, Accessories)</strong><br/>
  <sub>MongoDB • Express • React 18 • Node • MUI • Bootstrap</sub>
  <br/>
  <br/>
  <img alt="Tech" src="https://img.shields.io/badge/MongoDB-6.x-green?logo=mongodb" />
  <img alt="Express" src="https://img.shields.io/badge/Express-4.x-black" />
  <img alt="React" src="https://img.shields.io/badge/React-18.x-61dafb?logo=react" />
  <img alt="Node" src="https://img.shields.io/badge/Node.js-16%2B-43853d?logo=node.js" />
  <img alt="MUI" src="https://img.shields.io/badge/MUI-5.x-007FFF?logo=mui" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue" />
</div>

---

## 📌 Tổng quan / Overview
Ứng dụng MERN giúp hiển thị & duyệt sản phẩm theo danh mục, xem chi tiết, thêm vào giỏ (client state), wishlist, tìm kiếm đơn giản (trong tương lai) và seed dữ liệu mẫu nhanh với script. Dự án được tối ưu để học & thử nghiệm chứ chưa phải bản production.

## ✨ Features
| Module | Highlights |
|--------|------------|
| Home | Hero banner, dynamic featured categories, curated newest items per category |
| Category Navigation | Click category → auto-scroll in unified Shop page via query parameter (`/shop?category=...`) |
| Product Cards | Second image preview on hover, quick add to wishlist/cart |
| Wishlist | In-memory wish list with badge counter |
| Cart | Modal-based cart, quantity tracking, total calculation |
| Data Seeding | Deterministic seed script with dual-image guarantee per product |
| Static Assets | Served via Express `public/` per category for simplified CDN swap later |

### Design / Architectural Decisions
- Keep cart & wishlist client-side (simple context) to focus on product browsing UX first.
- Use query parameter navigation instead of multiple category routes to reduce route complexity.
- Each product keeps an array of image metadata (future-proof for alt text / variants).
- Seed script flags (`--force`, `--append`) → predictable dev data lifecycle.
- Image naming convention: `<prefix>-<entity>-<variant>.jpg` to allow scripted validation later.

### What This Demonstrates (For CV)
- Practical context management (multiple contexts: Cart, Wishlist, Search, Featured Categories)
- Lightweight server with filtered querying (`/api/items?category=&limit=`)
- Progressive enhancement approach (fallback images, graceful loading states)
- Separation of concerns (API layer `api.js`, UI, contexts, data model)
- Extensible model schema (supports future pricing tiers / stock / attributes)

## 🗂 Cấu trúc thư mục rút gọn
```
mern-ecommerce/
  client/               # React frontend
    src/
      api.js            # Axios instance + buildImageUrl helper
      routes/            # Home, CategoryView, ItemView, Search ...
      components/        # UI components (Card, Featured, Shop, Nav...)
      Context/           # Cart, Wishlist, Search, FeaturedCategory context
  server/
    server.js           # Express app khởi động API + serve static images
    models/itemsModel.js
    controllers/itemsController.js
    routes/items.js     # /api/items (filter ?category=&limit=)
    seed.js             # Seed dữ liệu mẫu Bandai/Gundam
    public/             # Ảnh sản phẩm (gunpla/ figure/ ...)
```

## 🔧 Yêu cầu hệ thống
- Node.js >= 16
- MongoDB (Atlas hoặc local)

## ⚙️ Cấu hình môi trường (server/.env)
Tạo file `server/.env`:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<your-user>:<your-pass>@<cluster>/<db>?retryWrites=true&w=majority
```

## 🧪 Data Seeding
Script: `server/seed.js`

Commands (run inside `server/`):
```bash
npm run seed          # Insert initial dataset if empty
node seed.js --append # Insert only new items (idempotent by name)
node seed.js --force  # Wipe category items then reinsert full dataset
```

Image prerequisites: place matching files in `server/public/<category>/<filename>` (already structured for sample dataset).

## ▶️ Chạy dự án cục bộ
Mở 2 terminal (hoặc dùng split pane).

Terminal 1 (Server):
```bash
cd server
npm install
npm run dev   # dùng nodemon
```

Terminal 2 (Client):
```bash
cd client
npm install
npm start
```

Mặc định frontend gọi API: `http://localhost:5000/api/...`

## 🛣 API chính
| Method | Endpoint            | Query               | Mô tả |
|--------|---------------------|---------------------|-------|
| GET    | /api/items          | ?category=&limit=   | Lấy danh sách sản phẩm (lọc theo category + giới hạn) |
| POST   | /api/payment        | body {amount,...}   | (Placeholder) tạo URL thanh toán (demo) |

Response mẫu `/api/items`:
```json
[
  {
    "_id": "...",
    "name": "HG 1/144 Aerial (WfM)",
    "category": "gunpla",
    "price": 18,
    "image": [ { "filename": "placeholder-gunpla-aerial.jpg" }, { "filename": "placeholder-gunpla-aerial1.jpg" } ]
  }
]
```

## 🖼 Ảnh & helper
- Ảnh tĩnh: `server/public/<category>/<filename>`
- Frontend helper: `buildImageUrl(category, filename)` tạo URL như: `http://localhost:5000/<category>/<filename>`

## 🔍 Điều hướng & Routing
- Category card: `/shop?category=gunpla` (auto scroll tới section)
- Route cũ `/category/:id` vẫn tồn tại (CategoryView) nhưng trang chủ đã chuyển sang cơ chế query param.

## 🚧 Roadmap / Next Steps
- [ ] Persist cart + wishlist to localStorage
- [ ] Add product search (server-side filtering & indexing)
- [ ] Authentication & JWT session (user accounts, protected routes)
- [ ] Admin panel (CRUD products, bulk image upload)
- [ ] Pricing / inventory fields (stock, discount, pre-order flag)
- [ ] Centralized error boundary + toast system
- [ ] Responsive image optimization / lazy loading
- [ ] Unit + integration tests (Jest / React Testing Library / Supertest)
- [ ] Docker compose for one-command startup

## 🧱 Công nghệ
- React 18 + React Router 6
- Material UI + Bootstrap
- Axios
- Express 4 + Mongoose 6
- Multer (chuẩn bị cho upload)

## 🐛 Current Limitations / Trade-offs
- Cart & wishlist not persisted across reloads (intentional simplification)
- No authentication / authorization layer yet
- Payment route is placeholder (stub for integration approach)
- No pagination or server-side sorting (client handles small dataset)
- Minimal error handling / validation on create/update (not exposed yet)

## 📜 License
Demo học tập – tùy chỉnh tự do. (Chưa khai báo license chính thức.)

## 🙋 Hỗ trợ / Góp ý
Mở Issue hoặc tạo Pull Request nếu muốn cải thiện.

---
### EN (Summary for Recruiters)
Learning-focused MERN ecommerce demo showcasing: dynamic category navigation, context-driven state (cart/wishlist), deterministic data seeding, clean component structure, and pragmatic architectural decisions. Designed to illustrate front-end + back-end integration patterns and readiness for extension (auth, admin, scalability).

Enjoy building & customizing! 🤖
