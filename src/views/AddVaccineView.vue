<template>
  <div>
    <VaccineForm @comment-submited="addVaccine" />
  </div>
</template>

<script>
// import VaccineService from '@/services/VaccineService'
import VaccineForm from '@/components/VaccineForm.vue'
// import GStore from '@store'
export default {
  components: { VaccineForm },
  inject: ['GStore'],
  data() {
    return {
      newVaccine: null
    }
  },
  methods: {
    addVaccine() {
      // VaccineService.addVaccine(GStore.user.id)
    }
  }
}
</script>
