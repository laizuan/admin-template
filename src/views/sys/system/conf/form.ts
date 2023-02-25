import { useToggle } from '@vueuse/core'
import {
  defineFormFields,
  replaceHolder,
  ruleEnglish,
  ruleMaxLength,
  ruleNumber,
  ruleRequired,
  successMessage,
  useOpForm,
} from 'element-next'
import { ref, watch } from 'vue'
import type { SysSystem } from '@/api/sys/system'
import { SysSystemApiUrl } from '@/api/sys/system'
import { ActionType, SwitchYesOrNo, isNotNull } from '@/utils'
import type { SysRole } from '@/api/sys/role'
import { fetchValidRoleList } from '@/api/sys/role'

const fields = defineFormFields<SysSystem>([
  {
    prop: 'code',
    component: 'n-input',
    label: '系统代码',
    showHelper: true,
    helperMessage: '系统代码必须和项目名称保持一致，即spirng.application.name配置的名称',
    rules: [
      ruleRequired(),
      ruleMaxLength(10),
      ruleEnglish(),
    ],

    props: {
      format: 'lowercase',
      placeholder: '请填写系统代码',
      ifDisabled: (formVal) => {
        return isNotNull(formVal.id)
      },
    },
  },
  {
    prop: 'name',
    component: 'n-input',
    label: '系统名称',
    rules: [
      ruleRequired(),
      ruleMaxLength(50),
    ],
    props: {
      placeholder: '请填写系统代码',
    },
  },
  {
    prop: 'link',
    component: 'n-input',
    label: '系统链接地址',
    rules: [
      ruleMaxLength(150),
    ],
    props: {
      placeholder: '请填写系统链接地址',
    },
  },

  {
    prop: 'sortNo',
    component: 'n-input',
    label: '排序',
    rules: [
      ruleRequired(),
      ruleNumber(),
    ],
    props: {
      placeholder: '请填写排序',
    },
  },
  {
    prop: 'intro',
    component: 'n-input',
    label: '系统简介',
    rules: [
      ruleMaxLength(100),
    ],
    props: {
      type: 'textarea',
      placeholder: '请填写系统简介',
    },
  },
  {
    prop: 'openRegistry',
    component: 'el-switch',
    showHelper: true,
    helperMessage: '如果开启注册用户可以申请开通该系统',
    labelWidth: '150px',
    label: '是否开放申请',
    rules: [
      ruleRequired(),
    ],
    props: SwitchYesOrNo,
    md: 8,
  },
  {
    prop: 'indexDisplay',
    component: 'el-switch',
    showHelper: true,
    helperMessage: '开启后在系统首页可以显示快速进入链接',
    label: '首页是否显示',
    labelWidth: '150px',
    rules: [
      ruleRequired(),
    ],
    props: SwitchYesOrNo,
    md: 8,
  },
  {
    prop: 'displayRegistry',
    labelWidth: '150px',
    showHelper: true,
    helperMessage: '开启后在用户端申请系统栏可以看到系统，但是不一定可以申请',
    component: 'el-switch',
    label: '是否显示申请',
    rules: [
      ruleRequired(),
    ],
    props: SwitchYesOrNo,
    md: 8,
  },
  {
    prop: 'remark',
    component: 'n-input',
    label: '备注',
    rules: [
      ruleMaxLength(100),
    ],
    props: {
      placeholder: '请填写备注',
      type: 'textarea',
    },
    md: 24,
  },
  {
    prop: 'defaultRoleId',
    slot: true,
    showHelper: true,
    helperMessage: '企业注册审核通过后会将注册企业的账号赋予该角色权限',
    label: '默认角色权限',
    ifShow: (formVal) => {
      return isNotNull(formVal.id)
    },
    md: 24,
  },
])

export const useForm = (emit) => {
  const [visible, toggle] = useToggle(false)
  const disabled = ref(false)
  const title = ref('')
  const roleList = ref<Array<SysRole>>([] as Array<SysRole>)

  const refresh = () => {
    toggle()
    emit('refresh')
    successMessage('操作成功')
  }

  const { submit, form, loadForm } = useOpForm<SysSystem>('id', {
    addUrl: SysSystemApiUrl.add,
    getUrl: SysSystemApiUrl.get,
    updateUrl: SysSystemApiUrl.update,
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
      title.value = '系统详情'
    }
    else {
      disabled.value = false
      title.value = type === ActionType.edit ? '编辑系统' : '新增系统'
    }

    if (id) {
      loadForm({
        urlProcess: url => replaceHolder(url, { id }),
      }).then(() => {}).catch(() => {})
    }
  }

  watch(() => form.value.id, (id, oldId) => {
    if (id !== oldId)
      roleList.value.length = 0

    if (id) {
      fetchValidRoleList(id).then((res) => {
        roleList.value = res
      })
    }
  })

  return {
    visible,
    title,
    roleList,
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
