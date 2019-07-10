<template>
  <div>
    <div class="headline">
      <form class="login" @submit.prevent="createBook">
        <h1>Create Book</h1>
        <label>Title</label>
        <input required v-model="title" type="text" placeholder="Title"/>
        <label>Description</label>
        <input required v-model="description" type="text" placeholder="Description"/>
        <label>Price</label>
        <input required v-model="price" type="text" placeholder="Price"/>
        <hr/>
        <button type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .headline{
    margin-top: 1em;
    display: flex;
    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
    }
  }
</style>

<script>
  import {BOOK_CREATED_REQUEST} from 'actions/book'

  export default {
    name: 'createBook',
    data () {
      return {
        title: 'title',
        description: 'description',
        price: 'price',
      }
    },
    methods: {
      createBook: function () {
        const { title, description, price } = this
        this.$store.dispatch(BOOK_CREATED_REQUEST, { title, description, price }).then(() => {
          this.$router.push('/')
        })
      }
    },
  }
</script>
