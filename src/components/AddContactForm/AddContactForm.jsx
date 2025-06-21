import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import styles from "./AddContactForm.module.css";

const AddContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number! (10 digits)");
      return;
    }

    dispatch(addContact({ name, number: phone }));
    setName("");
    setPhone("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name "
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          value={phone}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, "");
            setPhone(numericValue);
          }}
          maxLength="10"
          required
          placeholder="Number"
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContactForm;
