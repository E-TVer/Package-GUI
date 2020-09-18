import Vue from 'vue'
import { Button, Message, Table, TableColumn } from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)

Vue.prototype.$message = Message
