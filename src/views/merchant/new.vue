<template>
  <div>
    <div class="heading">
      <h1 class="title">Create new merchant</h1>
    </div>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="Is available" prop="is_available">
          <el-switch v-model="form.is_available"></el-switch>
        </el-form-item>
         <el-form-item label="Missing translation" prop="missing_translation">
          <el-switch v-model="form.missing_translation"></el-switch>
        </el-form-item>
        <el-form-item label="Default languag" prop="default_lang">
          <el-select v-model="form.default_lang" placeholder="Select language">
            <el-option
              v-for="lang in langs"
              :key="lang"
              :label="lang"
              :value="lang"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Logo" prop="logo">
          <el-upload
            class="upload-demo"
            ref="uploadLogo"
            :action="action"
            :auto-upload="false"
            :limit="1"
            list-type="picture"
            :on-success="onLogoUploadedSuccessfully"
          >
            <el-button slot="trigger" size="small" type="primary">select file</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUploadLogo"
            >upload to server</el-button>
            <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="Latitude" prop="latitude">
          <el-input v-model="form.latitude"></el-input>
        </el-form-item>
        <el-form-item label="Longitude" prop="longitude">
          <el-input v-model="form.longitude"></el-input>
        </el-form-item>
        <el-form-item label="Opening time" prop="opening_time">
          <el-input v-model="form.opening_time"></el-input>
        </el-form-item>
        <el-form-item label="English introduction">
          <el-input type="textarea" v-model="form.introduction_en"></el-input>
        </el-form-item>
        <el-form-item label="Vietnamese introduction">
          <el-input type="textarea" v-model="form.introduction_vi"></el-input>
        </el-form-item>
        <el-form-item label="Gallery" prop="gallery">
          <el-upload
            class="upload-demo"
            ref="uploadGallery"
            :action="action"
            :auto-upload="false"
            :limit="10"
            list-type="picture"
            :on-success="onGalleryUploadedSuccessfully"
          >
            <el-button slot="trigger" size="small" type="primary">select file</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUploadGallery"
            >upload to server</el-button>
            <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">Create</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'new',
  data () {
    const action = process.env.VUE_APP_API_BASE + '/uploads/merchant'
    // form validate rules
    const rules = {
      name: [
        { required: true, message: 'Name is required' }
      ],
      logo: [
        { required: true, message: 'Logo is required' }
      ],
      address: [
        { required: true, message: 'Address is required' }
      ],
      email: [
        { required: true, message: 'Email is required' }
      ],
      phone: [
        { required: true, message: 'Phone is required' }
      ],
      latitude: [
        { required: true, message: 'Latitude is required' }
      ],
      longitude: [
        { required: true, message: 'Longitude is required' }
      ],
      description_en: [
        { required: true, message: 'English description is required' }
      ],
      description_vi: [
        { required: true, message: 'Vietnamese description is required' }
      ],
      opening_time: [
        { required: true, message: 'Opening time is required' }
      ],
      introduction_en: [
        { required: true, message: 'English introduction is required' }
      ],
      introduction_vi: [
        { required: true, message: 'Vietnamese introduction is required' }
      ],
      gallery: [
        { required: true, message: 'Gallery is required' }
      ]
    }
    const form = {
      is_available: true,
      name: '',
      logo: '',
      email: '',
      phone: '',
      address: '',
      latitude: '',
      longitude: '',
      opening_time: '',
      introduction_en: '',
      introduction_vi: '',
      gallery: [],
      emails: [],
      phones: [],
      type: '',
      default_lang: 'en',
      missing_translation: true
    }
    return {
      langs: ['en', 'vi'],
      action: action,
      rules: rules,
      form: form
    }
  },
  methods: {
    ...mapActions([
      'createNewMerchant'
    ]),
    onSubmit (formName) {
      // form validate
      this.$refs[formName].validate(valid => {
        if (!valid) return false
        this.form.emails = []
        this.form.phones = []
        this.form.emails.push(this.form.email)
        this.form.phones.push(this.form.phone)
        this.form.latitude = parseFloat(this.form.latitude)
        this.form.longitude = parseFloat(this.form.longitude)
        this.createNewMerchant(this.form)
          .then(res => {
            this.onCreateSuccess()
            this.resetForm('form')
          })
          .catch(err => {
            console.log(err)
            console.log(err.response)
            this.onCreateError(err.response.data.error)
          })
      })
    },
    submitUploadLogo () {
      this.$refs.uploadLogo.submit()
    },
    submitUploadGallery () {
      this.$refs.uploadGallery.submit()
    },
    onLogoUploadedSuccessfully (response, file, fileList) {
      const url = response.data.url
      this.form.logo = url
      this.$refs.form.validate(valid => {
        if (!valid) return false
      })
    },
    onGalleryUploadedSuccessfully (response, file, fileList) {
      const url = response.data.url
      this.form.gallery.push(url)
      this.$refs.form.validate(valid => {
        if (!valid) return false
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
      this.$refs.uploadLogo.clearFiles()
      this.$refs.uploadGallery.clearFiles()
    }
  }
}
</script>
