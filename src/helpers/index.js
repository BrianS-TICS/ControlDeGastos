export const generarId = () =>{
    const aleatorio = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return aleatorio + fecha
}   

export const formatearFecha = fecha =>{
    const fechaNueva = new Date(fecha);
    
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones);
}