# 📜 Thasala Admission — Rules & Guidelines for AI Agents

> **⚠️ MANDATORY: AI ทุกตัวต้องอ่านไฟล์นี้ และ `README.md` ให้จบก่อนเริ่มเขียนโค้ดทุกครั้ง**

---

## 🔴 กฎเหล็ก (Iron Rules) — ห้ามละเมิดเด็ดขาด

### Rule 1: Read First, Code Later
```
❌ เริ่มเขียนโค้ดทันทีโดยไม่อ่านเอกสาร
✅ อ่าน rule.md → README.md → วิเคราะห์โค้ดที่เกี่ยวข้อง → แล้วจึงเริ่มทำงาน
```
**ก่อนแก้ไขหรือเขียนโค้ดใดๆ ให้ทำตามลำดับนี้:**
1. อ่าน `rule.md` (ไฟล์นี้) ทั้งหมด
2. อ่าน `README.md` เพื่อเข้าใจภาพรวมและเอกลักษณ์โรงเรียน
3. ตรวจสอบประเภทข้อมูล (Types/Schemas) ก่อนเขียนฟอร์มหรือ API
4. ตรวจสอบ Design System (สีเทา-เหลือง) ให้ตรงตามอัตลักษณ์โรงเรียน

---

### Rule 2: No Hallucination / No Guessing
```
❌ เดาชื่อ field name, type, หรือ file path
❌ สมมุติว่า function/component มีอยู่แล้วโดยไม่ตรวจสอบ
❌ คิดหลักสูตรหรือเกณฑ์การรับสมัครขึ้นมาเองโดยไม่อิงระเบียบการจริง
✅ ตรวจสอบโค้ดจริงก่อนเสมอ — ถ้าไม่แน่ใจ ให้ถามผู้ใช้
```
**เมื่อไม่แน่ใจ ให้ทำ:**
1. ค้นหาในโค้ดก่อน (`grep`, ดูไฟล์ที่เกี่ยวข้อง)
2. ถ้าหาไม่เจอหรือเป็น Business Logic ของโรงเรียน → **หยุดและถามผู้ใช้ทันที**

---

### Rule 3: Atomic Commits
```
❌ ทำเสร็จก้อนใหญ่หลายส่วนแล้ว commit รวมกันทีเดียว
❌ commit message กว้างเกินไป เช่น "update code", "fix bugs"
✅ commit บ่อยๆ แยกตามงานย่อย ใช้ Conventional Commits format
```

**Commit Convention:**
```
<type>(<scope>): <description>
```

| Type | ใช้เมื่อ | ตัวอย่าง |
|:---|:---|:---|
| `feat` | เพิ่มฟีเจอร์ใหม่ | `feat(admission): add student multi-step registration wizard` |
| `fix` | แก้ไขข้อผิดพลาด | `fix(form): resolve validation error on citizen ID field` |
| `style` | ปรับแต่ง UI / สไตล์ | `style(hero): apply gray and yellow theme to banner` |
| `refactor` | ปรับโครงสร้างโค้ด | `refactor(upload): extract document preview component` |
| `docs` | เอกสาร | `docs: update rule.md with form guidelines` |
| `chore` | งานตั้งค่า/บิลด์ | `chore: configure tailwind colors and shadcn components` |

**Scope ที่ใช้:** `admission`, `form`, `auth`, `admin`, `ui`, `pdf`, `docs`

---

### Rule 4: Tech Stack & Architecture Alignment
```
❌ ติดตั้ง library ซ้ำซ้อนโดยไม่จำเป็น
❌ ใช้ Inline styles หรือเขียน CSS นอก Tailwind pattern
❌ ใช้ class component แทน functional component
❌ ละเลย Responsive Design (ต้องรองรับมือถือความกว้างตั้งแต่ 375px ขึ้นไป)
✅ เขียน functional components ร่วมกับ TypeScript strict mode และ Tailwind CSS
```

---

### Rule 5: Branch-Based Workflow (แยก Branch พัฒนา)
```
❌ commit หรือ push งานใหม่เข้า branch `main` โดยตรง
✅ แตก branch ใหม่ตามเนื้องานเสมอ (feat/..., fix/..., docs/...) แล้ว merge เมื่อเสร็จสมบูรณ์
```

**Branch Naming Convention:**
* `feat/<feature-name>` — ฟีเจอร์ใหม่ เช่น `feat/persona-switcher`, `feat/step1-programs`
* `fix/<bug-name>` — แก้ไขบัก เช่น `fix/gpa-calculation`
* `style/<ui-change>` — ปรับแต่งธีมหรือหน้าตา เช่น `style/theme-gray-yellow`
* `docs/<topic>` — อัปเดตเอกสาร เช่น `docs/readme-update`
* `chore/<task>` — งานตั้งค่า/อัปเกรด เช่น `chore/setup-framer-motion`

**วงจรการทำงาน (Workflow):**
1. อัปเดต main ให้ล่าสุด: `git checkout main && git pull origin main`
2. แตก branch: `git checkout -b feat/<feature-name>`
3. พัฒนาและ commit ตาม Atomic Commits
4. รวมเข้า main (ผ่าน Pull Request หรือ Merge หลังทดสอบผ่าน):
   `git checkout main && git merge --no-ff feat/<feature-name> && git push origin main`
5. ลบ branch เมื่อรวมเสร็จ: `git branch -d feat/<feature-name>`

---

## 🎨 School Identity & Design System (โรงเรียนท่าศาลาประสิทธิ์ศึกษา)

* **สีประจำโรงเรียน:** **สีเทา - สีเหลือง**
  * **สีเทา (Slate / Charcoal):** ตัวแทนของ "ปัญญา / มันสมอง" ให้ความน่าเชื่อถือ หนักแน่น
    * Neutral Dark: `#0F172A`, `#1E293B`, `#334155`
    * Neutral Light: `#F8FAFC`, `#F1F5F9`, `#E2E8F0`
  * **สีเหลือง (Golden Amber / Warm Gold):** ตัวแทนของ "คุณธรรม" สดใส มีพลัง
    * Accent Primary: `#F59E0B` (Amber 500)
    * Accent Hover: `#D97706` (Amber 600)
    * Accent Light: `#FEF3C7` (Amber 100)
* **คำขวัญ:** "มีวินัย ใฝ่เรียนรู้ เชิดชูคุณธรรม สัมพันธ์ชุมชน"
* **ปรัชญา:** "ปญฺญา นรนํ รตนํ" (ปัญญาเป็นรัตนะของนรชน)

---

## ⚠️ ข้อควรระวังเฉพาะ Next.js 16 & Tailwind CSS v4

1. **Next.js 16 Server Actions & Cookies:**
   * ฟังก์ชัน `cookies()` เป็น `async` เสมอ ต้องเรียก `await cookies()`
   * App Router เท่านั้น (`src/app/`)
2. **Tailwind CSS v4:**
   * ไม่มีไฟล์ `tailwind.config.js` การตั้งค่า theme และ custom token กำหนดผ่าน `src/app/globals.css` โดยใช้ `@theme`
3. **Responsive & Mobile First:**
   * ผู้ปกครองและนักเรียนส่วนใหญ่ใช้งานผ่านสมาร์ตโฟน ทุกหน้าและทุกขั้นตอนของฟอร์มต้องทดสอบบนความกว้างอย่างน้อย **375px**

---

## ✅ Checklist ก่อน Commit & Push

- [ ] รัน `npm run build` ผ่านโดยไม่มี error
- [ ] ไม่มี TypeScript type errors (`no any`)
- [ ] คุมโทนสีเทา-เหลืองตาม Design System
- [ ] Responsive ใช้งานได้สมบูรณ์ทั้งมือถือและเดสก์ท็อป
- [ ] ไม่มี `console.log` ตกค้าง
- [ ] Commit message เป็นไปตาม Conventional Commits format
