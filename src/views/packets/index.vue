<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.id" placeholder="id" style="width: 45px;" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.MAC_src" placeholder="MAC src" style="width: 150px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.MAC_dst" placeholder="MAC dst" class="filter-item" style="width: 150px" @change="handleFilter" />
      <el-input v-model="listQuery.IP_src" placeholder="IP src" class="filter-item" style="width: 150px" @change="handleFilter" />
      <el-input v-model="listQuery.IP_dst" placeholder="IP dst" class="filter-item" style="width: 150px" @change="handleFilter" />
      <el-input v-model="listQuery.flag" placeholder="flag" class="filter-item" style="width: 55px" @change="handleFilter" />
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
      :data="packets"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="small"
      @sort-change="sortChange"
    >
      <el-table-column label="id" prop="id" sortable="custom" align="center" width="60px">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAC_src" prop="MAC_src" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.MAC_src }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAC_dst" prop="MAC_dst" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.MAC_dst }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP_src" prop="IP_src" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.IP_src }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP_dst" prop="IP_dst" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.IP_dst }}</span>
        </template>
      </el-table-column>
      <el-table-column label="payload" prop="payload" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.payload }}</span>
        </template>
      </el-table-column>
      <el-table-column label="time" prop="time" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="flag" prop="flag" min-width="50px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.flag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" min-width="100px" class-name="small-padding fixed-width">
        <template slot-scope="{row,id}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row, id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="retrievePackets" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
        <el-form-item label="ID" prop="id">
          <el-input v-model.number="temp.id" type="number" />
        </el-form-item>
        <el-form-item label="MAC src" prop="MAC_src">
          <el-input v-model="temp.MAC_src" />
        </el-form-item>
        <el-form-item label="MAC dst" prop="MAC_dst">
          <el-input v-model="temp.MAC_dst" />
        </el-form-item>
        <el-form-item label="IP src" prop="IP_src">
          <el-input v-model="temp.IP_src" />
        </el-form-item>
        <el-form-item label="IP dst" prop="IP_dst">
          <el-input v-model="temp.IP_dst" />
        </el-form-item>
        <el-form-item label="Payload" prop="payload">
          <el-input v-model="temp.payload" />
        </el-form-item>
        <el-form-item label="Time" prop="time">
          <el-date-picker v-model="temp.time" type="datetime" placeholder="Please pick a date" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="flag" prop="flag">
          <el-input v-model.number="temp.flag" type="number" />
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
import PacketData from './services/packetData'
import waves from '@/components/Waves' // Waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'PacketsList',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      packets: [],
      ip: '',
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        id: undefined,
        MAC_src: undefined,
        MAC_dst: undefined,
        IP_src: undefined,
        IP_dst: undefined,
        payload: undefined,
        time: undefined,
        flag: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: 0,
        MAC_src: '',
        MAC_dst: '',
        IP_src: '',
        IP_dst: '',
        payload: '',
        time: '',
        flag: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        id: [{ type: 'number', required: true, message: 'ID is required as number' }],
        MAC_src: [{ required: true, message: 'MAC_source is required' }],
        MAC_dst: [{ required: true, message: 'MAC_destination is required' }],
        IP_src: [{ required: true, message: 'IP_source is required' }],
        IP_dst: [{ required: true, message: 'IP_destination is required' }],
        payload: [{ required: true, message: 'payload is required' }],
        time: [{ type: 'date', required: true, message: 'Time is required' }],
        flag: [{ type: 'number', required: true, message: 'Flag is required as number' }]
      },
      greentextclass: {
        'text-danger': false
      }
    }
  },
  created() {
    setInterval(function() {
      this.retrievePackets()
    }.bind(this), 1000)
  },
  methods: {
    retrievePackets() {
      PacketData.getAll()
        .then(response => {
          // Choose the order of the rows in the table
          if (this.listQuery.sort === '+id') {
            this.packets = response.data.sort((a, b) => (a.id > b.id ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.id !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.id, 'id')
            }
            if (typeof this.listQuery.MAC_src !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.MAC_src, 'MAC_src')
            }
            if (typeof this.listQuery.MAC_dst !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.MAC_dst, 'MAC_dst')
            }
            if (typeof this.listQuery.IP_src !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.IP_src, 'IP_src')
            }
            if (typeof this.listQuery.IP_dst !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.IP_dst, 'IP_dst')
            }
            if (typeof this.listQuery.flag !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.flag, 'flag')
            }

            // The total number of element in the array
            this.total = this.packets.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.packets = this.packets.slice(init_a, finish_a)
          } else {
            this.packets = response.data.sort((a, b) => (a.id < b.id ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.id !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.id, 'id')
            }
            if (typeof this.listQuery.MAC_src !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.MAC_src, 'MAC_src')
            }
            if (typeof this.listQuery.MAC_dst !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.MAC_dst, 'MAC_dst')
            }
            if (typeof this.listQuery.IP_src !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.IP_src, 'IP_src')
            }
            if (typeof this.listQuery.IP_dst !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.IP_dst, 'IP_dst')
            }
            if (typeof this.listQuery.flag !== 'undefined') {
              this.packets = this.filter(this.packets, this.listQuery.flag, 'flag')
            }

            // The total number of element in the array
            this.total = this.packets.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.packets = this.packets.slice(init_a, finish_a)
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

    handleDelete(row, id) {
      this.temp = Object.assign({}, row) // copy obj
      PacketData.delete(this.temp.id)
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
          tempData.time = tempData.time.toLocaleString()// change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          PacketData.update(tempData.id, tempData)
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
      // this.temp.time = this.temp.time.toLocaleString()
      console.log(row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      console.log('test')
    },

    createData() {
      const data = {
        id: this.temp.id,
        MAC_src: this.temp.MAC_src,
        MAC_dst: this.temp.MAC_dst,
        IP_src: this.temp.IP_src,
        IP_dst: this.temp.IP_dst,
        payload: this.temp.payload,
        time: this.temp.time.toLocaleString(),
        flag: this.temp.flag
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(data)
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
        id: undefined,
        MAC_src: undefined,
        MAC_dst: undefined,
        IP_src: undefined,
        IP_dst: undefined,
        payload: undefined,
        time: undefined,
        flag: undefined
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
      this.retrievePackets()
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
      const sort = this.retrievePackets().sort
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

