import { useContext, useReducer } from "react";
import { JoinContext } from "../../contexts/joinContext";
import { Input } from "../../components/input";
import { JoinButton } from "./joinButton";

const INITIAL_STATE = {
  password: "",
  confirmPassword: "",
  continue: false,
  errors: {
    password: "",
    confirmPassword: "",
  },
};

const validatePassword = (password) => {
  if (password === "") {
    return "Password is required";
  }
  return password.length < 6 ? "Password must be at least 6 characters" : "";
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword === "") {
    return "Confirm password is required";
  }
  return password === confirmPassword
    ? ""
    : "Confirm password must match password";
};

const enableContinue = (state) => {
  return (
    validatePassword(state.password) === "" &&
    validateConfirmPassword(state.password, state.confirmPassword) === ""
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
        errors: {
          ...state.errors,
          password: validatePassword(action.payload),
        },
      };
    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.payload,
        errors: {
          ...state.errors,
          confirmPassword: validateConfirmPassword(
            state.password,
            action.payload,
          ),
        },
      };
    case "SET_CONTINUE":
      return {
        ...state,
        continue: enableContinue(state),
      };
    default:
      return state;
  }
};

export const StepTwo = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { registerData, setRegisterData } = useContext(JoinContext);

  const handlePasswordChange = (e) => {
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
    setRegisterData((prev) => ({ ...prev, password: e.target.value }));
    dispatch({ type: "SET_CONTINUE" });
  };

  const handleConfirmPasswordChange = (e) => {
    dispatch({ type: "SET_CONFIRM_PASSWORD", payload: e.target.value });
    dispatch({ type: "SET_CONTINUE" });
  };

  return (
    <>
      <h2 className="w-full text-center font-bold text-3xl">One last step</h2>
      <div className="pb-1">
        <Input
          text="Password"
          type="password"
          value={state.password}
          placeholder="Enter your password"
          error={state.errors.password}
          change={handlePasswordChange}
        />
        <Input
          text="Confirm password"
          type="password"
          value={state.confirmPassword}
          placeholder="Confirm your password"
          error={state.errors.confirmPassword}
          change={handleConfirmPasswordChange}
        />
      </div>
      <JoinButton enabled={state.continue} />
    </>
  );
};
