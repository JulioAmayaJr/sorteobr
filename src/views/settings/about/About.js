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
  CFormTextarea,
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

const AboutUsCRUD = () => {
  const [aboutUsList, setAboutUsList] = useState([]);
  const [aboutUs, setAboutUs] = useState({ title: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAboutUs();
  }, []);

  const fetchAboutUs = async () => {
    try {
      const aboutUsCollection = collection(db, 'about_us');
      const aboutUsSnapshot = await getDocs(aboutUsCollection);
      const aboutUsData = aboutUsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAboutUsList(aboutUsData);
    } catch (error) {
      console.error('Error fetching About Us entries:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutUs({ ...aboutUs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const aboutUsDoc = doc(db, 'about_us', editId);
        await updateDoc(aboutUsDoc, aboutUs);
      } else {
        await addDoc(collection(db, 'about_us'), aboutUs);
      }
      fetchAboutUs();
      setAboutUs({ title: '', description: '' });
      setEditId(null);
    } catch (error) {
      console.error('Error saving About Us entry:', error);
    }
  };

  const handleEdit = (entry) => {
    setAboutUs(entry);
    setEditId(entry.id);
  };

  const handleDelete = async (id) => {
    try {
      const aboutUsDoc = doc(db, 'about_us', id);
      await deleteDoc(aboutUsDoc);
      fetchAboutUs();
    } catch (error) {
      console.error('Error deleting About Us entry:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>About Us Management</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="title">Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="title"
                    name="title"
                    value={aboutUs.title}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormTextarea
                    id="description"
                    name="description"
                    value={aboutUs.description}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol className="d-flex justify-content-end">
                  <CButton type="submit" color="primary">
                    {editId ? 'Update' : 'Add'} About Us
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
            <strong>About Us List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {aboutUsList.map((entry) => (
                  <CTableRow key={entry.id}>
                    <CTableDataCell>{entry.id}</CTableDataCell>
                    <CTableDataCell>{entry.title}</CTableDataCell>
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

export default AboutUsCRUD;
