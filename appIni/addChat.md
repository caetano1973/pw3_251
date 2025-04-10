## Criar feature para Contatos e Conversas. versão inicial

### 1. partir do appIni básico. Fazer conforme tutorial do proprio exercício.

### 2. Criar feature dos contatos:

1. Acessar a pasta **views** do projeto e criar página para add novo contato  AddContactPage.jsx 

```
import { useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import './UserProfilePage.css';
import Header from '../components/Header';

const AddContactPage = () => {
  const pageTitle = "Adicionar Contato";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    photo: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  // Função para buscar o usuário pelo e-mail
  const fetchUserByEmail = async (email) => {
    setError('');
    setUserNotFound(false);

    if (!email) return;

    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setFormData(prev => ({
          ...prev,
          fullName: userData.fullName || '',
          photo: userData.photo || '',
          phone: userData.phone || ''
        }));
      } else {
        setUserNotFound(true);
        setFormData(prev => ({
          ...prev,
          fullName: '',
          photo: '',
          phone: ''
        }));
      }
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      setError("Erro ao buscar usuário.");
    }
  };

  // Captura mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "email") {
      fetchUserByEmail(value); // Busca o usuário ao digitar o email
    }
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!auth.currentUser) {
      setError('Usuário não autenticado.');
      return;
    }

    if (!formData.fullName || !formData.phone) {
      setError('Nome e telefone são obrigatórios.');
      return;
    }

    try {
      setLoading(true);

      // Adiciona o contato na coleção "contacts"
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdBy: auth.currentUser.uid, // Usuário autenticado que adicionou o contato
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      setSuccess(true);
      setFormData({ email: '', fullName: '', photo: '', phone: '' });
      navigate("/"); // Redireciona para a lista de contatos
    } catch (err) {
      setError(err.message || 'Erro ao salvar o contato.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header pageTitle={pageTitle} />

      <div className="user-profile-container">
        <h2 className="text-2xl font-bold mb-6">{pageTitle}</h2>

        {error && <div className="user-profile-error">{error}</div>}
        {success && <div className="user-profile-success">Contato adicionado com sucesso!</div>}
        {userNotFound && <div className="user-profile-warning">Usuário não encontrado! Você pode editar os dados manualmente.</div>}

        <form onSubmit={handleSubmit} className="user-profile-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Nome Completo</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Foto URL</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
          />

          <label>Telefone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Contato'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddContactPage;


```



2. criar um Component ContactItem.jsx na pasta **components** 
```
import './ContactItem.css';

// eslint-disable-next-line react/prop-types
const ContactItem = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-item">
      <img src={user.photo} alt={user.fullName} className="user-photo" />
      <div className="user-info">
        <h3 className="user-name">{user.fullName}</h3>
        <p className="user-phone">{user.phone}</p>
      </div>
      <div className="user-actions">
        <button onClick={(e) => { e.stopPropagation(); onEdit(user.id)}}>Editar</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(user.id)}}>Excluir</button>
      </div>
    </div>
  );
};

export default ContactItem;


```

3. criar ContactItem.css na pasta  **components**

```
/* Estilos gerais para o item de usuário */
.user-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .user-actions {
    display: flex;
    gap: 10px;
    margin-left: auto;
  } 
   
  .user-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
  }
  
  .user-name {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }
  
  .user-phone {
    font-size: 14px;
    color: #555;
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .user-item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
```
  


3. criar pagina com Lista Contatos na pasta **views**   ContactListPage.jsx 
```
import { useState, useEffect } from 'react';
import ContactItem from '../components/ContactItem';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';

const ContactList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'contacts');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-cont/${id}`);
  };


  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      
	  <div className="contact-list">
        {users.length === 0 ? (
          <div>Não há contatos disponíveis.</div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="contact-item" >
             <ContactItem 
                  user={user} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
            </div>
          ))
        )}

		{/* Botão flutuante, aqui abaixo */}
		

      </div>
    </>
  );
};

export default ContactList;



```

4. inserir Header na lista de contatos.

```
        <Header pageTitle='👥 Lista'/>
```


5. criar button flutuante com simbolo + na pagina de Contatos.
```
		<Link to="/add-cont">         <div className="floating-button">
			<span>+</span>
			</div>
		</Link>
```

6. alterar as rotas para abrir pagina add contato no **App.jsx**

```
            <Route index element={<ContactList />} />
            <Route path="/user-prof" element={<UserProfileForm />} />
            <Route path="/add-cont"  element={<AddContactPage />} />

```

7. criar um novo arquivo. ContactList.css na pasta **views**

```
.contact-list-container {
    padding: 20px;
  }
  
  .contact-list {
    display: flex;
    flex-direction: column;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
    
  .contact-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .contact-info {
    flex: 1;
    margin-left: 10px;
  }
  
  .delete-btn {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .delete-btn:hover {
    background-color: #d32f2f;
  }
  
  /* Estilo da Caixa de Confirmação */
  .confirmation-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .confirmation-dialog button {
    margin: 5px;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .confirmation-dialog button:hover {
    opacity: 0.8;
  }
  
  .confirmation-dialog button:first-child {
    background-color: green;
    color: white;
  }
  
  .confirmation-dialog button:last-child {
    background-color: gray;
    color: white;
  }
  

```


8. Criar página ChatPage.jsx na pasta **views**


```
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase/config';
import { collection, query, where, orderBy, addDoc, serverTimestamp, onSnapshot, getDoc, doc } from "firebase/firestore";
import Header from '../components/Header';
import './Chat.css'

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [contact, setContact] = useState(null);
  const myUserId =  auth.currentUser.uid 

  useEffect(() => {
    // Buscar informações do contato
    const fetchContact = async () => {
      try {
        const contactRef = doc(db, 'contacts', id);
        const contactSnap = await getDoc(contactRef);
        if (contactSnap.exists()) {
          setContact(contactSnap.data());
        }
      } catch (error) {
        console.error("Erro ao buscar contato:", error);
      }
    };

    // Buscar mensagens em tempo real
    const fetchMessages = () => {
      const messagesRef = collection(db, 'messages');
      const q = query(messagesRef, where('contactId', '==', id), orderBy('timestamp', 'asc'));

      return onSnapshot(q, (snapshot) => {
        const messagesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messagesList);
      });
    };

    fetchContact();
    const unsubscribe = fetchMessages();

    return () => unsubscribe(); // Limpa o listener ao desmontar
  }, [id]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(db, 'messages'), {
        contactId: id,
        senderId: myUserId,
        text: newMessage,
        timestamp: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <>
      <Header pageTitle='💬 Conversa' />
      
      {contact && (
        <div className="chat-header">
          <img src={contact.photo} alt={contact.fullName} className="contact-photo" />
          <div className="contact-info">
            <h3>{contact.fullName}</h3>
            <p>{contact.phone}</p>
          </div>
        </div>
      )}

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-message ${msg.senderId === myUserId ? 'sent' : 'received'}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input 
            type="text" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Digite uma mensagem..."
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
```

9. criar um arquivo **Chat.css** na pasta **views**
    
```
.chat-container {
    display: flex;
    flex-direction: column;
    height: 80vh;
    padding: 10px;
    overflow-y: auto;
  }
  
  .chat-messages {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    overflow-y: auto;
  }
  
  .chat-message {
    max-width: 60%;
    padding: 10px;
    border-radius: 10px;
    word-wrap: break-word;
  }
  
  .sent {
    align-self: flex-end;
    background-color: #007bff;
    color: white;
  }
  
  .received {
    align-self: flex-start;
    background-color: #e5e5e5;
    color: black;
  }
  
  .chat-input {
    display: flex;
    gap: 10px;
    padding: 10px;
  }
  
  .chat-input input {
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  .chat-input button {
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  
```

10. Na página **ContactListPage.jsx** , Incluir acessos para abrir chat: 

a. incluir a function apos handleEdit
```
  const handleOpenChat = (id) => {
    navigate(`/chat/${id}`);
  };
```

 b. incluir tratamento de evento na linha do contato.  dentro da div "<div key={user.id}  ..."
 
```
onClick={() => handleOpenChat(user.id)}
```



