from playwright.sync_api import sync_playwright
import time
import os

OUTPUT_DIR = "/Users/uzaypoyraz/LaunchSpace/screenshots"
URL = "https://creative-begin-359916.framer.app/"

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # --- DESKTOP (1440px) ---
        print("Capturing desktop screenshots (1440px)...")
        page = browser.new_page(viewport={'width': 1440, 'height': 900})
        page.goto(URL, wait_until='networkidle', timeout=60000)
        # Wait for animations to settle
        time.sleep(5)

        # Full page screenshot
        page.screenshot(path=os.path.join(OUTPUT_DIR, "desktop_full_page.png"), full_page=True)
        print("  Saved desktop_full_page.png")

        # Above the fold
        page.screenshot(path=os.path.join(OUTPUT_DIR, "desktop_above_fold.png"), full_page=False)
        print("  Saved desktop_above_fold.png")

        # Scroll through page and capture sections
        total_height = page.evaluate("document.body.scrollHeight")
        viewport_height = 900
        section = 1
        scroll_pos = 0
        while scroll_pos < total_height:
            page.evaluate(f"window.scrollTo(0, {scroll_pos})")
            time.sleep(1.5)  # Wait for scroll-triggered animations
            page.screenshot(
                path=os.path.join(OUTPUT_DIR, f"desktop_section_{section}.png"),
                full_page=False
            )
            print(f"  Saved desktop_section_{section}.png (scroll: {scroll_pos}px / {total_height}px)")
            scroll_pos += viewport_height - 100  # overlap by 100px
            section += 1

        page.close()

        # --- MOBILE (390px) ---
        print("\nCapturing mobile screenshots (390px)...")
        page = browser.new_page(viewport={'width': 390, 'height': 844})
        page.goto(URL, wait_until='networkidle', timeout=60000)
        time.sleep(5)

        # Full page screenshot
        page.screenshot(path=os.path.join(OUTPUT_DIR, "mobile_full_page.png"), full_page=True)
        print("  Saved mobile_full_page.png")

        # Above the fold
        page.screenshot(path=os.path.join(OUTPUT_DIR, "mobile_above_fold.png"), full_page=False)
        print("  Saved mobile_above_fold.png")

        # Scroll through page and capture sections
        total_height = page.evaluate("document.body.scrollHeight")
        viewport_height = 844
        section = 1
        scroll_pos = 0
        while scroll_pos < total_height:
            page.evaluate(f"window.scrollTo(0, {scroll_pos})")
            time.sleep(1.5)
            page.screenshot(
                path=os.path.join(OUTPUT_DIR, f"mobile_section_{section}.png"),
                full_page=False
            )
            print(f"  Saved mobile_section_{section}.png (scroll: {scroll_pos}px / {total_height}px)")
            scroll_pos += viewport_height - 100
            section += 1

        page.close()
        browser.close()
        print("\nAll screenshots captured successfully!")

if __name__ == "__main__":
    capture_screenshots()
