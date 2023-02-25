<!-- 企业管理详情 -->
<script lang="ts" setup name="SysEnterpriseEdit">
import { defineAsyncComponent, provide } from 'vue'
import { useForm } from './conf/form'
const UserListPage = defineAsyncComponent(() => import('./components/list-user.vue'))
const SystemList = defineAsyncComponent(() => import('./components/list-system.vue'))
const UploadFile = defineAsyncComponent(() => import('@/components/common/Upload/index.vue'))

const { fields, disabled, form, elRef, closeBack, logoRef, sccRef, systemRef, doSubmit } = useForm()

provide('disabled', disabled)
provide('form', form)
</script>

<template>
  <n-wrap>
    <el-row :gutter="40">
      <el-col :sm="12" :xs="24">
        <n-form
          ref="elRef"
          v-model="form"
          :fields="fields"
          label-width="100px"
          :disabled="disabled"
          :action="{ submit: false, reset: false }"
        />
      </el-col>
      <el-col :sm="12" :xs="24">
        <n-card title="证件信息">
          <el-row>
            <el-col :sm="12" :xs="12">
              <UploadFile ref="sccRef" btn-text="请上传营业执照" reset-btn-text="重新上传营业执照" :file-max-size="200" :disabled="disabled" :url="form.scc" accept="image/*,.pdf" tip="企业营业执照，只能上传图片或者pdf文件<br>并且不能超过 200kb" />
            </el-col>
            <el-col :sm="12" :xs="12">
              <UploadFile ref="logoRef" btn-text="请上传企业LOGO" reset-btn-text="重新上传企业LOGO" :file-max-size="100" :disabled="disabled" :url="form.logoPath" accept="image/*" tip="企业LOGO，只能上传图片，并且不能超过 100kb" />
            </el-col>
          </el-row>
        </n-card>
      </el-col>
    </el-row>
    <n-card v-if="form.id" title="系统数据">
      <SystemList ref="systemRef" />
    </n-card>
    <n-card v-if="form.id" title="用户信息">
      <UserListPage />
    </n-card>
    <template #footer>
      <el-button @click="closeBack">
        返回
      </el-button>
      <el-button type="primary" :disabled="disabled" @click="doSubmit">
        保存
      </el-button>
    </template>
  </n-wrap>
</template>

<style lang="scss"></style>
