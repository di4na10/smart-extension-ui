<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="Name" style="width: 100px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.ip" placeholder="IP" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.mac" placeholder="MAC" class="filter-item" style="width: 100px" @change="handleFilter" />
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
      :data="scada_systems"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="small"
      @sort-change="sortChange"
    >
      <el-table-column label="Name" prop="name" sortable="custom" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP" prop="ip" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAC" prop="mac" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mac }}</span>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="retrieveScadaSystems" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
        <el-form-item label="Name" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="IP" prop="ip">
          <el-input v-model="temp.ip" />
        </el-form-item>
        <el-form-item label="MAC" prop="mac">
          <el-input v-model="temp.mac" />
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
import SCADASystemData from './services/scadaSystemsData'
import waves from '@/components/Waves' // Waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SCADASystemList',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      scada_systems: [],
      ip: '',
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        ip: undefined,
        mac: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        name: '',
        ip: '',
        mac: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        name: [{ required: true, message: 'Name is required' }],
        ip: [{ required: true, message: 'IP is required' }],
        mac: [{ required: true, message: 'MAC is required' }]
      },
      greentextclass: {
        'text-danger': false
      }
    }
  },
  created() {
    setInterval(function() {
      this.retrieveScadaSystems()
    }.bind(this), 1000)
  },
  methods: {
    retrieveScadaSystems() {
      SCADASystemData.getAll()
        .then(response => {
          // Choose the order of the rows in the table
          if (this.listQuery.sort === '+id') {
            this.scada_systems = response.data.sort((a, b) => (a.name > b.name ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.name !== 'undefined') {
              this.scada_systems = this.filter(this.scada_systems, this.listQuery.name, 'name')
            }
            if (typeof this.listQuery.ip !== 'undefined') {
              this.scada_systems = this.filter(this.scada_systems, this.listQuery.ip, 'ip')
            }
            if (typeof this.listQuery.mac !== 'undefined') {
              this.scada_systems = this.filter(this.scada_systems, this.listQuery.mac, 'mac')
            }

            // The total number of element in the array
            this.total = this.scada_systems.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.scada_systems = this.scada_systems.slice(init_a, finish_a)
          } else {
            this.scada_systems = response.data.sort((a, b) => (a.name < b.name ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.name !== 'undefined') {
              this.scada_systems = this.filter(this.scada_systems, this.listQuery.name, 'name')
            }
            if (typeof this.listQuery.ip !== 'undefined') {
              this.scada_systems = this.filter(this.scada_systems, this.listQuery.ip, 'ip')
            }
            if (typeof this.listQuery.mac !== 'undefined') {
              this.scada_systems = this.filter(this.scada_systems, this.listQuery.mac, 'mac')
            }

            // The total number of element in the array
            this.total = this.scada_systems.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.scada_systems = this.scada_systems.slice(init_a, finish_a)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    handleDeleteAll() {
      SCADASystemData.deleteAll()
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

    handleDelete(row) {
      this.temp = Object.assign({}, row) // copy obj
      // console.log(this.temp)
      SCADASystemData.delete(this.temp.name)
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
          SCADASystemData.update(tempData.name, tempData)
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
        name: this.temp.name,
        ip: this.temp.ip,
        mac: this.temp.mac
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(data)
          SCADASystemData.create(data)
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
        name: undefined,
        ip: undefined,
        mac: undefined
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
      this.retrieveScadaSystems()
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
      if (prop === 'name') {
        this.sortByID(order)
      }
    },

    getSortClass: function(key) {
      const sort = this.retrieveScadaSystems().sort
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

