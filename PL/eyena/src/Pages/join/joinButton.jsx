import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { JoinContext } from "../../contexts/joinContext";
import { AlertContext } from "../../contexts/alertContext";
import { useNavigate } from "react-router-dom";
import { ButtonFull } from "../../components/buttonFull";

export const JoinButton = ({ enabled }) => {
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);
  const { registerData, setRegisterData } = useContext(JoinContext);
  const { setAlert } = useContext(AlertContext);

  const handleJoin = async () => {
    const { email, password, username, phoneNumber } = registerData;
    const status = await registerUser({
      email,
      password,
      username,
      phone: phoneNumber,
    });
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
      setRegisterData((prev) => ({
        ...prev,
        step: 1,
        email: "",
        password: "",
        username: "",
        phoneNumber: "",
      }));
      navigate("/");
    }
  };
  return (
    <div className="mt-3">
      <ButtonFull text={"Join"} enabled={enabled} clickHandler={handleJoin} />
    </div>
  );
};
