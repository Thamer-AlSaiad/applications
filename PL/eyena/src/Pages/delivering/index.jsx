import { Link } from "react-router-dom";
import "../../assets/delivering.css";
export const Delivering = () => {
  return (
    <>
      <div className="delivery-container flex flex-col items-center gap-2 bg-secondary h-[calc(100vh-66px)]">
        <img
          className="image-delivery"
          src="/images/deliveringVector.png"
          width={300}
        />
        <p className="transition-up" style={{ "--d": "1250ms" }}>
          thank you for purchasing from Eyena
        </p>
        <p className="transition-up" style={{ "--d": "2500ms" }}>
          Your order will be delivered in one week
        </p>
        <p className="transition-up" style={{ "--d": "3750ms" }}>
          you can Check your order details on your mail
        </p>
        <div
          className="transition-up flex flex-col gap-3 items-center mt-7"
          style={{ "--d": "4750ms" }}
        >
          <h1 className="text-xl">Continue exploring our products</h1>
          <Link
            to="/explore"
            className="px-4 py-2 text-xl text-center transition border border-primary rounded-md hover:bg-primary hover:text-yellow-light"
          >
            Explore
          </Link>
        </div>
      </div>
    </>
  );
};
