import { CartIcon } from "./icons/cartIcon";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

export function ProductCard({ product }) {
  const { cart, setCart } = useContext(CartContext);
  const Navigate = useNavigate();

  const clickProduct = () => {
    Navigate(`/product/${product.name}`);
  };

  const addToCart = () => {
    let index = cart.items.findIndex(
      (item) => item.productId === product.productId,
    );
    if (index !== -1) {
      setCart({
        ...cart,
        items: cart.items.map((item) => {
          if (item.productId === product.productId) {
            item.quantity += 1;
          }
          return item;
        }),
        total: cart.total + product.price,
      });
    } else {
      let cartProduct = {
        ...product,
        quantity: 1,
      };
      setCart({
        ...cart,
        items: [...cart.items, cartProduct],
        total: cart.total + +product.price,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      <div className="card-container ">
        <div className=" cursor-pointer" onClick={clickProduct}>
          <div className="card-image w-60 h-60">
            <img
              className=" object-cover object-top  w-60 h-60 "
              src={product.images.split(",")[0]}
            />
          </div>

          <div className="card-context m-1 h-10">
            <p className=" text-sm font-bold">{product.name}</p>
          </div>
        </div>

        <div className="card-footer p-2 flex mx-1 border-t-2">
          <div className="price flex items-center flex-1">
            <p className=" text-lg font-bold">{product.price} S.P</p>
          </div>
          <div className="card-buttons flex justify-center items-center">
            <button
              className="bg-primary py-1.5 px-3 flex justify-center items-center ml-2  rounded-lg transition-transform hover:scale-95"
              onClick={addToCart}
            >
              <div className="w-6">
                <CartIcon color={"#f2f0ea"} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
ProductCard.propTypes = {
  product: PropTypes.object,
};
