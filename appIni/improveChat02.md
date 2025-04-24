1. Acessar **LoginPage.jsx** , forçar página inicial ir sempre pra "/",  incluir comando 

incluir dentro de     **function handleSignIn(e){** quando user é logado com sucesso.

```
            navigate('/'); // redireciona para a home após login
```

após o usuario ser logado com sucesso, na **function handleSignIn(e)**
e também na function **handleGoogleLogin = async(e)**


2. Incluir nova rota para editar contatos:  em **App.jsx**  

```
            <Route path="/edit-cont/:id" element={<AddContactPage />} />

```


3. Ajustar **AddContactPage.jsx** para receber parametro.

a. incluir import junto aos imports no inicio da página.
```
import { useParams } from 'react-router-dom';
```

b. Logo após a instrução **const AddContactPage = () => {**   incluir a linha

```
  const { id } = useParams(); // vai ser undefined se estiver no modo de criação
```

4. Se o id existir, buscar o contato no Firestore e preencher o **formData**:

adicionar esse useEffect  apos as declarações de const  
 const [contactUserId, setContactUserId] = useState(null);

```

useEffect(() => {
  if (id) {
    const fetchContact = async () => {
      const docRef = doc(db, 'contacts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    };

    fetchContact();
  }
}, [id]);
```

5. No **handleSubmit**, diferenciar entre addDoc() e updateDoc():  

substituir a const handleSubmit
```

import { doc, addDoc, updateDoc } from 'firebase/firestore';

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess(false);

  try {
    setLoading(true);
    const contactData = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    if (id) {
      // modo edição
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, contactData);
    } else {
      // modo criação
      await addDoc(collection(db, 'contacts'), {
        ...contactData,
        createdBy: auth.currentUser.uid,
        contactUserId: contactUserId || null, 
        createdAt: new Date().toISOString()
      });
    }

    setSuccess(true);
    navigate('/');
  } catch (error) {
    setError('Erro ao salvar contato');
    console.error(error);
  } finally {
    setLoading(false);
  }
};

```

6. Altere o título da página de acordo com o modo:

```
const pageTitle = id ? "Editar Contato" : "Adicionar Contato";
```

