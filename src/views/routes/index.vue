<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.host_name" placeholder="Host name" style="width: 100px;" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.ip_address" placeholder="IP address" style="width: 100px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.MAC" placeholder="MAC" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.ams_netid" placeholder="AMS net ID" class="filter-item" style="width: 110px" @change="handleFilter" />
      <el-input v-model="listQuery.TwinCAT" placeholder="TwinCAT" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.OS_version" placeholder="OS version" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.type" placeholder="Type" class="filter-item" style="width: 70px" @change="handleFilter" />
      <el-input v-model="listQuery.whitelist" placeholder="Whitelist" class="filter-item" style="width: 90px" @change="handleFilter" />
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
      :data="routes"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="small"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="60px">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Host name" prop="host_name" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.host_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP address" prop="ip_address" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ip_address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAC" prop="MAC" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.MAC }}</span>
        </template>
      </el-table-column>
      <el-table-column label="AMS net ID" prop="ams_netid" width="130px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ams_netid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="TwinCAT" prop="TwinCAT" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.TwinCAT }}</span>
        </template>
      </el-table-column>
      <el-table-column label="OS version" prop="OS_version" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.OS_version }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Type" prop="type" min-width="40px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Whitelist" prop="whitelist" min-width="60px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.whitelist }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" min-width="100px" class-name="small-padding fixed-width">
        <template slot-scope="{row,id}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="retrieveRoutes" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
        <el-form-item label="ID" prop="id">
          <el-input v-model.number="temp.id" type="number" />
        </el-form-item>
        <el-form-item label="Host name" prop="host_name">
          <el-input v-model="temp.host_name" />
        </el-form-item>
        <el-form-item label="IP address" prop="ip_address">
          <el-input v-model="temp.ip_address" />
        </el-form-item>
        <el-form-item label="MAC" prop="MAC">
          <el-input v-model="temp.MAC" />
        </el-form-item>
        <el-form-item label="AMS net ID" prop="ams_netid">
          <el-input v-model="temp.ams_netid" />
        </el-form-item>
        <el-form-item label="IP dst" prop="ip_dst">
          <el-input v-model="temp.ip_dst" />
        </el-form-item>
        <el-form-item label="TwinCAT" prop="TwinCAT">
          <el-input v-model="temp.TwinCAT" />
        </el-form-item>
        <el-form-item label="OS version" prop="OS_version">
          <el-input v-model="temp.OS_version" />
        </el-form-item>
        <el-form-item label="Type" prop="type">
          <el-input v-model="temp.type" />
        </el-form-item>
        <el-form-item label="Whitelist" prop="whitelist">
          <el-input v-model="temp.whitelist" />
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
import RoutesData from './services/routesData'
import waves from '@/components/Waves' // Waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'RoutesList',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      routes: [],
      ip: '',
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        id: undefined,
        host_name: undefined,
        IP_address: undefined,
        MAC: undefined,
        ams_netid: undefined,
        TwinCAT: undefined,
        OS_version: undefined,
        type: undefined,
        whitelist: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: 0,
        host_name: 0,
        IP_address: '',
        MAC: '',
        ams_netid: '',
        TwinCAT: '',
        OS_version: '',
        type: '',
        whitelist: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        id: [{ type: 'number', required: true, message: 'ID is required as number' }],
        host_name: [{ required: false, message: 'Host name is required' }],
        IP_address: [{ required: false, message: 'IP address is required' }],
        MAC: [{ required: false, message: 'MAC is required' }],
        ams_netid: [{ required: false, message: 'AMS net ID is required' }],
        TwinCAT: [{ required: false, message: 'TwinCAT is required' }],
        OS_version: [{ required: false, message: 'OS version is required' }],
        type: [{ required: false, message: 'Type is required' }],
        whitelist: [{ required: false, message: 'Whitelist is required' }]
      },
      greentextclass: {
        'text-danger': false
      }
    }
  },
  created() {
    setInterval(function() {
      this.retrieveRoutes()
    }.bind(this), 1000)
  },
  methods: {
    retrieveRoutes() {
      RoutesData.getAll()
        .then(response => {
          // Choose the order of the rows in the table
          if (this.listQuery.sort === '+id') {
            this.routes = response.data.sort((a, b) => (a.id > b.id ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.host_name !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.host_name, 'host_name')
            }
            if (typeof this.listQuery.ip_address !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.ip_address, 'ip_address')
            }
            if (typeof this.listQuery.MAC !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.MAC, 'MAC')
            }
            if (typeof this.listQuery.ams_netid !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.ams_netid, 'ams_netid')
            }
            if (typeof this.listQuery.TwinCAT !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.TwinCAT, 'TwinCAT')
            }
            if (typeof this.listQuery.OS_version !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.OS_version, 'OS_version')
            }
            if (typeof this.listQuery.type !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.type, 'type')
            }
            if (typeof this.listQuery.whitelist !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.whitelist, 'whitelist')
            }

            // The total number of element in the array
            this.total = this.routes.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.routes = this.routes.slice(init_a, finish_a)
          } else {
            this.routes = response.data.sort((a, b) => (a.id < b.id ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.host_name !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.host_name, 'host_name')
            }
            if (typeof this.listQuery.ip_address !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.ip_address, 'ip_address')
            }
            if (typeof this.listQuery.MAC !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.MAC, 'MAC')
            }
            if (typeof this.listQuery.ams_netid !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.ams_netid, 'ams_netid')
            }
            if (typeof this.listQuery.TwinCAT !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.TwinCAT, 'TwinCAT')
            }
            if (typeof this.listQuery.OS_version !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.OS_version, 'OS_version')
            }
            if (typeof this.listQuery.type !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.type, 'type')
            }
            if (typeof this.listQuery.whitelist !== 'undefined') {
              this.routes = this.filter(this.routes, this.listQuery.whitelist, 'whitelist')
            }

            // The total number of element in the array
            this.total = this.routes.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.routes = this.routes.slice(init_a, finish_a)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    handleDeleteAll() {
      RoutesData.deleteAll()
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
      RoutesData.delete(this.temp.id)
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
          RoutesData.update(tempData.id, tempData)
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
        id: this.temp.id,
        host_name: this.temp.host_name,
        ip_address: this.temp.ip_address,
        MAC: this.temp.MAC,
        ams_netid: this.temp.ams_netid,
        TwinCAT: this.temp.TwinCAT,
        OS_version: this.temp.OS_version,
        type: this.temp.type,
        whitelist: this.temp.whitelist
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(data)
          RoutesData.create(data)
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
        id: undefined,
        host_name: undefined,
        ip_address: undefined,
        MAC: undefined,
        ams_netid: undefined,
        TwinCAT: undefined,
        OS_version: undefined,
        type: undefined,
        whitelist: undefined
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
      this.retrieveRoutes()
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
      if (prop === 'id') {
        this.sortByID(order)
      }
    },

    getSortClass: function(key) {
      const sort = this.retrieveRoutes().sort
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

