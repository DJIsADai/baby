import { createApp } from "vue"
import ToastComponent from "./Toast.vue" // 路径根据实际情况调整

const mountElement = document.createElement("div")
mountElement.className = "toast_root"

document.body.appendChild(mountElement)

const props = {
	message: "Please upload pictures first!",
	id: Date.now(),
	options: { type: "success", duration: 3000 },
}

const toastApp = createApp(ToastComponent, props)
const instance = toastApp.mount(mountElement)

const Toast = {
	time: 0,
	show(message, options = {}) {
        console.log(message);
        toastApp.message=message;
		const closeEvent = new CustomEvent("toast-show", {
			detail: {
				message: message,
				id: this.id,
				...options,
			},
		})
		document.dispatchEvent(closeEvent)
	},
}

export default Toast
