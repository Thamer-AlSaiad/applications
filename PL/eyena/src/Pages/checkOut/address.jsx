import { Input } from "../../components/textInput";
import { useState } from "react";
export const Address = ({ changeStage }) => {
  const [address, setAddress] = useState({
    city: "",
    street: "",
    building: "",
    apartment: "",
    cityError: "",
    streetError: "",
    buildingError: "",
    apartmentError: "",
    error: true,
  });

  const cityChange = (event) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(event.target.value) || event.target.value === "") {
      setAddress({
        ...address,
        city: event.target.value,
        cityError: "Not valid city name",
      });
    } else {
      setAddress({
        ...address,
        city: event.target.value,
        cityError: "",
      });
    }
  };

  const stChange = (event) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(event.target.value) || event.target.value === "") {
      setAddress({
        ...address,
        street: event.target.value,
        streetError: "Not valid street name",
      });
    } else {
      setAddress({
        ...address,
        street: event.target.value,
        streetError: "",
      });
    }
  };

  const buildingChange = (event) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(event.target.value) || event.target.value === "") {
      setAddress({
        ...address,
        building: event.target.value,
        buildingError: "Not valid building number",
      });
    } else {
      setAddress({
        ...address,
        building: event.target.value,
        buildingError: "",
      });
    }
  };

  const apartmentChange = (event) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(event.target.value) || event.target.value === "") {
      setAddress({
        ...address,
        apartment: event.target.value,
        apartmentError: "Not valid apartment number",
      });
    } else {
      setAddress({
        ...address,
        apartment: event.target.value,
        apartmentError: "",
      });
    }
  };

  const nextStage = () => {
    if (
      address.city === "" ||
      address.street === "" ||
      address.building === "" ||
      address.apartment === ""
    ) {
      setAddress({
        ...address,
        error: false,
      });
      return;
    }
    if (
      address.cityError !== "" ||
      address.streetError !== "" ||
      address.buildingError !== "" ||
      address.apartmentError !== ""
    ) {
      setAddress({
        ...address,
        error: false,
      });
      return;
    }

    let addressInfo = {
      city: address.city,
      street: address.street,
      building: address.building,
      apartment: address.apartment,
    };
    changeStage(addressInfo);
  };

  return (
    <>
      <div className="address px-7 lg:flex lg:flex-col lg:items-center">
        <p className=" font-semibold mt-1">Delivery Address:</p>
        <form className="px-3 lg:flex lg:flex-wrap lg:gap-6 lg:justify-center ">
          <div className="lg:w-1/3 lg:mr-3">
            <Input name={"City"} change={cityChange} />
            <span
              className={
                address.cityError === "" ? "hidden" : "text-xs ml-1 font-bold"
              }
            >
              {address.cityError}
            </span>
          </div>

          <div className="lg:w-1/3 lg:ml-3">
            <Input name={"Street"} change={stChange} />
            <span
              className={
                address.streetError === "" ? "hidden" : "text-xs ml-1 font-bold"
              }
            >
              {address.streetError}
            </span>
          </div>

          <div className="lg:w-1/3 lg:mr-3">
            <Input name={"Building no."} change={buildingChange} />
            <span
              className={
                address.buildingError === ""
                  ? "hidden"
                  : "text-xs ml-1 font-bold"
              }
            >
              {address.buildingError}
            </span>
          </div>

          <div className="lg:w-1/3 lg:ml-3">
            <Input name={"Apartment no."} change={apartmentChange} />
            <span
              className={
                address.apartmentError === ""
                  ? "hidden"
                  : "text-xs ml-1 font-bold"
              }
            >
              {address.apartmentError}
            </span>
          </div>
        </form>
        <div className="flex justify-center mt-5 px-7">
          <span
            className={
              address.error ? "hidden" : "text-sm text-red-700 ml-1 font-bold"
            }
          >
            Not valid inputs
          </span>
        </div>
        <div className="flex justify-end px-7 my-5 lg:w-3/4">
          <input
            type="button"
            className="bg-yellow-light p-2 w-2/6 rounded-lg font-bold hover:cursor-pointer hover:scale-95 transition-transform lg:w-1/4"
            value={"Next"}
            onClick={nextStage}
          />
        </div>
      </div>
    </>
  );
};
