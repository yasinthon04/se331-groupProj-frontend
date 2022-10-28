<template>
  <div class="name">People' vaccinated</div>
  <div class="events">
    <!-- <div class="search-box">
      <BaseInput
        v-model="keyword"
        type="text"
        label="Search..."
        @input="updateKeyword"
      />
    </div> -->
    <div class="row">
      <EventCard
        v-for="people in people"
        :key="people.id"
        :people="people"
      ></EventCard>
    </div>

    <div class="pagination">
      <div class="pagination a">
        <router-link
          id="page-prev"
          :to="{ name: 'EventList', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
        >
          <div class="btn">Prev Page</div>
        </router-link>
      </div>
      <div class="pagination a">
        <router-link
          id="page-next"
          :to="{ name: 'EventList', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
        >
          <div class="btn">Next Page</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import PeopleService from '@/services/PeopleService.js'

export default {
  name: 'EventListView',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  data() {
    return {
      people: null,
      totalPeoples: 0,
      keyword: null
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    PeopleService.getPeoples(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.people = response.data
          comp.totalPeoples = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction
    if (this.keyword == null || this.keyword === '') {
      queryFunction = PeopleService.getPeoples(
        3,
        parseInt(routeTo.query.page) || 1
      )
    } else {
      queryFunction = PeopleService.getPeopleByKeyword(
        this.keyword,
        3,
        parseInt(routeTo.query.page) || 1
      )
    }

    queryFunction
      .then((response) => {
        this.people = response.data // <---
        this.totalEvents = response.headers['x-total-count'] // <---
      })
      .catch(() => {
        return { name: 'NetworkError' } // <---
      })
  },
  methods: {
    updateKeyword() {
      var queryFunction
      if (this.keyword === '') {
        queryFunction = PeopleService.getPeoples(3, 1)
      } else {
        queryFunction = PeopleService.getPeopleByKeyword(this.keyword, 3, 1)
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
      let totalPages = Math.ceil(this.totalPeoples / 3)
      return this.page < totalPages
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
