<template>
  <div>
    <div class="heading">
      <h1 class="title">New menu for merchant: {{ $route.params.id }}</h1>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="200px">
      <el-form-item label="Menu Category" prop="menu_category_id">
        <el-select v-model="form.menu_category_id" placeholder="Select a category">
          <el-option
            v-for="category in categories"
            :key="category._id"
            :label="category.category_name_en + '/' + category.category_name_vi"
            :value="category._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="English name" prop="name_en">
        <el-input v-model="form.name_en"></el-input>
      </el-form-item>
      <el-form-item label="Vietnamese name" prop="name_vi">
        <el-input v-model="form.name_vi"></el-input>
      </el-form-item>
      <el-form-item label="English description">
        <el-input v-model="form.description_en"></el-input>
      </el-form-item>
      <el-form-item label="Vietnamese description">
        <el-input v-model="form.description_vi"></el-input>
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input v-model.number="form.price"></el-input>
      </el-form-item>
      <el-form-item label="Image">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="action"
          :auto-upload="false"
          :limit="1"
          list-type="picture"
          :on-success="onUploadedSuccessfully"
        >
          <el-button slot="trigger" size="small" type="primary">select file</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >upload to server</el-button>
          <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'new-menu',
  data () {
    const action = process.env.VUE_APP_API_BASE + '/uploads/menu'
    // form validate rules
    const rules = {
      menu_category_id: [
        { required: true, message: 'Menu category is required' }
      ],
      name_en: [
        { required: true, message: 'English name is required' }
      ],
      name_vi: [
        { required: true, message: 'Vietnamese name is required' }
      ],
      description_en: [
        { required: true, message: 'English description is required' }
      ],
      description_vi: [
        { required: true, message: 'Vietnamese description is required' }
      ],
      price: [
        { required: true, message: 'Price is required' },
        { type: 'number', message: 'Price must be a number' }
      ],
      image: [
        { required: true, message: 'Image is required' }
      ]
    }
    const form = {
      menu_category_id: '',
      merchant_id: this.$route.params.id,
      name_en: '',
      name_vi: '',
      description_en: '',
      description_vi: '',
      price: '',
      image: '',
      is_available: true
    }
    return {
      action: action,
      rules: rules,
      form: form
    }
  },

  mounted () {
    this.initData()
  },

  computed: {
    ...mapGetters([
      'categories'
    ])
  },

  methods: {
    ...mapActions([
      'createMenu',
      'getMerchantMenuCategories'
    ]),

    initData () {
      this.getMerchantMenuCategories(this.$route.params.id)
    },

    onSubmit (formName) {
      // form validate
      this.$refs[formName].validate(valid => {
        if (!valid) return false

        // validated
        this.error = null
        this.loading = true

        this.createMenu(this.form)
          .then((res) => {
            console.log(res)
            this.resetForm('form')
            this.onCreateSuccess()
          })
          .catch(err => {
            console.error(err)
          })
      })
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    onUploadedSuccessfully (response, file, fileList) {
      const url = response.data.url
      this.form.image = url
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$refs.upload.clearFiles()
    },
    onCreateSuccess () {
      const h = this.$createElement
      this.$notify({
        title: 'Alert',
        message: h('i', { style: 'color: teal' }, 'success')
      })
    }
  }
}
</script>

<style scoped>
</style>
