import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/cartContext";
import { AuthContext } from "../../contexts/authContext";
import { XIcon } from "../../components/icons/xIcon";
import { Address } from "./address";
import { Payment } from "./payment";
import { Link, useNavigate } from "react-router-dom";

export const CheckOut = () => {
  const [stage, setStage] = useState(1);
  const [address, setAddress] = useState({});
  const [card, setCard] = useState({});

  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    if (!userData) {
      navigate("/signin");
    }
  }, [navigate, userData]);

  const changeStage = (address) => {
    setAddress({
      ...address,
    });
    if (stage === 1) setStage(2);
  };
  const pervStage = () => {
    if (stage === 2) setStage(1);
  };

  const Checkout = (cardInfo) => {
    setCard(cardInfo);
    setCart({
      items: [],
      total: 0,
    });
    navigate("/delivering");
  };

  const deleteItem = (index) => {
    setCart({
      ...cart,
      items: cart.items.filter((item, i) => i !== index),
      total:
        cart.total - +cart.items[index].price * +cart.items[index].quantity,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <>
      <div className="flex flex-col p-5 md:flex-row md:h-[calc(100vh-66px)] ">
        <div className="check-out flex-col justify-center items-center flex-grow md:p-10  md:w-2/3">
          <h1 className=" text-2xl font-bold border-b-4 inline-block self-center md:text-4xl md:border-b-0 md:mb-5">
            Check Out
          </h1>
          <div className="steps flex justify-evenly md:justify-center">
            <h1 className="m-5 font-bold text-xl">
              {" "}
              <span
                className={
                  (stage === 1 ? "bg-yellow-light" : "bg-secondary") +
                  " p-2 px-4 rounded-full mr-2"
                }
              >
                1
              </span>{" "}
              Address
            </h1>
            <h1 className="m-5 font-bold text-xl">
              {" "}
              <span
                className={
                  (stage === 2 ? "bg-yellow-light" : "bg-secondary") +
                  " p-2 px-4 rounded-full mr-2"
                }
              >
                2
              </span>{" "}
              Payment
            </h1>
          </div>

          {stage === 1 ? (
            <Address changeStage={changeStage} />
          ) : (
            <Payment pervStage={pervStage} checkOutFunction={Checkout} />
          )}
        </div>
        <div className="my-cart border-t-2 py-2 flex flex-col md:border-l-2 md:border-t-0 px-5 md:w-1/3 rounded-lg shadow-md">
          <h1 className="font-extrabold text-xl mb-5">My Cart</h1>
          {cart.items.map((product, index) => {
            return (
              <div
                key={index}
                className="cart-item bg-secondary my-2 rounded-lg p-2"
              >
                <div className="float-left">
                  <Link
                    to={`/product/${product.productId}`}
                    className="font-bold hover:opacity-80"
                  >
                    {product.name}
                  </Link>
                  <div className="flex gap-7">
                    <p>Price: ${product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
                <button
                  className="float-right hover:animate-spin"
                  onClick={() => deleteItem(index)}
                >
                  <div className="w-8">
                    <XIcon color={"#010101"} />
                  </div>
                </button>
              </div>
            );
          })}
          <p className=" font-extrabold text-xl self-end">
            Total : ${cart.total}
          </p>
        </div>
      </div>
    </>
  );
};
