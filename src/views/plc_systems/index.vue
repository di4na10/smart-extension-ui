<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.plc_name" placeholder="PLC name" style="width: 100px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.ip" placeholder="IP" style="width: 100px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.mac" placeholder="MAC" style="width: 100px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.PLC_AMS_ID" placeholder="AMS ID" style="width: 100px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.active" placeholder="Active" style="width: 70px" class="filter-item" @change="handleFilter" />
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
      :data="plc_systems"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="small"
      @sort-change="sortChange"
    >
      <el-table-column label="PLC name" prop="plc_name" sortable="custom" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.plc_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP" prop="ip" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAC" prop="mac" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.mac }}</span>
        </template>
      </el-table-column>
      <el-table-column label="AMS ID" prop="PLC_AMS_ID" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.PLC_AMS_ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Active" prop="active" align="center" width="150px">
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="retrievePlcSystems" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
        <el-form-item label="PLC name" prop="plc_name">
          <el-input v-model="temp.plc_name" />
        </el-form-item>
        <el-form-item label="IP" prop="ip">
          <el-input v-model="temp.ip" />
        </el-form-item>
        <el-form-item label="MAC" prop="mac">
          <el-input v-model="temp.mac" />
        </el-form-item>
        <el-form-item label="AMS ID" prop="PLC_AMS_ID">
          <el-input v-model="temp.PLC_AMS_ID" />
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
import PLCSystemData from './services/plcSystemsData'
import waves from '@/components/Waves' // Waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'PLCSystemList',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      plc_systems: [],
      ip: '',
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        plc_name: undefined,
        ip: undefined,
        mac: undefined,
        PLC_AMS_ID: undefined,
        active: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        plc_name: '',
        ip: '',
        mac: '',
        PLC_AMS_ID: '',
        active: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        plc_name: [{ required: true, message: 'Name is required' }],
        ip: [{ required: true, message: 'IP is required' }],
        mac: [{ required: true, message: 'MAC is required' }],
        PLC_AMS_ID: [{ required: true, message: 'AMS ID is required' }],
        active: [{ required: true, message: 'Active is required' }]
      },
      greentextclass: {
        'text-danger': false
      }
    }
  },
  created() {
    setInterval(function() {
      this.retrievePlcSystems()
    }.bind(this), 1000)
  },
  methods: {
    retrievePlcSystems() {
      PLCSystemData.getAll()
        .then(response => {
          // Choose the order of the rows in the table
          if (this.listQuery.sort === '+id') {
            this.plc_systems = response.data.sort((a, b) => (a.plc_name > b.plc_name ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.plc_name !== 'undefined') {
              this.plc_systems = this.filter(this.plc_systems, this.listQuery.plc_name, 'plc_name')
            }
            if (typeof this.listQuery.ip !== 'undefined') {
              this.plc_systems = this.filter(this.plc_systems, this.listQuery.ip, 'ip')
            }
            if (typeof this.listQuery.mac !== 'undefined') {
              this.plc_systems = this.filter(this.plc_systems, this.listQuery.mac, 'mac')
            }
            if (typeof this.listQuery.PLC_AMS_ID !== 'undefined') {
              this.plc_systems = this.filter(this.plc_systems, this.listQuery.PLC_AMS_ID, 'PLC_AMS_ID')
            }
            if (typeof this.listQuery.active !== 'undefined') {
              this.plc_systems = this.filter(this.plc_systems, this.listQuery.active, 'active')
            }

            // The total number of element in the array
            this.total = this.plc_systems.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.plc_systems = this.plc_systems.slice(init_a, finish_a)
          } else {
            this.plc_systems = response.data.sort((a, b) => (a.plc_name < b.plc_name ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.plc_name !== 'undefined') {
              this.plc_systems = this.filter(this.plc_systems, this.listQuery.plc_name, 'plc_name')
            }
            if (typeof this.listQuery.ip !== 'undefined') {
              this.plc_systems = this.filter(this.plc_systems, this.listQuery.ip, 'ip')
            }
            if (typeof this.listQuery.mac !== 'undefined') {
              this.plc_systems = this.filter(this.plc_systems, this.listQuery.mac, 'mac')
            }
            if (typeof this.listQuery.PLC_AMS_ID !== 'undefined') {
              this.plc_systems = this.filter(this.plc_systems, this.listQuery.PLC_AMS_ID, 'PLC_AMS_ID')
            }
            if (typeof this.listQuery.active !== 'undefined') {
              this.plc_systems = this.filter(this.plc_systems, this.listQuery.active, 'active')
            }

            // The total number of element in the array
            this.total = this.plc_systems.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.plc_systems = this.plc_systems.slice(init_a, finish_a)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    handleDeleteAll() {
      PLCSystemData.deleteAll()
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
      PLCSystemData.delete(this.temp.plc_name)
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
          PLCSystemData.update(tempData.plc_name, tempData)
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
        plc_name: this.temp.plc_name,
        ip: this.temp.ip,
        mac: this.temp.mac,
        PLC_AMS_ID: this.temp.PLC_AMS_ID,
        active: this.temp.active
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(data)
          PLCSystemData.create(data)
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
        plc_name: undefined,
        ip: undefined,
        mac: undefined,
        PLC_AMS_ID: undefined,
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
      this.retrievePlcSystems()
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
      if (prop === 'plc_name') {
        this.sortByID(order)
      }
    },

    getSortClass: function(key) {
      const sort = this.retrievePlcSystems().sort
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

