<template>
  <div v-if="people">
    <h1>{{ people.name }}{{ people.surname }}</h1>
    <p>{{ people.age }}</p>
    <p>{{ people.hometown }}</p>
    <p>{{ people.vaccine }}</p>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  props: ['id'],
  data() {
    return {
      people: null
    }
  },
  created() {
    // fetch event (by id) and set local event data
    EventService.getEvent(this.id)
      .then((response) => {
        this.people = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
