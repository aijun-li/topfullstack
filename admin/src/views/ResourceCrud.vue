<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :page.sync="page"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ResourceList extends Vue {
  @Prop(String)
  resource!: string

  data = {}
  option = { column: [] }
  page = {
    pageSize: 0,
    total: 0
  }
  query = {
    limit: 2,
    page: 1,
    sort: {},
    where: {}
  }

  async fetch() {
    const res = await this.$http.get(`/${this.resource}`, {
      params: {
        query: this.query
      }
    })
    this.data = res.data
    this.page.total = res.data.total
  }
  async fetchOption() {
    const res = await this.$http.get(`/${this.resource}/option`)
    this.option = res.data
  }
  async create(row: any, done: Function) {
    await this.$http.post(`/${this.resource}`, row)
    this.$message.success('创建成功')
    this.fetch()
    done()
  }
  async update(row: any, index: any, done: Function) {
    const data = JSON.parse(JSON.stringify(row))
    delete data.$index
    await this.$http.put(`/${this.resource}/${row._id}`, data)
    this.$message.success('更新成功')
    this.fetch()
    done()
  }
  async remove(row: any) {
    try {
      await this.$confirm('是否确认删除?')
    } catch {
      return this.$message.info('取消删除')
    }
    await this.$http.delete(`/${this.resource}/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }
  async changePage({ pageSize, currentPage }: { pageSize: number; currentPage: number }) {
    this.query.page = currentPage
    this.query.limit = pageSize
    this.fetch()
  }
  async changeSort({ prop, order }: { prop: string; order: string | null }) {
    if (!order) {
      this.query.sort = null
    } else {
      this.query.sort = {
        [prop]: order === 'ascending' ? 1 : -1
      }
    }
    this.fetch()
  }
  async search(where: any, done: Function) {
    for (let k in where) {
      const field = this.option.column.find(v => v.prop === k)
      if (field.regex) {
        where[k] = { $regex: where[k] }
      }
    }
    this.query.where = where
    this.fetch()
    done()
  }

  created() {
    this.fetch()
    this.fetchOption()
  }
}
</script>

<style>
.el-table {
  margin-top: 1rem;
}
</style>