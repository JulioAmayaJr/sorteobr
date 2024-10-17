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

const RaffleCRUD = () => {
  const [raffles, setRaffles] = useState([]);
  const [raffle, setRaffle] = useState({ raffleDate: '', raffleTime: '', title: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRaffles();
  }, []);

  const fetchRaffles = async () => {
    try {
      const raffleCollection = collection(db, 'raffle');
      const raffleSnapshot = await getDocs(raffleCollection);
      const rafflesList = raffleSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRaffles(rafflesList);
    } catch (error) {
      console.error('Error fetching raffles:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRaffle({ ...raffle, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const raffleDoc = doc(db, 'raffle', editId);
        await updateDoc(raffleDoc, raffle);
      } else {
        await addDoc(collection(db, 'raffle'), raffle);
      }
      fetchRaffles();
      setRaffle({ raffleDate: '', raffleTime: '', title: '', description: '' });
      setEditId(null);
    } catch (error) {
      console.error('Error saving raffle:', error);
    }
  };

  const handleEdit = (raffle) => {
    setRaffle(raffle);
    setEditId(raffle.id);
  };

  const handleDelete = async (id) => {
    try {
      const raffleDoc = doc(db, 'raffle', id);
      await deleteDoc(raffleDoc);
      fetchRaffles();
    } catch (error) {
      console.error('Error deleting raffle:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Raffle Management</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={3}>
                  <CFormLabel htmlFor="raffleDate">Raffle Date</CFormLabel>
                  <CFormInput
                    type="date"
                    id="raffleDate"
                    name="raffleDate"
                    value={raffle.raffleDate}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="raffleTime">Raffle Time</CFormLabel>
                  <CFormInput
                    type="time"
                    id="raffleTime"
                    name="raffleTime"
                    value={raffle.raffleTime}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="title">Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="title"
                    name="title"
                    value={raffle.title}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={12} className="mt-3">
  <CFormLabel htmlFor="description">Description</CFormLabel>
  <CFormTextarea
    id="description"
    name="description"
    value={raffle.description}
    onChange={handleInputChange}
    rows="4" // Esto ajusta la altura del textarea
    required
  />
</CCol>

              </CRow>
              <CRow className="mt-3">
                <CCol className="d-flex justify-content-end">
                  <CButton type="submit" color="primary">
                    {editId ? 'Update' : 'Add'} Raffle
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
            <strong>Raffle List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Raffle Date</CTableHeaderCell>
                  <CTableHeaderCell>Raffle Time</CTableHeaderCell>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {raffles.map((raffle) => (
                  <CTableRow key={raffle.id}>
                    <CTableDataCell>{raffle.id}</CTableDataCell>
                    <CTableDataCell>{raffle.raffleDate}</CTableDataCell>
                    <CTableDataCell>{raffle.raffleTime}</CTableDataCell>
                    <CTableDataCell>{raffle.title}</CTableDataCell>
                    <CTableDataCell>{raffle.description}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" onClick={() => handleEdit(raffle)} className="me-2">
                        Edit
                      </CButton>
                      <CButton color="danger" onClick={() => handleDelete(raffle.id)}>
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

export default RaffleCRUD;
