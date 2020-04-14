<template>
  <div>
    <div class="heading">
      <h1 class="title">New menu category for merchant: {{ $route.params.id }}</h1>
    </div>
    <div>
      <el-alert
        v-if="error"
        :title="error.title"
        type="warning"
        :description="error.message"
        show-icon
      />
    </div>
    <el-form
      ref="create-category-form"
      auto-complete="off"
      :model="form"
      label-width="200px"
    >
      <el-form-item label="English name">
        <el-input v-model="form.category_name_en"></el-input>
      </el-form-item>
      <el-form-item label="Vietnamese name">
        <el-input v-model="form.category_name_vi"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit('create-category-form')">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'new-menu-category',
  data () {
    // form validate rules
    const rules = {
      category_name_en: [
        { required: true, message: 'English name is required' }
      ],
      category_name_vi: [
        { required: true, message: 'Vietnamese name is required' }
      ]
    }

    const form = {
      merchant_id: this.$route.params.id,
      category_name_en: '',
      category_name_vi: '',
      is_available: true
    }

    return {
      rules: rules,
      form: form,
      error: null,
      success: false,
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'createMenuCategory'
    ]),
    onSubmit (formName) {
      // form validate
      this.$refs[formName].validate(valid => {
        if (!valid) return false

        // validated
        this.error = null
        this.loading = true

        // create token from remote
        this.createMenuCategory(this.form)
          .then((res) => {
            this.error = null
            this.loading = false
            this.resetForm('create-category-form')
            this.onCreateSuccess()
          })
          .catch(err => {
            console.log(err)
            console.log(err.response)
            this.onCreateError(err.response.data.error)
          })
      })
    },
    onCreateSuccess () {
      const h = this.$createElement
      this.$notify({
        title: 'Alert',
        message: h('i', { style: 'color: teal' }, 'success')
      })
    },
    onCreateError (message) {
      this.$notify.error({
        title: 'Error',
        message: message
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
</style>
