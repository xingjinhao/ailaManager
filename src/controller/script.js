/**

 @Name：话术管理
 @Author：程思琦

 */

layui.define(['table', 'form','common'], function (exports) {
    var $ = layui.$,
        admin = layui.admin,
        view = layui.view,
        table = layui.table,
        form = layui.form;
        com = layui.common;

    // 话术
    //话术管理
    table.render({
        elem: '#LAY-script-list',
        url: layui.setter.ajaxUrl + 'dialogue/list' //模拟接口
            ,
        cols: [
            [{
                type: 'checkbox',
                fixed: 'left'
            }, {
                field: 'sort',
                width: 80,
                title: '排序',
                sort: true
            }, {
                field: 'problem',
                title: '问题',
                templet: '#askHandle'

            }, {
                field: 'answer',
                title: '答案',
            }, {
                field: 'scene',
                title: '场景'
            }, {
                field: 'probability',
                title: '概率(百分比)'
            }, {
                field: 'contCategory',
                title: '内容类别'
            }, {
                field: 'author',
                title: '发布者'
            }, {
                field: 'uploadTime',
                title: '发布时间',
                sort: true
            }, {
                title: '操作',
                minWidth: 150,
                align: 'center',
                fixed: 'right',
                toolbar: '#table-content-list'
            }]
        ],
        page: true,
        limit: 10,
        limits: [10, 15, 20, 25, 30],
        text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-script-list)', function (obj) {
        var data = obj.data;
        // 截取对话内容
        data.problem = data.problem.replace(new RegExp(/[#|\(|\)|（|）]/g),'');
        console.log(data)

        if (obj.event === 'del') {
            layer.confirm('确定删除此数据？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            admin.popup({
                title: '编辑',
                area: ['550px', '550px'],
                id: 'editScript',
                success: function (layero, index) {
                    view(this.id).render('script/listform-1', data).done(function () {
                        form.render(null, 'layuiadmin-list-form');

                        //监听提交
                        form.on('submit(formSubmit)', function (data) {
                            var field = data.field; //获取提交的字段
                            console.log(field);
                            var temp  ={
                                "id":obj.data.id,
                                "answer": field.answer,
                                "probability": field.probability,
                                "problem": field.problem,
                                "token": layui.data('data').token
                            }
                            console.log(temp)
                            //提交 Ajax 成功后，关闭当前弹层并重载表格
                            com.ajax({
                                url: layui.setter.ajaxUrl + 'dialogue/edit',
                                type: 'post',
                                data: temp,
                                success(res) {
                                    if (res.data == 1) {
                                        layer.msg('编辑成功');
                                        layui.table.reload('LAY-script-list'); //重载表格
                                    } else {
                                        layer.msg('编辑失败，请重试');
                                    }
                                    layer.close(index); //执行关闭
                                },
                                error(err) {
                                    console.log(err);
                                }
                            });

                        });
                    });
                }
            });
        }
    });


    // 场景
    //场景管理
    table.render({
        elem: '#LAY-scene-list',
        url: './json/script/sceneList.json' //模拟接口
            ,
        cols: [
            [{
                type: 'checkbox',
                fixed: 'left'
            }, {
                field: 'sort',
                width: 80,
                title: '排序',
                sort: true
            }, {
                field: 'scene',
                title: '场景名'
            }, {
                field: 'author',
                title: '发布者'
            }, {
                field: 'uploadTime',
                title: '发布时间',
                sort: true
            }, {
                title: '操作',
                minWidth: 150,
                align: 'center',
                fixed: 'right',
                toolbar: '#table-content-list'
            }]
        ],
        page: true,
        limit: 10,
        limits: [10, 15, 20, 25, 30],
        text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-scene-list)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此数据？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            admin.popup({
                title: '编辑',
                area: ['550px', '280px'],
                id: 'editScript',
                success: function (layero, index) {
                    view(this.id).render('script/scene/listform', data).done(function () {
                        form.render(null, 'layuiadmin-list-form');

                        //监听提交
                        form.on('submit(layuiadmin-list-form)', function (data) {
                            var field = data.field; //获取提交的字段
                            console.log(field);

                            //提交 Ajax 成功后，关闭当前弹层并重载表格
                            //$.ajax({});
                            layui.table.reload('LAY-scene-list'); //重载表格
                            layer.close(index); //执行关闭
                        });
                    });
                }
            });
        }
    });

    // 内容分类
    //内容分类管理
    table.render({
        elem: '#LAY-category-list',
        url: './json/script/categoryList.json' //模拟接口
            ,
        cols: [
            [{
                type: 'checkbox',
                fixed: 'left'
            }, {
                field: 'sort',
                width: 80,
                title: '排序',
                sort: true
            }, {
                field: 'category',
                title: '分类名'
            }, {
                field: 'author',
                title: '发布者'
            }, {
                field: 'uploadTime',
                title: '发布时间',
                sort: true
            }, {
                title: '操作',
                minWidth: 150,
                align: 'center',
                fixed: 'right',
                toolbar: '#table-content-list'
            }]
        ],
        page: true,
        limit: 10,
        limits: [10, 15, 20, 25, 30],
        text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-category-list)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此数据？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            admin.popup({
                title: '编辑',
                area: ['550px', '280px'],
                id: 'editScript',
                success: function (layero, index) {
                    view(this.id).render('script/category/listform', data).done(function () {
                        form.render(null, 'layuiadmin-list-form');

                        //监听提交
                        form.on('submit(layuiadmin-list-form)', function (data) {
                            var field = data.field; //获取提交的字段
                            console.log(field);

                            //提交 Ajax 成功后，关闭当前弹层并重载表格
                            //$.ajax({});
                            layui.table.reload('LAY-category-list'); //重载表格
                            layer.close(index); //执行关闭
                        });
                    });
                }
            });
        }
    });


    exports('script', {})
});