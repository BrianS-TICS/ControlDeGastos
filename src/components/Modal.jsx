import React from 'react'
import { useState, useEffect } from 'react'
import Cerrarbtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState(0)
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(()=> {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    },[]);


    const ocultarModal = () => {
        
        setAnimarModal(false)
        setGastoEditar({})

        // modal desaparece despues de la animacion
        setTimeout(() => {
            setModal(false)
        }, 200);
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Verifica por todos los elementos del formulario
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
                setMensaje('')
            }, 3000);

            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})

    }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img 
        src={Cerrarbtn} 
        alt="Cerrar modal" 
        onClick={ocultarModal}
        />
      </div>
    
    <form 
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
        onSubmit = {handleSubmit}
    >
            <legend>{gastoEditar.nombre ? "Editar gasto" : "Nuevo gasto"}</legend>  

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}      

            <div className='campo' >
                <label htmlFor="nombre">Nombre de gasto</label>
                <input 
                    type="text"
                    placeholder='Añade el nombre del gasto'
                    name="nombre" 
                    id="nombre" 
                    value={nombre}
                    onChange = { e => { setNombre(e.target.value) }}
                 />
            </div>
            <div className='campo' >
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    type="number"
                    placeholder='Añade la cantidad del gasto ej. 300'
                    name="cantidad" 
                    id="cantidad" 
                    value={cantidad}
                    onChange = { e => { setCantidad( Number( e.target.value) ) } }
                 />
            </div>
            <div className='campo' >
                <label htmlFor="categoria">Categoria</label>
                <select 
                    name="categoria"
                    id="categoria"
                    value={categoria}
                    onChange = { e => { setCategoria ( ( e.target.value) ) } }
                 >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="varios">Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscribciones</option>

                </select>
            </div>

            <input 
            type="submit"
            value= {gastoEditar.nombre ? "Guardar cambios" : "Añadir gasto"}
            />
    </form>
    
    </div>
  )
}

export default Modal
