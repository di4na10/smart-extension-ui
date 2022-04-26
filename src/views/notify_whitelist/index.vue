<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.ip_src" placeholder="IP src" style="width: 150px;" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.ip_dst" placeholder="IP dst" style="width: 150px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.active" placeholder="active" class="filter-item" style="width: 70px" @change="handleFilter" />
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
      :data="notifywhitelist"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="small"
      @sort-change="sortChange"
    >
      <el-table-column sortable="custom" label="IP src" prop="ip_src" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ip_src }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP dst" prop="ip_dst" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ip_dst }}</span>
        </template>
      </el-table-column>
      <el-table-column label="active" prop="active" align="center">
        <template slot-scope="{row}">
          <span>{{ row.active }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" min-width="150px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="retrieveNotifyWhitelist" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
        <el-form-item label="IP src" prop="ip_src">
          <el-input v-model="temp.ip_src" />
        </el-form-item>
        <el-form-item label="IP dst" prop="ip_dst">
          <el-input v-model="temp.ip_dst" />
        </el-form-item>
        <el-form-item label="Active" prop="active">
          <el-input v-model="temp.active" />
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
import WriteWhitelistData from './services/notifyWhitelistData'
import waves from '@/components/Waves' // Waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'NotifyWhitelistList',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      notifywhitelist: [],
      ip: '',
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        ip_src: undefined,
        ip_dst: undefined,
        active: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        ip_src: '',
        ip_dst: '',
        active: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        ip_src: [{ required: true, message: 'IP_source is required' }],
        ip_dst: [{ required: true, message: 'IP_destination is required' }],
        active: [{ message: 'Active is required' }]
      },
      greentextclass: {
        'text-danger': false
      }
    }
  },
  created() {
    setInterval(function() {
      this.retrieveNotifyWhitelist()
    }.bind(this), 1000)
  },
  methods: {
    retrieveNotifyWhitelist() {
      WriteWhitelistData.getAll()
        .then(response => {
          // Choose the order of the rows in the table
          if (this.listQuery.sort === '+id') {
            this.notifywhitelist = response.data.sort((a, b) => (a.ip_src > b.ip_src ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.ip_src !== 'undefined') {
              this.notifywhitelist = this.filter(this.notifywhitelist, this.listQuery.ip_src, 'ip_src')
            }
            if (typeof this.listQuery.ip_dst !== 'undefined') {
              this.notifywhitelist = this.filter(this.notifywhitelist, this.listQuery.ip_dst, 'ip_dst')
            }
            if (typeof this.listQuery.active !== 'undefined') {
              this.notifywhitelist = this.filter(this.notifywhitelist, this.listQuery.active, 'active')
            }

            // The total number of element in the array
            this.total = this.notifywhitelist.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.notifywhitelist = this.notifywhitelist.slice(init_a, finish_a)
          } else {
            this.notifywhitelist = response.data.sort((a, b) => (a.ip_src < b.ip_dst ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.ip_src !== 'undefined') {
              this.notifywhitelist = this.filter(this.notifywhitelist, this.listQuery.ip_src, 'ip_src')
            }
            if (typeof this.listQuery.ip_dst !== 'undefined') {
              this.notifywhitelist = this.filter(this.notifywhitelist, this.listQuery.ip_dst, 'ip_dst')
            }
            if (typeof this.listQuery.active !== 'undefined') {
              this.notifywhitelist = this.filter(this.notifywhitelist, this.listQuery.active, 'active')
            }

            // The total number of element in the array
            this.total = this.notifywhitelist.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.notifywhitelist = this.notifywhitelist.slice(init_a, finish_a)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    handleDeleteAll() {
      WriteWhitelistData.deleteAll()
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

    handleDelete(row, id) {
      this.temp = Object.assign({}, row) // copy obj
      // console.log(this.temp)
      WriteWhitelistData.delete(this.temp.ip_src, this.temp.ip_dst)
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
          WriteWhitelistData.update(tempData.ip_src, tempData.ip_dst, tempData)
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
        ip_src: this.temp.ip_src,
        ip_dst: this.temp.ip_dst,
        active: this.temp.active
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(data)
          WriteWhitelistData.create(data)
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
        ip_src: undefined,
        ip_dst: undefined,
        active: undefined
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
      this.retrieveNotifyWhitelist()
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
      if (prop === 'ip_src') {
        this.sortByID(order)
      }
    },

    getSortClass: function(key) {
      const sort = this.retrieveNotifyWhitelist().sort
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
    },

    parseTime(milliseconds) {
      var date = new Date(milliseconds)
      var str = date.toLocaleString()

      return str
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    background-color: #fff;
  }

  .filter-container {
    margin-top: 18px;
  }

  .el-tag {
    color: black;
  }
</style>

