<!-- <template>
  <div>
    <h1>Add Vaccine</h1>
    <form @submit.prevent="addVaccine">
      <h3>Name:</h3>
      <BaseInput v-model="people.name" type="text" label="Name" />

      <h3>Surname:</h3>
      <BaseInput v-model="people.surname" type="text" label="Surname" />

      <h3>Date:</h3>
      <BaseInput v-model="people.date" type="text" label="Date" />

      <h3>Add Vaccine:</h3>

      <BaseSelect
        :options="GStore.vaccine"
        v-model="people.vaccine.id"
        label="Select Vaccine"
      />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import VaccineService from '@/services/VaccineService'
import PeopleService from '@/services/PeopleService'

export default {
  inject: ['GStore'],
  data() {
    return {
      people: {
        name: '',
        surname: '',
        date: '',
        vaccine: ''
      }
    }
  },
  methods: {
    addVaccine() {
      PeopleService.addVaccine(this.people.vaccine)
        .then((response) => {
          console.log(response)
          this.$router.push({
            name: 'EventLayoutView',
            params: { id: response.data.id }
          })
          this.GStore.flashMessage =
            'You are successfully add a new event for' + response.data.title
          setTimeout(() => {
            this.GStore.flashMessage = ''
          }, 3000)
        })
        .catch(() => {
          this.$router.push({ name: 'NetworkError' })
        })
    }
  }
}
</script> -->
