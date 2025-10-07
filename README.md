<div align="center">
  <h1>Bandai / Gundam Store (MERN)</h1>
  <strong>Lightweight ecommerce demo for model kits & figures</strong><br/>
  <sub>MongoDB · Express · React 18 · Node · MUI</sub>
  <br/><br/>
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-6.x-green?logo=mongodb" />
  <img alt="Express" src="https://img.shields.io/badge/Express-4.x-black" />
  <img alt="React" src="https://img.shields.io/badge/React-18.x-61dafb?logo=react" />
  <img alt="Node" src="https://img.shields.io/badge/Node.js-16%2B-43853d?logo=node.js" />
  <img alt="MUI" src="https://img.shields.io/badge/MUI-5.x-007FFF?logo=mui" />
</div>

## 1. Demo
<p align="center">
  <img src="docs/demo-home.png" alt="Home" width="830" />
</p>
<p align="center">
  <img src="docs/demo-categories.png" alt="Featured Categories" width="830" />
</p>
<p align="center">
  <img src="docs/demo-featured.png" alt="Featured Items" width="830" />
</p>
<p align="center">
  <img src="docs/demo-shop-gunpla.png" alt="Shop Gunpla" width="830" />
</p>
<p align="center">
  <img src="docs/demo-cart.png" alt="Cart Modal" width="700" />
</p>
<p align="center">
  <img src="docs/demo-wishlist.png" alt="Wishlist" width="830" />
</p>

## 2. Features
- Dynamic featured categories & newest items per category
- Product card: secondary image on hover
- Quick add to cart / wishlist buttons
- Cart modal with running total
- Wishlist with badge counter
- Seed script: `npm run seed`, `node seed.js --force`, `node seed.js --append`

## 3. Quick Start
```bash
# Server
cd server
npm install
cp .env.example .env   # then edit MONGO_URI
npm run dev

# Client (new terminal)
cd client
npm install
npm start
```
Default API base: http://localhost:5000/api

## 4. Environment
`server/.env`:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
`client/.env`:
```
REACT_APP_API_BASE_URL=http://localhost:5000
```

## 5. Seed Data
```bash
cd server
npm run seed          # insert initial if empty
node seed.js --append # add only new items
node seed.js --force  # wipe & reinsert
```
Images directory: `server/public/<category>/<filename>`

## 6. API (minimal)
`GET /api/items?category=gunpla&limit=8`

## 7. Stack
React 18, React Router 6, MUI, Axios, Express 4, Mongoose 6.

## 8. Roadmap
- Persist cart & wishlist (localStorage)
- Authentication + admin CRUD
- Search, filters & pagination
- Image optimization / lazy loading

---
Built for learning & portfolio presentation.



