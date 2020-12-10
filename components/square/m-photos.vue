<template>
  <div v-if="photos" @click.stop="">
    <!-- Just one -->
    <div v-if="photos.length === 1" class="works-photos-wrap-one">
      <img class="basic-pic photos-one" v-lazy="photos[0]" @click="openImagePre(0)"/>
    </div>

    <!-- Two photos -->
    <div v-if="photos.length === 2" class="works-photos-wrap-two">
      <img 
        v-for="(item, i) in photos"
        :class="handleClassMethod(i)"
        v-lazy="item"
        :alt="item"
        :key="i"
        @click="openImagePre(i)"
      />
    </div>

    <!-- There photos -->
    <div v-if="photos.length === 3" class="works-photos-wrap-three">
      <img class="basic-pic photos-one" v-lazy="photos[0]" @click="openImagePre(0)" />
      <div class="photos-right-side-wrap">
        <img class="basic-pic photos-two" v-lazy="photos[1]" @click="openImagePre(1)" />
        <img class="basic-pic photos-three" v-lazy="photos[2]" @click="openImagePre(2)"/>
      </div>
    </div>

    <!-- Four photos -->
    <div v-if="photos.length === 4" class="works-photos-wrap-four">
      <img class="basic-pic photos-one" v-lazy="photos[0]" @click="openImagePre(0)"/>
      <div class="photos-bottom-side-wrap">
        <img class="basic-pic photos-two" v-lazy="photos[1]" @click="openImagePre(1)"/>
        <img class="basic-pic photos-three" v-lazy="photos[2]" @click="openImagePre(2)"/>
        <img class="basic-pic photos-four" v-lazy="photos[3]" @click="openImagePre(3)"/>
      </div>
    </div>

    <!-- Five photos -->
    <div v-if="photos.length === 5" class="works-photos-wrap-five">
      <div class="photos-top-side-wrap">
        <img class="basic-pic photos-one" v-lazy="photos[0]" @click="openImagePre(0)"/>
        <img class="basic-pic photos-two" v-lazy="photos[1]" @click="openImagePre(1)"/>
      </div>
      <div class="photos-bottom-side-wrap">
        <img class="basic-pic photos-three" v-lazy="photos[2]" @click="openImagePre(2)"/>
        <img class="basic-pic photos-four" v-lazy="photos[3]" @click="openImagePre(3)"/>
        <img class="basic-pic photos-five" v-lazy="photos[4]" @click="openImagePre(4)"/>
      </div>
    </div>

    <!-- Six photos -->
    <div v-if="photos.length === 6" class="works-photos-wrap-six">
      <div class="photos-top-side-wrap">
        <img class="basic-pic photos-one" v-lazy="photos[0]" @click="openImagePre(0)"/>
        <div class="photos-right-side-wrap">
          <img class="basic-pic photos-two" v-lazy="photos[1]" @click="openImagePre(1)"/>
          <img class="basic-pic photos-three" v-lazy="photos[2]" @click="openImagePre(2)"/>
        </div>
      </div>
      <div class="photos-bottom-side-wrap">
        <img class="basic-pic photos-four" v-lazy="photos[3]" @click="openImagePre(3)"/>
        <img class="basic-pic photos-five" v-lazy="photos[4]" @click="openImagePre(4)"/>
        <img class="basic-pic photos-six" v-lazy="photos[5]" @click="openImagePre(5)"/>
      </div>
    </div>

    <!-- Seven photos -->
    <div v-if="photos.length === 7" class="works-photos-wrap-seven">
      <img class="basic-pic photos-one" v-lazy="photos[0]" @click="openImagePre(0)"/>
      <div class="photos-middle-side-wrap">
        <img class="basic-pic photos-two" v-lazy="photos[1]" @click="openImagePre(1)"/>
        <img class="basic-pic photos-three" v-lazy="photos[2]" @click="openImagePre(2)"/>
        <img class="basic-pic photos-four" v-lazy="photos[3]" @click="openImagePre(3)"/>
      </div>
      <div class="photos-bottom-side-wrap">
        <img class="basic-pic photos-five" v-lazy="photos[4]" @click="openImagePre(4)"/>
        <img class="basic-pic photos-six" v-lazy="photos[5]" @click="openImagePre(5)"/>
        <img class="basic-pic photos-seven" v-lazy="photos[6]" @click="openImagePre(6)"/>
      </div>
    </div>

    <!-- Eight photos -->
    <div v-if="photos.length === 8" class="works-photos-wrap-eight">
      <div class="photos-top-side-wrap">
        <img class="basic-pic photos-one" v-lazy="photos[0]" @click="openImagePre(0)"/>
        <img class="basic-pic photos-two" v-lazy="photos[1]" @click="openImagePre(1)"/>
      </div>
      <div class="photos-middle-side-wrap">
        <img class="basic-pic photos-three" v-lazy="photos[2]" @click="openImagePre(2)"/>
        <img class="basic-pic photos-four" v-lazy="photos[3]" @click="openImagePre(3)"/>
        <img class="basic-pic photos-five" v-lazy="photos[4]" @click="openImagePre(4)"/>
      </div>
      <div class="photos-bottom-side-wrap">
        <img class="basic-pic photos-six" v-lazy="photos[5]" @click="openImagePre(5)"/>
        <img class="basic-pic photos-seven" v-lazy="photos[6]" @click="openImagePre(6)"/>
        <img class="basic-pic photos-eight" v-lazy="photos[7]" @click="openImagePre(7)"/>
      </div>
    </div>

    <!-- Nine photos -->
    <div v-if="photos.length === 9" class="works-photos-wrap-nine">
      <div class="photos-top-side-wrap">
        <img class="basic-pic photos-one" v-lazy="photos[0]" @click="openImagePre(0)"/>
        <img class="basic-pic photos-two" v-lazy="photos[1]" @click="openImagePre(1)"/>
        <img class="basic-pic photos-three" v-lazy="photos[2]" @click="openImagePre(2)"/>
      </div>
      <div class="photos-middle-side-wrap">
        <img class="basic-pic photos-four" v-lazy="photos[3]" @click="openImagePre(3)"/>
        <img class="basic-pic photos-five" v-lazy="photos[4]" @click="openImagePre(4)"/>
        <img class="basic-pic photos-six" v-lazy="photos[5]" @click="openImagePre(5)"/>
      </div>
      <div class="photos-bottom-side-wrap">
        <img class="basic-pic photos-seven" v-lazy="photos[6]" @click="openImagePre(6)"/>
        <img class="basic-pic photos-eight" v-lazy="photos[7]" @click="openImagePre(7)"/>
        <img class="basic-pic photos-nine" v-lazy="photos[8]" @click="openImagePre(8)"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    photos:{
      type:Array,
      default:null
    }
  },
  methods:{
    /** 图片预览 */
    openImagePre (index) {
      this.$emit('openImagePreview', index)
    },
    // 返回图片样式类
    handleClassMethod(i){
      switch (i) {
        case 0:
          return 'basic-pic photos-one'
          break;
        case 1:
          return 'basic-pic photos-two'
          break;
        case 2:
          return 'basic-pic photos-three'
          break;
        case 3:
          return 'basic-pic photos-four'
          break;
        case 4:
          return 'basic-pic photos-five'
          break;
        case 5:
          return 'basic-pic photos-six'
          break;
        case 6:
          return 'basic-pic photos-seven'
          break;
        case 7:
          return 'basic-pic photos-eight'
          break;
        case 8:
          return 'basic-pic photos-nine'
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.basic-pic {
  object-fit: cover;
  cursor: pointer;
}

// Just One
.works-photos-wrap-one {
  width: 100%;
  .photos-one {
    max-width: 100%;
    height: 300px;
    border-radius: 5px;
  }
}

// Two
.works-photos-wrap-two {
  width: 100%;
  height: 169px;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .photos-one, .photos-two {
    width: 49.3%;
    height: 169px;
  }
}

// Three
.works-photos-wrap-three {
  width: auto;
  height: 227px;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  align-items: center;
  & > img.photos-one {
    flex: auto;
    width: 227px;
    height: 227px;
    margin-right: 5px;
    @media screen and (max-width: 350px){
      max-width: 227px;
      max-height: 227px;
    }
  }
}

.works-photos-wrap-three .photos-right-side-wrap {
  display: flex;
  flex-direction: column;
  flex: auto;
  .photos-two, .photos-three {
    min-width: 111px;
    height: 111px;
    @media screen and (max-width: 350px){
      max-width: 111px;
    }
  }
  .photos-two {
    margin-bottom: 5px;
  }
}

// Four
.works-photos-wrap-four {
  width: 100%;
  height: 285px;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  .photos-one {
    width: 100%;
    height: 169px;
  }
}

.works-photos-wrap-four .photos-bottom-side-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  .photos-two,
  .photos-three,
  .photos-four {
    width: 111px;
    height: 111px;
    flex: auto;
    @media screen and (max-width: 350px){
      max-width: 111px;
      max-height: 111px;
    }
  }
  .photos-two,
  .photos-three {
    margin-right: 5px;
  }
}

// Five
.works-photos-wrap-five {
  width: 100%;
  height: 285px;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.works-photos-wrap-five .photos-top-side-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .photos-one,
  .photos-two {
    width: 169px;
    height: 169px;
    flex: auto;
    @media screen and (max-width: 350px){
      max-width: 169px;
      max-height: 169px;
    }
  }
  .photos-one {
    margin-right: 5px;
  }
}

.works-photos-wrap-five .photos-bottom-side-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  .photos-three,
  .photos-four,
  .photos-five {
    width: 111px;
    height: 111px;
    flex: auto;
    @media screen and (max-width: 350px){
      max-width: 111px;
      max-height: 111px;
    }
  }
  .photos-three,
  .photos-four {
    margin-right: 5px;
  }
}

// Six
.works-photos-wrap-six {
  width: 100%;
  height: 343px;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.works-photos-wrap-six .photos-top-side-wrap {
  display: flex;
  flex-direction: row;
  & > img.photos-one {
    width: 227px;
    height: 227px;
    flex: auto;
    @media screen and (max-width: 350px){
      max-width: 227px;
      max-height: 227px;
    }
  }
}

.works-photos-wrap-six .photos-top-side-wrap {
  .photos-right-side-wrap {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    .photos-two,
    .photos-three {
      width: 111px;
      height: 111px;
      flex: auto;
      @media screen and (max-width: 350px){
        max-width: 111px;
        max-height: 111px
      }
    }
    .photos-three {
      margin-top: 5px;
    }
  }
}

.works-photos-wrap-six .photos-bottom-side-wrap {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  .photos-four,
  .photos-five,
  .photos-six {
    width: 111px;
    height: 111px;
    flex: auto;
    @media screen and (max-width: 350px){
      max-width: 111px;
      max-height: 111px;
    }
  }
  .photos-four,
  .photos-five {
    margin-right: 5px;
  }
}

// Seven
.works-photos-wrap-seven {
  width: 100%;
  height: 401px;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.works-photos-wrap-seven {
  .photos-one {
    width: 100%;
    height: 169px;
  }
}

.works-photos-wrap-seven .photos-middle-side-wrap {
  display: flex;
  align-items: center;
  margin-top: 5px;
  .photos-two,
  .photos-three,
  .photos-four {
    width: 111px;
    height: 111px;
    flex: auto;
    @media screen and (max-width:375px){
      max-width: 111px;
      max-height: 111px;
    }
  }
  .photos-two,
  .photos-three {
    margin-right: 5px;
  }
}

.works-photos-wrap-seven .photos-bottom-side-wrap {
  display: flex;
  align-items: center;
  margin-top: 5px;
  .photos-five,
  .photos-six,
  .photos-seven {
    width: 111px;
    height: 111px;
    flex: auto;
    @media screen and (max-width:375px){
      max-width: 111px;
      max-height: 111px;
    }
  }
  .photos-five,
  .photos-six {
    margin-right: 5px;
  }
}

// Eight
.works-photos-wrap-eight {
  width: 100%;
  height: 401px;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.works-photos-wrap-eight .photos-top-side-wrap {
  display: flex;
  flex-direction: row;
  .photos-one,
  .photos-two {
    width: 49.3%;
    height: 169px;
    flex: auto;
  }
  .photos-one {
    margin-right: 5px;
  }
}

.works-photos-wrap-eight .photos-middle-side-wrap {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  flex: auto;
  .photos-three,
  .photos-four,
  .photos-five {
    width: 111px;
    height: 111px;
    flex: auto;
    @media screen and (max-width:350px){
      max-width: 111px;
      max-height: 111px;
    }
  }
  .photos-three,
  .photos-four {
    margin-right: 5px;
  }
}

.works-photos-wrap-eight .photos-bottom-side-wrap {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  .photos-six,
  .photos-seven,
  .photos-eight {
    width: 111px;
    height: 111px;
    flex: auto;
    @media screen and (max-width:350px){
      max-width: 111px;
      max-height: 111px;
    }
  }
  .photos-six,
  .photos-seven {
    margin-right: 5px;
  }
}


// Nine
.works-photos-wrap-nine {
  width: 100%;
  height: 343px;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.works-photos-wrap-nine .photos-top-side-wrap {
  display: flex;
  align-items: center;
  .photos-one,
  .photos-two,
  .photos-three {
    width: 111px;
    height: 111px;
    flex: auto;
    @media screen and (max-width: 350px){
      max-width: 111px;
      max-height: 111px;
    }
  }
  .photos-one,
  .photos-two{
    margin-right: 5px;
  }
}

.works-photos-wrap-nine .photos-middle-side-wrap {
  display: flex;
  align-items: center;
  margin-top: 5px;
  .photos-four,
  .photos-five,
  .photos-six {
    width: 111px;
    height: 111px;
    flex: auto;
    @media screen and (max-width: 350px){
      max-width: 111px;
      max-height: 111px;
    }
  }
  .photos-four,
  .photos-five {
    margin-right: 5px;
  }
}

.works-photos-wrap-nine .photos-bottom-side-wrap {
  display: flex;
  align-items: center;
  margin-top: 5px;
  .photos-seven,
  .photos-eight,
  .photos-nine {
    width: 111px;
    height: 111px;
    flex: auto;
    @media screen and (max-width: 350px){
      max-width: 111px;
      max-height: 111px;
    }
  }
  .photos-seven,
  .photos-eight {
    margin-right: 5px;
  }
}
</style>
