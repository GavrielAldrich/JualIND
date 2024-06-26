export const Product_view = ({ data }) => {
  let orderInfo;

  switch (data.game_name) {
    case "mobile_legend":
      orderInfo = (
        <div className="input-order-container">
          <p>User ID</p>
          <input type="text" name="user_id" placeholder="Contoh: 12345" />
          <p>Zone ID</p>
          <input type="text" name="zone_id" placeholder="Contoh: 2020" />
          <p>Catatan untuk Penjual (Optional)</p>
          <input type="text" name="seller_note" />
        </div>
      );
      break;
    default:
      orderInfo = null;
  }


  return (
    <section id="product">
      <div className="product-data-container">
        {/* Render product image and details */}
        <img src={`http://localhost:5000/files/${data.item_image}`} alt={data.item_title} />
        <h3>{data.item_title}</h3>
        <h2>Rp {data.item_price}</h2>
      </div>

      <aside className="order-information-container">
        <h5>Informasi Pesanan</h5>
        {orderInfo}
        
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
