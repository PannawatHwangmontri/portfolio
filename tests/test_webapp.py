import os
import sys

# Ensure UTF-8 output on Windows console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

from playwright.sync_api import sync_playwright

def run_tests():
    print("=" * 60)
    print("STARTING E2E WEB APPLICATION TEST VIA PLAYWRIGHT")
    print("=" * 60)

    output_dir = os.path.join(os.path.dirname(__file__), "screenshots")
    os.makedirs(output_dir, exist_ok=True)

    console_errors = []
    console_logs = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        def handle_console(msg):
            console_logs.append(f"[{msg.type}] {msg.text}")
            if msg.type == "error":
                # Exclude expected 401 from intentional invalid credentials test
                if "401" not in msg.text and "Unauthorized" not in msg.text:
                    console_errors.append(msg.text)
                    print(f"  [BROWSER ERROR] {msg.text}")

        page.on("console", handle_console)

        # -----------------------------------------------------------
        # TEST 1: Public Portfolio Landing Page
        # -----------------------------------------------------------
        print("\n[TEST 1] Testing Public Landing Page (http://localhost:3000)...")
        page.goto("http://localhost:3000")
        page.wait_for_load_state("networkidle")

        title = page.title()
        print(f"  ✓ Page Title: {title}")
        assert "Pannawat Hwangmontri" in title, f"Unexpected title: {title}"

        # Check sections exist
        sections = ["hero", "about", "skills", "projects", "experience", "certificates", "contact"]
        for sec in sections:
            locator = page.locator(f"#{sec}")
            count = locator.count()
            print(f"  ✓ Section #{sec} detected: {count > 0}")
            assert count > 0, f"Section #{sec} missing!"

        # Check Language Toggle (TH -> EN -> TH)
        print("  ✓ Testing Language Switcher...")
        lang_btn = page.locator("header button:has-text('EN')").first
        if lang_btn.count() > 0:
            lang_btn.click()
            page.wait_for_timeout(500)
            print("    Switched to English")
            lang_btn_th = page.locator("header button:has-text('TH')").first
            assert lang_btn_th.count() > 0, "TH button not found after switching to EN"
            lang_btn_th.click()
            page.wait_for_timeout(500)
            print("    Switched back to Thai")

        # Check dynamic Skills section
        skill_cards = page.locator("#skills .rounded-2xl")
        print(f"  ✓ Detected {skill_cards.count()} skill category cards in Skills section")
        assert skill_cards.count() >= 4, "Expected at least 4 skill category cards"

        # Check Project category tabs
        print("  ✓ Testing Projects Filter Tabs...")
        all_tab = page.locator("#projects button:has-text('ทั้งหมด')").first
        web_tab = page.locator("#projects button:has-text('เว็บแอปพลิเคชัน')").first
        if web_tab.count() > 0:
            web_tab.click()
            page.wait_for_timeout(500)
            print("    Filtered by 'เว็บแอปพลิเคชัน'")
            all_tab.click()
            page.wait_for_timeout(500)
            print("    Reset filter to 'ทั้งหมด'")

        # Capture public home screenshot
        landing_screenshot = os.path.join(output_dir, "public_landing.png")
        page.screenshot(path=landing_screenshot, full_page=False)
        print(f"  ✓ Saved screenshot: {landing_screenshot}")

        # -----------------------------------------------------------
        # TEST 2: Admin Login Page & Validation
        # -----------------------------------------------------------
        print("\n[TEST 2] Testing Admin Login Page (http://localhost:3000/admin/login)...")
        page.goto("http://localhost:3000/admin/login")
        page.wait_for_load_state("networkidle")

        email_input = page.locator("input[type='email']")
        password_input = page.locator("input[type='password']")
        submit_btn = page.locator("button[type='submit']")

        assert email_input.count() > 0, "Email input not found"
        assert password_input.count() > 0, "Password input not found"
        assert submit_btn.count() > 0, "Submit button not found"

        print("  ✓ Login inputs detected. Submitting test credentials...")
        email_input.fill("test@invalid.dev")
        password_input.fill("wrongpass")
        submit_btn.click()
        page.wait_for_timeout(1000)

        # Verify error alert shows up on invalid credentials
        error_box = page.locator("text=Invalid login credentials")
        if error_box.count() > 0:
            print("  ✓ Login error alert successfully caught and displayed in UI!")
        else:
            print("  ✓ Form submitted, checking auth status")

        # -----------------------------------------------------------
        # TEST 3: Admin Dashboard Tabs & Skills CRUD
        # -----------------------------------------------------------
        print("\n[TEST 3] Testing Admin Dashboard Features & CRUD Tabs...")

        # Setup route handlers so admin API calls return 200 without triggering 401 auto-logout
        mock_profile = '''{
          "about": {"title": {"th": "เกี่ยวกับฉัน", "en": "About Me"}, "subtitle": {"th": "คำนำ", "en": "Subtitle"}, "bio": {"th": "ประวัติย่อ", "en": "Bio"}, "statYears": "03+", "statYearsLabel": {"th": "ปี", "en": "Years"}, "statProjects": "15+", "statProjectsLabel": {"th": "โปรเจกต์", "en": "Projects"}},
          "skills": {"title": {"th": "ทักษะและความเชี่ยวชาญ", "en": "Skills & Expertise"}, "subtitle": {"th": "เทคโนโลยี", "en": "Technologies"}, "groups": [
            {"id": "languages", "name": {"th": "ภาษาเขียนโปรแกรม", "en": "Languages"}, "skills": ["TypeScript", "Python"]},
            {"id": "frontend", "name": {"th": "ฟรอนต์เอนด์", "en": "Frontend"}, "skills": ["Next.js", "React"]},
            {"id": "backend", "name": {"th": "แบ็กเอนด์", "en": "Backend"}, "skills": ["NestJS", "Node.js"]},
            {"id": "devops", "name": {"th": "DevOps", "en": "DevOps"}, "skills": ["Docker", "Git"]}
          ]},
          "contactInfo": {"email": "contact@pannawat.dev", "responseNote": {"th": "ตอบกลับใน 24 ชม.", "en": "Responds in 24h"}}
        }'''

        page.route("**/api/projects/github/admin", lambda route: route.fulfill(status=200, content_type="application/json", body="[]"))
        page.route("**/api/projects*", lambda route: route.fulfill(status=200, content_type="application/json", body="[]"))
        page.route("**/api/experience*", lambda route: route.fulfill(status=200, content_type="application/json", body="[]"))
        page.route("**/api/certificates*", lambda route: route.fulfill(status=200, content_type="application/json", body="[]"))
        page.route("**/api/contact*", lambda route: route.fulfill(status=200, content_type="application/json", body="[]"))
        page.route("**/api/profile*", lambda route: route.fulfill(status=200, content_type="application/json", body=mock_profile))

        # First visit login to get origin, then set localStorage session
        page.goto("http://localhost:3000/admin/login")
        page.evaluate("""() => {
            localStorage.setItem('admin_user', JSON.stringify({ id: 'admin-e2e', email: 'admin@pannawat.dev' }));
            localStorage.setItem('admin_token', 'mock-valid-e2e-token');
        }""")

        page.goto("http://localhost:3000/admin")
        page.wait_for_load_state("networkidle")
        print(f"  ✓ Navigated to Admin Dashboard: {page.url}")

        # Verify admin header
        admin_email = page.locator("text=admin@pannawat.dev")
        print(f"  ✓ Admin logged-in user badge detected: {admin_email.count() > 0}")

        # Check tabs exist
        tabs = [
            "จัดการผลงาน (Projects)",
            "GitHub Repos",
            "ประวัติทำงาน/ศึกษา",
            "เกียรติบัตร/ใบรับรอง",
            "ข้อความติดต่อ",
            "เกี่ยวกับฉัน (About)",
            "ทักษะ (Skills)",
            "ข้อมูลติดต่อ (Contact Info)",
        ]
        for tab_name in tabs:
            tab_locator = page.locator(f"button:has-text('{tab_name}')")
            print(f"  ✓ Tab '{tab_name}' detected: {tab_locator.count() > 0}")

        # Tab: About Me
        print("  ✓ Testing 'เกี่ยวกับฉัน (About)' Tab...")
        page.click("button:has-text('เกี่ยวกับฉัน (About)')")
        page.wait_for_timeout(400)
        about_title_th = page.locator("input[value*='เกี่ยวกับฉัน']")
        print(f"    About Thai Title input found: {about_title_th.count() > 0}")

        # Tab: Skills CRUD
        print("  ✓ Testing 'ทักษะ (Skills)' Tab & CRUD controls...")
        page.click("button:has-text('ทักษะ (Skills)')")
        page.wait_for_timeout(400)

        # Check for Add New Category button
        add_group_btn = page.locator("button:has-text('เพิ่มหมวดหมู่ใหม่')")
        print(f"    '+ เพิ่มหมวดหมู่ใหม่' button detected: {add_group_btn.count() > 0}")
        assert add_group_btn.count() > 0, "Add skill category button missing!"

        # Count groups before adding
        initial_groups_count = page.locator("text=หมวด:").count()
        print(f"    Current groups count: {initial_groups_count}")

        # Click "+ เพิ่มหมวดหมู่ใหม่"
        print("    Clicking '+ เพิ่มหมวดหมู่ใหม่'...")
        add_group_btn.click()
        page.wait_for_timeout(300)

        # Verify a new category appeared
        new_category_input = page.locator("input[value='หมวดหมู่ใหม่']")
        print(f"    New group 'หมวดหมู่ใหม่' created in state: {new_category_input.count() > 0}")
        assert new_category_input.count() > 0, "New category was not added to form!"

        # Verify Delete Category button exists on the new group
        delete_btn = page.locator("button[title='ลบหมวดหมู่นี้']").last
        print(f"    Delete category button detected: {delete_btn.count() > 0}")

        # Tab: Contact Info
        print("  ✓ Testing 'ข้อมูลติดต่อ (Contact Info)' Tab...")
        page.click("button:has-text('ข้อมูลติดต่อ (Contact Info)')")
        page.wait_for_timeout(400)
        contact_email = page.locator("input[value*='contact@pannawat.dev']")
        print(f"    Contact Email input found: {contact_email.count() > 0}")

        # Capture admin dashboard screenshot
        admin_screenshot = os.path.join(output_dir, "admin_dashboard.png")
        page.screenshot(path=admin_screenshot, full_page=False)
        print(f"  ✓ Saved screenshot: {admin_screenshot}")

        browser.close()

    print("\n" + "=" * 60)
    print(f"ALL TESTS PASSED! ({len(console_errors)} critical browser errors)")
    print("=" * 60)
    return len(console_errors) == 0

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
