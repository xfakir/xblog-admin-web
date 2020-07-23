<template>
  <div>
    <el-table
      :data="
        showList.filter(
          data =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="Date" prop="date"> </el-table-column>
      <el-table-column label="Name" prop="name"> </el-table-column>
      <el-table-column align="right">
        <!--eslint-disable-next-line-->
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
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
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="handleChange"
    />

    <!--<el-input
      v-model="tableDataName"
      placeholder="请输入姓名"
      style="width:240px"
    ></el-input>
    <el-button type="primary" @click="doFilter">搜索</el-button>
    <el-button type="primary" @click="openData">展示数据</el-button>
    <el-table :data="tableDataEnd" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column align="right">
        &lt;!&ndash;eslint-disable-next-line&ndash;&gt;
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="tableDataName"
            size="mini"
            placeholder="请输入姓名"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems"
    >
    </el-pagination>-->
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
      search: "",
      tableDataName: "",
      tableDataEnd: [],
      currentPage: 4,
      pageSize: 2,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
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
    this.initList();
  },
  mounted() {
    this.initList();
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
      console.log(obj);
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
      let from = (this.page - 1) * this.limit;
      let to = this.page * this.limit;
      this.showList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.showList.push(list[from]);
        }
      }
    },
    initList() {
      this.currentChangePage(this.list);
      console.log(this.list);
    },
    getList() {
      this.listLoading = true;
      fetchList().then(response => {
        this.list = response.data.items;
        this.showList = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    }
  }
};
</script>