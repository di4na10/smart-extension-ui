<template>
  <div class="app-container">
    <div class="dashboard-editor-container">
      <panel-group />
    </div>
    <div class="filter-container">
      <el-input v-model="listQuery.level" placeholder="level" style="width: 150px;" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.name" placeholder="name" style="width: 150px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.description" placeholder="description" class="filter-item" style="width: 200px" @change="handleFilter" />
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
      :data="alarms"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="small"
      @sort-change="sortChange"
    >
      <el-table-column label="index" prop="index" align="center" width="60px">
        <template slot-scope="{row}">
          <span>{{ row.index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="level" prop="level" sortable="custom" min-width="80px" align="center">
        <template slot-scope="{row}">
          <el-tag :style="`background: ${getColor(row.level)}`">{{ row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="name" prop="name" min-width="130px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="description" prop="description" width="350px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="timestamp" prop="timestamp" min-width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ parseTime(row.timestamp) }}</span>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="retrieveAlarms" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
        <el-form-item label="ID" prop="index">
          <el-input v-model.number="temp.index" type="number" />
        </el-form-item>
        <el-form-item label="Level" prop="level">
          <el-input v-model.number="temp.level" type="number" />
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="temp.description" />
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
import PanelGroup from '@/views/dashboard/components/PanelGroup'
import PacketData from './services/alarmData'
import waves from '@/components/Waves' // Waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AlarmsList',
  components: {
    PanelGroup,
    Pagination
  },
  directives: { waves },
  data() {
    return {
      alarms: [],
      ip: '',
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        index: undefined,
        level: undefined,
        name: undefined,
        description: undefined,
        timestamp: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        index: 0,
        level: 0,
        name: '',
        description: '',
        timestamp: new Date()
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        index: [{ type: 'number', required: true, message: 'Index is required as number', trigger: 'change' }],
        level: [{ type: 'number', required: true, message: 'Level is required as number', trigger: 'change' }],
        name: [{ required: true, message: 'Name is required', trigger: 'change' }],
        description: [{ required: true, message: 'Description is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'Timestamp is required', trigger: 'change' }]
      },
      greentextclass: {
        'text-danger': false
      }
    }
  },
  created() {
    setInterval(function() {
      this.retrieveAlarms()
    }.bind(this), 1000)
  },
  methods: {
    retrieveAlarms() {
      PacketData.getAll()
        .then(response => {
          // Choose the order of the rows in the table
          if (this.listQuery.sort === '+id') {
            this.alarms = response.data.sort((a, b) => (a.level > b.level ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.level !== 'undefined') {
              this.alarms = this.filter(this.alarms, this.listQuery.level, 'level')
            }
            if (typeof this.listQuery.name !== 'undefined') {
              this.alarms = this.filter(this.alarms, this.listQuery.name, 'name')
            }
            if (typeof this.listQuery.description !== 'undefined') {
              this.alarms = this.filter(this.alarms, this.listQuery.description, 'description')
            }

            // The total number of element in the array
            this.total = this.alarms.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.alarms = this.alarms.slice(init_a, finish_a)
          } else {
            this.alarms = response.data.sort((a, b) => (a.level < b.level ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.level !== 'undefined') {
              this.alarms = this.filter(this.alarms, this.listQuery.level, 'level')
            }
            if (typeof this.listQuery.name !== 'undefined') {
              this.alarms = this.filter(this.alarms, this.listQuery.name, 'name')
            }
            if (typeof this.listQuery.description !== 'undefined') {
              this.alarms = this.filter(this.alarms, this.listQuery.description, 'description')
            }

            // The total number of element in the array
            this.total = this.alarms.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.alarms = this.alarms.slice(init_a, finish_a)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    handleDeleteAll() {
      PacketData.deleteAll()
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
      PacketData.delete(this.temp.index)
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
          PacketData.update(tempData.index, tempData)
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
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createData() {
      const data = {
        index: this.temp.index,
        level: this.temp.level,
        name: this.temp.name,
        description: this.temp.description,
        timestamp: this.temp.timestamp.getTime()
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          PacketData.create(data)
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
        index: undefined,
        level: undefined,
        name: undefined,
        description: undefined,
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
      // this.listQuery.page = 1
      this.retrieveAlarms()
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
      if (prop === 'level') {
        this.sortByID(order)
      }
    },

    getSortClass: function(key) {
      const sort = this.retrieveAlarms().sort
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

