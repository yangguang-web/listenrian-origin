import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      isKeep: false,      //页面缓存 yang
      isShow: true,       //页头显示
      isShowTime:true,    //是否显示时间
      realtime:'',        //获取时间
      timerange:[]        //保存首页时间
    },
    mutations: {
      toggleKeepAliveMutation(state) {
          state.isKeep=!state.isKeep;
      },
      togglePageHeaderMutation(state){
          state.isShow=!state.isShow;
      },
      toggleShowTime(state){
          state.isShowTime=!state.isShowTime;
      },
      setIndexTime(state){
        state.timerange=sessionStorage.getItem('time');
      },
      getTime(state){
        function checkTime(i){
          if(i<10){
            i="0"+i;
          }
          return i;
        }
        var d= new Date();
        let hou=d.getHours();
	      let min=d.getMinutes();
        let sec=d.getSeconds();
        let day=d.getDate();
        let mon=d.getMonth()+1;
        let yea=d.getFullYear();
        min=checkTime(min);
        sec=checkTime(sec);
        state.realtime=yea+'/'+mon+'/'+day+' '+hou+':'+min+':'+sec;
        state.realtime=hou+':'+min+':'+sec;

      }
    }
})