import "./Announcement.css";

const Announcement = () => {
  return (
    <main className="announcement-wrapper">
      <div className="announcement">
        <h1>賣場公告</h1>{" "}
        <section>
          <h2>注意事項</h2>
          <p>本工作室為一人工作，恕不能指定到貨時間</p>
        </section>
        <hr />
        <section>
          <h2>保存方法</h2>
          <p>
            <span style={{ color: "red" }}>【重要】</span>
            收到包裹後請立即開箱檢查，並依包裝標示存入冰箱。鮮奶油系列建議於 3
            日內食用完畢，以品嚐最佳風味。
          </p>
        </section>
        <hr />
        <section>
          <h2>行政公告</h2>
          <p>
            沐鹿工作室每個月15日公休，當日自取服務暫停一次，官網下單功能正常運作，出貨時間順延一日。
          </p>
        </section>
      </div>
    </main>
  );
};

export default Announcement;
