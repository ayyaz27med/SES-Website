import { forwardRef } from "react";

const Modal = forwardRef(
  ({ children }, ref) => {
    return (
      <div
      className="modal modalCentered fade auto-popup modal-newleter"
      id="newsletterPopup"
      ref={ref}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-top">
            <span
              className="icon icon-close btn-hide-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-bottom text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
    );
  },
);

export default Modal;
