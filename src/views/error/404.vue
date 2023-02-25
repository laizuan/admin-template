<script lang="ts" setup name="ErrorNotAuthPage"></script>

<template>
  <div class="flex justify-center items-center">
    <img src="@/assets/404.svg" class="h-screen-sm">

    <div class="ml-12">
      <p class="font-medium text-4xl mb-4">
        404
      </p>
      <p class="mb-4 text-gray-500">
        抱歉，你访问的页面不存在
      </p>
      <el-button type="primary" @click="$router.push('/')">
        返回首页
      </el-button>
    </div>
  </div>
</template>
