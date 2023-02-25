import { useToggle } from '@vueuse/core'
import type { FormExpose } from 'element-next'
import {
  defineFormFields,
  replaceHolder,
  ruleMaxLength,
  ruleNumber,
  ruleRequired,
  successMessage,
  useOpForm,
} from 'element-next'
import { ref, watch } from 'vue'
import type { FormItemRule } from 'element-plus'
import type { SysMenu } from '@/api/sys/menu'
import { SysMenuApiUrl } from '@/api/sys/menu'
import { ActionType, SwitchEnabled } from '@/utils'

export const useForm = (emit, props) => {
  const fields = defineFormFields<SysMenu>([
    {
      prop: 'menuName',
      component: 'n-input',
      label: '菜单名称',
      rules: [ruleRequired(), ruleMaxLength(50)],
      props: {
        placeholder: '请填写菜单名称',
      },
    },
    {
      prop: 'parentId',
      slot: true,
      label: '父级菜单',
    },
    {
      prop: 'menuType',
      component: 'n-radio',
      label: '菜单类型',
      rules: [ruleRequired()],
      defaultValue: 2,
      props: {
        data: [
          { desc: '目录', value: 1 },
          { desc: '菜单', value: 2 },
          { desc: '按钮', value: 3 },
        ],
      },
    },
    {
      prop: 'i18n',
      component: 'n-input',
      show: true,
      label: '国际化KEY',
      rules: [ruleMaxLength(100)],
      ifShow: (form) => {
        return form.menuType === 1 || form.menuType === 2
      },
      props: {
        placeholder: '请填写国际化菜单key',
      },
    },
    {
      prop: 'icon',
      component: 'n-input',
      show: true,
      label: '图标',
      rules: [ruleMaxLength(100)],
      ifShow: (form) => {
        return form.menuType === 1 || form.menuType === 2
      },
      props: {
        placeholder: '请填写图标',
      },
    },

    {
      show: true,
      prop: 'permission',
      component: 'n-input',
      ifShow: (form) => {
        return form.menuType === 3
      },
      ifRules: (form) => {
        const r: Array<FormItemRule> = [ruleMaxLength(50)]
        if (form.menuType === 3)
          r.push(ruleRequired())

        return r
      },
      label: '权限',
      props: {
        placeholder: '请填写权限',
      },
    },
    {
      show: true,
      prop: 'noCache',
      component: 'el-switch',
      defaultValue: true,
      ifRules: (form) => {
        const r = []
        if (form.menuType === 2)
          r.push(ruleRequired())
        return r
      },
      label: '缓存路由',
      ifShow: (form) => {
        return form.menuType === 2
      },
      props: {
        activeValue: false,
        inactiveValue: true,
        inlinePrompt: true,
        inactiveText: '否',
        activeText: '是',
      },
      md: 6,
      sm: 8,
    },
    {
      prop: 'enabled',
      component: 'el-switch',
      label: '启禁用',
      defaultValue: 1,
      rules: [ruleRequired()],
      props: SwitchEnabled,
      md: 6,
      sm: 8,
    },
    {
      prop: 'display',
      component: 'el-switch',
      label: '是否显示',
      defaultValue: true,
      rules: [ruleRequired()],
      props: {
        activeValue: true,
        activeText: '显示',
        inactiveValue: false,
        inactiveText: '隐藏',
        inlinePrompt: true,
      },
      md: 6,
      sm: 8,
    },
    {
      show: true,
      prop: 'componentPath',
      component: 'n-input',
      label: '组件路径',
      ifRules: (form) => {
        const r: Array<FormItemRule> = [ruleMaxLength(30)]
        if (form.menuType === 2)
          r.push(ruleRequired())
        return r
      },
      ifShow: (form) => {
        return form.menuType === 2
      },
      props: {
        placeholder: '请填写组件路径',
      },
    },
    {
      show: true,
      ifShow: (form) => {
        return form.menuType === 2
      },
      prop: 'url',
      component: 'n-input',
      label: '路由地址',
      props: {
        placeholder: '请填写路由地址（地址栏路径）',
      },
    },
    {
      show: true,
      prop: 'routerName',
      component: 'n-input',
      label: '路由名称',
      ifRules: (form) => {
        const r: Array<FormItemRule> = [ruleMaxLength(30)]
        if (form.menuType === 2)
          r.push(ruleRequired())
        return r
      },
      ifShow: (form) => {
        return form.menuType === 2
      },
      props: {
        placeholder: '请填写路由名称',
      },
    },
    {
      show: true,
      ifShow: (form) => {
        return form.menuType === 2
      },
      prop: 'activeMenu',
      component: 'n-input',
      label: '激活菜单名',
      props: {
        placeholder: '当进入该路由，设置菜单高亮',
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
      prop: 'remark',
      component: 'n-input',
      label: '备注',
      rules: [ruleMaxLength(100)],
      props: {
        type: 'textarea',
        placeholder: '请填写备注',
      },
    },
  ])
  const elRef = ref<FormExpose>()
  const [visible, toggle] = useToggle(false)
  const disabled = ref(false)
  const title = ref('')
  const refresh = () => {
    toggle()
    emit('refresh')
    successMessage('操作成功')
  }

  const { submit, form, loadForm } = useOpForm<SysMenu>('menuId', {
    addUrl: SysMenuApiUrl.add,
    getUrl: SysMenuApiUrl.get,
    updateUrl: SysMenuApiUrl.update,
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

  watch(() => props.systemId, (newData) => {
    form.value.systemId = newData
  })

  const openWindow = (type: ActionType, id?: string) => {
    toggle()
    if (type === ActionType.detail) {
      disabled.value = true
      title.value = '菜单管理详情'
    }
    else {
      disabled.value = false
      title.value = type === ActionType.edit ? '编辑菜单管理' : '新增菜单管理'
    }

    if (id) {
      loadForm({ urlProcess: t => replaceHolder(t, { id }) }).then(() => {})
    }
    else {
      form.value.systemId = props.systemId
      form.value.parentId = null
    }
  }
  return {
    elRef,
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
