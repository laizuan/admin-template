import { useToggle } from '@vueuse/core'
import {
  defineFormFields,
  replaceHolder,
  ruleMaxLength,
  ruleRequired,
  successMessage,
  useOpForm,
} from 'element-next'
import { ref } from 'vue'
import type { SysDict } from '@/api/sys/dict'
import { SysDictApiUrl } from '@/api/sys/dict'
import { ActionType, SwitchEnabled } from '@/utils'

const fields = defineFormFields<SysDict>([
  {
    prop: 'dictType',
    component: 'n-input',
    label: '字典类型',
    rules: [ruleRequired(), ruleMaxLength(32)],
    props: {
      placeholder: '请填写字典类型',
      readonly: true,
    },
  },
  {
    prop: 'description',
    component: 'n-input',
    label: '显示名称',
    rules: [ruleRequired(), ruleMaxLength(50)],
    props: {
      placeholder: '请填写显示名称',
    },
  },
  {
    prop: 'tagType',
    component: 'n-input',
    label: '前端状态类型',
    rules: [ruleMaxLength(20)],
    props: {
      placeholder: '请填写前端状态类型',
    },
  },
  {
    prop: 'value',
    component: 'n-input',
    label: '字典值',
    rules: [ruleRequired(), ruleMaxLength(100)],
    props: {
      placeholder: '请填写字典值',
    },
  },
  {
    prop: 'value2',
    component: 'n-input',
    label: '字典值2',
    rules: [ruleMaxLength(100)],
    props: {
      placeholder: '请填写字典值2',
    },
  },
  {
    prop: 'value3',
    component: 'n-input',
    label: '字典值3',
    rules: [ruleMaxLength(100)],
    props: {
      placeholder: '请填写字典值3',
    },
  },
  {
    prop: 'value4',
    component: 'n-input',
    label: '字典值4',
    rules: [ruleMaxLength(100)],
    props: {
      placeholder: '请填写字典值4',
    },
  },
  {
    prop: 'value5',
    component: 'n-input',
    label: '字典值5',
    rules: [ruleMaxLength(100)],
    props: {
      placeholder: '请填写字典值5',
    },
  },
  {
    prop: 'sortNo',
    component: 'n-input',
    label: '排序',
    rules: [ruleRequired()],
    props: {
      placeholder: '请填写排序',
    },
  },
  {
    prop: 'enabled',
    component: 'el-switch',
    label: '启禁用',
    rules: [ruleRequired()],
    defaultValue: 1,
    props: SwitchEnabled,
  },
  {
    prop: 'remark',
    component: 'n-input',
    label: '备注',
    rules: [ruleMaxLength(100)],
    props: {
      placeholder: '请填写备注',
      type: 'textarea',
    },
  },
])

export const useForm = (emit) => {
  const [visible, toggle] = useToggle(false)
  const disabled = ref(false)
  const title = ref('')
  const refresh = () => {
    toggle()
    emit('refresh')
    successMessage('操作成功')
  }

  const { submit, form, loadForm } = useOpForm<SysDict>('id', {
    addUrl: SysDictApiUrl.add,
    getUrl: SysDictApiUrl.get,
    updateUrl: SysDictApiUrl.update,
    addAfterCb: (res, done) => {
      if (res)
        refresh()

      done()
    },
    updateAfterCb: (res, done) => {
      if (res)
        refresh()

      done()
    },
  })

  const openWindow = (type: ActionType, id?: string) => {
    toggle()
    if (type === ActionType.detail) {
      disabled.value = true
      title.value = '字典维护详情'
    }
    else {
      disabled.value = false
      title.value = type === ActionType.edit ? '编辑字典维护' : '新增字典维护'
    }

    if (id)
      loadForm({ urlProcess: url => replaceHolder(url, { id }) }).then(() => {}).catch(() => {})
  }
  return {
    visible,
    title,
    openWindow,
    disabled,
    refresh,
    toggle,
    fields,
    submit,
    form,
    loadForm,
  }
}
