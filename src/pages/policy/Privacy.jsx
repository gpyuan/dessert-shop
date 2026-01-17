import React from "react";

const Privacy = () => {
  return (
    <main className="policy-page-wrapper">
      <div className="policy-page">
        <h1>隱私權政策</h1>
        <p>
          我們非常重視您的個人資料保護，並遵守相關隱私權法規。請您安心使用本網站的各項服務。
        </p>
        <section>
          <h2>一、蒐集的資料類型</h2>
          <p>當您使用本網站服務時，我們可能會蒐集以下資訊：</p>
          <ul>
            <li>姓名、聯絡電話、電子郵件</li>
            <li>配送地址與訂單相關資訊</li>
            <li>瀏覽行為（如頁面瀏覽紀錄，用於改善網站體驗）</li>
          </ul>
        </section>
        <hr />
        <section>
          <h2>二、資料使用目的</h2>
          <p>蒐集之資料將用於以下用途：</p>
          <ul>
            <li>處理訂單與配送服務</li>
            <li>客戶聯絡與售後服務</li>
            <li>行銷活動與優惠通知（僅限您同意的情況下）</li>
            <li>網站服務優化與使用分析</li>
          </ul>
        </section>
        <hr />
        <section>
          <h2>三、資料保護與安全</h2>
          <ul>
            <li>
              我們採取合理的資訊安全措施，防止個人資料遭到未經授權的存取或洩漏。
            </li>
            <li>僅限必要人員在業務範圍內存取您的資料。</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Privacy;
