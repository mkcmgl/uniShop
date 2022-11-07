import {observable,action} from 'mobx-miniprogram'

export const store=observable({
 A:1,
 B:2,
 get sum(){
   return this.A+this.B
 },
 updateA:action(function(val){
   this.A+=val
 }),
 updateB:action(function(val){
  this.B+=val
}),
})
