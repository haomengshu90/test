/**
 * Created by King on 2015/11/26.
 */
$(function(){
    $("#username").blur(nameValidator);
    $("#password").blur(pwdValidator);
    $("#authcode").blur(codeValidator);
});
function nameValidator(){
    var value = $("#username").val();
    var $username_msg = $("#username_msg");
    if(value==""||value==null){
        $username_msg.text("请输入邮箱/用户名/已验证手机.");
        $username_msg.attr("class","error");
        return false;
    }else{
        $username_msg.text("");
        $username_msg.attr("class","hide");
    }
    return true;
}
function pwdValidator(){
    var value = $("#password").val();
    var $password_msg = $("#password_msg");
    if(value==""||value==null){
        $password_msg.text("请输入密码.");
        $password_msg.attr("class","error");
        return false;
    }else{
        $password_msg.text("");
        $password_msg.attr("class","hide");
    }
    return true;
}
function codeValidator(){
    var value = $("#authcode").val();
    var $authcode_msg = $("#authcode_msg");
    if(value==""||value==null){
        $authcode_msg.text("请输入验证码.");
        $authcode_msg.attr("class","error");
        return false;
    }else{
        $authcode_msg.text("");
        $authcode_msg.attr("class","hide");
    }
    return true;
}
function validateForm(){
    if(!nameValidator()||!pwdValidator()||!codeValidator()){
        // 表单不能提交
        return false;
    }
    return true;
}