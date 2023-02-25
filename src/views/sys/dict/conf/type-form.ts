import { useToggle } from '@vueuse/core'
import {
  defineFormFields,
  replaceHolder,
  ruleMaxLength,
  ruleNumber,
  ruleRequired,
  successMessage,
  useOpForm,
} from 'element-next'
import { ref } from 'vue'
import type { SysDictType } from '@/api/sys/dict'
import { SysDictTypeApiUrl } from '@/api/sys/dict'
import { ActionType } from '@/utils'

const fields = defineFormFields<SysDictType>([
  {
    prop: 'dictType',
    component: 'n-input',
    label: '字典类型代码',
    rules: [ruleRequired(), ruleMaxLength(50)],
    props: {
      placeholder: '请填写字典类型代码',
      trimType: 'all',
    },
  },
  {
    prop: 'dictDesc',
    component: 'n-input',
    label: '字典类型描述',
    rules: [ruleRequired(), ruleMaxLength(100)],
    props: {
      placeholder: '请填写字典类型描述',
    },
  },
  {
    prop: 'sortNo',
    component: 'n-input',
    label: '排序',
    rules: [ruleRequired(), ruleNumber()],
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
    props: {
      inlinePrompt: true,
      activeText: '启用',
      inactiveText: '禁用',
      activeValue: 1,
      inactiveValue: 0,
    },
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

  const { submit, form, loadForm } = useOpForm<SysDictType>('id', {
    addUrl: SysDictTypeApiUrl.add,
    getUrl: SysDictTypeApiUrl.get,
    updateUrl: SysDictTypeApiUrl.update,
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

  const openWindow = (type: ActionType, dictType?: string) => {
    toggle()
    if (type === ActionType.detail) {
      disabled.value = true
      title.value = '字典类型维护详情'
    }
    else {
      disabled.value = false
      title.value = type === ActionType.edit ? '编辑字典类型维护' : '新增字典类型维护'
    }

    if (dictType) {
      loadForm({
        urlProcess: url => replaceHolder(url, { dictType }),
      }).then(() => {
        form.value.id = '1'
      }).catch(() => {})
    }
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
