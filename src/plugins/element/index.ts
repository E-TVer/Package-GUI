import Vue from 'vue'
import { Button, Loading, Message, Table, TableColumn } from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Loading)

Vue.prototype.$message = Message
