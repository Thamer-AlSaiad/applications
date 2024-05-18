import PropTypes from "prop-types";

const Modal = ({ children, onClose }) => {
  return (
    <>
      <div
        onClick={() => onClose(false)}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 z-20"
      ></div>
      <dialog
        open
        onReset={(e) => {
          e.preventDefault();
          onClose(false);
        }}
        className="rounded-lg z-40 bg-white my-auto p-4 fixed top-24 shadow-lg"
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            onClose(false);
          }
        }}
      >
        <div>{children}</div>
      </dialog>
    </>
  );
};
Modal.displayName = "Dialog";
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
