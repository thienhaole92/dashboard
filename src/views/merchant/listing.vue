<template>
  <div>
    <div class="heading">
      <label class="search icon-before icon-search">
        <input type="text" placeholder="Search" />
      </label>
      <router-link :to="{ name: 'merchant/new' }">
        <el-button type="primary" size="small" icon="el-icon-edit">Add item</el-button>
      </router-link>
    </div>
    <el-table :data="merchants">
      <el-table-column prop="name" label="Name" show-overflow-tooltip width="200"></el-table-column>
      <el-table-column label="Is Available">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_available"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="Emails">
        <template slot-scope="scope">
          <a v-for="item in scope.row.emails" :key="item" href="#">{{ item }},</a>
        </template>
      </el-table-column>
      <el-table-column label="Phones">
        <template slot-scope="scope">
          <a v-for="item in scope.row.phones" :key="item" href="#">{{ item }},</a>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations">
        <template slot-scope="scope">
          <el-button @click.native.prevent="handleOpen(scope.row._id)" type="text" size="small">Detail</el-button>
          <!-- <el-button @click.native.prevent="handleEdit(scope.row._id)" type="text" size="small">Edit</el-button>
          <el-button @click.native.prevent="handleRemove(scope.row._id)" type="text" size="small">Remove</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="currentPage"
      :page-sizes="[20, 40, 60, 80]"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'merchants',

  data () {
    return {
      pageSize: 20,
      currentPage: 1,
      posts: [],
      selections: []
    }
  },

  created () {
    this.$title(this.$route.params.type)
    this.initData()
  },

  computed: {
    ...mapGetters([
      'merchants',
      'total'
    ])
  },

  methods: {
    ...mapActions([
      'getMerchants'
    ]),
    initData () {
      this.getMerchants({ page: this.currentPage, limit: this.pageSize })
    },
    handleSizeChange (value) {
      this.pageSize = value
      this.initData()
    },
    handleCurrentChange (value) {
      this.currentPage = value
      this.initData()
    },
    handleOpen (id) {
      this.$router.push({ name: 'merchant/details', params: { id, type: 'merchant' } })
    },
    handleEdit (id) {
    },
    handleRemove (id) {
    }
  },

  // https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html#响应路由参数的变化
  // https://router.vuejs.org/zh-cn/advanced/data-fetching.html
  watch: {
    $route () {
      this.initData()
    }
  }
}
</script>

<style>
.el-pagination {
  margin: 1rem 0 2rem;
  text-align: right;
}
</style>
