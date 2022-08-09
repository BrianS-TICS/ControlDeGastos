import {useState} from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto,
   setPresupuesto, 
   setIsValidPresupuesto
  }) => {
  
  const [mensaje, setMensaje] = useState('');

  const hundlePresupuesto = (e) =>{
    e.preventDefault();
    if(!(presupuesto) || (presupuesto) <= 0){
      setMensaje('No es un presupuesto valido')
      return
    }
    
    setIsValidPresupuesto(true)

  }
  
  return (

    <div className='contenedor-presupuesto contenedor sombra' >
      <form onSubmit={hundlePresupuesto} className='formulario' action="">
        
        <div className='campo'>
          <label htmlFor="">Definir presupuesto</label>
          <input 
          className='nuevo-presupuesto' 
          type="number" 
          placeholder='Añade tu presupuesto'
          value={presupuesto}
          onChange = { (e) => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input type="submit" value="Añadir" />

        {mensaje && <Mensaje tipo="error" >{mensaje}</Mensaje> }

      </form>
    </div>
  
  )
}

export default NuevoPresupuesto
