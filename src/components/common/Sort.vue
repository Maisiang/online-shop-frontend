<template>
    <div class="sort-bar w-full">
        <ul class=" flex-row justify-content-around noselect">
          <li class='h2 flex-row cursor-ptr' v-for="(item,index) in sortList.data" :key="index">
              <div :class='index===sortList.currentIndex?"text-red":""' @click="getData(index)">
                  {{item.name}}
              </div>
              <div v-if="item.sortStr!=='' & sortList.currentIndex===index" class="search-arrow flex-col">
                  <img v-if="item.sortNum!==-1" src="@/assets/images/up-arrow.png">
                  <img v-if="item.sortNum!==-1" src="@/assets/images/down-arrow-click.png">

                  <img v-if="item.sortNum!==1" src="@/assets/images/up-arrow-click.png">
                  <img v-if="item.sortNum!==1" src="@/assets/images/down-arrow.png">
              </div>
          </li>
      </ul>
    </div>
</template>

<script>
import { apiProduct } from '@/assets/scripts/api';
export default{
    props:['queryKey'],
    data(){
        return{
            mode:0,
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
        // index    - 預設為綜合(0)、遞增(1)、遞減(-1)
        // mode     - 預設為 this.queryKey(0)、透過路由變化的query(1)
        async getData(index = 0){
            // 父組件提供的Query
            let nameQuery = this.queryKey;
            // 如果是路由變化的Query
            if(this.mode===1){
                if(this.$route.query.key===undefined)
                    return false;
                nameQuery = this.$route.query.key;
            }
            // 儲存選取的排序索引
            let oldIndex = this.sortList.currentIndex
            this.sortList.currentIndex = index;
            // 如果兩次為不同排序字串，則改為最原本的狀態
            if(oldIndex != this.sortList.currentIndex)
                this.sortList.data[oldIndex].sortNum = 1;
            // 變更排序(遞增、遞減)
            this.sortList.data[index].sortNum = this.sortList.data[index].sortNum * -1;
            // 傳遞給伺服器(搜尋商品名稱、按照哪個欄位排序、排序方法)
            apiProduct({
                params:{
                    name: nameQuery,
                    sortStr: this.sortList.data[index].sortStr,
                    sortNum: this.sortList.data[index].sortNum*-1,
                }
            }).then((response)=>{
                // 傳送結果到父組件
                this.$emit("getDataFromChild",Object.assign([],response.data));
            })
        },
    },
    watch:{
        // 監聽路由(搜尋參數)改變，重新抓取資料
        $route(){},
        '$route.query.key': function (newValue, oldValue) {
            this.mode=1;
            this.getData();
        }
    },
}
</script>

<style scoped>
.sort-bar{
    padding:10px;
}
.search-arrow img{
    height: 10px;
}

</style>