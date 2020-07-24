<template>
  <div>
    <div class="filter-bar">
      <el-date-picker
        v-model="value3"
        type="daterange"
        range-separator="至"
        size="mini"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="filter-date block"
      >
      </el-date-picker>
      <el-select
        v-model="value1"
        size="mini"
        multiple
        placeholder="请选择"
        class="filter-category"
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
      />
    </div>
    <el-table :data="show" style="width: 100%" border="border">
      <el-table-column label="Date" prop="date"> </el-table-column>
      <el-table-column label="Name" prop="name"> </el-table-column>

      <el-table-column align="center" width="180px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
        </template>
        <template slot-scope="scope">
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
      v-show="total > 0"
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
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
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
      value1: [],
      value2: [],
      value3: "",
      search: "",
      list: [],
      showList: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 4
      }
    };
  },
  computed: {
    show() {
      return this.showList.filter(
        data =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  created() {
    /*this.totalItems = this.tableDataBegin.length;
    if (this.totalItems > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        this.tableDataEnd.push(this.tableDataBegin[index]);
      }
    } else {
      this.tableDataEnd = this.tableDataBegin;
    }*/
    this.getList();
  },
  methods: {
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    doFilter() {
      if (this.tableDataName == "") {
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
      this.flag = true;
    },
    openData() {},
    handleChange(obj) {
      this.limit = obj.limit;
      this.page = obj.page;
      this.currentChangePage(this.list);
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
