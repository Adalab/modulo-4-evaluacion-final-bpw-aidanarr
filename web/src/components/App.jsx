import "../styles/App.scss"
import { useState, useEffect } from "react";
import PetCard from "./PetCard";

function App() {

  const [petList, setPetList] = useState([]);
  const [userPetList, setUserPetList] = useState([]);
  const [loginData, setLoginData] = useState({email: "", password: ""})
  const [signupData, setSignupData] = useState({
    name: "", 
    email: "", 
    address: "", 
    password: ""})
  const [newPetData, setNewPetData] = useState({ 
    name: "", 
    species: "", 
    sex: "", 
    descr: ""})
  const [reloadList, setReloadList] = useState(false)
  
  const [token, setToken] = useState("");

  const [isLogged, setIsLogged] = useState(false);

  // carga la lista de mascotas genérica
  useEffect(() => {
    fetch(`http://localhost:5001/pets`)
    .then((response) => response.json())
    .then(info => {
      setPetList(info.data);
    })
  }, []);

  // carga la lista de mascotas del usuario al iniciar sesión o al añadir una nueva
  useEffect(() => {
    if (isLogged) {
      fetch(`http://localhost:5001/myPets`,  {
        method: "GET",
        headers: {
          authorization: token
        }
      })
      .then((response) => response.json())
      .then(info => {
        setUserPetList(info.data);
      })
    }
  }, [isLogged, reloadList])

  // actualizar datos del form
  const handleInput = (ev) => {
    const value = ev.target.value;
    const id = ev.target.id;
    const formId = ev.currentTarget.id;
    console.log(formId)
    
    if (formId === "login-form") {
      setLoginData({ ...loginData, [id]: value });
    } else if (formId === "signup-form") {
      setSignupData({...signupData, [id]: value});
    } else {
      setNewPetData({...newPetData, [id]: value})
    }
    
  }

  // fetch para iniciar sesión
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
      if (response.success) {
        setIsLogged(true)
        setToken(response.token)
      }
    })

  };

  // fetch para registrarse
  const handleSignUp = (ev) => {
    ev.preventDefault()

    fetch(`http://localhost:5001/signup`, {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        'content-type': 'application/json',
        
      }
    })
    .then((response) => response.json())
    .then(response => {
      console.log(response)
    })
  };

  // fetch para añadir una nueva tarjeta (lista del usuario)
  const handleAddPet = (ev) => {
    ev.preventDefault();

    fetch(`http://localhost:5001/myPets/add`, {
      method: "POST",
      body: JSON.stringify(newPetData),
      headers: {
        'content-type': 'application/json',
        authorization: token
      }
    })
    .then((response) => response.json())
    .then(response => {
      console.log(response)
      setReloadList(!reloadList)
    })
    
  };

  // renderiza la lista genérica o la del usuario dependiendo de si ha hecho login
  const renderList = () => {
  if (!isLogged) {
    return petList.map((pet, i) => <PetCard key={i} reloadList={reloadList} setReloadList={setReloadList} isLogged={isLogged} pet={pet} />)
  } else {
    return userPetList.map((pet, i) => <PetCard key={i} reloadList={reloadList} setReloadList={setReloadList} pet={pet} isLogged={isLogged} />)
  }
  }

  return (
    <>
      <header className="header">
        <h1>Mascotas memorables</h1>
        <div className={`login-signup-container ${isLogged ? "hidden" : ""}`}>
          <div className="loginbox">
          <p>Registrarse</p>
            <form id="signup-form" className="form" onInput={handleInput}>
              <label htmlFor="name">Nombre:</label><input type="text" name="name" id="name" />
              <label htmlFor="address">Dirección:</label><input type="text" name="address" id="address" />
              <label htmlFor="email">Correo electrónico:</label><input type="text" name="email" id="email" />
              <label htmlFor="password">Contraseña:</label><input type="password" name="password" id="password" />
              <button onClick={handleSignUp}>Iniciar sesión</button>
            </form>
          </div>
          <div className="loginbox">
          <p>Iniciar sesión</p>
            <form id="login-form" className="form" onInput={handleInput}>
              <label htmlFor="email">Correo electrónico:</label><input type="text" name="email" id="email" />
              <label htmlFor="password">Contraseña:</label><input type="password" name="password" id="password" />
              
            </form>
            <button onClick={handleLogin}>Iniciar sesión</button>
          </div>
        </div>
        <div className={`add-pet-form ${!isLogged ? "hidden" : ""}`}>
          <form id="new-pet" onInput={handleInput} className="add-new-pet">
            <div>
              <label htmlFor="name">Nombre:
              </label>
              <label htmlFor="species">Especie: 
              </label>
              <label htmlFor="descr">Comentario:
              </label>
              <label htmlFor="sex">Sexo: 
              </label> 
            </div>
            <div>
              <input type="text" name="name" id="name" />
              <input type="text" name="species" id="species" />
              <input type="text" name="descr" id="descr" />
              <select name="sex" id="sex">
                <option value="h">Hembra</option>
                <option value="m">Macho</option>
              </select>
            </div>
            
          </form>
          <button onClick={handleAddPet}>Añadir mascota</button>
        </div>
      </header>
      <main>
        <div className="pets-container">
          {renderList()}
        </div>
      </main>
    </>
  )
}

export default App
