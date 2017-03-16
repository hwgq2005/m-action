/**
 * 
 * @authors H君
 * @date    2017-03-06 13:38:52
 * @version 0.0.1
 */
! function(window) {

	'use strict';

	var modalBtnOne = document.querySelector('#modal-one'),
		modalBtnTwo = document.querySelector('#modal-two');
		
	modalBtnOne.onclick = function() {

		Action({
			id: 'modal',
			summary: '这是一段短文',
			actions:[{
				name:'回复',
				callback:function(){

				}
			},{
				name:'转发',
				callback:function(){

				}
			}],
			complete: function() {
				// do something ...				
			},
			cancel: function() {

			}
		})

	}

	modalBtnTwo.onclick = function() {

		Action({
			id: 'modal1',
			actions:[{
				name:'确定',
				callback:function(){

				}
			},{
				name:'返回上一步',
				callback:function(){
					
				}
			}],
			cancelButton:false,
			complete: function() {
				// do something ...				
			}
		})

	}

	prettyPrint();
	
}(this);