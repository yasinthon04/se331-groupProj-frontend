<template>
  <h1>Register</h1>
  <div class="form-input">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegiter" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-input">
            <label for="username">Username</label>
            <Field name="username" type="text" class="in" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-input">
            <label for="password">Password</label>
            <Field name="password" type="password" class="in" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-input">
            <label for="firstname">Firstname</label>
            <Field name="firstname" type="firstname" class="in" />
            <ErrorMessage name="firstname" class="error-feedback" />
          </div>
          <div class="form-input">
            <label for="lastname">Lastname</label>
            <Field name="lastname" type="lastname" class="in" />
            <ErrorMessage name="lastname" class="error-feedback" />
          </div>
          <div class="form-input">
            <label for="email">Email</label>
            <Field name="email" type="email" class="in" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-input">
            <label for="age">Age</label>
            <Field name="age" type="age" class="in" />
            <ErrorMessage name="age" class="error-feedback" />
          </div>
          <div class="form-input">
            <label for="hometown">Hometown</label>
            <Field name="hometown" type="hometown" class="in" />
            <ErrorMessage name="hometown" class="error-feedback" />
          </div>
          <label for="image">Upload your image.</label>
          <UploadImages @changed="handleImages" />

          <div class="form-input">
            <button class="button" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </Form>
      <div class="form-group">
        <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'
import { Form, Field, ErrorMessage } from 'vee-validate'
import UploadImages from 'vue-upload-drop-images'
import PeopleService from '@/services/PeopleService'
import * as yup from 'yup'
export default {
  name: 'RegisterView',
  components: {
    Form,
    Field,
    ErrorMessage,
    UploadImages
  },
  //eslint-disable-next-line
    inject:['GStore'],
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 charaacter!')
        .max(20, 'Must be maximum 20 characters!'),
      email: yup
        .string()
        .required('Email is required!')
        .email('Email is invalid!')
        .max(50, 'Must be maxi,u, 50 characters!'),
      password: yup
        .string()
        .required('Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!')
    })
    return {
      successful: false,
      loading: false,
      message: '',
      schema
    }
  },
  mounted() {
    if (this.GStore.currentUser) {
      this.$router.push('/event')
    }
  },
  methods: {
    // eslint-disable-next-line
    handleRegiter(user) {
      Promise.all(
        this.files.map((file) => {
          return PeopleService.uploadFile(file)
        })
      ).then((response) => {
        console.log(response)
        console.log(response.map((r) => r.data))
        user.image = response.map((r) => r.data).toString()
        AuthService.register(user)
          .then(() => {
            this.$router.push({ path: '/login' })
          })
          .catch(() => {
            this.message = 'could not register'
          })
        this.message = ''
        this.successful = false
        this.loading = true
      })
    },
    handleImages(files) {
      this.files = files
    }
  }
}
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
  color: #000000;
}
.card-container.card {
  display: block;
  margin-top: 10px;
  border: 3px solid #3d5af1;
  background-color: #e2f3f5;
  border-radius: 8px;
  width: 300px;
  padding: 8px 10px;
}
.card {
  background-color: #5ee965;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
button {
  margin-top: 10px;
  border: 3px solid #3d5af1;
  background-color: #0e153a;
  border-radius: 8px;
  color: #e2f3f5;
  margin-right: auto;
  padding: 8px 10px;
  margin-bottom: 10px;
}
.in {
  display: block;
  margin-top: 10px;
  border: 3px solid #3d5af1;
  background-color: #e2f3f5;
  border-radius: 8px;
  width: 275px;
}
.form-input {
  margin-top: 20px;
}
.form-head {
  width: 350px;
  border-radius: 8px;
  margin: auto;
}
legend {
  padding-left: 10px;
  font-size: 2em;
  text-align: center;
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.error-feedback {
  color: red;
}
</style>
