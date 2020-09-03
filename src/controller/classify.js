/**

 @Name：分类管理
 @Author：程思琦

 */


layui.define(['table', 'form','common'], function (exports) {
    var $ = layui.$
        , admin = layui.admin
        , view = layui.view
        , table = layui.table
        , form = layui.form
        , com = layui.common
    ;

    //分类管理
    // table.render({
    //     elem: '#LAY-classify-list'
    //     ,url: './json/classify/list.json' //模拟接口
    //     ,cols: [[
    //         {type: 'checkbox', fixed: 'left'}
    //         ,{field: 'id', width: 100, title: '排序', sort: true}
    //         ,{field: 'parentClass', title: '父类', templet: '#parentClassHandle'}
    //         ,{field: 'class', title: '分类名称'}
    //         ,{field: 'level', title: '等级',width: 60}
    //         ,{field: 'author', title: '发布者'}
    //         ,{field: 'uploadTime', title: '发布时间', sort: true}
    //         ,{title: '操作', minWidth: 225, align: 'center', fixed: 'right', toolbar: '#table-content-list'}
    //     ]]
    //     ,page: true
    //     ,limit: 10
    //     ,limits: [10, 15, 20, 25, 30]
    //     ,text: '对不起，加载出现异常！'
    // });

    //监听工具条
    table.on('tool(LAY-classify-list)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此文章？', function (index) {
                com.ajax({
                    url: layui.setter.ajaxUrl + 'classOutdoors/del',
                    type: 'post',
                    data: {
                        id: data.id
                    },
                    success(res){
                        if (res.data == 1){
                            layer.msg('成功');
                            obj.del();
                            layer.close(index);
                        }
                    },
                    error(err){
                        console.log(err);
                    }
                });

            });
        } else if (obj.event === 'edit') {
            admin.popup({
                title: '编辑'
                , area: ['550px', '450px']
                , id: 'editClassify'
                , success: function (layero, index) {
                    view(this.id).render('classify/listform', data).done(function () {
                        form.render(null, 'layuiadmin-list-form');

                        //监听提交
                        form.on('submit(formSubmit)', function (data) {
                            var field = data.field; //获取提交的字段
                            field.baseId = field.baseId || 0;
                            field.pushUser = '孟梦';

                            //提交 Ajax 成功后，关闭当前弹层并重载表格
                            com.ajax({
                                url: layui.setter.ajaxUrl + 'classOutdoors/edit',
                                    type: 'post',
                                    data: field,
                                    success(res){
                                    if (res.data == 1){
                                        layer.msg('编辑成功');
                                        layui.table.reload('LAY-classify-list'); //重载表格
                                    }else {
                                        layer.msg('编辑失败，请重试');
                                    }
                                    layer.close(index); //执行关闭
                                },
                                error(err){
                                    console.log(err);
                                }
                            });
                        });
                    });
                }
            });
        } else if (obj.event === 'details') {
            location.hash = `/classify/list/id=${data.id}/className=${data.className}`;

            // 判断之前是否有数据
            let sessionData = JSON.parse(sessionStorage.getItem("classData"))
                , storageData = {id: data.id, name: data.className}
            ;

            if (sessionData) {
                sessionData.push(storageData);
                storageData = sessionData;
                // 储存数据
                sessionStorage.setItem("classData", JSON.stringify(storageData));
            } else {
                // 储存数据
                sessionStorage.setItem("classData", JSON.stringify([storageData]));
            }

        }
    });

    exports('classify', {})
});
