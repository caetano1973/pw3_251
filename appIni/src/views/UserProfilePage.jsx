// UserProfileForm.jsx
import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import './UserProfilePage.css'; // Importe o arquivo CSS

const UserProfileForm = () => {
  const pageTitle = "Perfil usuário ";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    photo: '',
    birthDate: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            setFormData(userDoc.data());
          }
        }
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do usuário', err);
        setLoading(false);
      }
    };

    loadUserData();
  }, [auth.currentUser, db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      if (!auth.currentUser) {
        throw new Error('Usuário não está autenticado');
      }

      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        ...formData,
        email: auth.currentUser.email,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSuccess(true);
      navigate("/");
    } catch (err) {
      setError('Erro ao salvar dados. Por favor, tente novamente.');
      console.error('Erro:', err);
    }
  };

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <>
      <div className="user-profile-container">
        <Header pageTitle={pageTitle} />
        <h2 className="text-2xl font-bold mb-6">Complete seu Perfil</h2>

        {error && <div className="user-profile-error">{error}</div>}

        {success && <div className="user-profile-success">Dados salvos com sucesso!</div>}

        <form onSubmit={handleSubmit} className="user-profile-form">
          <label>Nome Completo</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>Foto URL</label>
          <input type="text" name="photo" value={formData.photo} onChange={handleChange} required />

          <label>Data de Nascimento</label>
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />

          <button type="submit">Salvar Dados</button>
        </form>
      </div>
    </>
  );
};

export default UserProfileForm;


