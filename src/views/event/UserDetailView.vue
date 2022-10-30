<template>
  <div v-if="user">
    <router-view :user="user" />
    <div class="frame flex">
      <div class="center">
        <div class="profile">
          <div class="image">
            <div class="circle-1"></div>
            <div class="circle-2"></div>
            <img :src="user.i" width="70" height="70" />
          </div>
          <div class="name">{{ user.firstname }} {{ user.lastname }}</div>
          <h4>Email : {{ user.email }}</h4>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="30px"
              viewBox="5 0 80 60"
            >
              <path
                id="wave"
                fill="none"
                stroke="#262626"
                s
                stroke-width="2"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
        </div>

        <!-- <div class="stats">
            <div class="box box1 hvr-underline-from-right">
              <span class="value"
                ><router-link :to="{ name: 'EventDetails' }"
                  >Details</router-link
                ></span
              >
            </div>
            <div class="box box2 hvr-underline-from-right">
              <span class="value"
                ><router-link :to="{ name: 'EventVaccine' }"
                  >Vaccine Status</router-link
                ></span
              >
            </div>
  
            <div class="box box3 hvr-underline-from-right">
              <span v-if="isAdmin">
                <span class="value"
                  ><router-link :to="{ name: 'EventDoctor' }"
                    >Doctor</router-link
                  ></span
                >
              </span>
            </div>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'
export default {
  props: ['id', 'user'],
  inject: ['GStore'],
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
  },
  methods: {
    logout() {
      AuthService.logout()
      this.$router.go()
    }
  }
}
</script>
<style scoped>
img {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 100px; /* Rounded border */
  width: 250px; /* Set a small width */
  height: 250px;
}
/* Add a hover effect (blue shadow) */
img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans|Josefin+Slab|Lobster');
body {
  background: #201c29;
}

.frame {
  position: absolute;
  top: 35%;
  left: 42%;
  width: 700px;
  height: 700px;
  margin-top: -200px;
  margin-left: -200px;
  border-radius: 2px;
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.6);
  background: #53a0fd;
  color: #405cd2;
  font-family: 'Josefin slab', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.center {
  align-items: center;
  height: 650px;
  width: 650px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.profile {
  float: left;
  width: 650px;
  height: 550px;
  text-align: center;
}

.profile .image {
  position: relative;
  width: 250px;
  height: 100px;
  margin: 38px auto 0 auto;
}

.profile .image .circle-1,
.profile .image .circle-2 {
  position: absolute;
  box-sizing: border-box;
  width: 250px;
  height: 250px;
  top: -3px;
  left: -3px;
  border-width: 1px;
  border-style: solid;
  border-color: #643a7a #643a7a #643a7a transparent;
  border-radius: 80%;
  transition: all 1.5s ease-in-out;
}

.circle-1 {
  animation: circle-1 80s;
}

@keyframes circle-1 {
  100% {
    transform: rotate(-360deg);
  }
}
.profile .image .circle-2 {
  width: 250px;
  height: 250px;
  border-color: #ff0800 transparent #2616ff #faec23;
  animation: circle 2s;
}

@keyframes circle {
  100% {
    transform: rotate(360deg);
  }
}
.profile .image img {
  display: block;
  border-radius: 100%;
  background: #f5e8df;
}

.profile .image:hover {
  cursor: pointer;
}

.profile .image:hover .circle-1,
.profile .image:hover .circle-2 {
  transform: rotate(360deg);
}

.profile .image:hover .circle-2 {
  transform: rotate(-360deg);
}

.profile .name {
  font-weight: bold;
  font-size: 2rem;
  margin-top: 150px;
  text-align: center;
}

.profile .job {
  font-size: 1.2rem;
  line-height: 15px;
}

svg {
  margin: 0 auto;
  overflow: hidden;
}

#wave {
  stroke-dasharray: 0 16 101 16;
  animation: moveTheWave 2400ms linear infinite;
}

@keyframes moveTheWave {
  0% {
    stroke-dashoffset: 0;
    transform: translate3d(0, 0, 0);
  }
  100% {
    stroke-dashoffset: -133;
    transform: translate3d(-90px, 0, 0);
  }
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
</style>
