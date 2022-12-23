<template>
    <div class="sort-bar">
        <ul class=" row space-around-center">
          <li class='h2 row center-center noselect' v-for="(item,index) in sortList.data" :key="index">
              <div :class='index===sortList.currentIndex?"c-red":""'
              @click="getData(index)">
                  {{item.name}}
              </div>
              <div v-if="item.sortStr!=='' & sortList.currentIndex===index" class="search-filter col">
                  <img v-if="item.sortNum!==-1" src="@/assets/images/up-arrow.png">
                  <img v-if="item.sortNum!==1" src="@/assets/images/up-arrow-click.png">
                  <img v-if="item.sortNum!==1" src="@/assets/images/down-arrow.png">
                  <img v-if="item.sortNum!==-1" src="@/assets/images/down-arrow-click.png">
              </div>
          </li>
      </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    props:['queryKey'],
    data(){
        return{
            resObj:{},
            sortList:{
                currentIndex: 0,
                data:[
                    {name:"綜合" , sortStr:'' , sortNum:0},
                    {name:"價格" , sortStr:'price' , sortNum: 1},
                    {name:"名稱" , sortStr: 'name' , sortNum: 1}
                ]
            }
        }
    },
    created(){
        this.getData();
    },
    methods:{
        // 搜尋商品功能 - 預設為綜合(0)
        async getData(index = 0){
            let oldIndex = this.sortList.currentIndex
            // 儲存選取的排序索引
            this.sortList.currentIndex = index;
            // 如果兩次為不同排序，則改為最原本的狀態
            if(oldIndex != this.sortList.currentIndex)
                this.sortList.data[oldIndex].sortNum = 1;
            // 變更排序(遞增,遞減)
            this.sortList.data[index].sortNum = this.sortList.data[index].sortNum * -1;
            axios.get('/api/product',{
                // 傳遞給伺服器的搜尋字串
                params:{
                    name: this.queryKey,
                    sortStr: this.sortList.data[index].sortStr,
                    sortNum: this.sortList.data[index].sortNum*-1,
                }
            // 接收搜尋結果
            }).then((response)=>{
                // 傳response給Parent
                this.$emit("getDataFromChild",Object.assign([],response.data));
            })
        },
    },
    watch:{
        // 監聽路由(搜尋參數)改變，重新抓取資料
        $route(){
            this.getData();
        }
    },
}
</script>

<style scoped>
.sort-bar .search-filter img{
    height: 10px;
}
.sort-bar{
    width: 100%;
    padding: 10px;
}
</style>