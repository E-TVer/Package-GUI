import Vue from 'vue'
import { Button, Input, Loading, Message, MessageBox } from 'element-ui'

Vue.use(Button)
Vue.use(Loading)
Vue.use(Input)

Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
