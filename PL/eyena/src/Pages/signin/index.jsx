import { useReducer } from "react";
import { Link } from "react-router-dom";
import { FormContainer } from "../../components/formContainer";
import { Input } from "../../components/input";
import { OwlIcon } from "../../components/icons/owlIcon";
import { SigninButton } from "./signinButton";
import { AuthAlert } from "../../components/authAlert";
import { SEO } from "../../components/SEO";

const INITIAL_STATE = {
  email: "",
  password: "",
  continue: false,
  errors: {
    email: "",
    password: "",
  },
};

const validatePassword = (password) => {
  if (password === "") {
    return "Password is required";
  }
  return password.length < 6 ? "Password must be at least 6 characters" : "";
};

const enableContinue = (state) => {
  return (
    validateEmail(state.email) === "" && validatePassword(state.password) === ""
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
        errors: {
          ...state.errors,
          email: validateEmail(action.payload),
        },
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
        errors: {
          ...state.errors,
          password: validatePassword(action.payload),
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

const validateEmail = (email) => {
  if (email.trim() === "") {
    return "Email is required";
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email) ? "" : "Email is not valid";
};

export const SigninPage = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleEmailChange = (e) => {
    dispatch({ type: "SET_EMAIL", payload: e.target.value });
    dispatch({ type: "SET_CONTINUE" });
  };

  const handlePasswordChange = (e) => {
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
    dispatch({ type: "SET_CONTINUE" });
  };

  return (
    <FormContainer>
      <SEO title="Sign in to Eyena" description="Sign in to Eyena" />
      <AuthAlert />
      <div className="w-12 mb-3">
        <Link to="/">
          <OwlIcon />
        </Link>
      </div>
      <h2 className="w-full text-center font-bold text-3xl">Welcome Back</h2>
      <div className="pb-1">
        <Input
          text="Email"
          type="email"
          value={state.email}
          placeholder="Enter your email"
          error={state.errors.email}
          change={handleEmailChange}
        />

        <Input
          text="Password"
          type="password"
          value={state.password}
          placeholder="Enter your password"
          error={state.errors.password}
          change={handlePasswordChange}
        />
      </div>
      <SigninButton
        enabled={state.continue}
        state={{ email: state.email, password: state.password }}
      />
      <div className="w-full text-center mt-2">
        <p className="text-gray-500">
          Don't have an account?
          <Link to="/join" className="text-gray-600 font-bold">
            Join
          </Link>
        </p>
      </div>
    </FormContainer>
  );
};
