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
      <div class="card__buttons">
        <router-link
          id="page-prev"
          :to="{ name: 'EventList', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
        >
          <div class="card__buttons btn left">Prev Page</div>
        </router-link>

        <router-link
          id="page-next"
          :to="{ name: 'EventList', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
          ><div class="card__buttons btn right">Next Page</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

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
      totalEvents: 0,
      keyword: null
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEvents(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.people = response.data
          comp.totalEvents = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction
    if (this.keyword == null || this.keyword === '') {
      queryFunction = EventService.getEvents(
        3,
        parseInt(routeTo.query.page) || 1
      )
    } else {
      queryFunction = EventService.getEventByKeyword(
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
        queryFunction = EventService.getEvents(3, 1)
      } else {
        queryFunction = EventService.getEventByKeyword(this.keyword, 3, 1)
      }

      queryFunction
        .then((response) => {
          this.events = response.data
          console.log(this.people)
          this.totalEvents = response.headers['x-total-count']
          console.log(this.totalEvents)
        })
        .catch(() => {
          return { name: 'NetworkError' }
        })
    }
  },

  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 3)
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
  padding-top: 10;
  width: 250px;
  align-items: center;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #ffffff;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.card__buttons {
  display: flex;
  align-items: center;
  margin: 1.5em 0 0.5em 0;
  flex-direction: row;
}
.card__buttons .btn {
  font-family: 'IBM Plex Mono', sans-serif;
  font-weight: regular;
  font-size: 15px;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
  text-align: center;
  display: block;
  flex: 1 1 100%;
  color: #fff;
  padding: 1em;
}
.card__buttons .btn:hover {
  -webkit-animation: gradient 0.3s ease infinite;
  animation: gradient 0.3s ease infinite;
}
.card__buttons .btn:hover i {
  -webkit-animation: levitate 0.3s ease infinite;
  animation: levitate 0.3s ease infinite;
}
.card__buttons .left {
  position: left;
  background-image: linear-gradient(to right, #1897e1, #3022ad, #ff77c2);
  transition: all 0.4s ease;
  z-index: 1;
}
.card__buttons .right {
  position: right;
  background-image: linear-gradient(to right, #1897e1, #3022ad, #ff77c2);
  background-size: 150% 150%;
  transition: all 0.4s ease;
  z-index: 1;
  padding-right: 10px;
}
</style>
