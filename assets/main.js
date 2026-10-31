/* 只做三件小事：填年份、填域名、填邮箱。 */
(() => {
  "use strict";

  const CONFIG = {
    // 留空则自动取当前访问的域名（去掉 www.）
    brand: "",
    // 留空则页脚不显示邮箱
    email: "",
  };

  const byId = (id) => document.getElementById(id);

  const yearEl = byId("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const brandEl = byId("brand");
  if (brandEl) {
    const host = location.hostname.replace(/^www\./, "");
    brandEl.textContent = CONFIG.brand || host || "本站";
  }

  const mailEl = byId("mail");
  if (mailEl && CONFIG.email) {
    mailEl.href = "mailto:" + CONFIG.email;
    mailEl.textContent = CONFIG.email;
    mailEl.hidden = false;
  }
})();
