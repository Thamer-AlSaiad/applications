import { Input } from "../../components/textInput";

import { useState } from "react";
export const Payment = ({ pervStage, checkOutFunction }) => {
  const [cardInfo, setCardInfo] = useState({
    cardName: "",
    cardNumber: "",
    cvv: "",
    zipCode: "",
    expireDate: "",
    errorCardName: "",
    errorCardNumber: "",
    errorCvv: "",
    errorZip: "",
    errorDate: "",
    error: true,
  });

  const nameChange = (event) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(event.target.value) || event.target.value === "") {
      setCardInfo({
        ...cardInfo,
        cardName: event.target.value,
        errorCardName: "Not valid name",
      });
    } else {
      setCardInfo({
        ...cardInfo,
        cardName: event.target.value,
        errorCardName: "",
      });
    }
  };
  const numberChange = (event) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(event.target.value)) {
      setCardInfo({
        ...cardInfo,
        cardNumber: event.target.value,
        errorCardNumber: "Not valid number",
      });
    } else {
      setCardInfo({
        ...cardInfo,
        cardNumber: event.target.value,
        errorCardNumber: "",
      });
    }
  };

  const cvvChange = (event) => {
    const regex = new RegExp(/^[0-9]{3,4}$/);

    if (!regex.test(event.target.value)) {
      setCardInfo({
        ...cardInfo,
        cvv: event.target.value,
        errorCvv: "Not valid cvv",
      });
    } else {
      setCardInfo({
        ...cardInfo,
        cvv: event.target.value,
        errorCvv: "",
      });
    }
  };

  const zipChange = (event) => {
    const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

    if (!regex.test(event.target.value)) {
      setCardInfo({
        ...cardInfo,
        zipCode: event.target.value,
        errorZip: "Not valid Zip code",
      });
    } else {
      setCardInfo({
        ...cardInfo,
        zipCode: event.target.value,
        errorZip: "",
      });
    }
  };
  const dateChange = (event) => {
    const regex = new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);
    if (!regex.test(event.target.value)) {
      setCardInfo({
        ...cardInfo,
        expireDate: event.target.value,
        errorDate: "Not valid date",
      });
    } else {
      setCardInfo({
        ...cardInfo,
        expireDate: event.target.value,
        errorDate: "",
      });
    }
  };

  const checkOut = () => {
    if (
      cardInfo.cardName === "" ||
      cardInfo.cardNumber === "" ||
      cardInfo.cvv === "" ||
      cardInfo.zipCode === "" ||
      cardInfo.expireDate === ""
    ) {
      setCardInfo({
        ...cardInfo,
        error: false,
      });
      return;
    }
    if (
      cardInfo.errorCardName !== "" ||
      cardInfo.errorCardNumber !== "" ||
      cardInfo.errorCvv !== "" ||
      cardInfo.errorZip !== "" ||
      cardInfo.errorDate !== ""
    ) {
      setCardInfo({
        ...cardInfo,
        error: false,
      });
      return;
    }
    let card = {
      cardName: cardInfo.cardName,
      cardNumber: cardInfo.cardNumber,
      cvv: cardInfo.cvv,
      zipCode: cardInfo.zipCode,
      expireDate: cardInfo.expireDate,
    };
    checkOutFunction(card);
  };

  return (
    <>
      <div className="card-info   lg:flex lg:flex-col lg:items-center lg:mt-5">
        <p className=" font-semibold mt-1">Card Information:</p>
        <form className="px-3 lg:flex lg:gap-4 lg:flex-wrap lg:justify-center w-full">
          <div className="lg:w-1/2">
            <Input name={"Name on card"} change={nameChange} />
            <span
              className={
                cardInfo.errorCardName === "" ? "" : "text-xs ml-1 font-bold"
              }
            >
              {cardInfo.errorCardName}
            </span>
          </div>

          <div className="lg:w-1/3 lg:mx-3">
            <Input name={"Card Number"} change={numberChange} />
            <span
              className={
                cardInfo.errorCardNumber === ""
                  ? "hidden"
                  : "text-xs ml-1 font-bold"
              }
            >
              {cardInfo.errorCardNumber}
            </span>
          </div>

          <div className="lg:w-1/5 lg:ml-3">
            <Input name={"CVC"} change={cvvChange} />
            <span
              className={
                cardInfo.errorCvv === "" ? "hidden" : "text-xs ml-1 font-bold"
              }
            >
              {cardInfo.errorCvv}
            </span>
          </div>

          <div className="lg:w-1/5 lg:mx-20">
            <Input name={"Zip code"} change={zipChange} />
            <span
              className={
                cardInfo.errorZip === "" ? "hidden" : "text-xs ml-1 font-bold"
              }
            >
              {cardInfo.errorZip}
            </span>
          </div>

          <div className="lg:w-1/5 lg:mr-3">
            <Input name={"Expire date"} change={dateChange} />
            <span
              className={
                cardInfo.errorDate === "" ? "hidden" : "text-xs ml-1 font-bold"
              }
            >
              {cardInfo.errorDate}
            </span>
          </div>
        </form>
        <div className="flex justify-center mt-5 px-7">
          <span
            className={
              cardInfo.error ? "hidden" : "text-sm text-red-700 ml-1 font-bold"
            }
          >
            Not valid inputs
          </span>
        </div>
        <div className="flex justify-between lg:w-3/4 px-7 my-5">
          <input
            type="button"
            className={
              "bg-gray-400 p-2 w-2/6 rounded-lg font-bold hover:cursor-pointer hover:scale-95 transition-transform  md:w-1/3"
            }
            value={"Perv"}
            onClick={pervStage}
          />
          <input
            type="button"
            className="bg-yellow-light p-2 w-2/6 rounded-lg font-bold hover:cursor-pointer hover:scale-95 transition-transform md:w-1/3"
            value={"CheckOut"}
            onClick={checkOut}
          />
        </div>
      </div>
    </>
  );
};
