<template>
  <div>
    <div class="filter-bar">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="filter-date block"
        :picker-options="pickerOptions"
        @change="handleDateChange"
      >
      </el-date-picker>
      <el-select
        v-model="categorySelect"
        size="mini"
        multiple
        placeholder="请选择"
        class="filter-category"
        @change="handleCategoryChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="search"
        size="mini"
        placeholder="输入关键字搜索"
        class="filter-search"
        @input="handleSearchChange"
      />
    </div>
    <el-table :data="showList" style="width: 100%">
      <el-table-column label="Date" prop="date"> </el-table-column>
      <el-table-column label="Name" prop="name"> </el-table-column>
      <el-table-column label="Category" prop="category"> </el-table-column>
      <el-table-column align="center" width="180px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="handleChange"
    />
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination/Pagination";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      options: [
        {
          value: "Java",
          label: "Java"
        },
        {
          value: "Redis",
          label: "Redis"
        },
        {
          value: "Mysql",
          label: "Mysql"
        },
        {
          value: "MongoDB",
          label: "MongoDB"
        },
        {
          value: "RocketMQ",
          label: "RocketMQ"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      categorySelect: [],
      dateRange: "",
      search: "",
      list: [],
      filterList: [],
      showList: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 4
      },

      conditions: {
        ranges: [],
        chooses: []
      }
    };
  },
  computed: {},
  created() {
    this.getList();
  },
  methods: {
    handleSearchChange() {
      this.doFilter();
    },
    handleCategoryChange() {
      let name = "category";
      console.log(this.categorySelect);
      if (this.categorySelect != null && this.categorySelect.length > 0) {
        let choose = {
          name: name,
          chooses: this.categorySelect
        };
        this.addChooseCondition(choose);
      } else {
        this.removeChooseCondition(name);
      }
    },
    handleDateChange() {
      let name = "date";
      if (this.dateRange != null) {
        let range = {
          name: name,
          low: this.dateRange[0],
          high: this.dateRange[1]
        };
        this.addRangeCondition(range);
      } else {
        this.removeConditionByType(name);
      }
    },
    addChooseCondition(choose) {
      let chooses = this.conditions.chooses;
      let flag = false;
      for (let i = 0; i < chooses.length; i++) {
        if (chooses[i] && chooses[i].name === choose.name) {
          chooses[i] = choose;
          flag = true;
        }
      }
      if (!flag) chooses.push(choose);
      this.doFilter();
    },
    addRangeCondition(range) {
      let ranges = this.conditions.ranges;
      let flag = false;
      for (let i = 0; i < ranges.length; i++) {
        if (ranges[i] && ranges[i].name === range.name) {
          ranges[i] = range;
          flag = true;
        }
      }
      if (!flag) {
        ranges.push(range);
      }
      this.doFilter();
    },
    isDuringDate(listDate, low, high) {
      let date = new Date(listDate);
      return date >= low && date <= high;
    },
    removeChooseCondition(name) {
      let chooses = this.conditions.chooses;
      for (let i = 0; i < chooses.length; i++) {
        if (chooses[i] && chooses[i].name === name) {
          chooses.splice(i, 1);
        }
      }
      this.doFilter();
    },
    removeConditionByType(name) {
      console.log("remove");
      var ranges = this.conditions.ranges;
      for (let i = 0; i < ranges.length; i++) {
        if (ranges[i] && ranges[i].name === name) {
          ranges.splice(i, 1);
        }
      }
      this.doFilter();
    },
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    doFilter() {
      this.filterList = this.list;

      if (this.search) {
        this.filterList = this.filterList.filter(
          data =>
            !this.search ||
            data.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      let conditions = this.conditions;
      if (conditions.ranges.length !== 0) {
        for (let range of conditions.ranges) {
          this.filterList = this.filterList.filter(item => {
            if (range.name === "date") {
              return this.isDuringDate(item.date, range.low, range.high);
            } else {
              return (
                item[range.name] >= range.low && item[range.name] <= range.high
              );
            }
          });
        }
      }
      let chooses = this.conditions.chooses;
      let beforeChooseList = this.filterList;
      let chooseList = [];
      if (chooses.length !== 0) {
        for (let choose of chooses) {
          for (let i = 0; i < choose.chooses.length; i++) {
            chooseList = chooseList.concat(
              beforeChooseList.filter(item => {
                return item[choose.name].indexOf(choose.chooses[i]) !== -1;
              })
            );
          }
        }
        this.filterList = chooseList;
      }

      this.total = this.filterList.length;
      this.currentChangePage(this.filterList);

      /*if (this.tableDataName == "") {
        this.$message.warning("查询条件不能为空！");
        return;
      }
      this.tableDataEnd = [];
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = [];
      this.tableDataBegin.forEach(value => {
        if (value.name) {
          if (value.name.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value);
          }
        }
      });
      //页面数据改变重新统计数据数量和当前页
      this.currentPage = 1;
      this.totalItems = this.filterTableDataEnd.length;
      //渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd);
      //页面初始化数据需要判断是否检索过
      this.flag = true;*/
    },
    openData() {},
    handleChange(obj) {
      this.limit = obj.limit;
      this.page = obj.page;
      this.currentChangePage(this.filterList);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange(1);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      //需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataBegin);
        console.log(this.tableDataEnd);
      } else {
        this.currentChangePage(this.filterTableDataEnd);
        console.log(this.tableDataEnd);
      }
    }, //组件自带监控当前页码

    currentChangePage(list) {
      let from = (this.listQuery.page - 1) * this.listQuery.limit;
      let to = this.listQuery.page * this.listQuery.limit;
      this.showList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.showList.push(list[from]);
        }
      }
    },
    getList() {
      this.listLoading = true;
      fetchList().then(response => {
        this.list = response.data.items;
        this.filterList = this.list;
        this.handleChange(this.list);
        this.total = response.data.total;
        this.listLoading = false;
      });
    }
  }
};
</script>
<style scoped>
.filter-bar {
  height: 50px;
  margin-left: 10px;
  margin-top: 15px;
}
.filter-date {
  float: left;
  width: 20%;
  padding-left: 30px;
}
.filter-category {
  float: left;
  width: 20%;
  padding-left: 30px;
}
.filter-search {
  float: right;
  width: 20%;
  padding-right: 30px;
}
</style>
