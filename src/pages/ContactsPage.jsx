import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../redux/contacts/operations";
import {
  selectContacts,
  selectContactsError,
  selectContactsLoading,
} from "../redux/contacts/selectors";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal/DeleteConfirmationModal";
import AddContactForm from "../components/AddContactForm/AddContactForm";
import EditContactForm from "../components/EditContactForm/EditContactForm";
import styles from "./ContactsPage.module.css";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const ContactsPage = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const [editingContact, setEditingContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    if (isLoggedIn && contacts.length === 0) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn, contacts.length]);

  const handleAddContact = (newContact) => {
    const { name, number } = newContact;

    if (!name.trim() || !number.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(number)) {
      alert("Please enter a valid phone number! (10 haneli)");
      return;
    }

    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (isDuplicate) {
      alert("Already added !");
      return;
    }

    dispatch(addContact(newContact));
  };

  const startEditing = (contact) => {
    setEditingContact(contact);
  };

  const stopEditing = () => {
    setEditingContact(null);
  };

  const handleUpdate = (updatedValues) => {
    dispatch(updateContact({ id: editingContact.id, values: updatedValues }));
    stopEditing();
  };

  const openModal = (contactId) => {
    setIsModalOpen(true);
    setContactToDelete(contactId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete));
    }
    closeModal();
  };

  return (
    <div>
      <h1>Contacts:</h1>

      <AddContactForm onAdd={handleAddContact} />

      {error && <p className="error-message">Bir hata oluştu: {error}</p>}
      {isLoading && <p>Yükleniyor...</p>}
      {!isLoading && contacts.length === 0 && <p>Kişi bulunamadı, ekleyin!</p>}

      {!isLoading && contacts.length > 0 && (
        <ul className={styles.contactList}>
          {contacts.map((contact) => (
            <li key={contact.id} className={styles.contactLi}>
              <span className={styles.name}>{contact.name}:</span>
              <span className={styles.name}>
                {contact.number || contact.phone}
              </span>
              <div className={styles.buttonContainer}>
                <button
                  className="edit-button"
                  onClick={() => startEditing(contact)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => openModal(contact.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingContact && (
        <EditContactForm
          initialValues={editingContact}
          onSubmit={handleUpdate}
          onCancel={stopEditing}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ContactsPage;
