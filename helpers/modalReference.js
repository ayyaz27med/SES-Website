import { Modal } from "bootstrap";

class ModalReference {
  ref;

  constructor(ref) {
    this.ref = ref;
  }

  open = () => {
    if (this.ref.current) {
      const modal = new Modal(this.ref.current);
      modal.show();
    }
  };

  close = () => {
    if (this.ref.current) {
      const modal = Modal.getInstance(this.ref.current);
      modal?.hide();
    }
  };
}

export default ModalReference;
