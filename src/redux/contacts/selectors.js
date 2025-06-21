import { createSelector } from "@reduxjs/toolkit";

export const selectContactsState = (state) => state.contacts; // Tüm contacts state'i seçer

export const selectContacts = createSelector(
  [selectContactsState],
  (contacts) => contacts.items || [] 
);


export const selectContactsLoading = (state) => state.contacts.isLoading;

export const selectContactsError = (state) => state.contacts.error;
