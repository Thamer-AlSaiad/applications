import { useContext } from "react";
import { SEO } from "../../components/SEO";
import { AuthContext } from "../../contexts/authContext";

export let Profile = () => {
  const { userData } = useContext(AuthContext);
  return (
    <>
      <SEO
        title={`Eyena - ${userData.username}`}
        description={`${userData.username} profile`}
      />
      <div className="w-full">
        <div className="flex flex-col bg-white w-full mt-8 md:h-[calc(100vh-66px)] ">
          <div className="flex justify-center flex-col md:flex-row">
            <div className="md:mr-6 self-center">
              <img
                alt="Profile Image"
                src="\images\profilePic.png"
                className="h-52 w-52 shadow-xl rounded-full"
              />
            </div>
            <div className="text-center mt-4 md:mt-14 md:mr-6">
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                {userData.username}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                {userData.email}
              </div>
              <div className="mb-2 text-blueGray-600 font-bold">
                +{userData.phone}
              </div>
            </div>
          </div>
          <div className="mt-4 w-9/12 border-secondary self-center border-2"></div>
        </div>
      </div>
    </>
  );
};
