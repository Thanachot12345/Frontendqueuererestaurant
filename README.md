## 👥 จัดทำโดย

* นายกษิดิศ ทรงศิลป์  6652300877  
* นายพิภพ มณีวรรณ์   6652300095  
* นายสรวิชณ์ หอยสังข์  6652300061  
* นายรพีภัทร คณะพล   6652300681  
* นายธนโชติ วงศ์รู้คุณ  6652300664  

---

 ## 🍽️ Queue Restaurant Frontend

ระบบ Queue Management / Reservation System สำหรับร้านอาหาร
พัฒนาด้วย React + Vite + Tailwind CSS และ Deploy บน Amazon S3 Static Website Hosting (Auto Deploy ผ่าน GitHub Actions)
---

## 📂 โครงสร้างโปรเจกต์

```plaintext
├── public/                 # ไฟล์ static เช่น icon, favicon
├── src/
│   ├── components/          # UI components (ปุ่ม, card, layout ฯลฯ)
│   ├── pages/               # หน้าเว็บหลัก เช่น Home, Reserve, TicketStatus
│   ├── router/              # กำหนดเส้นทาง (React Router)
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point ของ React
├── vite.config.ts           # การตั้งค่า Vite
├── tailwind.config.js       # การตั้งค่า Tailwind
├── package.json
└── README.md
```

---

## 🧭 Flow ของระบบ 

<p align="center">
  <img src="./public/image/frontend-peer.jpg" alt="System Flow" width="500"/>
</p>

---

## 🔧 การทำงานของระบบ

### 1.ผู้ใช้นำลิงก์
ผู้ใช้เข้าลิงก์ S3 Website Endpoint หรือ Domain ที่ชี้มาที่ S3

### 2.S3 Static Hosting
S3 ส่ง index.html + bundle (JS/CSS) ให้ผู้ใช้

### 3.React
Mount <div id="root"> และ render UI

### 4.React Router
ควบคุมเส้นทาง

* /home → หน้าแรก

* /reserve → จองคิว

* /ticketstatus → สถานะคิว

* /confirmattendance → ยืนยันการมา

* /searchtickets → ค้นหาตั๋ว

### 5.การทำงานแบบ SPA
ทุกการเปลี่ยนหน้าเกิดที่ฝั่ง Client (SPA) → ไม่ reload ทั้งหน้า

---

## 🚀 การ Deploy (AWS Amplify Hosting)

1. Push โค้ดขึ้น GitHub

```bash
git add .
git commit -m "update"
git push origin main
```

2. GitHub Actions workflow จะ trigger อัตโนมัติ

* ติดตั้ง dependency: `npm ci`
* build โปรเจกต์: `npm run build`
* deploy ไฟล์ `dist/` ไปที่ Static Hosting

3. ผู้ใช้เปิดเว็บผ่าน S3 Website Endpoint

---

## ภาพการ depolyของfrontend

<p align="center">
  <img src="./public/image/depoly-frontend.png" alt="System Flow" width="500"/>
</p>

## ภาพการ depolyของbackend

<p align="center">
  <img src="./public/image/depoly-backend.png" alt="System Flow" width="500"/>
</p>

## ภาพการทำload test

<p align="center">
  <img src="./public/image/load-test.png" alt="System Flow" width="500"/>
</p>



