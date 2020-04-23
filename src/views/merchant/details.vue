<template>
  <div>
    <div class="heading">
      <router-link :to="{ name: 'merchant/new/category', params: { id: $route.params.id } }">
        <el-button type="primary" size="small" icon="el-icon-edit">Add menu category</el-button>
      </router-link>
      <div style="width:10px;" />
      <router-link :to="{ name: 'merchant/new/menu', params: { type: $route.params.id } }">
        <el-button type="primary" size="small" icon="el-icon-edit">Add menu</el-button>
      </router-link>
    </div>
    <div v-if="merchantDetails != null">
      <el-form ref="form" :model="merchantDetails" label-width="200px">
        <el-form-item label="ID">
          <div class="el-form-item__label">{{ merchantDetails._id }}</div>
        </el-form-item>
        <el-form-item label="Is available">
          <el-switch
            v-model="merchantDetails.is_available"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
          ></el-switch>
        </el-form-item>
        <el-form-item label="Missing translation">
          <el-switch
            v-model="merchantDetails.missing_translation"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
          ></el-switch>
        </el-form-item>
        <el-form-item label="Default language">
          <div class="el-form-item__label">{{ merchantDetails.default_lang }}</div>
        </el-form-item>
        <el-form-item label="Short code">
          <div class="el-form-item__label">{{ merchantDetails.short_code }}</div>
        </el-form-item>
        <el-form-item label="Facebook URL">
          <div class="el-form-item__label">{{ merchantDetails.facebook_url }}</div>
        </el-form-item>
        <el-form-item label="Name">
          <div class="el-form-item__label">{{ merchantDetails.name }}</div>
        </el-form-item>
        <el-form-item label="Address">
          <div class="el-form-item__label">{{ merchantDetails.address }}</div>
        </el-form-item>
        <el-form-item label="Email">
          <div class="el-form-item__label">{{ merchantDetails.emails }}</div>
        </el-form-item>
        <el-form-item label="Phone">
          <div class="el-form-item__label">{{ merchantDetails.phones }}</div>
        </el-form-item>
        <el-form-item label="Logo">
          <div class="row">
            <div class="col-md-3 col-xs-6">
              <el-image :src="merchantDetails.logo"></el-image>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="Opening time">
          <el-form-item label="Opening time">
            <div class="el-form-item__label">{{ merchantDetails.opening_time }}</div>
          </el-form-item>
        </el-form-item>
        <el-form-item label="English introduction">
          <p>{{ merchantDetails.introduction_en }}</p>
        </el-form-item>
        <el-form-item label="Vietnamese introduction">
          <p>{{ merchantDetails.introduction_vi }}</p>
        </el-form-item>
        <el-form-item label="Galleries">
          <div class="row">
            <div class="block" v-for="image in merchantDetails.gallery" :key="image">
              <el-image :src="image"></el-image>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="Menu">
          <div v-for="menu in merchantDetails.menus" v-bind:key="menu._id">
            <el-row>
              <el-col>
                <div class="el-form-item__label">{{menu.category_name_en}}/{{menu.category_name_vi}}</div>
              </el-col>
              <el-col>
                <div class="menu-item" v-for="item in menu.items" v-bind:key="item._id">
                  <el-row :gutter="24">
                    <el-col :span="2">
                      <div>
                        <el-image style="width: 50px; height: 50px" :src="item.image"></el-image>
                      </div>
                    </el-col>
                    <el-col :span="22">
                      <div class="menu-item-name">{{ item.name_en }}/{{ item.name_vi }}</div>
                      <div class="menu-item-price">{{ item.price }}</div>
                      <el-button
												@click.native.prevent="onRemoveImage(item._id)"
												type="text"
												size="small"
											>Remove Image</el-button>
                      <el-button
												@click.native.prevent="onRemoveMenuItem(item._id)"
												type="text"
												size="small"
											>Remove</el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'mechant-details',
  data () {
    return {
    }
  },
  mounted () {
    this.initData()
  },
  computed: {
    ...mapGetters([
      'merchantDetails'
    ])
  },
  methods: {
    ...mapActions([
      'getMerchantDetails',
      'updateMenu',
      'deleteMenu'
    ]),
    initData () {
      this.getMerchantDetails(this.$route.params.id)
    },
    onRemoveImage (menuID) {
      console.log(menuID)
      const doc = {
        id: menuID,
        payload: {
          image: ''
        }
      }
      this.updateMenu(doc)
        .then((res) => {
          this.error = null
          this.loading = false
          this.initData()
        })
        .catch(err => {
          console.log(err)
          console.log(err.response)
          this.onError(err.response.data.error)
        })
    },
    onError (message) {
      this.$notify.error({
        title: 'Error',
        message: message
      })
    },
    onRemoveMenuItem (menuID) {
      console.log(menuID)
      const doc = {
        id: menuID
      }
      this.deleteMenu(doc)
        .then((res) => {
          this.error = null
          this.loading = false
          this.initData()
        })
        .catch(err => {
          console.log(err)
          console.log(err.response)
          this.onError(err.response.data.error)
        })
    },
  }
}
</script>

<style lang="scss">
p {
  color: #606266;
  margin-top: 15px;
  line-height: 100%;
}

.menu-item {
  &-name {
    color: #606266;
    line-height: 100%;
  }
  &-price {
    color: #606266;
    line-height: 100%;
  }
}
</style>
