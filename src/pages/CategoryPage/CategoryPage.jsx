import { useParams } from "react-router-dom";
import products from "../../products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();

  const filterProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <div className="category-page">
      <h1 className="category-title">
        {category === "festival" && "節慶禮盒"}
        {category === "cookies" && "餅乾專區"}
        {category === "cakes" && "蛋糕專區"}
      </h1>

      <div className="category-product-list">
        {filterProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
