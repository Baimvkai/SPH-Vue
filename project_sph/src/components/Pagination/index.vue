<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="NumberList.start > 1" @click="$emit('getPageNo',1)" :class="pageNo==1 ? 'active':''">1</button>
    <button v-if="NumberList.start > 2">···</button>

    <button 
      v-for="(page,index) in NumberList.end" 
      :key="index"
      v-show="page >= NumberList.start"  
      @click="$emit('getPageNo',page)"
      :class="pageNo==page ? 'active':''"
    >
      {{page}}
    </button>

    <button v-if="NumberList.end < totalPage-1">···</button>
    <button v-if="NumberList.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="pageNo==totalPage ? 'active':''">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共{{total}}条</button>
    
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','pageSize','total','continues'],
  computed:{
    // 计算总共多少也
    totalPage(){
      // 向上取整
      return Math.ceil(this.total/this.pageSize)
    },
    // 计算连续的页码的其实数字与结束数字
    NumberList(){
      // 先定义两个变量存储起始数字和结束数字
      let start = 0
      let end = 0
      if(this.continues > this.totalPage){
        // 总页码没有连续页码多
        start = 1,
        end = this.totalPage
      }else{
        // 起始数字
        start = this.pageNo - parseInt(this.continues/2)
        // 结束数字
        end = this.pageNo + parseInt(this.continues/2)
        // start数字出现小于0 纠正
        if(start < 1){
          start = 1
          end = this.continues
        }
        // end数字大于总页码
        if(this.totalPage < end){
          end = this.totalPage
          start = this.totalPage - this.continues
        }
      }
      return {start,end}
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #e1251b;
      color: #fff;
    }
  }
}
</style>
