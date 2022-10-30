<template>
  <div>
    <h1>Add Vaccine</h1>
    <form @submit.prevent="addVaccine">
      <h3>Name:</h3>
      <BaseInput type="text" label="Name" />

      <h3>Surname:</h3>
      <BaseInput type="text" label="Surname" />

      <h3>Date:</h3>
      <BaseInput type="text" label="Date" />

      <h3>Add Vaccine:</h3>

      <BaseSelect
        :options="GStore.vaccine"
        v-model="vaccine.id"
        label="Select Vaccine"
      />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<script>
export default {
  inject: ['GStore'],
  data() {
    return {
      name: '',
      surname: '',
      date: '',
      vaccine: ''
    }
  },
  methods: {
    addVaccine() {
      if (
        this.name === '' ||
        this.surname === '' ||
        this.date === '' ||
        this.vaccine === ''
      ) {
        alert('Please fill out every field.')
        return
      }
      this.GStore.flasgMessage = 'The vaccine is being added'
      setTimeout(() => {
        this.GStore.flasgMessage = ''
      }, 3000)
      let vaccine = {
        name: this.name,
        surname: this.surname,
        date: this.date,
        vaccine: this.vaccine
      }
      this.$emit('comment-submited', vaccine)
      this.name = ''
      this.surname = ''
      this.date = ''
      this.vaccine = ''
    }
  }
}
</script>
