import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import { config } from './src/config/config'
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(),],
  base: '/',           // เน้นย้ำ path สากลสำหรับ asset
  server: {
    open: "/home",
    // port: 3000,    // เปลี่ยน port
    // host: true,    // ให้เข้าจากเครือข่ายได้
    // strictPort: false, // ถ้า port ถูกใช้อยู่ จะเลือก port ใหม่อัตโนมัติ
  }
})
