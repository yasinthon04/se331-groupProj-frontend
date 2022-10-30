<template>
  <div class="row">
    <div class="col-12">
      <ReviewForm @comment-submited="addComment" />
    </div>
  </div>
</template>
<script>
import ReviewForm from '@/components/ReviewForm'
import GStore from '@/store'
import CommentService from '@/service/CommentService'
export default {
  inject: ['GStore'],
  components: {
    ReviewForm
  },
  data() {
    return {
      newComment: null
    }
  },
  methods: {
    addComment(comment) {
      console.log(comment)
      GStore.comments.push(comment)
      // GStore.patient.doctorRec = GStore.comments.filter(
      //   (patient) => GStore.patient.id == patient.patient_id
      // )
      CommentService.addComment(GStore.patient.id, comment)
    }
  }
}
</script>
