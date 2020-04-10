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
        <el-form-item label="English description" prop="description_en">
          <el-input v-model="form.description_en"></el-input>
        </el-form-item>
        <el-form-item label="Vietnamese description" prop="description_vi">
          <el-input v-model="form.description_vi"></el-input>
        </el-form-item>
        <el-form-item label="Open monday" prop="open_monday">
          <el-input v-model="form.open_monday"></el-input>
        </el-form-item>
        <el-form-item label="Open tuesday" prop="open_tuesday">
          <el-input v-model="form.open_tuesday"></el-input>
        </el-form-item>
        <el-form-item label="Open wednesday" prop="open_wednesday">
          <el-input v-model="form.open_wednesday"></el-input>
        </el-form-item>
        <el-form-item label="Open thursday" prop="open_thursday">
          <el-input v-model="form.open_thursday"></el-input>
        </el-form-item>
        <el-form-item label="Open friday" prop="open_friday">
          <el-input v-model="form.open_friday"></el-input>
        </el-form-item>
        <el-form-item label="Open sturday" prop="open_sturday">
          <el-input v-model="form.open_sturday"></el-input>
        </el-form-item>
        <el-form-item label="Open sunday" prop="open_sunday">
          <el-input v-model="form.open_sunday"></el-input>
        </el-form-item>
        <el-form-item label="English introduction" prop="introduction_en">
          <el-input type="textarea" v-model="form.introduction_en"></el-input>
        </el-form-item>
        <el-form-item label="Vietnamese introduction" prop="introduction_vi">
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
      open_monday: [
        { required: true, message: 'Open monday is required' }
      ],
      open_tuesday: [
        { required: true, message: 'Open tuesday is required' }
      ],
      open_wednesday: [
        { required: true, message: 'Open wednesday is required' }
      ],
      open_thursday: [
        { required: true, message: 'Open thursday is required' }
      ],
      open_friday: [
        { required: true, message: 'Open friday is required' }
      ],
      open_sturday: [
        { required: true, message: 'Open sturday is required' }
      ],
      open_sunday: [
        { required: true, message: 'Open sunday is required' }
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
      is_available: false,
      name: '',
      logo: '',
      email: '',
      phone: '',
      address: '',
      latitude: '',
      longitude: '',
      description_en: '',
      description_vi: '',
      open_monday: '',
      open_tuesday: '',
      open_wednesday: '',
      open_thursday: '',
      open_friday: '',
      open_sturday: '',
      open_sunday: '',
      introduction_en: '',
      introduction_vi: '',
      gallery: [],
      emails: [],
      phones: [],
      type: ''
    }
    return {
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
