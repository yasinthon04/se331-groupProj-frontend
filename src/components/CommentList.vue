<template>
  <div class="review-container">
    <div id="doctorSuggest-card">
      <h3>Doctor Comment:</h3>
      {{ GStore.people.comments}}
      <span 
        v-for="comment in GStore.people.commentList"
        :key="comment.id"
        :comment="comment"
        > Comment: {{ comment.comment }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['GStore'],
  props: ['comment']
}
</script>

<style>
#doctorSuggest-card {
  background-color: #95c4ff;
  padding: 20px;
  margin: auto;
  border-radius: 10px;
  border: 2px solid #000000;
  width: 425px;
  padding: 3%;
}
li {
  text-align: left;
}
</style>
