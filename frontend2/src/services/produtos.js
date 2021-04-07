import { http } from './config'

export default {

    salvar: (produto) => {
        return http.post('produto', produto)
    },

    listar: () => {
        return http.get('produto')
    },

    atualizar: (produto) => {
        return http.put(`produto/${produto.id}`, produto)
    },

    remover: (produto) => {
        return http.delete(`produto/${produto.id}`)
    }


}