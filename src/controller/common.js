/**

 @Name：layuiAdmin 公共业务
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL

 */

layui.define(function (exports) {
    var $ = layui.$
        , layer = layui.layer
        , laytpl = layui.laytpl
        , setter = layui.setter
        , view = layui.view
        , admin = layui.admin

    //公共业务的逻辑处理可以写在此处，切换任何页面都会执行
    //……


    //退出
    admin.events.logout = function () {
        //执行退出接口
        admin.req({
            url: './json/user/logout.js'
            , type: 'get'
            , data: {}
            , done: function (res) { //这里要说明一下：done 是只有 response 的 code 正常才会执行。而 succese 则是只要 http 为 200 就会执行

                //清空本地记录的 token，并跳转到登入页
                admin.exit();
            }
        });
    };

    // ajax代码提取
    function ajax(p) {

        // 判断有没有url
        if (!p.url) {
            console.log('请输入请求路径');
            return
        }

        // 判断是什么请求方式
        var data = p.data;
        if (p.type === 'post' || p.type === 'POST') {
            data = JSON.stringify(data);
        }

        // 发送请求
        $.ajax({
            url: p.url,
            type: p.type || 'get',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: data,
            success(res) {
                if (res.code === 200 || res.code === "200") {
                    p.success(res);
                }
            },
            error(err) {
                p.error(err);
            }
        });
    }


    //对外暴露的接口
    exports('common', {ajax});
});
