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

const NameAndLogoCRUD = () => {
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState({ name: '', logoUrl: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const collectionRef = collection(db, 'nameAndLogo');
      const snapshot = await getDocs(collectionRef);
      const entriesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(entriesList);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const entryDoc = doc(db, 'nameAndLogo', editId);
        await updateDoc(entryDoc, entry);
      } else {
        await addDoc(collection(db, 'nameAndLogo'), entry);
      }
      fetchEntries();
      setEntry({ name: '', logoUrl: '' });
      setEditId(null);
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const handleEdit = (entry) => {
    setEntry(entry);
    setEditId(entry.id);
  };

  const handleDelete = async (id) => {
    try {
      const entryDoc = doc(db, 'nameAndLogo', id);
      await deleteDoc(entryDoc);
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Name and Logo Management</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="name">Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="name"
                    name="name"
                    value={entry.name}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="logoUrl">Logo URL</CFormLabel>
                  <CFormInput
                    type="text"
                    id="logoUrl"
                    name="logoUrl"
                    value={entry.logoUrl}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol className="d-flex justify-content-end">
                  <CButton type="submit" color="primary">
                    {editId ? 'Update' : 'Add'} Entry
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
            <strong>Name and Logo List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Logo</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {entries.map((entry) => (
                  <CTableRow key={entry.id}>
                    <CTableDataCell>{entry.id}</CTableDataCell>
                    <CTableDataCell>{entry.name}</CTableDataCell>
                    <CTableDataCell>
                      <img src={entry.logoUrl} alt={entry.name} width="100" />
                    </CTableDataCell>
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

export default NameAndLogoCRUD;
