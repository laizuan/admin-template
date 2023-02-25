import { useToggle } from '@vueuse/core'
import {
  defineFormFields,
  ruleEmail,
  ruleEnglishAndNumber,
  ruleInteger,
  ruleMaxLength,
  rulePhone,
  ruleRequired,
  successMessage,
  useOpForm,
} from 'element-next'
import { ref } from 'vue'
import type { SysDept } from './intef'
import { SysDeptApiUrl } from '@/api/sys/dept'
import { ActionType } from '@/utils'
const fields = defineFormFields<SysDept>([
  {
    prop: 'parentId',
    component: 'n-tree-select',
    label: '上级部门',
    props: {
      'check-strictly': true,
      'remoteConfig': {
        url: SysDeptApiUrl.treeList,
      },
    },
  },
  {
    prop: 'deptCode',
    component: 'n-input',

    label: '部门代码',
    rules: [ruleRequired(), ruleMaxLength(10), ruleEnglishAndNumber()],
    props: {
      disabled: true,
      ifDisabled: (form) => {
        return form.deptId != null
      },
      placeholder: '请填写部门代码',
      upperCase: true,
    },
  },
  {
    prop: 'deptName',
    component: 'n-input',
    label: '部门名称',
    rules: [ruleRequired(), ruleMaxLength(20)],
    props: {
      placeholder: '请填写部门名称',
    },
  },
  {
    prop: 'enabled',
    component: 'el-switch',
    label: '启禁用',
    rules: [ruleRequired()],
    props: {
      activeText: '启用',
      inactiveText: '禁用',
      activeValue: 1,
      inactiveValue: 0,
      inlinePrompt: true,
    },
  },
  {
    prop: 'sortNo',
    component: 'n-input',
    label: '排序',
    rules: [ruleRequired(), ruleInteger()],
    props: {
      placeholder: '请填写排序',
    },
  },
  {
    prop: 'leader',
    component: 'n-input',
    label: '负责人',
    rules: [ruleMaxLength(10)],
    props: {
      placeholder: '请填写负责人',
    },
  },
  {
    prop: 'phone',
    component: 'n-input',
    label: '联系电话',
    rules: [ruleMaxLength(15), rulePhone()],
    props: {
      placeholder: '请填写负责人联系电话',
    },
  },
  {
    prop: 'email',
    component: 'n-input',
    label: '邮箱',
    rules: [ruleMaxLength(70), ruleEmail()],
    props: {
      placeholder: '请填写负责人邮箱',
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

  const { submit, form, loadForm } = useOpForm<SysDept>('deptId', {
    addUrl: SysDeptApiUrl.add,
    getUrl: SysDeptApiUrl.get,
    updateUrl: SysDeptApiUrl.update,
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
      title.value = '部门管理详情'
    }
    else {
      disabled.value = false
      title.value = type === ActionType.edit ? '编辑部门管理' : '新增部门管理'
    }

    if (id)
      loadForm({ params: { deptId: id } }).then(() => {})
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
