import React from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import { formatearFecha } from '../helpers/index'

import iconoAhorro from '../img/icono_ahorro.svg'
import iconoCasa from '../img/icono_casa.svg'
import iconoComida from '../img/icono_comida.svg'
import iconoGastos from '../img/icono_gastos.svg'
import iconoOcio from '../img/icono_ocio.svg'
import iconoSalud from '../img/icono_salud.svg'
import iconoSuscripciones from '../img/icono_suscripciones.svg'

const diccionarioIconos = {
  ahorro: iconoAhorro,
  comida: iconoComida,
  casa: iconoCasa,
  varios: iconoGastos,
  ocio: iconoOcio,
  salud: iconoSalud,
  suscripciones: iconoSuscripciones
}

const Gasto = ({ gasto, setGastoEditar, eliminarGasto}) => {

  const { categoria, nombre, cantidad, fecha, id } = gasto;
  
  // Accion 'Izquierda'
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick = { () => setGastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  // Accion 'Derecha'
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick = {() => eliminarGasto(id)}
        destructive = {true}
        >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (

    <SwipeableList>

      <SwipeableListItem
        leadingActions = {leadingActions()}
        trailingActions = {trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img
              src={diccionarioIconos[categoria]}
              alt="Icono de gasto"
            />
            <div className='descripcion-gasto'>
              <p className='categoria'>{categoria}</p>
              <p className='nombre-gasto'>{nombre}</p>
              <p className='fecha-gasto'>
                Agregado el: {' '}
                <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <div className='cantidad-gasto'>${cantidad}</div>
        </div>
      </SwipeableListItem>

    </SwipeableList>

  )
}

export default Gasto
