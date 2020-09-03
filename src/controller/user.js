/**

 @Name：用户管理 
 @Author：Yu.Guo
    
 */

layui.define(['table', 'form'], function(exports) {
	var $ = layui.$,
		admin = layui.admin,
		view = layui.view,
		table = layui.table,
		form = layui.form;

	//用户管理
	table.render({
		elem: '#LAY-user-manage',
		url: layui.setter.ajaxUrl + '/api/admin/user/list',
		cols: [
			[{
				field: 'id',
				title: 'ID',
				align:'center'
			}, {
				field: 'nickname',
				title: '用户名',
				align:'center'
			}, {
				field: 'avatar',
				title: '头像',
				width: 100,
				templet: '#imgTpl',
				align:'center'
			}, {
				field: 'phone',
				title: '手机号',
				align:'center'
			}, {
				field: 'sex',
				title: '性别',
				templet: '#sex',
				align:'center'
			}, {
				field: 'createTime',
				title: '创建时间',
				align:'center'
			}, {
				field: 'vipGrade',
				title: '会员等级',
				templet: '#vipGrade',
				align:'center'
			}, {
				field: 'vipBalance',
				title: '会员余额',
				align:'center'
			}, {
				field: 'loginTime',
				title: '最后登录时间',
				align:'center'
			}, {
				title: '操作',
				width: 150,
				align: 'center',
				fixed: 'right',
				toolbar: '#table-useradmin-webuser'
			}]
		],
		page: true,
		text: {
			none: '暂无数据',
			error: '对不起，加载出现异常！'
		},
		done: function(data) {
			if(data.code == 403) {
				layer.closeAll();
				admin.exit();
				setTimeout(function() {
					layer.alert('此账号已在别处登录,请重新登录！', {
						icon: 5
					});
				}, 500);
			}
		}
	});


	exports('user', {})
});