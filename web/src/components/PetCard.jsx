

const PetCard = ({pet}) => {

  return (
    <div className="pet-card">
        <p>Nombre: {pet.name}</p>
        <p>Especie: {pet.species}</p>
        <p>Sexo: {pet.sex === "m" ? "Macho" : "Hembra"}</p>
        <p>Comentario: {pet.descr}</p>
    </div>
  )
}

export default PetCard