<template>
  <div class="review-container">
    <div id="doctorSuggest-card">
      <h3>Doctor Comment:</h3>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          Dortor's Suggestion: "{{ review.suggestion }}"
          <br />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['GStore'],
  props: ['reviews']
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
