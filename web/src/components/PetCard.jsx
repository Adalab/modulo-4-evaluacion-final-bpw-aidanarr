import { useState } from "react";

const PetCard = ({ pet, reloadList, setReloadList, isLogged }) => {

  const [newData, setNewData] = useState({ 
    name: "", 
    species: "", 
    sex: "", 
    descr: ""})
  const [isUpdating, setIsUpdating] = useState(false);

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
    const id = ev.currentTarget.id;

    fetch(`http://localhost:5001/myPets/${id}`, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json"
      }
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          setReloadList(!reloadList)
          setIsUpdating(true)
        });
    
        
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
        <div>
          <p>{pet.name}</p>
          <p>{pet.species}</p>
          <p>{pet.sex === "m" ? "Macho" : "Hembra"}</p>
          <p>{pet.descr}</p>
        </div>
      </div>
        {renderButtons()}
    </article>
  )
}

export default PetCard