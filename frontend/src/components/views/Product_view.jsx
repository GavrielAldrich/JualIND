export const Product_view = ({ data }) => {
  return (
    <section id="product">
      <div className="product-data-container">
        {/* ada image harusnya */}
        <h3>{data.item_title}</h3>
        <h2>Rp {data.item_price}</h2>
      </div>

      <aside className="order-information-container">
        <h5>Informasi Pesanan</h5>
        {data.game_name === "mobile_legend" && (
          <div className="input-order-container">
            <p>User ID</p>
            <input type="text" name="" id="" placeholder="Contoh: 12345" />
            <p>Zone ID</p>
            <input type="text" name="" id="" placeholder="Contoh: 2020" />
            <p>Catatan untuk Penjual (Optional)</p>
            <input type="text" />
          </div>
        )}

        <div className="buy-container">
          <div className="subtotal-container">
            <p>Subtotal</p>
            <p>Rp{data.item_price}</p>
          </div>
          <div className="order-button-container">
            <button>Chat Penjual</button>
            <button>+ Troli</button>
            <button>Beli Sekarang</button>
          </div>
        </div>
      </aside>
    </section>
  );
};
