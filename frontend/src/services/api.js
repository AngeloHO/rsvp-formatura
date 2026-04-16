import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }

})

export const salvarConvidado = async (convidado) => {
    try {
        const response = await api.post('/convidados', convidado)
        return response.data
    } catch (error) {
        throw error
    }
}

export const buscarConvidados = async () => {
    try {
        const response = await api.get('/convidados')
        return response.data
    } catch (error) {
        throw error
    }
}

export default api