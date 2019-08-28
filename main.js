const puppeteer = require("puppeteer-core");

// 华晨宇
const TESTING = false;
const URL =
  "https://detail.damai.cn/item.htm?spm=a2oeg.search_category.0.0.64d14d15QU8n7L&id=598182156683&clicktitle=2019%E5%8D%8E%E6%99%A8%E5%AE%87%E2%80%9C%E7%81%AB%E6%98%9F%E2%80%9D%E6%BC%94%E5%94%B1%E4%BC%9A%E6%B7%B1%E5%9C%B3%E7%AB%99";
const TICKET_TYPE = 2; // 0 indexed
const TICKET_NUM = 2;
const YEAR = 2019;
const MONTH = 7;
const DATE = 20;
const HOURS = 14;
const MINUTES = 7;
const SECONDS = 0;

// 周杰伦
/*
const TESTING = true;
const URL =
  "https://detail.damai.cn/item.htm?spm=a2oeg.home.card_0.ditem_0.6d7123e1R6BX9G&id=597705805772";
const TICKET_TYPE = 2; // 0 indexed
const TICKET_NUM = 2;
const YEAR = 2019;
const MONTH = 7;
const DATE = 20;
const HOURS = 12;
const MINUTES = 44;
const SECONDS = 0;
*/

/**
 *
 * @param {puppeteer.Browser} browser
 */
async function processToClickBuyBtn(browser) {
  const page = await browser.newPage();
  await page.goto(URL);
  await page.evaluate(
    ({ TICKET_NUM, TICKET_TYPE }) => {
      // Choose type of tickets
      const ticketItems = document.querySelectorAll(
        ".select_right_list_item.sku_item"
      );
      const ticketItem = ticketItems[TICKET_TYPE];
      if (ticketItem) {
        ticketItem.click();
      }

      // Choose number of tickets
      const upBtn = document.querySelector(
        ".cafe-c-input-number-handler.cafe-c-input-number-handler-up"
      );
      if (upBtn) {
        for (let i = 0; i < TICKET_NUM - 1; i++) {
          upBtn.click();
        }
      }

      // Click the buy button
      const interval = setInterval(() => {
        const buyBtn = document.querySelector(".buybtn");
        if (!buyBtn) {
          return;
        }
        if (buyBtn.classList.contains("disabled")) {
          return;
        } else {
          clearInterval(interval);
          buyBtn.click();
        }
      }, 100);
    },
    { TICKET_NUM, TICKET_TYPE }
  );

  await page.waitForNavigation();
  await page.waitFor(".buyer-list-item .next-checkbox input");
  await page.evaluate(
    async ({ TESTING }) => {
      // Select buyers
      const checkboxes = document.querySelectorAll(
        ".buyer-list-item .next-checkbox"
      );
      for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        if (checkbox && !checkbox.classList.contains("checked")) {
          checkbox.click();
        }
      }
      for (let i = 0; i < checkboxes.length; i++) {
        const input = checkboxes[i].querySelector("input");
        if (input && !input.getAttribute("aria-checked") === "true") {
          input.click();
        }
      }

      // Check license
      const licenseCheckboxInput = document.querySelector(
        ".term-wrapper-top input"
      );
      if (
        licenseCheckboxInput &&
        !licenseCheckboxInput.hasAttribute("checked")
      ) {
        licenseCheckboxInput.click();
      }

      // Click the buy button
      const buyBtn = document.querySelector(".submit-wrapper button");
      if (buyBtn) {
        if (!TESTING) {
          buyBtn.click();
        } else {
          console.log("Clicked buy button");
        }
      }
    },
    { TESTING }
  );
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    userDataDir: "./data",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false
  });

  // Run in advance
  processToClickBuyBtn(browser);

  // Run -1s to 1s
  for (let i = -1000; i <= 1000; i += 500) {
    const now = new Date();
    const millisTill =
      new Date(YEAR, MONTH - 1, DATE, HOURS, MINUTES, SECONDS, i) - now;
    setTimeout(function() {
      processToClickBuyBtn(browser);
    }, millisTill);
  }
}

main();
