// components/numbers/numbers.js
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
Component({

  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      A: 'A',
      B: 'B',
      sum: 'sum'
    },
    actions: {
      updateA: 'updateA',
      updateB: 'updateB',
    },
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnHandler(e) {
      this.updateA(e.target.dataset.val)
    },
  }
})