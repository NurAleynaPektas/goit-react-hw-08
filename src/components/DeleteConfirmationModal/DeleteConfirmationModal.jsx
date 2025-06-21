import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Delete"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: { maxWidth: "400px", margin: "auto", textAlign: "center" },
      }}
    >
      <h2>Are you sure?</h2>
      <p style={{ marginBottom: "20px", color: "red", fontSize: "16px" }}>
        Wanna delete this contact ? <br />
        This action cannot be undone.
      </p>
     
      <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Delete</button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
