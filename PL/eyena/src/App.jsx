import { MainRouter } from "./routes";
import { AuthContextContextProvider } from "./contexts/authContext";
import { CartProvider } from "./contexts/cartContext";
import { AlertContextProvider } from "./contexts/alertContext";
import { HelmetProvider } from "react-helmet-async";

export const App = () => {
  return (
    <HelmetProvider>
      <AuthContextContextProvider>
        <CartProvider>
          <AlertContextProvider>
            <MainRouter />
          </AlertContextProvider>
        </CartProvider>
      </AuthContextContextProvider>
    </HelmetProvider>
  );
};
