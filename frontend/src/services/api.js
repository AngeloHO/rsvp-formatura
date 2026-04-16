import axios from 'axios'

// Em dev local, o .env.local define VITE_API_URL=http://localhost:8080/api
// Em produção, usa /api (URL relativa, mesmo domínio)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: false  // Importante: deve corresponder ao backend
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