<template>
  <div class="name">User List</div>
  <div class="events">
    <div class="row">
      <EventUser v-for="user in user" :key="user.id" :user="user"></EventUser>
    </div>

    <span v-if="isAdmin">
      <div class="pagination">
        <div class="pagination a">
          <router-link
            id="page-prev"
            :to="{ name: 'EventUserList', query: { page: page - 1 } }"
            rel="prev"
            v-if="page != 1"
          >
            <div class="btn">Prev Page</div>
          </router-link>
        </div>
        <div class="pagination a">
          <router-link
            id="page-next"
            :to="{ name: 'EventUserList', query: { page: page + 1 } }"
            rel="next"
            v-if="hasNextPage"
          >
            <div class="btn">Next Page</div>
          </router-link>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
// @ is an alias to /src
import EventUser from '@/components/EventUser.vue'
import UserService from '@/services/UserService.js'
import AuthService from '@/services/AuthService.js'
export default {
  inject: ['GStore'],
  name: 'EventUserView',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventUser
  },
  data() {
    return {
      user: null,
      totalUsers: 0,
      keyword: null
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    UserService.getUsers(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.user = response.data
          comp.totalUsers = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction
    if (this.keyword == null || this.keyword === '') {
      queryFunction = UserService.getUsers(3, parseInt(routeTo.query.page) || 1)
    } else {
      queryFunction = UserService.getUserByKeyword(
        this.keyword,
        3,
        parseInt(routeTo.query.page) || 1
      )
    }

    queryFunction
      .then((response) => {
        this.user = response.data // <---
        this.totalUsers = response.headers['x-total-count'] // <---
      })
      .catch(() => {
        return { name: 'NetworkError' } // <---
      })
  },
  methods: {
    updateKeyword() {
      var queryFunction
      if (this.keyword === '') {
        queryFunction = UserService.getUsers(3, 1)
      } else {
        queryFunction = UserService.getUserByKeyword(this.keyword, 3, 1)
      }

      queryFunction
        .then((response) => {
          this.people = response.data
          console.log(this.people)
          this.totalPeoples = response.headers['x-total-count']
          console.log(this.totalPeoples)
        })
        .catch(() => {
          return { name: 'NetworkError' }
        })
    }
  },

  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalUsers / 3)
      return this.page < totalPages
    },
    currentUser() {
      return localStorage.getItem('user')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    },
    isDoctor() {
      return AuthService.hasRoles('ROLE_DOCTOR')
    },
    isUser() {
      return AuthService.hasRoles('ROLE_USER')
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Poppins:800');
h1 {
  padding-top: 5%;
}
.name {
  font-weight: bolder;
  font-size: 3rem;
  text-align: center;
  color: #405cd2;
  font-family: 'Josefin slab', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 5%;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: auto;
}
.pagination {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
.btn {
  border-radius: 5px;
  border: 2px solid #ffffff;
  background-image: linear-gradient(to left, #1897e1, #3022ad, #ff77c2);
  font-size: 16px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: #fff;
}
</style>
