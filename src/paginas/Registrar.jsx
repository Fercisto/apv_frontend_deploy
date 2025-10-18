import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Alerta from '../components/Alerta';

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({msg: 'Hay campos vacíos', error: true});
            return;
        }

        if(password !== repetirPassword) {
            setAlerta({msg: 'Los Password no son iguales', error: true});
            return;
        }

        if(password.length < 6) {
            setAlerta({msg: 'El password es muy corto, agrega mínimo 6 caracteres', error: true});
            return;
        }

        setAlerta({});

        // Crear el usuario en la api
        try {
            const url = `/veterinarios`;
            await clienteAxios.post(url, {nombre, email, password});
            setAlerta({
                msg: 'Creado Correctamente, revista tu email',
                error: false
            });
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta;

    return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

            {msg && <Alerta 
                alerta={alerta}
            />}
        
            <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="uppercase tex-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        placeholder="Tu Nombre"
                        className="border border-gray-200 w-full p-3 mt-3 bg-gray-50 rounded-lg"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div>
                    <label className="uppercase tex-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Email de Registro"
                        className="border border-gray-200 w-full p-3 mt-3 bg-gray-50 rounded-lg"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="uppercase tex-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Tu Password"
                        className="border border-gray-200 w-full p-3 mt-3 bg-gray-50 rounded-lg"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className="uppercase tex-gray-600 block text-xl font-bold" htmlFor="repetir-password">Repetir Password</label>
                    <input 
                        type="password" 
                        id="repetir-password" 
                        placeholder="Repite tu Password"
                        className="border border-gray-200 w-full p-3 mt-3 bg-gray-50 rounded-lg"
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
                    />
                </div>

                <input type="submit" value="Registrar" className="bg-indigo-700 w-full md:w-auto py-3 px-10 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 transition-colors" />

            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link className='block text-center my-5 text-gray-500' to="/">Ya tienes una cuenta? Inicia Sesión</Link>
                <Link className='block text-center my-5 text-gray-500' to="/olvide-password">Olvidé mi Password</Link>
            </nav>
        </div>
    </>
  )
}

export default Registrar