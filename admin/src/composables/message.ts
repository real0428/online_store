import { ElMessage } from 'element-plus'

// 定義message的type型別
type MessageType = 'success' | 'warning' | 'error' | 'info'

interface MessageOptions {
  dangerouslyUseHTMLString?: boolean
  type?: MessageType
  showClose?: boolean
  center?: boolean
  duration?: number
  customClass?: string
  message: string
  [key: string]: any
}

// 定義useMessage的接口，包含了四種方法
interface UseMessage {
  (options: MessageOptions | string): any
  success: (message: string, options?: Partial<MessageOptions>) => any
  warning: (message: string, options?: Partial<MessageOptions>) => any
  error: (message: string, options?: Partial<MessageOptions>) => any
  info: (message: string, options?: Partial<MessageOptions>) => any
}

const baseUseMessage = (options: MessageOptions | string) => {
  // 如果options為字串，options就是{message:options}, 否則為收到的物件參數
  options = typeof options === 'string' ? { message: options } : options
  const {
    dangerouslyUseHTMLString = true,
    type = 'info',
    center = true,
    showClose = true,
    duration = 4000, // 設為0則不會自動關閉。
    customClass = 'message-class',
    message,
    ...params
  } = options

  return ElMessage({
    dangerouslyUseHTMLString,
    type,
    center,
    showClose,
    duration,
    message,
    customClass,
    ...params
  })
}

const useMessage = baseUseMessage as UseMessage
const types = ['success', 'warning', 'error', 'info'] as MessageType[]

const messageObject = {} as {
  [K in MessageType]: (message: string, options?: Partial<MessageOptions>) => void
}

types.forEach((type: MessageType) => {
  messageObject[type] = (message: string, options: Partial<MessageOptions> = {}) => {
    return useMessage({ type, message, ...options })
  }
})

Object.assign(useMessage, messageObject)

export { useMessage }

// 封裝message
