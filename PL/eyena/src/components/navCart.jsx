import { useState } from "react";
import { Link } from "react-router-dom";
import { CartIcon } from "./icons/cartIcon";

export const NavCart = ({ cart }) => {
  const [showCart, setShowCart] = useState(false);
  const handleShowCart = () => setShowCart(!showCart);

  return (
    <div className="relative">
      <div className="w-8 cursor-pointer" onClick={handleShowCart}>
        <CartIcon color="#010101" />
      </div>
      <span className="absolute -right-1 -top-[0.6rem] text-sm">
        {cart.items.length}
      </span>
      {showCart && (
        <div className="absolute top-10 -right-40 sm:right-0 w-80 rounded-md bg-slate-200 border z-40">
          <div className="w-full px-4 py-2 border-b-2 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6">
                <CartIcon color="#010101" />
              </div>
              <h2 className="font-bold">Cart</h2>
            </div>
            <div>
              <span>Total:</span>
              <span>{cart.total}$</span>
            </div>
          </div>
          {cart.items.length > 0 ? (
            <>
              <ul className="w-full px-4 py-2 flex flex-col gap-4 border-b-2 max-h-40 overflow-y-auto">
                {cart.items.map((item) => (
                  <li key={item.productId} className="flex gap-2">
                    <div className="w-16 h-16 rounded-md overflow-hidden">
                      <img
                        src={item.images.split(",")[0]}
                        alt={item.name}
                        className="w-full h-full object-fill"
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between gap-3 text-sm font-bold">
                        <span>{item.name}</span>
                        <span>{item.price}$</span>
                      </div>
                      <div>{item.category}</div>
                      <div>quantity: {item.quantity}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="w-full p-4 flex">
                <Link
                  to="/checkout"
                  className="w-full px-4 py-2 text-center transition-custom border border-primary rounded-md hover:bg-primary hover:text-secondary"
                >
                  Checkout
                </Link>
              </div>
            </>
          ) : (
            <div className="w-full p-4 flex justify-center items-center">
              <span className="text-sm">Cart is empty</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
