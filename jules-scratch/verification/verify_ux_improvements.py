from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Verify Home page
    page.goto("http://localhost:3000")
    title_locator = page.get_by_test_id("how-it-works-title")
    title_locator.scroll_into_view_if_needed()
    page.wait_for_timeout(500) # Wait for reveal animation
    expect(title_locator).to_have_text("A single platform, endless impact")
    page.screenshot(path="jules-scratch/verification/home_page.png")

    # Verify Solution page and Tabs component
    page.goto("http://localhost:3000/solution")
    expect(page.get_by_text("The Rewards Platform for Climate Action")).to_be_visible()

    # Click on the "MRV Engine" tab
    mrv_tab = page.get_by_role("button", name="MRV Engine")
    mrv_tab.click()

    # Wait for the content to be visible
    expect(page.get_by_text("Real-time MRV Engine")).to_be_visible()

    page.screenshot(path="jules-scratch/verification/solution_page_mrv_tab.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)