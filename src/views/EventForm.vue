<template>
  <div class="row justify-content-md-center">
    <div>
      <h1>Name</h1>
      <form @submit.prevent="saveEvent">
        <BaseInput
          v-model="people.name"
          type="text"
          label="Name"
          class="field"
        />

        <h3>Surname</h3>

        <BaseInput v-model="people.surname" type="text" label="Title" />

        <BaseInput v-model="people.location" type="text" label="Location" />

        <h3>Where is your event?</h3>

        <label>Location</label>

        <BaseInput v-model="people.hometown" type="text" label="Location" />

        <h3>Doctor?</h3>

        <BaseSelect
          :options="GStore.doctor"
          v-model="people.doctor.id"
          label="Select an Doctor"
        />
        <h3>The image of the Event</h3>
        <UploadImages @changed="handleImages" />

        <button type="submit">Submit</button>
      </form>

      <pre>{{ people }}</pre>
    </div>
  </div>
</template>

<script>
import PeopleService from '@/services/PeopleService.js'
import UploadImages from 'vue-upload-drop-images'
export default {
  inject: ['GStore'],
  components: {
    UploadImages
  },
  data() {
    return {
      people: {
        name: '',
        surname: '',
        age: '',
        hometown: '',
        doctor: { id: '', name: '' },
        imgUrls: []
      },
      files: []
    }
  },
  methods: {
    saveEvent() {
      Promise.all(
        this.files.map((file) => {
          return PeopleService.uploadFile(file)
        })
      ).then((response) => {
        this.people.imgUrls = response.map((r) => r.data)
        PeopleService.savePeople(this.people)
          .then((response) => {
            console.log(response)
            this.$router.push({
              name: 'EventDetails',
              params: { id: response.data.id }
            })
            this.GStore.flashMessage =
              'You are successfully add a new event for ' + response.data.title
            setTimeout(() => {
              this.GStore.flashMessage = ''
            }, 3000)
          })
          .catch(() => {
            this.$router.push('NetworkError')
          })
      })
    },
    handleImages(files) {
      this.files = files
    }
  }
}
</script>
<style scoped></style>
