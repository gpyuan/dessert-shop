const ProductInfo = ({ product }) => {
  return (
    <div className="product-info">
      <h1 className="product-title">{product.name}</h1>
      <p className="product-description" style={{ whiteSpace: "pre-line" }}>
        {product.description}
      </p>
      <p className="product-price">NT${product.price}</p>
    </div>
  );
};

export default ProductInfo;
