<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.plc_name" placeholder="PLC name" style="width: 100px;" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.out_packets" placeholder="Out packets" style="width: 100px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.in_packets" placeholder="In packets" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.mean_inbound" placeholder="Mean inbound" class="filter-item" style="width: 120px" @change="handleFilter" />
      <el-input v-model="listQuery.mean_outbound" placeholder="Mean outbound" class="filter-item" style="width: 130px" @change="handleFilter" />
      <el-input v-model="listQuery.mean_in_1" placeholder="Mean in 1" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.mean_in_2" placeholder="Mean in 2" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.mean_in_3" placeholder="Mean in 3" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.mean_out_1" placeholder="Mean out 1" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.mean_out_2" placeholder="Mean out 2" class="filter-item" style="width: 110px" @change="handleFilter" />
      <el-input v-model="listQuery.mean_out_3" placeholder="Mean out 3" class="filter-item" style="width: 110px" @change="handleFilter" />
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
      :data="plc_packets"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="small"
      @sort-change="sortChange"
    >
      <el-table-column label="PLC name" prop="plc_name" sortable="custom" align="center" width="110px">
        <template slot-scope="{row}">
          <span>{{ row.plc_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Out packets" prop="out_packets" min-width="70px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.out_packets }}</span>
        </template>
      </el-table-column>
      <el-table-column label="In packets" prop="in_packets" min-width="70px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.in_packets }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Mean inbound" prop="mean_inbound" min-width="70px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mean_inbound }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Mean outbound" prop="mean_outbound" min-width="70px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mean_outbound }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Timestamp start" prop="timestamp_start" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp_start }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Timestamp stop" prop="timestamp_stop" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp_stop }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Mean in 1" prop="mean_in_1" min-width="70px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mean_in_1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Mean in 2" prop="mean_in_2" min-width="70px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mean_in_2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Mean in 3" prop="mean_in_3" min-width="70px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mean_in_3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Mean out 1" prop="mean_out_1" min-width="60px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mean_out_1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Mean out 2" prop="mean_out_2" min-width="60px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mean_out_2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Mean out 3" prop="mean_out_3" min-width="60px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mean_out_3 }}</span>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="retrievePlcPackets" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="140px" style="width: 80%; margin-left:50px;">
        <el-form-item label="PLC name" prop="plc_name">
          <el-input v-model="temp.plc_name" />
        </el-form-item>
        <el-form-item label="Out packets" prop="out_packets">
          <el-input v-model="temp.out_packets" />
        </el-form-item>
        <el-form-item label="In packets" prop="in_packets">
          <el-input v-model="temp.in_packets" />
        </el-form-item>
        <el-form-item label="Mean inbound" prop="mean_inbound">
          <el-input v-model="temp.mean_inbound" />
        </el-form-item>
        <el-form-item label="Mean outbound" prop="mean_outbound">
          <el-input v-model="temp.mean_outbound" />
        </el-form-item>
        <el-form-item label="Timestamp start" prop="timestamp_start">
          <el-date-picker v-model="temp.timestamp_start" type="datetime" placeholder="Please pick a date" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="Timestamp stop" prop="timestamp_stop">
          <el-date-picker v-model="temp.timestamp_stop" type="datetime" placeholder="Please pick a date" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="Mean in 1" prop="mean_in_1">
          <el-input v-model="temp.mean_in_1" />
        </el-form-item>
        <el-form-item label="Mean in 2" prop="mean_in_2">
          <el-input v-model="temp.mean_in_2" />
        </el-form-item>
        <el-form-item label="Mean in 3" prop="mean_in_3">
          <el-input v-model="temp.mean_in_3" />
        </el-form-item>
        <el-form-item label="Mean out 1" prop="mean_out_1">
          <el-input v-model="temp.mean_out_1" />
        </el-form-item>
        <el-form-item label="Mean out 2" prop="mean_out_2">
          <el-input v-model="temp.mean_out_2" />
        </el-form-item>
        <el-form-item label="Mean out 3" prop="mean_out_3">
          <el-input v-model="temp.mean_out_3" />
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
import PlcPacketsData from './services/plcPacketsData'
import waves from '@/components/Waves' // Waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'PlcPacketsList',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      plc_packets: [],
      ip: '',
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        plc_name: undefined,
        out_packets: undefined,
        in_packets: undefined,
        mean_inbound: undefined,
        mean_outbound: undefined,
        timestamp_start: undefined,
        timestamp_stop: undefined,
        mean_in_1: undefined,
        mean_in_2: undefined,
        mean_in_3: undefined,
        mean_out_1: undefined,
        mean_out_2: undefined,
        mean_out_3: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        plc_name: '',
        out_packets: '',
        in_packets: '',
        mean_inbound: '',
        mean_outbound: '',
        timestamp_start: '',
        timestamp_stop: '',
        mean_in_1: '',
        mean_in_2: '',
        mean_in_3: '',
        mean_out_1: '',
        mean_out_2: '',
        mean_out_3: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        plc_name: [{ required: true, message: 'PLC name is required' }],
        out_packets: [{ required: true, message: 'Out packets is required' }],
        in_packets: [{ required: true, message: 'In packets is required' }],
        mean_inbound: [{ required: true, message: 'Mean inbound is required' }],
        mean_outbound: [{ required: true, message: 'Mean outbound is required' }],
        timestamp_start: [{ type: 'date', required: true, message: 'Timestamp start is required' }],
        timestamp_stop: [{ type: 'date', required: true, message: 'Timestamp stop is required' }],
        mean_in_1: [{ required: true, message: 'Mean in 1 is required' }],
        mean_in_2: [{ required: true, message: 'Mean in 2 is required' }],
        mean_in_3: [{ required: true, message: 'Mean in 3 is required' }],
        mean_out_1: [{ required: true, message: 'Mean out 1 is required' }],
        mean_out_2: [{ required: true, message: 'Mean out 2 is required' }],
        mean_out_3: [{ required: true, message: 'Mean out 3 is required' }]
      },
      greentextclass: {
        'text-danger': false
      }
    }
  },
  created() {
    setInterval(function() {
      this.retrievePlcPackets()
    }.bind(this), 1000)
  },
  methods: {
    retrievePlcPackets() {
      PlcPacketsData.getAll()
        .then(response => {
          // Choose the order of the rows in the table
          if (this.listQuery.sort === '+id') {
            this.plc_packets = response.data.sort((a, b) => (a.plc_name > b.plc_name ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.plc_name !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.plc_name, 'plc_name')
            }
            if (typeof this.listQuery.out_packets !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.out_packets, 'out_packets')
            }
            if (typeof this.listQuery.in_packets !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.in_packets, 'in_packets')
            }
            if (typeof this.listQuery.mean_inbound !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_inbound, 'mean_inbound')
            }
            if (typeof this.listQuery.mean_outbound !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_outbound, 'mean_outbound')
            }
            if (typeof this.listQuery.mean_in_1 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_in_1, 'mean_in_1')
            }
            if (typeof this.listQuery.mean_in_2 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_in_2, 'mean_in_2')
            }
            if (typeof this.listQuery.mean_in_3 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_in_3, 'mean_in_3')
            }
            if (typeof this.listQuery.mean_out_1 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_out_1, 'mean_out_1')
            }
            if (typeof this.listQuery.mean_out_2 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_out_2, 'mean_out_2')
            }
            if (typeof this.listQuery.mean_out_3 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_out_3, 'mean_out_3')
            }

            // The total number of element in the array
            this.total = this.plc_packets.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.plc_packets = this.plc_packets.slice(init_a, finish_a)
          } else {
            this.plc_packets = response.data.sort((a, b) => (a.plc_name < b.plc_name ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.plc_name !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.plc_name, 'plc_name')
            }
            if (typeof this.listQuery.out_packets !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.out_packets, 'out_packets')
            }
            if (typeof this.listQuery.in_packets !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.in_packets, 'in_packets')
            }
            if (typeof this.listQuery.mean_inbound !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_inbound, 'mean_inbound')
            }
            if (typeof this.listQuery.mean_outbound !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_outbound, 'mean_outbound')
            }
            if (typeof this.listQuery.mean_in_1 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_in_1, 'mean_in_1')
            }
            if (typeof this.listQuery.mean_in_2 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_in_2, 'mean_in_2')
            }
            if (typeof this.listQuery.mean_in_3 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_in_3, 'mean_in_3')
            }
            if (typeof this.listQuery.mean_out_1 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_out_1, 'mean_out_1')
            }
            if (typeof this.listQuery.mean_out_2 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_out_2, 'mean_out_2')
            }
            if (typeof this.listQuery.mean_out_3 !== 'undefined') {
              this.plc_packets = this.filter(this.plc_packets, this.listQuery.mean_out_3, 'mean_out_3')
            }
            // The total number of element in the array
            this.total = this.plc_packets.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.plc_packets = this.plc_packets.slice(init_a, finish_a)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    handleDeleteAll() {
      PlcPacketsData.deleteAll()
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
      PlcPacketsData.delete(this.temp.plc_name)
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
          tempData.timestamp_start = tempData.timestamp_start.toLocaleString()// change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          tempData.timestamp_stop = tempData.timestamp_stop.toLocaleString()// change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          PlcPacketsData.update(tempData.plc_name, tempData)
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
      this.temp.timestamp_start = this.temp.timestamp_start.toLocaleString()
      this.temp.timestamp_stop = this.temp.timestamp_stop.toLocaleString()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createData() {
      const data = {
        plc_name: this.temp.plc_name,
        out_packets: this.temp.out_packets,
        in_packets: this.temp.in_packets,
        mean_inbound: this.temp.mean_inbound,
        mean_outbound: this.temp.mean_outbound,
        timestamp_start: this.temp.timestamp_start.toLocaleString(),
        timestamp_stop: this.temp.timestamp_stop.toLocaleString(),
        mean_in_1: this.temp.mean_in_1,
        mean_in_2: this.temp.mean_in_2,
        mean_in_3: this.temp.mean_in_3,
        mean_out_1: this.temp.mean_out_1,
        mean_out_2: this.temp.mean_out_2,
        mean_out_3: this.temp.mean_out_3
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(data)
          PlcPacketsData.create(data)
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
        out_packets: undefined,
        in_packets: undefined,
        mean_inbound: undefined,
        mean_outbound: undefined,
        timestamp_start: undefined,
        timestamp_stop: undefined,
        mean_in_1: undefined,
        mean_in_2: undefined,
        mean_in_3: undefined,
        mean_out_1: undefined,
        mean_out_2: undefined,
        mean_out_3: undefined
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
      this.retrievePlcPackets()
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
      const sort = this.retrievePlcPackets().sort
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

