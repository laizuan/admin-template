<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import store from '../store'
import StyleExample from './components/StyleExample.vue'
export default defineComponent({
  name: 'Setting',
  components: {
    StyleExample,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { expose }) {
    const opened = ref(props.show)
    const styleExampleList = reactive([
      {
        leftBg: '#000000',
        rightTopBg: 'var(--el-color-white)',
        rightBottomBg: '#f5f5f5',
        checked: false,
        themeId: 'dark-side',
      },
      {
        leftBg: 'var(--el-color-white)',
        rightTopBg: 'var(--el-color-white)',
        rightBottomBg: '#d4d4d4',
        checked: false,
        themeId: 'light',
      },
    ])
    const layoutExampleList = reactive([
      {
        leftBg: '#000000',
        rightTopBg: '#d4d4d4',
        rightBottomBg: '#d4d4d4',
        checked: true,
        layoutId: 'ltr',
        tipText: '左右',
      },
      {
        leftBg: '#d4d4d4',
        rightTopBg: 'var(--el-color-white)',
        rightBottomBg: '#d4d4d4',
        checked: false,
        layoutId: 'ttb',
        class: 'extra-class',
        tipText: '上下',
      },
      {
        leftBg: '#000000',
        rightTopBg: '#d4d4d4',
        rightBottomBg: '#d4d4d4',
        checked: false,
        layoutId: 'lcr',
        class: 'extra-class-1',
        tipText: '分栏',
      },
    ])

    const state = store.state
    onMounted(() => {
      styleExampleList.forEach((it) => {
        it.checked = state.theme === it.themeId
      })
      layoutExampleList.forEach((it) => {
        it.checked = state.layoutMode === it.layoutId
      })
    })
    function openDrawer() {
      opened.value = !opened.value
    }
    function exampleClick(item: any) {
      styleExampleList.forEach((it) => {
        it.checked = it === item
      })
      store.changeTheme(item.themeId)
      store.saveSetting({ theme: item.themeId })
    }
    function layoutExampleClick(item: any) {
      layoutExampleList.forEach((it) => {
        it.checked = it === item
      })
      store.changeLayoutMode(item.layoutId)
      store.saveSetting({ layoutMode: item.layoutId })
    }

    expose({
      openDrawer,
    })
    return {
      opened,
      styleExampleList,
      layoutExampleList,
      state,
      exampleClick,
      layoutExampleClick,
    }
  },
})
</script>

<template>
  <el-drawer
    v-model="opened"
    direction="rtl"
    title="系统设置"
    class="setting-drawer"
    :size="state.device === 'mobile' ? '75%' : '270px'"
  >
    <div class="wrapper">
      <el-divider content-position="center">
        主题风格
      </el-divider>
      <el-row :gutter="5">
        <el-col
          v-for="(item, index) of styleExampleList"
          :key="index"
          :span="12"
          class="example-wrapper"
        >
          <StyleExample
            :checked="item.checked"
            :left-bg="item.leftBg"
            :right-top-bg="item.rightTopBg"
            :right-bottom-bg="item.rightBottomBg"
            @click="exampleClick(item)"
          />
        </el-col>
      </el-row>

      <el-divider content-position="center">
        布局模式
      </el-divider>
      <el-row :gutter="5">
        <el-col
          v-for="(item, index) of layoutExampleList"
          :key="index"
          :span="8"
          class="example-wrapper"
        >
          <StyleExample
            :checked="item.checked"
            :left-bg="item.leftBg"
            :right-top-bg="item.rightTopBg"
            :right-bottom-bg="item.rightBottomBg"
            :class="[item.class || '']"
            :tip-text="item.tipText"
            @click="layoutExampleClick(item)"
          />
        </el-col>
      </el-row>

      <el-divider content-position="center">
        按钮显示
      </el-divider>
      <div class="setting-item-wrapper">
        <span>暗黑模式</span>
        <el-switch
          v-model="state.actionItem.showDark"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
        />
      </div>

      <div class="setting-item-wrapper">
        <span>固定顶部导航</span>
        <el-switch
          v-model="state.isFixedNavBar"
          :disabled="state.layoutMode === 'ttb'"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
        />
      </div>

      <div class="setting-item-wrapper">
        <span>消息</span>
        <el-switch
          v-model="state.actionItem.showMessage"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
        />
      </div>
      <div class="setting-item-wrapper">
        <span>刷新</span>
        <el-switch
          v-model="state.actionItem.showRefresh"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
        />
      </div>
      <div class="setting-item-wrapper">
        <span>全屏</span>
        <el-switch
          v-model="state.actionItem.showFullScreen"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
        />
      </div>
    </div>
  </el-drawer>
</template>

<style>
.setting-drawer .el-drawer__header {
  margin-bottom: 0;
}
</style>

<style lang="scss" scoped>
$width: 60px;

.wrapper {
  .close-wrapper {
    position: absolute;
    top: 1%;
    right: 8%;
    font-size: 20px;
  }

  .colors-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;

    .color-wrapper {
      width: 20px;
      height: 20px;
      margin: 10px 8px;
      border: 1px solid #c1c1c1;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    }

    .circle::after {
      display: block;
      width: 8px;
      height: 8px;
      margin: 0 auto;
      margin-top: 25px;
      text-align: center;
      background-color: rgb(3 190 50);
      border-radius: 50%;
      content: '';
    }
  }

  .setting-item-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: var(--el-text-color-primary);
    font-size: 14px;
  }
}

.example-wrapper + .example-wrapper {
  margin-bottom: 30px;
}
</style>
