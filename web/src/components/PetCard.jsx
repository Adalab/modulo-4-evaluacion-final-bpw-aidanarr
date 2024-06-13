import { useState, useEffect } from "react";

const PetCard = ({ pet, reloadList, setReloadList, isLogged }) => {

  const [newData, setNewData] = useState({ 
    name: "", 
    species: "", 
    sex: "", 
    descr: ""})
  const [form, setForm] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const petInfo = <div>
    <p>{newData.name ? newData.name : pet.name}</p>
    <p>{newData.species ? newData.species : pet.species}</p>
    <p>{pet.sex === "m" ? "Macho" : "Hembra"}</p>
    <p>{newData.descr ? newData.descr : pet.descr}</p>
  </div>
  const formInputs = <div>
    <form onInput={handleInput}>
    <input type="text" name="name" id="name" />
    <input type="text" name="species" id="species" />
    <select name="sex" id="sex">
      <option value="h">Hembra</option>
      <option value="m">Macho</option>
    </select>
    <input type="text" name="descr" id="descr" />
    </form>
  </div>

  if (isUpdating) {
    setForm(formInputs)
  } else {
    setForm(petInfo)
  }
  }, [isUpdating])

  const handleClickDelete = (ev) => {
    ev.preventDefault();
    const id = ev.currentTarget.id;

    fetch(`http://localhost:5001/myPets/${id}`, {
      method: "DELETE",
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          setReloadList(!reloadList)
        });

  }

  const handleClickModify = (ev) => {
    ev.preventDefault();
    const id = ev.target.id;
    setIsUpdating(!isUpdating)
    

    if (isUpdating) {
      fetch(`http://localhost:5001/myPets/${id}`, {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json"
        }
        }).then(response => response.json())
          .then(data => {
            console.log(data)
            setIsUpdating(!isUpdating)
            setReloadList(!reloadList)
          });
    } else {
      setIsUpdating(!isUpdating)
    }
   
  }

  const handleInput = (ev) => {
    const value = ev.target.value;
    const id = ev.target.id;
    setNewData({ ...newData, [id]: value });
  }

  const renderButtons = () => {
    if (isLogged) {
        const buttons = <div className="card-btn-box">
            <button id={pet.id} onClick={handleClickDelete}>Eliminar</button>
            <button id={pet.id} onClick={handleClickModify}>Modificar</button>
        </div>
        return buttons
    } else {
      return false
    }
  }
  

  return (
    <article className="pet-card">
      <div className="pet-card_data">
        <div className="fieldnames">
          <p>Nombre: </p>
          <p>Especie: </p>
          <p>Sexo: </p>
          <p>Comentario: </p>
        </div>
        {form}
      </div>
        {renderButtons()}
    </article>
  )
}

export default PetCard