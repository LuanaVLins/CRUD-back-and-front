<template>
  <div id="app">

<b-container>

  <b-navbar type="dark" variant="primary">
      <b-navbar-brand tag="h4">Produtos</b-navbar-brand>
  </b-navbar>

    <b-form @submit.prevent="salvar">

      <b-form-group
        label="Nome:"
      >
      <b-form-input
          v-model="produto.nome"
          type="text"
          placeholder="Informe o nome"
          required
        ></b-form-input>

      </b-form-group>

       <b-form-group
        label="Quantidade:"
       >

        <b-form-input
          v-model="produto.quantidade"
          type="number"
          placeholder="Informe a quantidade"
          required
        ></b-form-input>

      </b-form-group>

       <b-form-group
        label="Valor:"
       >

        <b-form-input
          v-model="produto.valor"
          type="double"
          placeholder="Informe o valor"
          required
        ></b-form-input>


        </b-form-group>
        

      
      <b-button type="submit" variant="success">Salvar</b-button>

    </b-form>

    <b-table :fields="colunas" striped hover :items="Produtos">

      <template #cell(opcoes)="data">
        <b-button type="button" variant="outline-primary" @click="editar(data.item)">Editar</b-button>
        <b-button type="button" variant="outline-danger" @click="remover(data.item)">Remover</b-button>
      </template>

    </b-table>
   
    </b-container>

  </div>
</template>

<script>

import produto from './services/produtos'

export default {
  name: 'App',
  components: {

  },

  data(){
    return {

      colunas: [
          // A virtual column that doesn't exist in items
          'id',
          // A column that needs custom formatting
          { key: 'nome', label: 'Nome ' },
          // A regular column
          'Quantidade',
          // A regular column
          { key: 'valor', label: 'Valor'},
          
      ],
      produto: {
        id: '',
        nome: '',
        quantidade: '',
        valor: '',
      },
      produtos: []
    }
  },

  mounted(){
    this.listar()
  },

  methods: {
    salvar(){
      
      if(!this.produto.id){

        produto.salvar(this.produto).then(()=>{
          this.produto = {}
          this.listar()
          alert('Salvo com sucesso!')
        }).catch(e => {
          console.log(e)
        })

      }else{

        produto.atualizar(this.produto).then(()=>{
          this.produto = {}
          this.listar()
          alert('Atualizado com sucesso!')
        }).catch(e => {
          console.log(e)
        })

      }
      
    },
    listar(){

      produto.listar().then((resposta)=>{
        this.produtos = resposta.data
      }).catch(e => {
          console.log(e)
      })

    },

    editar(produto){

      this.produto = produto
      console.log(this.produto)

    },

    remover(produto){

      if(confirm(`Deseja realmente excluir ${produto.nome}?`)){

         produto.remover(produto).then(()=> {
            this.listar()
        }).catch(e => {
            console.log(e)
        })

      }

     

    }
  }
}
</script>

<style>



</style>
