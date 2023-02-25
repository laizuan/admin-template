import { useToggle } from '@vueuse/core'
import type { FormExpose } from 'element-next'
import {
  replaceHolder,
  errorMessage,
  ruleEnglishAndNumber,
  defineFormFields,
  ruleRequired,
  ruleMaxLength,
  successMessage,
  useOpForm,
} from 'element-next'
import { ref, onMounted } from 'vue'
import type { UploadFile } from 'element-plus'
import { useRoute } from 'vue-router'
import type { SysEnterprise, SysEnterpriseSystem } from '@/api/sys/enterprise'
import { fetchCreateEnterprise, fetchUpdateEnterprise, SysEnterpriseApiUrl } from '@/api/sys/enterprise'
import { isReadonlyForm, SwitchEnabled, useTo, idIsNotNull } from '@/utils'
import type { Attachment } from '@/utils/request'
import type { UploadExpose } from '@/components/common/Upload/index.vue'

const fields = defineFormFields<SysEnterprise>([
  {
    group: {
      title: '基础信息',
      children: [
        {
          prop: 'entName',
          component: 'n-input',
          label: '企业名称',
          rules: [
            ruleRequired(),
            ruleMaxLength(120),
          ],
          props: {
            placeholder: '请填写企业名称',
          },
        },
        {
          prop: 'entCode',
          component: 'n-input',
          label: '企业代码',
          showHelper: true,
          helperMessage: '企业在系统中唯一的编码',
          rules: [
            ruleRequired(),
            ruleMaxLength(10),
            ruleEnglishAndNumber(),
          ],
          props: {
            ifDisabled: (form) => {
              return idIsNotNull(form.id)
            },
            format: 'uppercase',
            placeholder: '请填写企业代码',
          },
        },
        {
          prop: 'addr',
          component: 'n-input',
          label: '公司地址',
          rules: [
            ruleMaxLength(150),
          ],
          props: {
            placeholder: '请填写公司地址',
          },
        },

        {
          prop: 'enabled',
          component: 'el-switch',
          label: '启禁用',
          showHelper: true,
          helperMessage: '禁用后企业关联的所有账号都不能登入',
          defaultValue: 1,
          rules: [ruleRequired()],
          props: SwitchEnabled,
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
        },
      ],
    },
  },
])

export const useForm = () => {
  const [visible, toggle] = useToggle(false)
  const disabled = ref(isReadonlyForm())
  const title = ref('')
  const elRef = ref<FormExpose>()
  const sccRef = ref<UploadExpose>()
  const systemRef = ref()
  const logoRef = ref<UploadExpose>()
  const { closeBack, redirect, refresh } = useTo()

  const { form, loadForm } = useOpForm<SysEnterprise>('id', {
    getUrl: SysEnterpriseApiUrl.get,
  })

  const { params: { id } } = useRoute()

  onMounted(() => {
    if (idIsNotNull(id as string)) {
      loadForm({ urlProcess: t => replaceHolder(t, { id }) }).then(() => {
      })
    }
  })

  const _create = (files: Attachment[], cb: () => void) => {
    fetchCreateEnterprise(form.value, files).then((entId) => {
      if (entId) {
        successMessage('操作成功')
        cb()
        redirect({ id: entId })
      }
      else {
        errorMessage('操作失败请重试')
      }
    })
  }

  const _update = (files: Attachment[], cb: () => void) => {
    fetchUpdateEnterprise(form.value, files).then((res) => {
      if (res) {
        successMessage('操作成功')
        cb()
        refresh()
      }
      else {
        errorMessage('操作失败请重试')
      }
    })
  }

  const doSubmit = () => {
    elRef.value.validate().then(() => {
      const systemList: Array<SysEnterpriseSystem> = systemRef.value.getSystemList()
      form.value.systemList = systemList.map<SysEnterpriseSystem>((m) => {
        const item: SysEnterpriseSystem = {
          systemId: m.id,
          auditStatus: m.auditStatus,
        } as unknown as SysEnterpriseSystem
        return item
      })

      const sccFiles: UploadFile[] = sccRef.value.getFiles()
      const logoFiles: UploadFile[] = logoRef.value.getFiles()

      const files: Attachment[] = []
      if (sccFiles && sccFiles.length > 0) {
        files.push({
          fieldName: 'sccFile',
          file: sccFiles[0].raw,
        })
      }
      if (logoFiles && logoFiles.length > 0) {
        files.push({
          fieldName: 'logoFile',
          file: logoFiles[0].raw,
        })
      }

      const _clearFiles = () => {
        if (sccFiles.length > 0)
          sccRef.value.clearFiles()
        if (logoFiles.length > 0)
          logoRef.value.clearFiles()
      }

      if (form.value.id)
        _update(files, _clearFiles)
      else
        _create(files, _clearFiles)
    }).catch(() => {
      errorMessage('请修正错误信息')
    })
  }
  return {
    systemRef,
    sccRef,
    logoRef,
    elRef,
    visible,
    title,
    closeBack,
    disabled,
    toggle,
    fields,
    form,
    doSubmit,
  }
}
