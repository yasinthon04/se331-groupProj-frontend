<template>
  <div class="form-head">
    <legend><i class="fas fa-unlock"></i> Login Form</legend>
    <div class="form-input">
      <div class="col-md-12">
        <div class="card card-container">
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />
          <Form @submit="handleLogin" :validation-schema="schema">
            <div class="form-input">
              <label for="username"><i class="fas fa-user"></i>Username</label>
              <Field name="username" type="text" class="in" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form-input">
              <label for="password">Password</label>
              <Field name="password" type="password" class="in" />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-input">
              <button class="button" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Login</span>
              </button>
            </div>
            <div class="form-input">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import AuthService from '@/services/AuthService.js'
export default {
  name: 'LoginView',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required('User name is required!'),
      password: yup.string().required('Password is required!')
    })
    return {
      loading: false,
      message: '',
      schema
    }
  },
  methods: {
    handleLogin(user) {
      AuthService.login(user)
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(() => {
          this.message = 'could not login'
        })
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
  margin: 0 auto;
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
