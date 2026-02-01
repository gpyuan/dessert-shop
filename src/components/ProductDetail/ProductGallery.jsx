import { useState } from "react";
import "./ProductDetailContent.css";

const ProductGallery = ({ images = [], name }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="product-gallery">
      {/* 縮圖 */}
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((img, index) => (
            <button
              key={img}
              className={`thumb ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={img} alt={`${name}縮圖${index}+1`} />
            </button>
          ))}
        </div>
      )}

      {/* 主圖片 */}
      <div className="gallery-main">
        <img src={images[activeIndex]} alt={`${name} ${activeIndex + 1}`} />
      </div>
    </div>
  );
};

export default ProductGallery;
