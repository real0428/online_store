import { ElMessage, ElMessageBox } from "element-plus"

export function useConfirmMessageBox(name: string, comfirmCallback: Function, successCallback: Function) {
  const showConfirmationDialog = () => {
    ElMessageBox({
      title: `是否要刪除「${name}」?`,
      showCancelButton: true,
      customClass: 'custom-message-box',
      confirmButtonClass: 'el-button--danger',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          comfirmCallback(); // 調用傳入的刪除函數
          done();
        } else {
          done();
        }
      },
    }).then((action) => {
      ElMessage({
        type: 'success',
        message: '刪除成功',
      });
      if (successCallback) {
        successCallback(); // 調用傳入的成功回調函數
      }
    })
  };

  // 返回 Composable 的方法
  return {
    showConfirmationDialog,
  };
}

