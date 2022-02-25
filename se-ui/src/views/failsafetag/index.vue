<template>
  <div class="app-container">
    <div class="dashboard-editor-container">
      <panel-group />
    </div>
    <div class="filter-container">
      <el-input v-model="listQuery.tag_id" placeholder="tag ID" style="width: 150px;" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.val" placeholder="val" style="width: 150px" class="filter-item" @change="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="handleDeleteAll">
        Delete All
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      :data="failsafetag"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="small"
      @sort-change="sortChange"
    >
      <el-table-column label="tag_id" prop="tag_id" sortable="custom" align="center" min-width="80px">
        <template slot-scope="{row}">
          <span>{{ row.tag_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="val" prop="val" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.val }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" min-width="150px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="retrieveFailsafeTag" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
        <el-form-item label="Tag ID" prop="tag_id">
          <el-input v-model.number="temp.tag_id" type="number" />
        </el-form-item>
        <el-form-item label="Value" prop="val">
          <el-input v-model.number="temp.val" type="number" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import PanelGroup from '@/views/dashboard/components/PanelGroup'
import FailsafeTagData from './services/failsafetagData'
import waves from '@/components/Waves' // Waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'FailsafeTagList',
  components: {
    PanelGroup,
    Pagination
  },
  directives: { waves },
  data() {
    return {
      failsafetag: [],
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        tag_id: undefined,
        val: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        tag_id: 0,
        val: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        tag_id: [{ type: 'number', required: true, message: 'Tag ID is required as number', trigger: 'change' }],
        val: [{ type: 'number', required: true, message: 'Value is required as number', trigger: 'change' }]
      },
      greentextclass: {
        'text-danger': false
      }
    }
  },
  created() {
    setInterval(function() {
      this.retrieveFailsafeTag()
    }.bind(this), 1000)
  },
  methods: {
    retrieveFailsafeTag() {
      FailsafeTagData.getAll()
        .then(response => {

          // Choose the order of the rows in the table
          if (this.listQuery.sort === '+id') {
            this.failsafetag = response.data.sort((a, b) => (a.tag_id > b.tag_id ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.tag_id !== 'undefined') {
              this.failsafetag = this.filter(this.failsafetag, this.listQuery.tag_id, 'tag_id')
            }
            if (typeof this.listQuery.val !== 'undefined') {
              this.failsafetag = this.filter(this.failsafetag, this.listQuery.val, 'val')
            }

            // The total number of element in the array
            this.total = this.failsafetag.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.failsafetag = this.failsafetag.slice(init_a, finish_a)
          } else {
            this.failsafetag = response.data.sort((a, b) => (a.tag_id < b.tag_id ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.tag_id !== 'undefined') {
              this.failsafetag = this.filter(this.failsafetag, this.listQuery.tag_id, 'tag_id')
            }
            if (typeof this.listQuery.val !== 'undefined') {
              this.failsafetag = this.filter(this.failsafetag, this.listQuery.val, 'val')
            }

            // The total number of element in the array
            this.total = this.failsafetag.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.failsafetag = this.failsafetag.slice(init_a, finish_a)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    handleDeleteAll() {
      FailsafeTagData.deleteAll()
        .then(() => {
          this.$notify({
            title: 'Success',
            message: 'Delete All Successfully',
            type: 'success',
            duration: 2000
          })
        })
        .catch(e => {
          this.$notify({
            title: 'Failed',
            message: e,
            type: 'error',
            duration: 2000
          })
          console.log(e)
        })

      // execute the update after 100 milliseconds
      setTimeout(this.handleFilter, 1000)
    },

    handleDelete(row, index) {
      this.temp = Object.assign({}, row) // copy obj
      FailsafeTagData.delete(this.temp.tag_id)
        .then(() => {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
        })
        .catch(e => {
          this.$notify({
            title: 'Failed',
            message: e,
            type: 'error',
            duration: 2000
          })
          console.log(e)
        })

      // execute the update after 100 milliseconds
      setTimeout(this.handleFilter, 1000)
    },

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp).getTime() // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          FailsafeTagData.update(tempData.tag_id, tempData)
            .then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
            })
            .catch(e => {
              this.$notify({
                title: 'Failed',
                message: e,
                type: 'error',
                duration: 2000
              })
              console.log(e)
            })
        }
      })
      // execute the update after 100 milliseconds
      setTimeout(this.handleFilter, 500)
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createData() {
      const data = {
        tag_id: this.temp.tag_id,
        val: this.temp.val
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          FailsafeTagData.create(data)
            .then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            })
            .catch(e => {
              this.$notify({
                title: 'Failed',
                message: e,
                type: 'error',
                duration: 2000
              })
              console.log(e)
            })
        }
        // execute the update after 100 milliseconds
        setTimeout(this.handleFilter, 500)
      })
    },

    resetTemp() {
      this.temp = {
        tag_id: undefined,
        val: undefined
      }
    },

    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    handleFilter() {
      // this.listQuery.page = 1
      this.retrieveFailsafeTag()
    },

    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },

    sortChange(data) {
      const { prop, order } = data
      if (prop === 'tag_id') {
        this.sortByID(order)
      }
    },

    getSortClass: function(key) {
      const sort = this.retrieveFailsafeTag().sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },

    filter(array, value, key1) {
      const res = []
      for (let j = 0; j < array.length; j++) {
        if (array[j][key1] !== null) {
          if (typeof array[j][key1] !== 'string') {
            if ((array[j][key1].toString()).includes(value)) {
              res.push(array[j])
            }
          } else {
            if ((array[j][key1]).includes(value)) {
              res.push(array[j])
            }
          }
        }
      }
      return res
    },

    getColor(status) {
      // value from 0 to 10
      var hue = ((10 - status) * 15).toString(10)
      return ['hsl(', hue, ',100%,50%)'].join('')
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    background-color: #fff;
  }

  .dashboard-editor-container {
    padding: 12px;
    background-color: rgb(240, 242, 245);
    position: relative;
  }

  .filter-container {
    margin-top: 18px;
  }

  .el-tag {
    color: black;
  }
</style>

