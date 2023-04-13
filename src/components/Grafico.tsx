import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { ChartOptions } from 'chart.js/auto';
import Header from './Header';
import { useState, useEffect } from 'react';
import { formatearFecha } from '../helpers/formatearFecha';
import axios from 'axios';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface Dato {
    time: string
    Bitcoin: string
    Ethereum: string
}
interface Datos {
    data: Dato[]
}

const Grafico = () => {

    const [ datos, setDatos ] = useState<Datos['data']>([])

    useEffect(() => {
        const obtenerDatos = async () => {
            const { data }: Datos = await axios.get(`${import.meta.env.VITE_CRIPTOS_URL}`)
            setDatos(data)
        }
        obtenerDatos()
    }, [])

    const data = {
        labels: datos.map(dato => formatearFecha(dato.time)),
        datasets: [
            {
                label: 'Bitcoin (USD)',
                data: datos.map(dato => dato.Bitcoin),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Ethereum (USD)',
                data: datos.map(dato => dato.Ethereum),
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                borderColor: 'rgba(0, 0, 255, 1)',
                borderWidth: 1,
            },
        ],
    };
      
    const options: ChartOptions<'line'> = {
        scales: {
            x: {
                type: 'category',
                labels: datos.map(dato => formatearFecha(dato.time)),
            },
            y: {
                beginAtZero: true,
            },
        },
    };


  return (
    <div className='flex flex-col'>
        <Header />
        <div className='mt-10 p-4 md:pl-16 max-w-2xl w-full mx-auto'>
            <p><span className='font-bold text-blue-500'>Bitcoin</span> es una moneda virtual o un medio de intercambio electrónico que sirve para adquirir productos y servicios como cualquier otra moneda.</p>
            <p className='mt-2'>Pero esta moneda es descentralizada, es decir que no existe una autoridad o ente de control que sea responsable de su emisión y registro de sus movimientos.</p>
            <p className='mt-2'>Consiste en una clave criptográfica que se asocia a un monedero virtual, el cual descuenta y recibe pagos.</p>
            <p className='mt-5'><span className='font-bold text-blue-500'>Ethereum</span> es tanto el nombre de una red de máquinas informáticas repartidas por todo el mundo como el protocolo que conecta y sincroniza el funcionamiento de esa red. La red está descentralizada, es decir, no tiene un único centro o propietario.</p>
            <p className='mt-2'>Ethereum no es una criptomoneda. Es un tipo de entorno de software. Se distingue por el hecho de que las aplicaciones no se ejecutan en un servidor separado, sino directamente en la propia red, lo que aumenta la fiabilidad de estas aplicaciones.</p>
            <p className='mt-2'>Ether es la criptomoneda de la red Ethereum. La emisión de Ether o su minería es una recompensa a los usuarios por realizar tareas de cálculo, o sea, por hacer funcionar la red.</p>
            <p className='mt-4 font-bold'>Hora corresponsiente al Tiempo Universal Coordinado(UTC)</p>
        </div>
        <div className='max-w-3xl w-full px-4 mx-auto mb-16'>
            <Line className='mt-10' data={data} options={options} />
        </div>
    </div>
  )
}

export default Grafico
