<template>
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
      <el-form-item label="English description">
        <div class="el-form-item__label">{{ merchantDetails.description_en }}</div>
      </el-form-item>
      <el-form-item label="Vietnamese description">
        <div class="el-form-item__label">{{ merchantDetails.description_vi }}</div>
      </el-form-item>
      <el-form-item label="Logo">
        <div class="row">
          <div class="col-md-3 col-xs-6">
            <el-image :src="merchantDetails.logo"></el-image>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="Opening time">
        <el-form-item label="Monday">
          <div class="el-form-item__label">{{ merchantDetails.open_monday }}</div>
        </el-form-item>
        <el-form-item label="Tuesday">
          <div class="el-form-item__label">{{ merchantDetails.open_tuesday }}</div>
        </el-form-item>
        <el-form-item label="Wednesday">
          <div class="el-form-item__label">{{ merchantDetails.open_wednesday }}</div>
        </el-form-item>
        <el-form-item label="Thursday">
          <div class="el-form-item__label">{{ merchantDetails.open_thursday }}</div>
        </el-form-item>
        <el-form-item label="Friday">
          <div class="el-form-item__label">{{ merchantDetails.open_friday }}</div>
        </el-form-item>
        <el-form-item label="Saturday">
          <div class="el-form-item__label">{{ merchantDetails.open_sturday }}</div>
        </el-form-item>
        <el-form-item label="Sunday">
          <div class="el-form-item__label">{{ merchantDetails.open_sunday }}</div>
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
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
    </el-form>
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
      'getMerchantDetails'
    ]),
    initData () {
      this.getMerchantDetails(this.$route.params.id)
    }
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
