/**
 * 部门管理
 * @author laizuan
 * @since 2022/04/16
 */
export interface SysDept {
  /**
   *   部门id
   */
  deptId: string
  /**
   *   父部门id
   */
  parentId: string
  /**
   *   部门名称
   */
  deptName: string
  /**
   *   部门代码
   */
  deptCode: string
  /**
   *   显示顺序
   */
  sortNo: number
  /**
   *   负责人
   */
  leader: string
  /**
   *   联系电话
   */
  phone: string
  /**
   *   邮箱
   */
  email: string
  /**
   *   部门状态（1正常 0停用）
   */
  enabledEnum: BaseEnum
  enabled: number
  /**
   *   创建时间
   */
  createTime: number
  /**
   *   更新时间
   */
  updateTime: number
  /**
   *   创建人主键
   */
  createBy: number
  createByName?: string
  /**
   *   修改人主键
   */
  updateBy: number
  updateByName?: string
  /**
   *   备注
   */
  remark: string
}
