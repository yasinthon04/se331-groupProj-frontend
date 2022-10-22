<template>
  <router-link
    class="event-link"
    :to="{ name: 'EventLayoutView', params: { id: event.id } }"
  >
    <li class="card" aria-labelledby="event card">
      <div class="card__filter">
        <img
          class="card__photo"
          src="https://i1.sndcdn.com/artworks-000192685399-co64se-t500x500.jpg"
          alt="A man in colorful clothing with the sun behind him on a beach."
        />
      </div>
      <div class="card__container">
        <h2>{{ event.title }}</h2>
        <time
          ><span>@{{ event.time }} on {{ event.date }}</span></time
        >
        <p>{{ event.organizer.name }}</p>

        <!-- <div class="card__buttons">
          <a
            href="#"
            class="card__buttons btn primary"
            role="button"
            aria-haspopup="false"
          >
            Details
            <div class="card__fill"></div>
          </a>
          <a
            href="#"
            class="card__buttons btn secondary"
            role="button"
            aria-haspopup="false"
          >
            Vaccine
            <i class="fas fa-arrow-right"></i>
          </a>
        </div> -->
      </div>
    </li>
  </router-link>
</template>
<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
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
  margin-left: 50px;
  padding: 13px;
  max-width: 318px;
  width: 100%;
  background: linear-gradient(-120deg, #33ff55 0%, #53a0fd 60%, #db5151 100%);
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
  background: linear-gradient(-150deg, #33ff55 0%, #1897e1 100%);
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
  box-sizing: border-box;
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
