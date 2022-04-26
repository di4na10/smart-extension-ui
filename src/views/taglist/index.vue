<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="name" style="width: 150px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.plc_name" placeholder="PLC name" style="width: 150px;" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.type" placeholder="type" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.protocol" placeholder="protocol" style="width: 100px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.active" placeholder="active" style="width: 100px" class="filter-item" @change="handleFilter" />
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
      :data="tags"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="small"
      @sort-change="sortChange"
    >
      <el-table-column label="tag_id" prop="tag_id" sortable="custom" align="center" width="80px">
        <template slot-scope="{row}">
          <span>{{ row.tag_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="name" prop="name" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="PLC name" prop="plc_name" min-width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.plc_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="val" prop="val" width="60px" align="center">
        <template slot-scope="{row}">
          <span>{{ Math.round((row.val + Number.EPSILON) * 1000) / 1000 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="protocol" prop="protocol" width="80px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.protocol }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="timestamp" prop="timestamp" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="min" prop="min" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.min }}</span>
        </template>
      </el-table-column>
      <el-table-column label="max" prop="max" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.max }}</span>
        </template>
      </el-table-column>
      <el-table-column label="range_min" prop="range_min" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.range_min }}</span>
        </template>
      </el-table-column>
      <el-table-column label="range_max" prop="range_max" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.range_max }}</span>
        </template>
      </el-table-column>
      <el-table-column label="active" prop="active" width="60px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.active }}</span>
        </template>
      </el-table-column>
      <el-table-column label="message" prop="message" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.message }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="index offset" prop="index_offset" width="120px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.index_offset }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="handle" prop="handle" width="120px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.handle }}</el-tag>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="retrieveTags" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
        <el-form-item label="Tag ID" prop="tag_id">
          <el-input v-model.number="temp.tag_id" type="number" />
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="PLC name" prop="plc_name">
          <el-input v-model="temp.plc_name" />
        </el-form-item>
        <el-form-item label="Value" prop="val">
          <el-input v-model.number="temp.val" type="number" />
        </el-form-item>
        <el-form-item label="Type" prop="type">
          <el-input v-model="temp.type" />
        </el-form-item>
        <el-form-item label="Protocol" prop="protocol">
          <el-input v-model="temp.protocol" />
        </el-form-item>
        <el-form-item label="Timestamp" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="Min" prop="min">
          <el-input v-model.number="temp.min" type="number" />
        </el-form-item>
        <el-form-item label="Max" prop="max">
          <el-input v-model.number="temp.max" type="number" />
        </el-form-item>
        <el-form-item label="Range min" prop="range_min">
          <el-input v-model.number="temp.range_min" type="number" />
        </el-form-item>
        <el-form-item label="Range max" prop="range_max">
          <el-input v-model.number="temp.range_max" type="number" />
        </el-form-item>
        <el-form-item label="Active" prop="active">
          <el-input v-model="temp.active" />
        </el-form-item>
        <el-form-item label="Message" prop="message">
          <el-input v-model="temp.message" />
        </el-form-item>
        <el-form-item label="Index offset" prop="index_offset">
          <el-input v-model="temp.index_offset" />
        </el-form-item>
        <el-form-item label="Handle" prop="handle">
          <el-input v-model.number="temp.handle" type="number" />
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
import TagData from './services/tagData'
import waves from '@/components/Waves' // Waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'TagsList',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      tags: [],
      ip: '',
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        tag_id: undefined,
        name: undefined,
        plc_name: undefined,
        val: undefined,
        type: undefined,
        protocol: undefined,
        timestamp: undefined,
        min: undefined,
        max: undefined,
        range_min: undefined,
        range_max: undefined,
        active: undefined,
        message: undefined,
        index_offset: undefined,
        handle: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        tag_id: 0,
        name: '',
        plc_name: '',
        val: 0.0,
        type: '',
        protocol: '',
        timestamp: '',
        min: 0.0,
        max: 0.0,
        range_min: 0.0,
        range_max: 0.0,
        active: '',
        message: '',
        index_offset: '',
        handle: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        tag_id: [{ type: 'number', required: true, message: 'Tag ID is required as number' }],
        name: [{ required: true, message: 'Name is required' }],
        plc_name: [{ required: true, message: 'PLC name is required' }],
        val: [{ type: 'number', required: false, message: 'Value is required as number' }],
        type: [{ required: false, message: 'Type is required' }],
        protocol: [{ required: false, message: 'Protocol is required' }],
        timestamp: [{ type: 'date', required: false, message: 'Timestamp is required' }],
        min: [{ type: 'number', required: false, message: 'Min is required as number' }],
        max: [{ type: 'number', required: false, message: 'Max is required as number' }],
        range_min: [{ type: 'number', required: false, message: 'Range min is required as number' }],
        range_max: [{ type: 'number', required: false, message: 'Range max is required as number' }],
        active: [{ required: false, message: 'Active is required' }],
        message: [{ required: false, message: 'Message is required' }],
        index_offset: [{ required: false, message: 'Index offset is required' }],
        handle: [{ type: 'number', required: false, message: 'Handle is required as number' }]
      }
    }
  },
  created() {
    setInterval(function() {
      this.retrieveTags()
    }.bind(this), 1000)
  },
  methods: {
    retrieveTags() {
      TagData.getAll()
        .then(response => {
          // Choose the order of the rows in the table
          if (this.listQuery.sort === '+id') {
            this.tags = response.data.sort((a, b) => (a.tag_id > b.tag_id ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.name !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.name, 'name')
            }
            if (typeof this.listQuery.plc_name !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.plc_name, 'plc_name')
            }
            if (typeof this.listQuery.type !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.type, 'type')
            }
            if (typeof this.listQuery.protocol !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.protocol, 'protocol')
            }
            if (typeof this.listQuery.active !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.active, 'active')
            }

            // The total number of element in the array
            this.total = this.tags.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.tags = this.tags.slice(init_a, finish_a)
          } else {
            this.tags = response.data.sort((a, b) => (a.tag_id < b.tag_id ? 1 : -1))

            // Search for substrings
            if (typeof this.listQuery.name !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.name, 'name')
            }
            if (typeof this.listQuery.plc_name !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.plc_name, 'plc_name')
            }
            if (typeof this.listQuery.type !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.type, 'type')
            }
            if (typeof this.listQuery.protocol !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.protocol, 'protocol')
            }
            if (typeof this.listQuery.active !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.active, 'active')
            }

            // The total number of element in the array
            this.total = this.tags.length

            // Choose the right interval of elements
            const init_a = (this.listQuery.page - 1) * this.listQuery.limit
            const finish_a = this.listQuery.page * this.listQuery.limit
            this.tags = this.tags.slice(init_a, finish_a)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    handleDeleteAll() {
      TagData.deleteAll()
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
      TagData.delete(this.temp.name, this.temp.plc_name)
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
          TagData.update(tempData.name, tempData.plc_name, tempData)
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
        tag_id: this.temp.tag_id,
        name: this.temp.name,
        plc_name: this.temp.plc_name,
        val: this.temp.val,
        type: this.temp.type,
        protocol: this.temp.protocol,
        timestamp: this.temp.timestamp.toLocaleString(),
        min: this.temp.min,
        max: this.temp.max,
        range_min: this.temp.range_min,
        range_max: this.temp.range_max,
        active: this.temp.active,
        message: this.temp.message,
        index_offset: this.temp.index_offset,
        handle: this.temp.handle
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          TagData.create(data)
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
        name: undefined,
        plc_name: undefined,
        val: undefined,
        type: undefined,
        protocol: undefined,
        timestamp: undefined,
        min: undefined,
        max: undefined,
        range_min: undefined,
        range_max: undefined,
        active: undefined,
        message: undefined,
        index_offset: undefined,
        handle: undefined
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
      this.retrieveTags()
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
      const sort = this.retrieveTags().sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },

    filter(array, value, key1) {
      var res = []
      for (var j = 0; j < array.length; j++) {
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

