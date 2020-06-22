<template>
  <div>
    <h3>课程列表</h3>
    <div>
      <el-button type="success" @click="$router.push('/courses/create')" size="small">创建课程</el-button>
    </div>
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      ></el-table-column>
      <el-table-column label="操作" :width="200">
        <template #default="{row}">
          <el-button
            type="success"
            @click="$router.push(`/courses/edit/${row._id}`)"
            size="small"
          >编辑</el-button>
          <el-button type="danger" @click="remove(row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class CourseList extends Vue {
  data = {}
  fields = {
    _id: { label: 'ID' },
    name: { label: '课程名称' },
    cover: { label: '课程封面图' }
  }
  async fetch() {
    const res = await this.$http.get('courses')
    this.data = res.data
  }
  async remove(row: any) {
    try {
      await this.$confirm('是否确认删除?')
    } catch {
      return this.$message.info('取消删除')
    }
    await this.$http.delete(`/courses/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }
  created() {
    this.fetch()
  }
}
</script>

<style>
.el-table {
  margin-top: 1rem;
}
</style>