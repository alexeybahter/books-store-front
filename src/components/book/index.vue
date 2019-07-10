<template>
  <div>
    <div class="headline">
      <h1>Book</h1>
    </div>
    <div v-if="book" class="main-desc">
      <span>Title:</span> {{book.title}}<br>
      <span>Description:</span> {{book.description}}<br>
      <span>Price:</span> {{book.price}}<br>
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
  .main-desc {
    width: 500px;
    span {
      font-weight: bold;
    }
  }
</style>

<script>
  import {BOOK_ID_REQUEST} from 'actions/book'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'book',
    computed: {
      ...mapGetters(['isAuthenticated', 'authStatus', 'getBook']),
      ...mapState({
        book: state => state.book.book
      }),
    },
    created: function () {
      this.$store.dispatch(BOOK_ID_REQUEST, {id: this.$route.params.id})
    }
  }
</script>
