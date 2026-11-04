import os
import sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    page.goto("https://portfolio-pannawat.vercel.app")
    page.wait_for_load_state("networkidle")

    for sec in ["hero", "about", "skills", "projects", "experience", "certificates", "contact"]:
        loc = page.locator(f"#{sec}")
        exists = loc.count() > 0
        text = loc.inner_text() if exists else "NOT FOUND"
        print(f"=== SECTION #{sec} ===")
        print(text[:200] + "..." if len(text) > 200 else text)
        print()

    browser.close()
