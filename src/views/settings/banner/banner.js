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

const BannerCRUD = () => {
  const [banners, setBanners] = useState([]);
  const [banner, setBanner] = useState({ title: '', imageUrl: '' });
  const [editId, setEditId] = useState(null);

  // Fetch banners from Firestore
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const bannerCollection = collection(db, 'banner');
      const bannerSnapshot = await getDocs(bannerCollection);
      const bannersList = bannerSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBanners(bannersList);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBanner({ ...banner, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
       
        const bannerDoc = doc(db, 'banner', editId);
        await updateDoc(bannerDoc, banner);
      } else {
        
        await addDoc(collection(db, 'banner'), banner);
      }
      fetchBanners();
      setBanner({ title: '', imageUrl: '' });
      setEditId(null);
    } catch (error) {
      console.error('Error saving banner:', error);
    }
  };

  const handleEdit = (banner) => {
    setBanner(banner);
    setEditId(banner.id);
  };

  const handleDelete = async (id) => {
    try {
      const bannerDoc = doc(db, 'banner', id);
      await deleteDoc(bannerDoc);
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Banner Management</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={5}>
                  <CFormLabel htmlFor="title">Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="title"
                    name="title"
                    value={banner.title}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={5}>
                  <CFormLabel htmlFor="imageUrl">Image URL</CFormLabel>
                  <CFormInput
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={banner.imageUrl}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={2} className="d-flex align-items-end">
                  <CButton type="submit" color="primary">
                    {editId ? 'Update' : 'Add'} Banner
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
            <strong>Banner List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Image</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {banners.map((banner) => (
                  <CTableRow key={banner.id}>
                    <CTableDataCell>{banner.id}</CTableDataCell>
                    <CTableDataCell>{banner.title}</CTableDataCell>
                    <CTableDataCell>
                      <img src={banner.imageUrl} alt={banner.title} width="100" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" onClick={() => handleEdit(banner)} className="me-2">
                        Edit
                      </CButton>
                      <CButton color="danger" onClick={() => handleDelete(banner.id)}>
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

export default BannerCRUD;
