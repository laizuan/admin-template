import { get, post } from 'element-next'

export enum SysAttachmentApiUrl {
  delete = '/deleteAttachment',
  createChunk = '/sysAttachment/createChunkUploadId',
  updateChunkState = '/sysAttachment/updateChunkState',
  mergeChunk = '/sysAttachment/mergeChunk',
  list = '/sysAttachment/list',
}

export interface SysAttachment {
  /**
   * 主键
   */
  id?: number

  /**
   * 文件名
   */
  fileName?: string

  /**
   * 文件大小
   */
  fileSize?: number

  /**
   * 分片上传id
   */
  uploadId?: string
  /**
   * 关联数据主键
   */
  linkedId?: string

  /**
   * 上传状态
   */
  state?: number

  /**
   * 桶名
   */

  bucketKey?: string

  /**
   * 文件路径
   */
  path?: string
  /**
   * 分片数量
   */
  chunkSize?: number

  fileMd5?: string

  /**
   * 每个分片的大小
   */
  singleChunkSize: number

  /**
   * 分片信息
   */
  sysAttachmentChunkList?: Array<SysAttachmentChunk>
}

export interface SysAttachmentChunk {
  /**
   * 主键
   */
  id: string

  /**
   * 分片上传状态，1上传完成，2上传失败，0未上传
   * <per>
   *     {@link org.seedltd.zkt.enums.AttachmentChunkStatus}
   * </per>
   */
  chunkState: number
  fileSize: number

  /**
   * 块上传地址
   */
  uploadUrl: string

  /**
   * 上传序号
   */
  seqNo: number

  /**
   * 文件名
   */
  chunkName: string

  /**
   * 附件文件主键
   */
  attachmentId: number

  progress: number
}

export interface UploadAttachmentVO {
  id: string
  previewPath: string
}

// 删除文件
export const fetchDeleteAttachment = (id: string, linkId: string) => {
  return get<boolean>(`${SysAttachmentApiUrl.delete}/${id}/${linkId}`)
}

// 创建分片上传
export const fetchCreateChunk = (data: SysAttachment) => {
  return post<SysAttachment>(SysAttachmentApiUrl.createChunk, { data })
}

// 更新分片上传状态为上传成功
export const fetchUpdateChunkStateSuccess = (id: string) => {
  return get<boolean>(SysAttachmentApiUrl.updateChunkState, { params: { id } })
}

// 更新分片上传状态为上传成功
export const fetchMergeChunk = (id: number) => {
  return get<boolean>(SysAttachmentApiUrl.mergeChunk, { params: { id } })
}

// 获取关联主键下附件可以预览地址集合
export const fetchPreviewUrlByLinkedId = (linkedId: number | string) => {
  return get<Array<UploadAttachmentVO>>(`${SysAttachmentApiUrl.list}/${linkedId}`)
}
