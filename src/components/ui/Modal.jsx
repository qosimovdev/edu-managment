import Button from "./Button";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}
        <div className="modal-footer">
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
