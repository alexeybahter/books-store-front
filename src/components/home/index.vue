<template>
  <div>
    <div v-if="isAuthenticated">
      <SortedTable :values="values">
        <thead>
        <tr class="">
          <th scope="col" style="text-align: left; width: 10rem;">
            <SortLink name="id">ID</SortLink>
          </th>
          <th scope="col" style="text-align: left; width: 10rem;">
            <SortLink name="title">Title</SortLink>
          </th>
          <th scope="col" style="text-align: left; width: 10rem;">
            <SortLink name="description">Description</SortLink>
          </th>
          <th scope="col" style="text-align: left; width: 10rem;">
            <SortLink name="price">Price</SortLink>
          </th>
        </tr>
        </thead>
        <tbody slot="body" slot-scope="sort">
        <tr @click="goOneBook(value.id)" v-for="value in sort.values" :key="value.id">
          <td>{{ value.id }}</td>
          <td>{{ value.title }}</td>
          <td>{{ value.description }}
          </td>
          <td>{{ value.price }}</td>
        </tr>
        </tbody>
      </SortedTable>
    </div>
  </div>
</template>

<style>
  .home {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  table {
    border-collapse: collapse;
  }

  table tbody tr:hover {
    cursor: pointer;
    background: #b0b0b0;
  }
</style>

<script>
  import { mapGetters, mapState } from 'vuex'
  import Login from 'components/login'
  import {BOOK_ID_REQUEST} from 'actions/book'

  export default {
    components: {
      Login,
    },
    name: 'home',
    computed: {
      ...mapGetters(['isAuthenticated', 'authStatus', 'isBooksLoaded']),
      ...mapState({
        values: state => state.book.books
      }),
    },
    methods: {
      goOneBook: function (id) {
        this.$store.dispatch(BOOK_ID_REQUEST, {id}).then(() => {
          this.$router.push(`/books/${id}`)
        })
      }
    },
  }
</script>
