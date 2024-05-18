import { useState, useEffect, useContext } from "react";
import { CartIcon } from "../../components/icons/cartIcon";
import { Footer } from "../../components/footer";
import { RatingStars } from "../../components/ratingStars";
import { useParams } from "react-router-dom";
import { CartContext } from "../../contexts/cartContext";
import { SEO } from "../../components/SEO";

export function ProductPage() {
  const { cart, setCart } = useContext(CartContext);
  const { name } = useParams();
  const [product, setProduct] = useState();
  const [imgIndex, setImgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `http://localhost:8333/api/products/get?name=${name}`,
      );
      const data = await res.json();
      setProduct(data);
      setIsLoading(false);
      window.scrollTo(0, 0);
    }
    fetchData();
  }, [name]);

  const changeImg = (index) => {
    setImgIndex(index);
  };

  const addCart = () => {
    let index = cart.items.findIndex(
      (item) => item.productId === product.productId,
    );
    if (index !== -1) {
      setCart({
        ...cart,
        items: cart.items.map((item) => {
          if (item.productId === product.productId) {
            item.quantity += product.quantity ? Number(product.quantity) : 1;
          }
          return item;
        }),
        total: cart.total + product.price * (product.quantity ?? 1),
      });
    } else {
      let cartProduct = {
        ...product,
        quantity: +product.quantity ?? 1,
      };
      setCart({
        ...cart,
        items: [...cart.items, cartProduct],
        total: cart.total + product.price * (product.quantity ?? 1),
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div>
      {!isLoading && (
        <>
          <SEO title={`Eyena - ${name}`} description={product.description} />
          <div>
            <div className="product-path">
              <p className="text-gray-400 ml-6 w-3/4 capitalize">{`Product > ${product.category} > ${product.name}`}</p>
            </div>
            <div className="product-details-container w-full my-auto mb-12 px-5 py-3 md:flex">
              <div className="images-container md:h-[calc(100vh-66px)] float-right md:w-1/2 flex item-center justify-center mb-3">
                <div className="small-image flex-col justify-center items-center px-1 w-1/4">
                  {product.images.split(",").map((img, index) => {
                    return (
                      <img
                        key={index}
                        className={
                          "rounded-xl h-1/6 flex-shrink-0 my-3 mx-auto " +
                          (index === imgIndex
                            ? "border-2 border-primary animate-pulse "
                            : " ")
                        }
                        src={img}
                        onMouseEnter={() => changeImg(index)}
                      />
                    );
                  })}
                </div>
                <div className="main-image flex flex-shrink-0  mb-5 w-3/4 ">
                  <img
                    className="rounded-lg h-5/6 lg:h-4/6 md:h-4/6 xl:h-5/6 transition-all"
                    src={product.images.split(",")[imgIndex]}
                  />
                </div>
              </div>

              <div className="details md:float-left md:w-1/2 px-6  text-primary">
                <div className="">
                  <h1 className="text-3xl px-5 font-bold tracking-tight ">
                    {product.name}
                  </h1>
                  <div className="md:p-5">
                    <div className="rating">
                      <div className="flex items-center space-x-1">
                        <RatingStars rating={product.rating} />
                      </div>
                    </div>
                    <div className="price my-5">
                      <h1 className="text-2xl font-semibold tracking-tight flex items-center">
                        {product.price} S.P
                      </h1>
                    </div>

                    <div className="quantity flex my-8">
                      <h3 className="mr-6">Quantity</h3>
                      <input
                        className="px-1 rounded text-primary border-2 border-primary w-12 text-center focus:outline-yellow-light"
                        type="number"
                        onChange={(e) => {
                          setProduct({
                            ...product,
                            quantity: e.target.value,
                          });
                        }}
                        value={product.quantity ?? 1}
                        style={{ caretColor: "transparent" }}
                        min={1}
                      />
                    </div>
                    <div className="flex justify-start my-5">
                      <button
                        className="bg-primary text-secondary rounded-lg py-3 px-5 mr-3 w-2/3 flex justify-center items-center transition-transform hover:scale-95"
                        onClick={addCart}
                      >
                        <div className="w-8 h-8 inline-block mr-2">
                          <CartIcon color={"#f2f0ea"} />
                        </div>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                  <div className="my-5">
                    <h4 className="mb-2">Details </h4>
                    <p className="text-gray-400 ml-6 w-3/4">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
