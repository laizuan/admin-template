import type { App } from 'vue'
import {
  ElTag,
  ElBreadcrumbItem,
  ElBreadcrumb,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElDivider,
  ElDropdown,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElBacktop,
  ElSwitch,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElAvatar,
  ElEmpty,
  ElCollapse,
  ElCollapseItem,
  ElDialog,
  ElCard,
  ElTable,
  ElTableColumn,
  ElTreeSelect,
  ElTree,
  ElSelect,
  ElAlert,
  ElLink,
  ElForm,
  ElFormItem,
  ElUpload,
  ElCheckbox,
  ElCheckTag,
  ElCheckboxGroup,
  ElCheckboxButton,
  ElImage,
  ElInputNumber,
  // 指令
  ElLoading,
  ElInfiniteScroll,
} from 'element-plus'

import {
  NCard,
  NCheckbox,
  NDatePicker,
  NDescriptions,
  NDialog,
  NDialogForm,
  NForm,
  NIcon,
  NInput,
  NLov,
  NRadio,
  NSelect,
  NTable,
  NTableForm,
  NTag,
  NTreeSelect,
  NWrap,
} from 'element-next'
import Auth from '@/components/common/Auth/index.vue'

const elementComponents = [
  ElInputNumber,
  ElCheckbox,
  ElCheckTag,
  ElImage,
  ElCheckboxGroup,
  ElCheckboxButton,
  ElUpload,
  ElLink,
  ElForm,
  ElFormItem,
  ElTag,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElDivider,
  ElDropdown,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElBacktop,
  ElSwitch,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElAvatar,
  ElEmpty,
  ElCollapse,
  ElCollapseItem,
  ElDialog,
  ElCard,
  ElTable,
  ElTableColumn,
  ElTreeSelect,
  ElTree,
  ElSelect,
  ElAlert,
]

// 指令
const plugins = [ElLoading, ElInfiniteScroll]

const elementNextComponents = [
  NIcon,
  NDialog,
  NForm,
  NTable,
  NCard,
  NTableForm,
  NInput,
  NSelect,
  NCheckbox,
  NRadio,
  NDialogForm,
  NLov,
  NTag,
  NDatePicker,
  NDescriptions,
  NTreeSelect,
  NWrap,
]

export function registerGlobalComponents(app: App) {
  elementComponents.forEach((comp) => {
    app.component(comp.name, comp)
  })
  elementNextComponents.forEach((comp) => {
    app.component(comp.name, comp)
  })

  app.component('Auth', Auth)

  // 注册指令
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
