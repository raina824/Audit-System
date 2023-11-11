import { ElMessage } from "element-plus";
/**
 * 
 * @param {*} message 
 * @param {success_warning_message_error} type 
 */
const alertMessage = (message, type) => {
  ElMessage({
    message,
    type,
  });
};

export {
    alertMessage
}