# NexTech OC — Next.js Website

## 🚀 Quick Start

### 1. Install Node.js
Download from: https://nodejs.org (choose LTS version)

### 2. Open Terminal / Command Prompt
Navigate to this folder:
```
cd nextechoc
```

### 3. Install dependencies
```
npm install
```

### 4. Run locally (development)
```
npm run dev
```
Then open: http://localhost:3000

### 5. Build for production
```
npm run build
```
This creates an `out/` folder with your static site.

### 6. Deploy to Netlify
Drag and drop the `out/` folder to Netlify Drop, OR
connect your GitHub repo and set build command to `npm run build` and publish directory to `out`.

---

## 📁 Project Structure

```
nextechoc/
├── components/
│   ├── Header.jsx      ← Shared nav (used on all pages)
│   └── Footer.jsx      ← Shared footer (used on all pages)
├── pages/
│   ├── index.jsx       ← Homepage (design-B-v3.html converted)
│   ├── blog.jsx        ← Blog listing page
│   ├── blog/
│   │   └── [slug].jsx  ← Individual blog post page
│   └── api/
│       └── contact.js  ← Contact form API (working!)
├── styles/
│   └── globals.css     ← All styles (combined from all HTML files)
├── public/
│   └── images/         ← PUT YOUR IMAGES HERE
│       ├── hero-tech.jpg       (620×480px — IT engineer at monitors)
│       ├── team-meeting.jpg    (560×340px — team around a table)
│       └── office.jpg          (520×260px — office exterior or map)
└── next.config.js
```

---

## 🖼 Adding Images

Images go in the `public/images/` folder.
Then replace the placeholder `img-slot` divs in the JSX with:
```jsx
<img src="/images/hero-tech.jpg" alt="IT engineer" style={{width:'100%',height:'420px',objectFit:'cover'}} />
```

You can add images at ANY TIME — before or after deployment!

---

## 📧 Making the Contact Form Send Real Emails

The contact form is set up and working. To receive email notifications:

1. Sign up at https://resend.com (free — 3,000 emails/month)
2. Get your API key
3. Add it to Netlify environment variables: `RESEND_API_KEY=your_key_here`
4. Uncomment the Resend code in `pages/api/contact.js`

---

## 🌐 Deploying

The site exports as static HTML (no server needed).
Build command: `npm run build`
Publish directory: `out`

Set these in Netlify → Site configuration → Build settings.
