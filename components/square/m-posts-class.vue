<template>
<div class="works__wrap">
  <div class="works__class--wrap">
    <span>{{ remark }} {{ college ? `· ${college.name}` : '' }}</span>
  </div>
  <template v-for="(item, index) in labels" >
    <div
      @click.stop="toLabel(item)"
      class="label"
      :class="{ 'active-label': labelDataGetters ? item.labelId === labelDataGetters.id : false }"
      :key="getKey(index)"
      v-if="item.labelCategoryProperty === 'SHOW_TAG'"
    >
      <span>{{ item.labelName }}</span>
    </div>
  </template>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'M-Posts-Class',
  props:{
    remark:{
      type: String,
      default: '作业'
    },
    college: {
      type: Object,
      default: null
    },
    labels: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    ...mapGetters('label',[
      'labelDataGetters',
    ])
  },
  mounted () {},
  methods: {
    toLabel (item) {
      this.$router.push({
        path: '/label',
        query: {
          id: item.labelId
        }
      })
    },
    getKey (index) {
      return `${index}${new Date().getTime()}`
    }
  }
}
</script>

<style lang="less" scoped>
.works__wrap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 4px;
  min-width: 167px;
}

.works__class--wrap {
  margin-top: 6px;
  width: max-content;
  height: 24px;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background: #f7f7f7;
  border-radius: 12px;
  & > span {
    font-size: 12px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #465156;
  }
}

.label {
  margin-top: 6px;
  margin-left: 8px;
  height: 24px;
  padding: 4px 8px;
  background: #E6F7EE;
  border-radius: 12px;
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #0CB65B;
}

.active-label {
  font-weight: 600;
}
</style>