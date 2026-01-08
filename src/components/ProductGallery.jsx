import "./ProductDetailContain.css";

const ProductGallery = ({ images, name }) => {
  return (
    <div className="product-gallery">
      <div className="product-gallery-image">
        <img src={images[0]} alt={name} />
      </div>
    </div>
  );
};

export default ProductGallery;
