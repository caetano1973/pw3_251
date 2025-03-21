
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import './Header.css'; // Importe o arquivo Header.css

// eslint-disable-next-line react/prop-types
function Header({ pageTitle }) {
  const { user } = useAuth();

  const handleSignOut = () => {
    if (window.confirm('Deseja sair, tem certeza?')) {
      auth.signOut();
    }
  };

  return (
    <header className="header">
      <div className="header-nav">
        <NavLink to="/">
          <button className="btn">Home</button>
        </NavLink>
        <NavLink to="/user-prof">
          <button className="btn">Perfil</button>
        </NavLink>
      </div>

      <h1>{pageTitle}</h1>

      <div className="header-user">
        {user && (
          <>
            {user.photoURL ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                />
                <span>{user.displayName}</span>
              </div>
            ) : (
              <div>
                <i className="fa fa-user"></i>
                <span>{user.email}</span>
              </div>
            )}
            <button onClick={handleSignOut} className="btn">Sair</button>
          </>
        )}
      </div>

    </header>
  );
}

export default Header;