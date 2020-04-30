<template>
  <div class="home">
    <mt-header title="健康管理">
        <mt-button slot="right">
          <el-badge :value="0" class="item" v-show="true">
            <i class="iconfont icon-comments"></i>
          </el-badge>
        </mt-button>
    </mt-header>

    <swiper :key="posterlist.length" perview='2'>
      <div class="swiper-slide" v-for="data in posterlist" :key="data"><img :src="data" /></div>
    </swiper>

    <div class="noticecontainer">
      <img src="../assets/trump_bg.png"/>
      <textswiper :key="$store.state.noticelist.length" perview='2'>
        <div class="swiper-slide" v-for="item in $store.state.noticelist" :key="item.id">
          <a>{{item.title}}</a>
        </div>
      </textswiper>
      <p @click="clickmore">更多</p>
    </div>

    <div class="sudoku_row">
      <div
        class="sudoku_item "
        v-for="(sudoku, index) in sudokus"
        :key="index"
        @click="itemclick(sudoku.id)"
      >
        <img :src="sudoku.img_src" width="40" height="40" />
        {{ sudoku.name }}
      </div>
    </div>
    <br/>
    <div class="sudoku_row">
      <div
        class="sudoku_item "
        v-for="(item, index) in managelist"
        :key="index"
        @click="manageitemclick(item.id)"
      >
        <img :src="item.img_src" width="40" height="40" />
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import swiper from './home/Swiper.vue'
import textswiper from './home/Textswiper.vue'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      posterlist: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588235032799&di=77c85a3ea7f90715afa002ba3297cfe4&imgtype=0&src=http%3A%2F%2Fwww.zhongjie.gov.cn%2Fuploadfile%2F201409%2F28%2F2014092860063613.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588235032798&di=1be76c981d02f0bfebd88e1295a6f276&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181105%2F4aeaf6f544444ad482e372a05fffdb09.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588235032796&di=678bc03b9049f4bcc676a4cf48f6266f&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb21bb051f8198618f04be10441ed2e738bd4e626.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1773616293,1285541303&fm=26&gp=0.jpg'
      ],
      isfixed: false,
      sudokus: [
        {
          id: '0',
          name: '预约挂号',
          img_src: require('../assets/home_appoint.png')
        },
        {
          id: '1',
          name: '门诊处方',
          img_src: require('../assets/home_medical.png')
        },
        {
          id: '2',
          name: '就诊病历',
          img_src: require('../assets/home_dieaserecord.png')
        },
        {
          id: '3',
          name: '挂号记录',
          img_src: require('../assets/home_appointrecord.png')
        },
        {
          id: '4',
          name: '健康指导',
          img_src: require('../assets/healthguide_bg.png')
        }
      ],
      managelist: [
        {
          id: '0',
          name: '健康测评',
          img_src: require('../assets/healthtest_bg.png')
        },
        {
          id: '1',
          name: '健康指导',
          img_src: require('../assets/healthguide_bg.png')
        },
        {
          id: '2',
          name: '健康档案',
          img_src: require('../assets/healthrecord_bg.png')
        },
        {
          id: '3',
          name: '仪表测量',
          img_src: require('../assets/healthmeasure_bg.png')
        }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('noticeAction')
  },
  methods: {
    itemclick (id) {
      if (this.$store.state.userlist === null) {
        // this.$router.push('/login')
        this.$router.push({ name: 'Login', params: { pagename: '/home' } })
      } else {
        if (id === '0') {
          this.$router.push({ name: 'Iframe', params: { link: `http://211.144.5.80:30166/H5/appoints/index?orgId=100167&name=${this.$store.state.userlist.name}&idCard=${this.$store.state.userlist.idNo}&phone=${this.$store.state.userlist.mobileTel}` } })
        } else if (id === '1') {
          this.$router.push({ name: 'Iframe', params: { link: `http://211.144.5.80:30166/H5/doctor/prescriptionApply/index?orgId=100167&idCard=${this.$store.state.userlist.idNo}` } })
        } else if (id === '2') {
          this.$router.push({ name: 'Iframe', params: { link: `http://211.144.5.80:30166/H5/doctor/clinicRecord/historyRecord?orgId=100167&idCard=${this.$store.state.userlist.idNo}` } })
        } else if (id === '3') {
          this.$router.push({ name: 'Iframe', params: { link: `http://211.144.5.80:30166/H5/appoints/findRegistList?orgId=100167&idCard=${this.$store.state.userlist.idNo}` } })
        } else if (id === '4') {
          this.$router.push({ name: 'Iframe', params: { link: `http://211.144.5.80:30141/FamilyDoctorH5-BZY/healthManager/guide.html?pid=${this.$store.state.userlist.pid}&deviceType=vuecli"+"&userId=${this.$store.state.userlist.userId}` } })
        }
      }
    },
    manageitemclick (id) {
      if (this.$store.state.userlist === null) {
        // this.$router.push('/login')
        this.$router.push({ name: 'Login', params: { pagename: '/home' } })
      } else {
        if (id === '0') {
          this.$router.push({ name: 'Iframe', params: { link: `http://211.144.5.80:30141/FamilyDoctorH5-BZY/healthManager/background.html?pid=${this.$store.state.userlist.pid}&deviceType=vuecli&userId=${this.$store.state.userlist.userId}&idNo=${this.$store.state.userlist.idNo}` } })
        } else if (id === '1') {
          this.$router.push({ name: 'Iframe', params: { link: `http://211.144.5.80:30141/FamilyDoctorH5-BZY/healthManager/guide.html?pid=${this.$store.state.userlist.pid}&deviceType=vuecli&userId=${this.$store.state.userlist.userId}` } })
        } else if (id === '2') {
          this.$router.push({ name: 'Iframe', params: { link: `http://211.144.5.80:30141/FamilyDoctorH5-BZY/healthManager/health-record.html?pid=${this.$store.state.userlist.pid}&deviceType=vuecli&userId=${this.$store.state.userlist.userId}` } })
        } else if (id === '3') {
          this.$router.push({ name: 'Iframe', params: { link: `http://211.144.5.80:30141/FamilyDoctorH5-BZY/healthManager/measurement-list.html?pid=${this.$store.state.userlist.pid}&deviceType=vuecli&userId=${this.$store.state.userlist.userId}&idNo=${this.$store.state.userlist.idNo}` } })
        }
      }
    },
    clickmore () {
      this.$router.push({ name: 'Noticelist', params: { noticelist: this.$store.state.noticelist } })
    },
    handleevent (realIndex) {
      Toast('')
      console.log('id', realIndex)
      this.$router.push({ name: 'Noticedetail', params: { notice: this.$store.state.noticelist[realIndex] } })
    }
  },
  name: 'Home',
  components: {
    swiper,
    textswiper
  }
}
</script>

<style lang="scss" scoped>
.noticecontainer {
  display: flex;
  align-items: center;
  background: white;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
  height: 25px;
  border:1px solid transparent;
  border-radius:25px;
  padding-right: 10px;
  img {
    margin-left: 10px;
    width: 15px;
    height: 15px;
  }
  a {
    width: 100%;
    margin-right: 10px;
    font-size: 14px;
    color: black;
    -webkit-box-orient: vertical;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
  }
  p {
    font-size: 14px;
    margin:0 auto;
    color: dodgerblue;
  }
}
.sudoku_row {
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  background: white;
}
.sudoku_item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25%;
  padding-top: 10px;
  padding-bottom: 10px;
}
.opacity {
  opacity: 0.4;
  background: #e5e5e5;
}
.sudoku_item img {
  margin-bottom: 3px;
  display: block;
}
.item {
  margin-top: 5px;
  margin-right: 20px;
}
</style>
