import type { SelectTree } from 'element-next'
import { get, post } from 'element-next'
import type { SysDept } from '@/views/sys/dept/config/intef'

export enum SysDeptApiUrl {
  list = '/sysDept/list',
  get = '/sysDept/get',
  update = '/sysDept/update',
  delete = '/sysDept/delete',
  treeList = '/sysDept/selectTreeDept',
  add = '/sysDept/add',
}

// 获取部门树
export const fetchGetDeptTreeList = () => {
  return get<Array<SelectTree<SysDept>>>(SysDeptApiUrl.treeList)
}

// 获取列表部门树
export const fetchTableDeptTreeList = (data) => {
  return post<Array<SelectTree<SysDept>>>(SysDeptApiUrl.list, { data })
}

// 获取部门树
export const fetchDeleteDept = (id) => {
  return get<boolean>(SysDeptApiUrl.delete, { params: { deptId: id } })
}
