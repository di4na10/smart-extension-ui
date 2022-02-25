<template>
  <div class="app-container">
    <div class="dashboard-editor-container">
      <panel-group />
    </div>
    <div class="filter-container">
      <el-input v-model="listQuery.ref" placeholder="ref" style="width: 150px;" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.name" placeholder="name" style="width: 150px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.type" placeholder="type" class="filter-item" style="width: 100px" @change="handleFilter" />
      <el-input v-model="listQuery.protocol" placeholder="protocol" style="width: 100px" class="filter-item" @change="handleFilter" />
      <el-input v-model="listQuery.direction" placeholder="direction" style="width: 100px" class="filter-item" @change="handleFilter" />
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
      <el-table-column label="ref" prop="ref" min-width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ref }}</span>
        </template>
      </el-table-column>
      <el-table-column label="name" prop="name" min-width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="val" prop="val" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ Math.round((row.val + Number.EPSILON) * 1000) / 1000 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="type" prop="type" width="80px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="protocol" prop="protocol" width="80px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.protocol }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="timestamp" prop="timestamp" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ parseTime(row.timestamp*1000) }}</span>
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
      <el-table-column label="direction" prop="direction" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.direction }}</span>
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
        <el-form-item label="Ref" prop="ref">
          <el-input v-model.number="temp.ref" type="number" />
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="temp.name" />
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
        <el-form-item label="Direction" prop="direction">
          <el-input v-model="temp.direction" />
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
import TagData from './services/tagData'
import waves from '@/components/Waves' // Waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'TagsList',
  components: {
    PanelGroup,
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
        ref: undefined,
        name: undefined,
        val: undefined,
        type: undefined,
        protocol: undefined,
        timestamp: undefined,
        min: undefined,
        max: undefined,
        range_min: undefined,
        range_max: undefined,
        direction: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        tag_id: 0,
        ref: 0,
        name: '',
        val: 0.0,
        type: '',
        protocol: '',
        timestamp: new Date(),
        min: 0.0,
        max: 0.0,
        range_min: 0.0,
        range_max: 0.0,
        direction: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        tag_id: [{ type: 'number', required: true, message: 'Tag ID is required as number', trigger: 'change' }],
        ref: [{ type: 'number', required: true, message: 'Ref is required as number', trigger: 'change' }],
        name: [{ required: true, message: 'Name is required', trigger: 'change' }],
        val: [{ type: 'number', required: true, message: 'Value is required as number', trigger: 'change' }],
        type: [{ required: true, message: 'Type is required', trigger: 'change' }],
        protocol: [{ required: true, message: 'Protocol is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'Timestamp is required', trigger: 'change' }],
        min: [{ type: 'number', required: true, message: 'Min is required as number', trigger: 'change' }],
        max: [{ type: 'number', required: true, message: 'Max is required as number', trigger: 'change' }],
        range_min: [{ type: 'number', required: true, message: 'Range min is required as number', trigger: 'change' }],
        range_max: [{ type: 'number', required: true, message: 'Range max is required as number', trigger: 'change' }],
        direction: [{ required: true, message: 'Direction is required', trigger: 'change' }]
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
            if (typeof this.listQuery.ref !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.ref, 'ref')
            }
            if (typeof this.listQuery.name !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.name, 'name')
            }
            if (typeof this.listQuery.type !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.type, 'type')
            }
            if (typeof this.listQuery.protocol !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.protocol, 'protocol')
            }
            if (typeof this.listQuery.direction !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.direction, 'direction')
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
            if (typeof this.listQuery.ref !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.ref, 'ref')
            }
            if (typeof this.listQuery.name !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.name, 'name')
            }
            if (typeof this.listQuery.type !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.type, 'type')
            }
            if (typeof this.listQuery.protocol !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.protocol, 'protocol')
            }
            if (typeof this.listQuery.direction !== 'undefined') {
              this.tags = this.filter(this.tags, this.listQuery.direction, 'direction')
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
      TagData.delete(this.temp.tag_id)
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
          tempData.timestamp = +new Date(tempData.timestamp).getTime() / 1000 // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          TagData.update(tempData.tag_id, tempData)
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
      this.temp.timestamp = new Date(this.temp.timestamp * 1000)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createData() {
      const data = {
        tag_id: this.temp.tag_id,
        ref: this.temp.ref,
        name: this.temp.name,
        val: this.temp.val,
        type: this.temp.type,
        protocol: this.temp.protocol,
        timestamp: this.temp.timestamp.getTime() / 1000,
        min: this.temp.min,
        max: this.temp.max,
        range_min: this.temp.range_min,
        range_max: this.temp.range_max,
        direction: this.temp.direction
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
        ref: undefined,
        name: undefined,
        val: undefined,
        type: undefined,
        protocol: undefined,
        timestamp: new Date(),
        min: undefined,
        max: undefined,
        range_min: undefined,
        range_max: undefined,
        direction: undefined
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

  .dashboard-editor-container {
    padding: 12px;
    background-color: rgb(240, 242, 245);
    position: relative;
  }

  .filter-container {
    margin-top: 18px;
  }
</style>

