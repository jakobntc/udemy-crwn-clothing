import SHOP_DATA from "../../shop-data.json";


const Shop = () => {
  return (
    <div>
      {
        SHOP_DATA.map(product => (
          <h1>
            {product.name}
          </h1>
        ))
      }
    </div>
  );
};


export default Shop;