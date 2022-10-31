<template>
    <h1>Patient List</h1>
    <div class="events">
        <div class="row">
           <table>
                <tr>
                    <th>VACCINATION STATUS</th>
                </tr>
            <tr
                @click="details(people.id)"
                    v-for="people in doctorPeople"
                    :key="people.id"
                    :people="people"
            >
        <td>{{ people.name }} {{ people.surname }}</td>
      </tr>
    </table>
        </div>
    </div>
</template>

<script>
import DoctorService from '@/services/DoctorService'
import GStore from '@/store'
export default {
  inject: ['GStore'],
  name: 'OwnPeople',
  methods: {
    details(id) {
      this.$router.push({
        name: 'EventDetails',
        params: { id: id }
      })
    }
  },
  data() {
    return {
      doctorPeople: null
    }
  },
  /* eslint-disable-next-line no-unused-vars */
  beforeRouteEnter(routeTo, routeFrom, next) {
    DoctorService.getDoctorOwnPeople(GStore.currentUser.id)
      .then((response) => {
        next((comp) => {
          comp.doctorPeople = response.data
        })
      })
      .catch(() => {
        next({ name: 'NetWorkError' })
      })
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    DoctorService.getDoctorOwnPeople(GStore.currentUser.id)
      .then((response) => {
        this.doctorPeople = response.data
        next()
      })
      .catch(() => {
        next({ name: 'NetWorkError' })
      })
  }
}
</script>
<style>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: auto;
}
table {
  margin: auto;
  margin-top: 50px;
}
th {
  background: #161240;
  color: #eff9fe;
  font-weight: 100;
  text-align: center;
}
table,
th,
td {
  padding: 10px;
}
tr {
  border-top: 1px solid #161240;
  background: #eff9fe;
}
</style>