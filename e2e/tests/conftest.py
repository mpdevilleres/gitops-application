import pytest
from playwright.sync_api import Page, expect, Playwright
import os

@pytest.fixture(scope="session")
def base_url():
    # Use localhost:10000 as requested
    return "http://localhost:10000"

@pytest.fixture(scope="function")
def page(playwright: Playwright, base_url: str):
    # Launch browser
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    
    # Create a new page
    page = context.new_page()
    
    # Navigate to the app
    page.goto(base_url)
    
    yield page
    
    # Clean up after test
    context.close()
    browser.close()