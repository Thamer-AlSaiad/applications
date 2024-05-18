import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../contexts/alertContext";
import { AuthContext } from "../../contexts/authContext";
import { ButtonFull } from "../../components/buttonFull";

export const SigninButton = ({ enabled, state }) => {
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);
  const { loginUser } = useContext(AuthContext);

  const handleContinue = async () => {
    const { email, password } = state;
    const status = await loginUser(email, password);
    if (!status) {
      setAlert((prev) => ({
        ...prev,
        show: true,
        message: "Invalid email or password",
      }));
       setTimeout(() => {
        setAlert((prev) => ({
          ...prev,
          show: false,
          message: "",
        }));
      }, 3000);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="mt-3">
      <ButtonFull
        text={"Sign in"}
        enabled={enabled}
        clickHandler={handleContinue}
      />
    </div>
  );
};
