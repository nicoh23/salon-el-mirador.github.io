import React, { useState } from 'react'
import image from "../assets/img/img-mesa-4.png";
import { Link } from 'react-router-dom';

const mesas = [
    { id: 1, name: 'Mesa 1', fecha: '12-9-2023', horario: '11:30 am', reservada: true }, //true: libre
    { id: 2, name: 'Mesa 2', reservada: true }, // false: esta ocupada
    { id: 3, name: 'Mesa 3', reservada: true },
    { id: 4, name: 'Mesa 4', reservada: false },
    { id: 5, name: 'Mesa 5', reservada: false },
    { id: 6, name: 'Mesa 6', reservada: false },
    { id: 7, name: 'Mesa 7', reservada: false },
    { id: 8, name: 'Mesa 8', reservada: true },
    { id: 9, name: 'Mesa 9', reservada: true },
    { id: 10, name: 'Mesa 10', reservada: true },
]

function Reservas() {
    const [fecha, setFecha] = useState('')
    const [horario, setHorario] = useState('')
    const [mesaEnRegistro, setMesaEnRegistro] = useState()
    const [listadoMesas, setListadoMesas] = useState(mesas)

    const marcarReserva = (id) => {
        if (!fecha || !horario) {
            return alert('Primero debes seleccionar una fecha y un horario!')
        }
        if (listadoMesas[id - 1].reservada == false) {
            return alert(`La ${listadoMesas[id - 1].name} ya se encuentra reservada`)
        }

        const res = confirm('Esta seguro de que quiere reservar esta mesa?')
        if (res) {
            const nuevaReserva = listadoMesas.filter(item => item.id == id)
            setListadoMesas(listadoMesas.map(item => item.id == id && item.reservada == true
                ? { ...item, fecha: fecha, horario: horario, reservada: !item.reservada }
                : item))

            setMesaEnRegistro(id - 1)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (mesaEnRegistro == null) return alert('Debes elegir una mesa.')

        setFecha('')
        setHorario('')
        alert(`Reserva Realizada para el dia ${fecha} a las ${horario} en la ${listadoMesas[mesaEnRegistro].name}. Te esperamos en El Mirador Salon de Te!`)
        console.log('LISTADO DE MESAS: \n', listadoMesas)
        console.log('MESA REGISTRADA', listadoMesas[mesaEnRegistro])
        // ********************************************************************
        // ************* ENVIO DEL OBJETO listadoMesas[mesaEnRegistro] A FIREBASE *************
    }

    return (
        <div className='seccion-reservas p-3'>
            <nav className='d-flex justify-content-between align-items-center border-bottom pb-3 mb-3'>
                <h1>Bienvenid@ a Reservas</h1>
                <button className='btn-volver'><Link to="/">Volver</Link></button>
            </nav>

            <div className='d-flex justify-content-center align-items-center flex-column'>
                <h3 className='mb-3'>Aqui podras reservar tu merienda</h3>

                <form className='form-reserva' action="" onSubmit={handleSubmit}>
                    <label htmlFor="dateReserva">Selecciona una fecha</label>
                    <input className='w-25 w-50 p-1' value={fecha} id='dateReserva' type="date" onChange={(e) => setFecha(e.target.value)} required />

                    <label htmlFor="dateReserva">Elegi un horario (8:00am a 19:00pm)</label>
                    <input className='w-25 w-50 p-1' value={horario} name='timeReserva' id='dateReserva' type="time" onChange={(e) => setHorario(e.target.value)} />

                    <div className='container-mesas mt-2 d-flex m-auto flex-wrap justify-content-evenly'>
                        {listadoMesas.map(item => (
                            <div onClick={() => marcarReserva(item.id)} className={`box-mesa ${item.reservada ? 'libre' : 'ocupada'}`} key={item.id}>
                                <img src={image} alt="" />
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>

                    <button className='m-auto btn btn-primary btn-reservar'>Reservar</button>
                </form>
            </div>
        </div>
    )
}

export default Reservas