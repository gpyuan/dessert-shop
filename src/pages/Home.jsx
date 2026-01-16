import products from "../products";
import ProductSection from "../components/ProductSection";
import "./Home.css";

const festivalProducts = products.filter(
  (product) => product.category === "festival"
);

const cookiesProducts = products.filter(
  (product) => product.category === "cookies"
);

const cakesProducts = products.filter(
  (product) => product.category === "cakes"
);

const Home = () => {
  return (
    <div className="home">
      <ProductSection
        title="節慶禮盒"
        products={festivalProducts}
        linkTo="/products/festival"
      />
      <ProductSection
        title="餅乾專區"
        products={cookiesProducts}
        linkTo="/products/cookies"
      />
    </div>
  );
};

export default Home;
