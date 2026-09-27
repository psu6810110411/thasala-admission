<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

<h1 align="center">🏫 Thasala Admission Portal</h1>

<p align="center">
  <strong>ระบบรับสมัครนักเรียนออนไลน์ โรงเรียนท่าศาลาประสิทธิ์ศึกษา จ.นครศรีธรรมราช</strong><br/>
  <em>Online Admission & Student Registration Platform for Thasala Prasitsuksa School (ท.ศ.)</em>
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/psu6810110411/thasala-admission?style=flat-square&color=f59e0b" alt="Last Commit" />
  <img src="https://img.shields.io/badge/colors-%E0%B9%80%E0%B8%97%E0%B8%B2%E2%80%94%E0%B9%87%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%87-475569?style=flat-square&logoColor=f59e0b" alt="School Colors" />
  <img src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square" alt="License" />
</p>

---

## 📖 เกี่ยวกับโปรเจกต์

**Thasala Admission Portal** เป็นเว็บแอปพลิเคชันระบบรับสมัครนักเรียนออนไลน์สำหรับ **โรงเรียนท่าศาลาประสิทธิ์ศึกษา** อ.ท่าศาลา จ.นครศรีธรรมราช รองรับการสมัครเข้าศึกษาต่อในระดับชั้นมัธยมศึกษาปีที่ 1 และ 4 ทั้งห้องเรียนพิเศษ (SMTP, EP, CNP, DEP) และห้องเรียนปกติ 

ตัวระบบเน้นประสบการณ์ใช้งานที่ราบรื่น (Smooth UX), อนิเมชันที่ทันสมัย (Dynamic Animations) และออกแบบมาให้เป็นมิตรทั้งกับนักเรียนที่สมัครด้วยตนเอง และผู้ปกครองที่สมัครให้บุตรหลาน ภายใต้อัตลักษณ์สีประจำโรงเรียน **สีเทา - สีเหลือง**

### 🏛️ อัตลักษณ์โรงเรียนท่าศาลาประสิทธิ์ศึกษา
* **สีประจำโรงเรียน:** **สีเทา - สีเหลือง**
  * **สีเทา:** มันสมอง (ปัญญาความรู้ ความสุขุม รอบคอบ)
  * **สีเหลือง:** คุณธรรม (ความดีงาม ศีลธรรม และความสว่างไสว)
* **ปรัชญา:** *"ปญฺญา นรนํ รตนํ"* (ปัญญาเป็นรัตนะของนรชน)
* **คำขวัญ:** *"มีวินัย ใฝ่เรียนรู้ เชิดชูคุณธรรม สัมพันธ์ชุมชน"*
* **อักษรย่อ:** ท.ศ.

---

## ✨ ฟีเจอร์หลัก (Key Features)

- 👥 **Dual Persona Switch** — สลับโหมดการสมัครระหว่าง **"นักเรียนสมัครเอง"** (UI สดใส รวดเร็ว เข้าใจง่าย) กับ **"ผู้ปกครองสมัครให้"** (ฟอนต์อ่านง่าย มีคำอธิบายขั้นตอนชัดเจน)
- 🪄 **Dynamic & Interactive Animations** — ประสบการณ์เลื่อนเปลี่ยนขั้นตอนด้วย Framer Motion นุ่มนวล ไม่โหลดหน้ารีเฟรช
- 📋 **Smart Multi-Step Application Wizard**:
  - **Step 1: เลือกแผนการเรียน** — ห้องเรียนพิเศษ (SMTP / EP / CNP / DEP) หรือ ห้องเรียนปกติ พร้อมคำนวณคุณสมบัติ GPAX ขั้นต่ำ
  - **Step 2: ข้อมูลส่วนตัว & ครอบครัว** — ประวัติผู้สมัคร โรงเรียนเดิม และข้อมูลผู้ปกครอง
  - **Step 3: แนบเอกสารหลักฐาน** — อัปโหลด ปพ.1, ทะเบียนบ้าน, รูปถ่ายหน้าตรง พร้อมพรีวิวและระบบตรวจจับขนาดไฟล์
  - **Step 4: สรุปและยืนยันข้อมูล** — ตรวจสอบความถูกต้องก่อนส่งใบสมัคร
- 💾 **Auto-Save Draft** — บันทึกร่างข้อมูลอัตโนมัติบนเครื่อง ป้องกันข้อมูลสูญหายเมื่อเน็ตหลุดหรือปิดแท็บ
- 🔍 **No-Password Status Tracking** — ตรวจสอบสถานะการสมัคร นัดสอบสัมภาษณ์ และผลการคัดเลือกด้วย **เลขบัตรประชาชน + วันเกิด**
- 🖨️ **PDF Application & Exam Pass** — สร้างใบสมัครและบัตรประจำตัวผู้เข้าสอบอัตโนมัติพร้อม Barcode/QR Code
- 🛡️ **Admin & Committee Portal** — ระบบหลังบ้านสำหรับครูตรวจเอกสาร ยืนยันสิทธิ์ และ Export รายชื่อผู้สมัครเป็น Excel

---

## 🗺️ แผนการพัฒนา & สถานะความคืบหน้า (Roadmap & Progress)

> ดูรายละเอียดเชิงลึกของแผนงานสถาปัตยกรรมและเทคนิคได้ที่ [`plan.md`](./plan.md)

| เฟส (Phase) | ขอบเขตงาน | สถานะ | ความคืบหน้า |
|:---|:---|:---:|:---|
| **Phase 1: Foundation & Design System** | ติดตั้ง Core Libs, Palette สีเทา-เหลือง, ฟอนต์ไทย (Prompt/Sarabun), Shared Navbar & Footer | 🟢 เสร็จสิ้น | 100% |
| **Phase 2: Landing Page & Program Tracks** | Hero Section, Live Countdown, การ์ดหลักสูตร (SMTP/EP), เส้นเวลากำหนดการ | 🟡 ถัดไป | 0% |
| **Phase 3: Dual-Mode Application Wizard** | สลับโหมดนักเรียน/ผู้ปกครอง, ฟอร์ม 4 สเต็ป, Drag & Drop เอกสาร, Auto-save draft | ⚪ รอดำเนินการ | 0% |
| **Phase 4: Status Tracking & PDF Exam Pass** | ค้นหาด้วยเลขบัตร ปชช. + วันเกิด, ออกบัตรประจำตัวผู้เข้าสอบ PDF ติด QR Code | ⚪ รอดำเนินการ | 0% |
| **Phase 5: Admin & Committee Portal** | แผงตรวจเอกสาร Side-by-side, ระบบอนุมัติสิทธิ์, ส่งออกรายงาน Excel | ⚪ รอดำเนินการ | 0% |
| **Phase 6: Performance & SEO Polish** | Core Web Vitals (LCP < 2.5s), OpenGraph สำหรับแชร์ Facebook/LINE, Accessibility | ⚪ รอดำเนินการ | 0% |

---

## 🎨 Design System & Palette

| Token | รหัสสี | ความหมายในระบบ |
|:---|:---:|:---|
| **Primary Gray (Charcoal)** | `#1E293B` | สีพื้นหลังหลัก / ตัวอักษรหลัก (ความหนักแน่น สติปัญญา) |
| **Slate Gray** | `#64748B` | สีตัวอักษรรอง เส้นขอบ และโครงสร้าง Layout |
| **Accent Gold (Yellow)** | `#F59E0B` | สีไฮไลต์ ปุ่ม Action, สถานะ และแบนเนอร์เด่น (คุณธรรม) |
| **Warm Amber Light** | `#FEF3C7` | พื้นหลังการ์ดสถานะ / ป้ายกำกับ (Badge) |
| **Soft Surface** | `#F8FAFC` | พื้นหลังหน้าเว็บ สบายตา อ่านง่าย |

---

## 🚀 เริ่มต้นใช้งาน (Getting Started)

### ⚙️ ข้อกำหนดเบื้องต้น (Prerequisites)

| ซอฟต์แวร์ | เวอร์ชันขั้นต่ำ | คำสั่งตรวจสอบ |
|:---|:---:|:---|
| **Node.js** | `v20.x` หรือใหม่กว่า | `node -v` |
| **npm** | `v10.x` หรือใหม่กว่า | `npm -v` |
| **Git** | `v2.x` | `git --version` |

### 📥 1. โคลนและติดตั้ง Dependencies

```bash
# โคลน Repository
git clone https://github.com/psu6810110411/thasala-admission.git
cd thasala-admission

# ติดตั้ง Dependencies
npm install
```

### 🔐 2. การตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ที่ Root directory:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SCHOOL_NAME="โรงเรียนท่าศาลาประสิทธิ์ศึกษา"
```

### ▶️ 3. รัน Development Server

```bash
npm run dev
```

เปิดบราวเซอร์ที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

---

## 🏗️ โครงสร้างโปรเจกต์ (Project Structure)

```
thasala-admission/
├── 📄 rule.md                  ← กฎเหล็กและการเขียนโค้ดสำหรับ AI Agent
├── 📄 README.md                ← เอกสารแนะนำโปรเจกต์ (ไฟล์นี้)
├── 📁 public/                  ← ไฟล์ Static (รูปตราโรงเรียน, Favicon, SVG)
└── 📁 src/
    ├── 📁 app/                 ← Next.js App Router
    │   ├── 📄 layout.tsx       ← Root Layout & Web Fonts
    │   ├── 📄 page.tsx         ← หน้าแรก (Hero & Portal Selector)
    │   ├── 📄 globals.css      ← Tailwind CSS v4 Theme & Custom Tokens
    │   ├── 📁 apply/           ← หน้าฟอร์มรับสมัครแบบ Multi-Step
    │   ├── 📁 status/          ← หน้าติดตามสถานะและพิมพ์บัตรสอบ
    │   └── 📁 admin/           ← แผงควบคุมสำหรับคุณครู/กรรมการรับสมัคร
    ├── 📁 components/          ← UI Components
    │   ├── 📁 ui/              ← ShadCN & Base Primitives
    │   ├── 📁 admission/       ← คอมโพเนนต์ฟอร์มรับสมัครแต่ละ Step
    │   └── 📁 shared/          ← Navbar, Footer, Persona Switcher
    ├── 📁 lib/                 ← Utility functions, Validation schemas
    └── 📁 types/               ← TypeScript Interfaces & Enums
```

---

## 🌿 Git Workflow & Commit Convention

> [!IMPORTANT]
> เพื่อความเป็นระเบียบและติดตามงานได้ง่าย โปรเจกต์นี้ใช้ **[Conventional Commits](https://www.conventionalcommits.org/)**

```
<type>(<scope>): <description>
```

| Type | Emoji | การใช้งาน | ตัวอย่าง |
|:---|:---:|:---|:---|
| `feat` | ✨ | เพิ่มฟีเจอร์ใหม่ | `feat(apply): add step 1 program selection` |
| `fix` | 🐛 | แก้ไขข้อผิดพลาด | `fix(status): correct student ID query condition` |
| `style` | 💄 | ปรับแต่ง UI / สีเทา-เหลือง | `style(hero): update badge styling to warm gold` |
| `refactor`| ♻️ | ปรับปรุงโครงสร้างโค้ด | `refactor(form): modularize step validation logic` |
| `docs` | 📝 | อัปเดตคู่มือหรือเอกสาร | `docs: add environment setup guide` |
| `chore` | 🔧 | งานตั้งค่าหรืออัปเกรด Lib | `chore: update dependencies` |

---

## 👥 ทีมพัฒนา (Developer)

| ผู้พัฒนา | ช่องทางติดต่อ (Instagram) | หน้าที่รับผิดชอบ |
|:---|:---:|:---|
| **Arinchxi___** | [📸 @arinchxi___](https://www.instagram.com/arinchxi___/) | Lead Full-Stack Developer |

---

<p align="center">
  <sub>โรงเรียนท่าศาลาประสิทธิ์ศึกษา ต.ท่าศาลา อ.ท่าศาลา จ.นครศรีธรรมราช 80160</sub><br/>
  <sub>© 2026 Thasala Prasitsuksa School Admission Portal — All Rights Reserved</sub>
</p>
