<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort"> 
          <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              :class="index == currentIndex ? 'cur' : ''"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a 
                  :data-categoryName='c1.categoryName'
                  :data-category1Id='c1.categoryId'
                >
                  {{ c1.categoryName }}
                </a>
              </h3>
              <!-- 二级、三级分类 -->
              <div class="item-list clearfix" :style="{display:currentIndex == index? 'block':'none'}">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a 
                        :data-categoryName='c2.categoryName'
                        :data-category2Id='c2.categoryId'
                      >
                        {{ c2.categoryName }}
                      </a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a 
                          :data-categoryName='c3.categoryName'
                          :data-category3Id='c3.categoryId'
                        >
                          {{ c3.categoryName }}
                        </a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          </div>
        </transition>
        <!-- 三级联动 -->
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 引入方式：将lodash全部功能函数引入
import throttle from 'lodash/throttle'
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移动到哪个一节分类
      currentIndex: -1,
      show:true
    };
  },
  // 组件挂载完毕，可以向服务器发请求
  mounted() {
    // 当组件挂载完毕，让show属性变为false
    // 如果不是Home路由组件，将TypeNav进行隐藏
    if(this.$route.path != '/home'){
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    changeIndex:throttle(function(index){
      // 正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类都会触发进入事件
      // 非正常情况（用户操作太快）:本身全部的一级分类都应该触发鼠标进入事件，但经过测试，只有部分h3触发了
      // 由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有大量业务，可能会出现卡顿现象
      this.currentIndex = index;
    },50),
    // 路由跳转
    goSearch(e){
      // 最好的解决方案：编程式导航 + 事件委派
      // 存在一些问题：事件委派，是把全部的子节点（h3 dt dl em ）的事件委派给父节点
      // 点击a标签的时候，才会进行跳转
      // 存在另一个问题：即便你能确实点击的是a标签，如何区别是一、二、三级标签

      // 第一个问题：把子节点当中a标签，加上自定义属性data—categoryName
      let element = e.target;
      // 获取当前触发这个事件的节点，需要带有自定义属性的节点
      // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let {categoryname,category1id,category2id,category3id} = element.dataset
      // 如果标签上拥有自定义属性一定是a标签
      if(categoryname){
        // 整理路由跳转的参数
        let location = {name:'search'}
        let query = {categoryName:categoryname}
        // 一级二级三级的a标签
        if(category1id){
          query.category1Id = category1id
        }else if(category2id){
          query.category2Id = category2id
        }else{
          query.category3Id = category3id
        }
        // 判断
        if(this.$route.params){
          location.params = this.$route.params
          // 动态给location配置对象添加query
          location.query = query
          this.$router.push(location)
        }
      }
      
    },
    // 当鼠标移入的时候，让商品分类列表进行展示
    enterShow(){
      this.show = true
    },
    // 鼠标移出
    leaveShow(){
      this.currentIndex = -1;
      if(this.$route.path!='/home'){
        this.show = false
      }
    }
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
        text-decoration: none
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              cursor: pointer;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                  a {
                    cursor: pointer;
                  }
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  a{
                    cursor: pointer;
                  }

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 开始状态（进入）
    .sort-enter, .sort-leave-to{
      height: 0px;
    }
    // 结束状态（进入）
    .sort-enter-to, .sort-leave{
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active{
      transition: all .2s linear;
    }
    .sort-leave-active{
      transition: all .2s linear;
    }
  }
}
</style>