import "./policy.css";

const Shipping = () => {
  return (
    <main className="policy-page-wrapper">
      <div className="policy-page">
        <h1>配送須知</h1>
        <section>
          <h2>配送方式</h2>
          <p>
            本店商品皆以常溫超商店到店配送，若訂購禮盒類不符超商尺寸規定，則以黑貓宅急便配送。
          </p>
        </section>
        <hr />
        <section>
          <h2>出貨時間</h2>
          <p>完成付款後 2–3 個工作天內出貨（不含假日）。</p>
        </section>
        <hr />
        <section>
          <h2>注意事項</h2>
          <ul>
            <li>請確保收件資訊正確</li>
            <li>節慶期間配送可能延遲</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Shipping;
