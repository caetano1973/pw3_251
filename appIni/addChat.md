1. corrigir atividade. dicas para resolver. básico.
Fazer conforme tutorial do proprio exercício.

2. fechar as notas dos alunos que entregaram, 

3. Criar feature dos contatos:


1. criar página para add novo contato  AddContactPage.jsx 

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

        <Link to="/add-cont">
          <div className="floating-button">
            <span>+</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ContactList;


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


. Criar component Chat na pasta **components**


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

. criar um arquivo Chat.css 

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

. Incluir acessos para abrir chat. 

```
  const handleOpenChat = (id) => {
    navigate(`/chat/${id}`);
  };
```

 incluir na linha do contato.
```
onClick={() => handleOpenChat(user.id)}
```


