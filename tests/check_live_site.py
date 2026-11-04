import os
import sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    failed_requests = []
    page.on("requestfailed", lambda req: failed_requests.append(f"{req.method} {req.url} - {req.failure}"))
    page.on("console", lambda msg: print(f"CONSOLE [{msg.type}]: {msg.text}"))

    print("Navigating to https://portfolio-pannawat.vercel.app ...")
    page.goto("https://portfolio-pannawat.vercel.app")
    page.wait_for_load_state("networkidle")

    print("\nFailed requests:")
    for fr in failed_requests:
        print("  -", fr)

    # Check experience section text and HTML
    exp_elem = page.locator("#experience")
    print("\nExperience section text content:")
    print(exp_elem.inner_text())

    # Take screenshot
    screenshot_path = os.path.join(os.path.dirname(__file__), "screenshots", "live_experience.png")
    exp_elem.screenshot(path=screenshot_path)
    print(f"\nScreenshot saved to {screenshot_path}")

    browser.close()
