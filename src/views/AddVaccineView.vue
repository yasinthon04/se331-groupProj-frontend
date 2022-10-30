<template>
  <div class="card card-container">
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
<style>
.card-container.card {
  display: block;
  border: 3px solid #3d5af1;
  background-color: #e2f3f5;
  border-radius: 8px;
  width: 1000px;
  padding: 8px 10px;
}
.card {
  background-color: #5ee965;
  margin: 0 auto;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
