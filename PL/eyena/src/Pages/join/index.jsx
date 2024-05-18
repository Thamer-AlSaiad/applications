import { Link } from "react-router-dom";
import { useContext } from "react";
import { JoinContext } from "../../contexts/joinContext";
import { FormContainer } from "../../components/formContainer";
import { OwlIcon } from "../../components/icons/owlIcon";
import { StepOne } from "./stepOne";
import { StepTwo } from "./stepTwo";
import { AuthAlert } from "../../components/authAlert";
import { SEO } from "../../components/SEO";

export const JoinPage = () => {
  const { registerData } = useContext(JoinContext);

  return (
    <FormContainer>
      <SEO title="Join Eyena" description="Join Eyena" />
      <AuthAlert />
      <div className="w-12 mb-3">
        <Link to="/">
          <OwlIcon />
        </Link>
      </div>
      {registerData.step === 1 && <StepOne />}
      {registerData.step === 2 && <StepTwo />}
    </FormContainer>
  );
};
