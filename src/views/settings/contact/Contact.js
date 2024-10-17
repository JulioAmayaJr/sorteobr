import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/data';

const ContactCRUD = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({ icon: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const contactCollection = collection(db, 'contact');
      const contactSnapshot = await getDocs(contactCollection);
      const contactData = contactSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactData);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const contactDoc = doc(db, 'contact', editId);
        await updateDoc(contactDoc, contact);
      } else {
        await addDoc(collection(db, 'contact'), contact);
      }
      fetchContacts();
      setContact({ icon: '', description: '' });
      setEditId(null);
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleEdit = (entry) => {
    setContact(entry);
    setEditId(entry.id);
  };

  const handleDelete = async (id) => {
    try {
      const contactDoc = doc(db, 'contact', id);
      await deleteDoc(contactDoc);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Contact Management</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="icon">Icon</CFormLabel>
                  <CFormInput
                    type="text"
                    id="icon"
                    name="icon"
                    value={contact.icon}
                    onChange={handleInputChange}
                    placeholder="Icon (e.g., fa-phone)"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormInput
                    type="text"
                    id="description"
                    name="description"
                    value={contact.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol className="d-flex justify-content-end">
                  <CButton type="submit" color="primary">
                    {editId ? 'Update' : 'Add'} Contact
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <strong>Contact List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Icon</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {contacts.map((entry) => (
                  <CTableRow key={entry.id}>
                    <CTableDataCell>{entry.id}</CTableDataCell>
                    <CTableDataCell>{entry.icon}</CTableDataCell>
                    <CTableDataCell>{entry.description}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" onClick={() => handleEdit(entry)} className="me-2">
                        Edit
                      </CButton>
                      <CButton color="danger" onClick={() => handleDelete(entry.id)}>
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ContactCRUD;
