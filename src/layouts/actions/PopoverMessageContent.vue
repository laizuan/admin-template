<script lang="ts" setup name="PopoverMessageContent">
import { shallowReactive } from 'vue'
import { Message } from '@element-plus/icons-vue'

const tempData = shallowReactive([])
function onClickMore() {

}
</script>

<template>
  <div v-if="tempData.length > 0">
    <div v-for="(item, index) of tempData" :key="index" class="message-item flex">
      <div class="icon">
        <el-icon>
          <Message />
        </el-icon>
      </div>
      <div class="flex flex-direction content">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="sub-title">
          {{ item.subTitle }}
        </div>
      </div>
    </div>
    <div class="more flex justify-around align-center">
      <span @click="onClickMore">查看更多</span>
      <span>清空消息</span>
    </div>
  </div>
  <div v-else class="text-center p-3 text-cool-gray-400">
    暂无消息
  </div>
</template>

<style lang="scss" scoped>
.message-item {
  padding: 10px 5px;

  .icon {
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: white;
    background-color: rgb(192 47 47);
    border-radius: 50%;
  }

  .content {
    margin-left: 10px;

    .title {
      font-weight: bold;
      font-size: 14px;
    }

    .sub-title {
      margin-top: 5px;
      font-size: 12px;
    }
  }

  &:hover {
    background-color: #f7f7f7;
  }
}

.more {
  padding-top: 10px;
  border-top: 1px solid #f7f7f7;
  cursor: pointer;
}

.message-item + .message-item {
  border-top: 1px solid #f7f7f7;
}
</style>
