
export const formatearFecha = (fecha: any): string => {

    const dayOfYear = fecha.split('T')[0]
    const hour = fecha.split('T')[1].split('.')[0].substring(0, 5)

    return hour + ' (' + dayOfYear + ')'
}