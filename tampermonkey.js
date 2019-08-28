// ==UserScript==
// @name         Project Barley
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Try to harvest the barley
// @author       shd101wyy
// @match        https://*.damai.cn/*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  // 修改以下变量
  const playID = 598182156683; // 演出网址上的数字 id，
  // 例如网址 https://detail.damai.cn/item.htm?id=598182156683 的表示的 id 就是 598182156683
  const playType = 1; // 场次，由 0 开始，从左至右
  const ticketType = 2; // 票档，由 0 开始，从左至右
  const ticketNum = 2; // 票数，至少为 1
  const viewers = ["王二二", "王三三"]; // 观演人的名字数组，例如 ["王二二", "王三三"]
  const paymentMethod = 0; // 支付方式（不建议修改此项），由 0 开始，从左至右

  if (document.URL.indexOf(playID.toString()) < 0) {
    console.log(`[info] 未启动自动抢票 id=${playID}`);
    return;
  } else {
    console.log(`[info] 启动自动抢票脚本 id=${playID}`);
  }

  function waitForTimeout(timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve();
      }, timeout);
    });
  }

  async function automateTheDetailPage() {
    console.log("[info] automating the detail page. 正在地自动化详情页面");
    // Choose play, ticket type
    const plays = document.querySelectorAll(".select_right_list_item");
    if (plays && playType < plays.length) {
      plays[playType].click();
    }
    await waitForTimeout(500);
    const tickets = document.querySelectorAll(
      ".select_right_list_item.sku_item"
    );
    if (tickets && ticketType < tickets.length) {
      tickets[ticketType].click();
    }

    // Choose number of tickets
    const upBtn = document.querySelector(
      ".cafe-c-input-number-handler.cafe-c-input-number-handler-up"
    );
    if (upBtn) {
      for (let i = 0; i < ticketNum - 1; i++) {
        upBtn.click();
      }
    }

    await waitForTimeout(500);

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
    }, 5);
  }

  async function automateThePurchasePage() {
    console.log("[info] automating the purchase page. 正在地自动化购买页面");
    // Add viewers
    const labels = document.querySelectorAll(".next-checkbox-label");
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      viewers.forEach(viewer => {
        if (viewer.trim() === label.innerText.trim()) {
          label.parentElement.click();
          return;
        }
      });
    }

    // Select payment method
    if (paymentMethod > 0) {
      const payments = document.querySelectorAll(".dm-pay-type-item-wrapper");
      if (payments && paymentMethod < payments.length) {
        payments[paymentMethod].click();
      }
    }

    // Check the term checker
    const termChecker = document.querySelector(
      '.term-wrapper input[type="checkbox"]'
    );
    if (termChecker && !termChecker.checked) {
      termChecker.click();
    }

    // Click the buy button
    const interval = setInterval(() => {
      const buyBtn = document.querySelector(".submit-wrapper button");
      if (!buyBtn) {
        return;
      }
      if (buyBtn.classList.contains("disabled")) {
        return;
      } else {
        clearInterval(interval);
        console.log("[info] 提交订单！");
        buyBtn.click();
      }
    }, 5);
  }

  window.addEventListener("load", async () => {
    console.log(`[info] 页面加载完毕`);
    if (document.URL.indexOf("https://detail.damai.cn") >= 0) {
      await automateTheDetailPage();
    } else if (document.URL.indexOf("https://buy.damai.cn") >= 0) {
      await automateThePurchasePage();
    }
  });
})();
