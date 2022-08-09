import { useState, useEffect } from 'react'
import Header from './components/Header';
import Filtros from './components/Filtros';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import { generarId } from './helpers';
import Modal from './components/Modal';
import ListadoGastos from './components/listadoGastos';

function App() {
  
  // Props
  // Arreglo de gastos
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [] 
    )

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  
  const [gastoEditar, setGastoEditar] = useState({})
  
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  
  
  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
      
      setTimeout(() => {
        setAnimarModal(true)
      }, 200);
    }
  }, [gastoEditar])
  
  // Gastos
  useEffect(()=>{
    // Para almacenar arreglos en localStoraje convertimos a strings
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  /* Filtro */
  useEffect(()=>{
    if(filtro){
      // Actualizar gastos por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }
    
  },[filtro]);


  /* Local storage*/
  // Presupuesto
  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0)
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  },[])
  
  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  },[presupuesto])


  const handleNuevoGasto = () => {
    setGastoEditar({})

    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 200);
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      // Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }
    else{
      // Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 200);

  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos = {setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}

        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {/* Doble amperson "&&" permite ejecutar codigo en un ternario sin necesidad de agregar una segunda else o segunda accion */}
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro = {filtro}
              setFiltro = {setFiltro}
            />
            <ListadoGastos 
              gastos = {gastos}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtro = {filtro}
              gastosFiltrados = {gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="Icono de nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar = {gastoEditar}
          setGastoEditar = {setGastoEditar}
        />
      }

    </div>
  )
}

export default App
