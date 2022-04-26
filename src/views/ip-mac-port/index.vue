<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.mac" placeholder="MAC" style="width: 150px;" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.ip" placeholder="IP" style="width: 150px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.port" placeholder="port" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.protocol" placeholder="protocol" style="width: 100px" class="filter-item" @change="handleFilter" />
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
      :data="hosts"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="small"
      @sort-change="sortChange"
    >
      <el-table-column label="MAC" min-width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.MAC }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP" min-width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.IP }}</span>
        </template>
      </el-table-column>
      <el-table-column label="port" width="60px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.port }}</span>
        </template>
      </el-table-column>
      <el-table-column label="protocol" width="80px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.protocol }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="timestamp" prop="timestamp" sortable="custom" min-width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp }}</span>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="retrieveHosts" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
        <el-form-item label="MAC" prop="MAC">
          <el-input v-model="temp.MAC" />
        </el-form-item>
        <el-form-item label="IP" prop="IP">
          <el-input v-model="temp.IP" />
        </el-form-item>
        <el-form-item label="Port" prop="port">
          <el-input v-model="temp.port" />
        </el-form-item>
        <el-form-item label="Protocol" prop="protocol">
          <el-input v-model="temp.protocol" />
        </el-form-item>
        <el-form-item label="Timestamp" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" style="width: 100%;" />
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
import HostData from './services/hostData'
import waves from '@/components/Waves' // Waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'HostsList',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      hosts: [],
      ip: '',
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        mac: undefined,
        ip: undefined,
        port: undefined,
        protocol: undefined,
        timestamp: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        mac: '',
        ip: '',
        port: '',
        protocol: '',
        timestamp: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        MAC: [{ required: true, message: 'MAC address is required' }],
        IP: [{ required: true, message: 'IP address is required' }],
        port: [{ required: true, message: 'port is required' }],
        protocol: [{ required: true, message: 'protocol is required' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required' }]
      }
    }
  },
  created() {
    setInterval(function() {
      this.retrieveHosts()
    }.bind(this), 1000)
  },
  methods: {
    retrieveHosts() {
      HostData.getAll()
        .then(response => {
          // Choose the order of the rows in the table
          if (this.listQuery.sort === '+id') {
            this.hosts = response.data.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
            // Search for substrings
            if (typeof this.listQuery.mac !== 'undefined') {
              this.hosts = this.filter(this.hosts, this.listQuery.mac, 'MAC')
            }
            if (typeof this.listQuery.ip !== 'undefined') {
              this.hosts = this.filter(this.hosts, this.listQuery.ip, 'IP')
            }
            if (typeof this.listQuery.port !== 'undefined') {
              this.hosts = this.filter(this.hosts, this.listQuery.port, 'port')
            }
            if (typeof this.listQuery.protocol !== 'undefined') {
              this.hosts = this.filter(this.hosts, this.listQuery.protocol, 'protocol')
            }

            // The total number of element in the array
            this.total = this.hosts.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.hosts = this.hosts.slice(init_a, finish_a)
          } else {
            this.hosts = response.data.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.mac !== 'undefined') {
              this.hosts = this.filter(this.hosts, this.listQuery.mac, 'MAC')
            }
            if (typeof this.listQuery.ip !== 'undefined') {
              this.hosts = this.filter(this.hosts, this.listQuery.ip, 'IP')
            }
            if (typeof this.listQuery.port !== 'undefined') {
              this.hosts = this.filter(this.hosts, this.listQuery.port, 'port')
            }
            if (typeof this.listQuery.protocol !== 'undefined') {
              this.hosts = this.filter(this.hosts, this.listQuery.protocol, 'protocol')
            }

            // The total number of element in the array
            this.total = this.hosts.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.hosts = this.hosts.slice(init_a, finish_a)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    handleDeleteAll() {
      HostData.deleteAll()
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
      HostData.delete(row.MAC, row.IP, row.port)
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
          tempData.timestamp = tempData.timestamp.toLocaleString() // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          HostData.update(tempData.MAC, tempData.IP, tempData.port, tempData)
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
      this.temp.timestamp = this.temp.timestamp.toLocaleString()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createData() {
      const data = {
        MAC: this.temp.MAC,
        IP: this.temp.IP,
        port: this.temp.port,
        protocol: this.temp.protocol,
        timestamp: this.temp.timestamp.toLocaleString()
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          HostData.create(data)
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
        mac: '',
        ip: '',
        port: 0,
        protocol: '',
        timestamp: new Date()
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
      this.retrieveHosts()
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
      if (prop === 'timestamp') {
        this.sortByID(order)
      }
    },

    getSortClass: function(key) {
      const sort = this.retrieveHosts().sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },

    filter(array, value, key1) {
      var res = []
      for (var j = 0; j < array.length; j++) {
        if ((array[j][key1]).includes(value)) {
          res.push(array[j])
        }
      }
      return res
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
</style>

