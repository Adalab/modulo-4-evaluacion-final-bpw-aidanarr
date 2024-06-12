import "../styles/App.scss"
import { useState, useEffect } from "react";
import PetCard from "./PetCard";

function App() {

  const [petList, setPetList] = useState([]);
  const [loginData, setLoginData] = useState({email: "", password: ""})
  const [signupData, setSignupData] = useState({
    name: "", 
    email: "", 
    address: "", 
    password: ""})

  useEffect(() => {
    fetch(`http://localhost:5001/pets`)
    .then((response) => response.json())
    .then(info => {
      setPetList(info.data);
    })
  }, []);

  const handleInput = (ev) => {
    const value = ev.target.value;
    const id = ev.target.id;
    const formId = ev.currentTarget.id;
    console.log(formId)
    
    if (formId === "login-form") {
      setLoginData({ ...loginData, [id]: value });
    } else {
      setSignupData({...signupData, [id]: value})
    }
    
  }

  const handleLogin = (ev) => {
    ev.preventDefault()

    fetch(`http://localhost:5001/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then(response => {
      console.log(response)
    })

  };

  const handleSignUp = (ev) => {
    ev.preventDefault()

    fetch(`http://localhost:5001/signup`, {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then(response => {
      console.log(response)
    })

  };


  return (
    <>
      <header className="header">
        <h1>Mascotas memorables</h1>
        <div>
        <p>Registrarse</p>
          <form id="signup-form" className="form" onInput={handleInput}>
            <label htmlFor="name">Nombre:</label><input type="text" name="name" id="name" />
            <label htmlFor="address">Dirección:</label><input type="text" name="address" id="address" />
            <label htmlFor="email">Correo electrónico:</label><input type="text" name="email" id="email" />
            <label htmlFor="password">Contraseña:</label><input type="password" name="password" id="password" />
            <button onClick={handleSignUp}>Iniciar sesión</button>
          </form>
        </div>
        <div>
        <p>Iniciar sesión</p>
          <form id="login-form" className="form" onInput={handleInput}>
            <label htmlFor="email">Correo electrónico:</label><input type="text" name="email" id="email" />
            <label htmlFor="password">Contraseña:</label><input type="password" name="password" id="password" />
            <button onClick={handleLogin}>Iniciar sesión</button>
          </form>
        </div>
      </header>
      <main>
        <div className="pets-container">
          {petList.map((pet, i) => <PetCard key={i} pet={pet} />)}
        </div>
      </main>
    </>
  )
}

export default App
