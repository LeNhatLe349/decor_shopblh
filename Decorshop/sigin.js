function check(){
    if(username()){
        document.getElementById("sai1").innerHTML="";
    }
    if(sdt()){
        document.getElementById("sai2").innerHTML="";
    }
    if(email()){
        document.getElementById("sai3").innerHTML="";
    }
    if(username()&&sdt()&&email()){
        alert("Đăng kí thành công");
        document.getElementById("myform").innerHTML="";
        var but=document.getElementById("submit");
        but.parentNode.removeChild(but);  
        window.location.assign("./index.html");  
    }
    else{
        return false;
    }
}
function username(){
    var user=document.getElementById("user");
    if(user.value==""){
        document.getElementById("sai1").innerHTML=" Mời nhập tên";
        return false;
    }
    else{
        return true;
    }
}
function sdt(){
    var sdt=document.getElementById("sdt").value;
    var sdt1=/^0\d{9}$/;
    if(sdt1.test(sdt)){
        return true;
    }
    else{
        document.getElementById("sai2").innerHTML="Nhập đúng sdt";
        return false;
    }
}
function email(){
    var email=document.getElementById("email").value;
    var email1=/^([A-Za-z0-9_\.\-])+\@(([A_Za-z0-9])+\.)+([A-Za-z0-9]{2,4})+$/;
    if(email1.test(email)){
        return true;
    }
    else{
        document.getElementById("sai3").innerHTML="Nhập đúng định dạng";
        return false;
    }
}