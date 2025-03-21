import { auth } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext'; // Importe o hook useAuth
import Header from '../components/Header';

function MainPage() {
  const { user } = useAuth(); // Acesse o objeto user do contexto

  const handleSignOut = () => {
    auth.signOut();
  };

  if (!user) {
    return <p>Carregando informações do usuário...</p>; // Ou redirecione para a página de login
  }

  return (
    <div>

      <Header pageTitle="Principal"/>
      
      {user.displayName && <p>Nome: {user.displayName}</p>}
      {user.photoURL && <img src={user.photoURL} alt="Foto do usuário" />}
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}

export default MainPage;


