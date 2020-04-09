<template>
  <div>
    <div>
      <el-select
        class="locale-changer"
        v-model="$i18n.locale"
        :size="large"
        placeholder="Select language"
      >
        <el-option v-for="(lang, i) in langs" :key="`Lang${i}`" :label="lang.lang" :value="lang.key" />
      </el-select>
    </div>
    <div>
      <section class="login">
        <header class="login-header">
          <h1 class="brand">
            <router-link to="/" tabindex="-1">SWEENOW</router-link>
          </h1>
          <el-alert
            v-if="error"
            :title="error.title"
            type="warning"
            :description="error.message"
            show-icon
          />
        </header>
        <el-form
          class="login-form"
          auto-complete="off"
          :model="model"
          :rules="rules"
          ref="login-form"
          label-position="top"
        >
          <h2 class="heading">{{ $t("login.sign_in") }}</h2>
          <el-form-item label="Login" prop="email">
            <el-input type="text" v-model="model.email" placeholder="Please enter email" />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="model.password" placeholder="Please enter password" />
          </el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="submit('login-form')"
          >{{ loading ? 'Loading...' : 'Login' }}</el-button>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
// https://github.com/auth0-blog/vue-jwt-authentication
// https://auth0.com/blog/build-an-app-with-vuejs/

export default {
  name: 'login',

  title: 'Login « SWEENOW | MAKE IT BETTER!',

  data () {
    const langs = [
      { key: 'vi', lang: 'Tiếng Việt' },
      { key: 'en', lang: 'English' }
    ]
    // form model
    // TODO: remove default values
    const model = {
      email: 'hao.le@sweego.vn',
      password: '1111'
    }

    // form validate rules
    const rules = {
      email: [
        { required: true, message: 'Email is required' },
        { min: 2, max: 255, message: 'Email must be between 2 and 255 characters' }
      ],
      password: [
        { required: true, message: 'Password is required' },
        { min: 4, max: 16, message: 'Password must be between 4 and 16 characters' }
      ]
    }

    return {
      model: model,
      rules: rules,
      error: null,
      loading: false,
      langs: langs,
      large: 'mini'
    }
  },

  methods: {
    submit (ref) {
      // form validate
      this.$refs[ref].validate(valid => {
        if (!valid) return false

        // validated
        this.error = null
        this.loading = true

        // create token from remote
        this.$store.dispatch('createToken', this.model)
          .then(token => {
            this.$router.replace({ path: this.$route.query.redirect || '/' })
            this.loading = false
          })
          .catch(err => {
            console.error(err)
            this.error = { title: 'Error occurred', message: 'Abnormal, please try again later!' }
            switch (err.response && err.response.status) {
              case 401:
                this.error.message = 'Incorrect username or password!'
                break
              case 500:
                this.error.message = 'Internal server error, please try again later!'
                break
            }
            this.loading = false
          })
      })
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/variables";

.locale-changer {
  float: right;
  margin: 10px;
}

.login {
  flex: 1;
  width: 95%;
  max-width: 22rem;
  margin: 0 auto;
  font-size: 0.875rem;

  &-header {
    margin-bottom: 1rem;

    .brand {
      // margin: 4.5rem 0 3.5rem;
      text-align: center;
      letter-spacing: 0.125rem;

      a {
        margin: 0;
        color: $brand-color;
        font: 300 3rem sans-serif;

        &:hover {
          color: $brand-hover-color;
          text-shadow: 0 0 1rem $brand-hover-color;
        }
      }
    }
  }

  &-form {
    margin-bottom: 2.5rem;
    padding: 1.875rem 1.25rem;
    background: $login-form-background;
    color: $login-form-color;

    .heading {
      margin: 0 0 1rem;
      font-weight: 400;
      font-size: 1.5rem;
    }

    .el-button {
      margin-top: 0.5rem;
      width: 100%;
    }
  }

  &-footer {
    margin-bottom: 1rem;
    padding: 0.625rem;
    border: 0.0625rem solid $brand-color;
    font-size: 0.75rem;
    text-align: center;

    a {
      color: $brand-color;
    }
  }
}
</style>
