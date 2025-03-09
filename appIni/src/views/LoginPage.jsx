import {auth} from '../firebase/config.js'
import {useState} from 'react';
import {  
         createUserWithEmailAndPassword         ,
         sendPasswordResetEmail,
         signInWithEmailAndPassword,
         signInWithPopup,
         GoogleAuthProvider

 } from "firebase/auth";


function LoginPage() {

    const [loginType, setLoginType] = useState('login');
    const [userCredenciais, setUserCredenciais] = useState({})
    const [error , setError] = useState('')

    function handleCred(e){
        setUserCredenciais({...userCredenciais, [e.target.name]: e.target.value})
        //console.log(userCredenciais.email)
    }

    function handleSignUp(e){
        e.preventDefault();
        setError('')

        createUserWithEmailAndPassword(auth, userCredenciais.email, userCredenciais.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setError( errorMessage)
            // ..
        }); 
    }

    function handleSignIn(e){
        e.preventDefault();
        setError('')

        signInWithEmailAndPassword(auth, userCredenciais.email, userCredenciais.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)

            setError( errorMessage)

            // ..
        }); 
    }

    function handlePasswordReset(){
        const email = prompt('Informe seu e-mail:')
        sendPasswordResetEmail(auth, email)
    }

    const handleGoogleLogin = async(e) =>{
        e.preventDefault()

        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider) 

            const user = result.user
            console.log (' Google login ok', user)

        } catch(error){
            //const errorCode = error.code;
            console.error('Google login failed:', error);

            const errorMessage = error.message;
            setError( errorMessage)

        }

    }


    return (
        <>
        <div className="container login-page">
          <section>
            <h1>Etec Albert Einstein</h1>
            <p>Entre ou crie uma conta para continuar.</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Entrar
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Criar Conta
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>E-mail *</label>
                      <input onChange={(e)=>{handleCred(e)}}  type="text" name="email" placeholder="Informe seu email" />
                  </div>
                  <div className="form-control">
                      <label>Senha *</label>
                      <input onChange={(e)=>{handleCred(e)}}  type="password" name="password" placeholder="Informe a senha" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>handleSignIn(e)} className="active btn btn-block">Entrar</button>
                    : 
                    <button onClick={(e)=>handleSignUp(e)}  className="active btn btn-block">Criar Conta</button>


                  }

                  {
                    <button onClick={(e)=>handleGoogleLogin(e)}  className="active btn btn-block">Login com Google</button>
                  }

                  {
                    <div className='error'> {error} </div>
                  }
 
                  {

                  }
                  <p  onClick={handlePasswordReset} className="forgot-password">Esqueci minha senha.</p>
                  
              </form>
          </section>
        </div>


        </>
    )
}

export default LoginPage