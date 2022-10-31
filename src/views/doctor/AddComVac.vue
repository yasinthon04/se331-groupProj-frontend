<template>
  <div class="row">
    <div v-if="isDoctor" class="col">
      <CommentForm @comment-submited="addComment" />
    </div>
    <div v-if="isAdmin" class="col">
      <VaccineForm @comment-submited="addVaccine" />
    </div>
  </div>
</template>
<script>
import CommentForm from '@/components/CommentForm.vue'
import CommentService from '@/services/CommentService.js'
import VaccineForm from '@/components/VaccineForm.vue'
import VaccineService from '@/services/VaccineService.js'
import AuthService from '@/services/AuthService.js'
import GStore from '@/store'
export default {
  inject: ['GStore'],
  components: {
    CommentForm,
    VaccineForm
  },
  methods: {
    addComment(comment) {
      console.log(comment)
      // GStore.comment.push(comment)
      CommentService.addCommentToUser(GStore.people.id, comment)
    },
    addVaccine(vaccine) {
      console.log(GStore.people.id)
      console.log(vaccine)
      VaccineService.getVaccine(GStore.people.id, vaccine)
    }
  },
  computed: {
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    },
    isDoctor() {
      return AuthService.hasRoles('ROLE_DOCTOR')
    }
  }
}
</script>
