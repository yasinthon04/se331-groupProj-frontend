<template>
  <router-link
    class="event-link"
    :to="{ name: 'DoctorLayout', params: { id: doctor.id } }"
  >
  <!-- <span v-if="isAdmin"> -->
  <li class="card" aria-labelledby="event card">
    <div class="card__filter">
      <img class="card__photo" :src="doctor.image" />
    </div>
    <div class="card__container">
      <div class="name">{{ doctor.name }}</div>
    </div>
    <!-- <div class="actions">
      <button class="btn hvr-underline-from-center">Set to user</button>
      <button class="btn hvr-underline-from-center">Set to people</button>
    </div> -->
  </li>
  <!-- </span> -->
  </router-link>
</template>
<script>
import AuthService from '@/services/AuthService.js'
export default {
  name: 'EventDoctor',
  props: {
    doctor: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser() {
      return localStorage.getItem('user')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    },
    isDoctor() {
      return AuthService.hasRoles('ROLE_DOCTOR')
    },
    isUser() {
      return AuthService.hasRoles('ROLE_USER')
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans|Josefin+Slab|Lobster');
.name {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  color: #405cd2;
  font-family: 'Josefin slab', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}

@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Poppins:800');
.card {
  margin-left: 20px;
  padding: 13px;
  max-width: 318px;
  width: 100%;
  background: linear-gradient(-120deg, #ff86f5 0%, #53a0fd 60%, #462ecc 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.card__filter {
  height: 212px;
  overflow: hidden;
  position: relative;
  -o-object-fit: cover;
  object-fit: cover;
}
.card__filter::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  mix-blend-mode: multiply;
  background: linear-gradient(-150deg, #ff76f4 0%, #1897e1 100%);
  z-index: 1;
}
.card__photo {
  width: 100%;
  filter: grayscale(100%);
}
.card__container {
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  font-size: 1.5rem;
  box-sizing: border-box;
  color: #405cd2;
  font-family: 'Josefin slab', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.card h2 {
  font-family: 'Poppins', sans-serif;
  font-weight: regular;
  font-size: 37px;
  color: #405cd2;
  letter-spacing: -1.06px;
  margin: 0 0.4em 0.4em 0;
}
.card time,
.card p,
.card .card__location {
  font-family: 'IBM Plex Mono', sans-serif;
  font-weight: regular;
  font-size: 14px;
  color: #535353;
  margin: 0.18em;
}
.card__location {
  text-decoration-color: #eb0ec7;
  -webkit-text-decoration-color: #eb0ec7;
  transition: all 250ms ease;
  max-width: 13.3em;
}
.card__location:hover {
  background-color: rgba(235, 14, 199, 0.2);
  -webkit-text-decoration-color: rgba(235, 14, 199, 0.2);
  text-decoration-color: rgba(235, 14, 199, 0.2);
}
.card__buttons {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1.5em 0 0.5em 0;
  flex-direction: row;
}
.card__buttons .btn {
  font-family: 'IBM Plex Mono', sans-serif;
  font-weight: regular;
  font-size: 15px;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
  text-align: center;
  display: block;
  flex: 1 1 100%;
  color: #fff;
  padding: 1em;
}
.card__buttons .btn:hover {
  -webkit-animation: gradient 1.3s ease infinite;
  animation: gradient 1.3s ease infinite;
}
.card__buttons .btn:hover i {
  -webkit-animation: levitate 1.3s ease infinite;
  animation: levitate 1.3s ease infinite;
}
.card__buttons .primary {
  position: relative;
  background-image: linear-gradient(to right, #1897e1, #3022ad);
  background-size: 150% 150%;
  transition: all 0.4s ease;
  z-index: 1;
}
.card__buttons .secondary {
  position: relative;
  background-image: linear-gradient(to right, #cc19bf, #7623a2);
  background-size: 150% 150%;
  transition: all 0.4s ease;
  z-index: 1;
}

.profile .actions .btn {
  display: block;
  width: 80px;
  height: 30px;
  margin: 0 auto 10px auto;
  background: none;
  border: 2px solid transparent;
  font-size: 1.1rem;
  box-sizing: border-box;
  color: #643a7a;
}

.btn,
.parameter {
  font-family: 'Josefin sans';
}

.profile .actions .btn:hover {
  cursor: pointer;
}

.hvr-underline-from-center {
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
}

.hvr-underline-from-center:before {
  content: '';
  position: absolute;
  z-index: -1;
  left: 51%;
  right: 51%;
  bottom: 0;
  background: #643a7a;
  height: 1px;
  transition-property: left, right;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
}

.hvr-underline-from-center:hover:before,
.hvr-underline-from-center:focus:before,
.hvr-underline-from-center:active:before {
  left: 0;
  right: 0;
}

.stats .box {
  box-sizing: border-box;
  width: 200px;
  height: 99px;
  background: #95c4ff;
  text-align: center;
  padding-top: 28px;
  transition: all 0.4s ease-in-out;
  color: #643a7a;
}

.box1 {
  animation: bg 0.5s ease-in-out;
}

.box2 {
  animation: bg 0.8s ease-in-out;
}

.box3 {
  animation: bg 1.1s ease-in-out;
}

@keyframes bg {
  0% {
    transform: translate(8rem);
  }
  100% {
    transform: translate(0);
  }
}
.stats .box:hover {
  cursor: pointer;
  color: #fff;
}

.hvr-underline-from-right {
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
}

.hvr-underline-from-right:before {
  content: '';
  position: absolute;
  z-index: -1;
  left: 100%;
  right: 0;
  bottom: 0;
  background: #ffffff;
  height: 99px;
  transition-property: left;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
}

.hvr-underline-from-right:hover:before,
.hvr-underline-from-right:focus:before,
.hvr-underline-from-right:active:before {
  left: 0;
}

.stats .box:nth-child(2) {
  margin: 1px 0;
}

.stats span {
  display: block;
}

.stats .value {
  font-size: 1.8rem;
  font-family: lobster;
}

.stats .parameter {
  font-size: 1rem;
  line-height: 1.2;
}

@-webkit-keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-webkit-keyframes levitate {
  0% {
    padding-left: 0px;
  }
  50% {
    padding-left: 5px;
  }
  100% {
    padding-left: 0px;
  }
}
@keyframes levitate {
  0% {
    padding-left: 0px;
  }
  50% {
    padding-left: 5px;
  }
  100% {
    padding-left: 0px;
  }
}
@media (max-width: 400px) {
  .fas {
    display: none;
  }

  .card__buttons {
    display: inline;
  }
}
</style>
