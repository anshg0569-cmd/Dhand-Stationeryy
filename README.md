# Dhand Stationery - Cloud Computing College Project

**Dhand Stationery** is a modern, responsive frontend-only e-commerce web application developed as a college project for **Cloud Computing / Web Technologies**.

---

## 📌 Project Overview
- **Store Name:** Dhand Stationery
- **Domain:** Local retail stationery shop selling school bags, notebooks, pens, small kids' toys, keyrings, art supplies, and desk essentials.
- **Contact Phone:** 983212349 (+91 983212349)
- **Contact Email:** shivamdhand@gmail.com
- **Currency:** Indian Rupees (₹)
- **Architecture:** Static Jamstack Single Page Application (SPA)
- **Database/Backend:** None required. Uses HTML5 `localStorage` for state persistence (Cart, User Session, and Order History).
- **Target Deployment Platform:** Netlify (Static Cloud Web Hosting)

---

## 🚀 Key Features

1. **4 Clean, Functional Pages:**
   - **Home Page:** Storefront banner, store features, category links, trending bestsellers, and student discount banner.
   - **Shop Page:** Live product search, category filtering buttons, price and rating sorting, and product grid.
   - **Cart & Checkout Page:** Quantity adjustment (`+` / `-`), item removal, coupon codes (`STUDENT10` & `DHAND50`), order summary breakdown (Subtotal, 5% GST, Delivery), customer delivery form, and simulated order placement with invoice generation.
   - **Login & Register Page:** Frontend authentication with 1-click test credentials ("Demo Student" & "Demo Teacher"), session management via `localStorage`, and past order history.

2. **College Cloud Computing Highlights:**
   - **Edge CDN Distribution:** Static assets cached on global Content Delivery Networks with near-zero latency.
   - **Serverless & Zero Maintenance:** Eliminates the need for 24/7 database and backend virtual machine running costs.
   - **Offline & Local Storage:** Stores data in the client's browser using HTML5 `localStorage`.

---

## ☁️ How to Deploy on Netlify (2 Easy Options)

### Option A: Netlify Drop (Fastest - Drag & Drop)
1. Run the build command in your terminal:
   ```bash
   npm run build
   ```
2. This creates a `dist/` folder containing the compiled HTML, CSS, JavaScript, and images.
3. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your web browser.
4. Drag and drop the `dist` folder into the Netlify Drop box.
5. Your website is instantly deployed with a free `*.netlify.app` public URL!

### Option B: GitHub Repository CI/CD
1. Push this project to your GitHub repository.
2. In Netlify, click **"Add new site" > "Import an existing project"**.
3. Select your GitHub repository.
4. Use the pre-configured build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. The included `netlify.toml` and `public/_redirects` files automatically configure routing.

---

## 📂 Source Code Structure
```
├── public/
│   └── _redirects            # Netlify SPA routing fallback
├── src/
│   ├── assets/images/        # Product and storefront photography
│   ├── components/
│   │   ├── Navbar.tsx        # Top navigation with cart counter & project link
│   │   ├── Footer.tsx        # Local store address, timings & project info
│   │   ├── ProductCard.tsx   # Individual product card with quick add
│   │   ├── ProductModal.tsx  # Product specs and quantity picker modal
│   │   ├── OrderSuccessModal.tsx # Invoice receipt & order confirmation
│   │   ├── ProjectGuideModal.tsx # In-app viva & Netlify deployment guide
│   │   └── Toast.tsx         # Notification feedback
│   ├── context/
│   │   └── ShopContext.tsx   # Central state & localStorage persistence
│   ├── data/
│   │   └── products.ts       # Authentic product catalog in INR (₹)
│   ├── pages/
│   │   ├── HomePage.tsx      # Page 1: Hero & Featured Showcase
│   │   ├── ShopPage.tsx      # Page 2: Catalog, Search & Filters
│   │   ├── CartPage.tsx      # Page 3: Cart, Coupons & Checkout
│   │   └── AuthPage.tsx      # Page 4: Login, Register & Order History
│   ├── types/
│   │   └── index.ts          # TypeScript models
│   ├── App.tsx               # Root page router & layout
│   ├── main.tsx              # Application entry point
│   └── index.css             # Tailwind CSS & Typography setup
├── netlify.toml              # Netlify cloud configuration
└── package.json              # Project dependencies & build scripts
```

---

## 🎓 Academic Viva Questions & Answers
- **Q: Why does this application not need a backend?**
  *A:* It uses modern Jamstack principles where the frontend is pre-compiled into static HTML, JS, and CSS files. Dynamic user state (cart, auth session, orders) is maintained reliably on the client side using the standard HTML5 `localStorage` Web Storage API.
- **Q: How does Netlify handle page reloads without a 404?**
  *A:* Netlify uses the `public/_redirects` file (`/* /index.html 200`) and `netlify.toml` to redirect all route requests to `index.html`, allowing the client-side router to render the corresponding page view seamlessly.
