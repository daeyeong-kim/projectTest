$(document).ready(function() {
    $(".top_home").click(function() {
        if ($("#login").hasClass("loghide")) {
            $("#login").removeClass("loghide");
            $("#login").addClass("logshow");
        }
        if ($("#memjoin").hasClass("memshow")) {
            $("#memjoin").removeClass("memshow");
            $("#memjoin").addClass("memhide");
        }
    })
    $("#login button").eq(1).click(function() {

        if ($("#memjoin").hasClass("memhide")) {
            $("#memjoin").removeClass("memhide");
            $("#memjoin").addClass("memshow");
            if($("#login").hasClass("logshow")){
            	$("#login").removeClass("logshow");
            	$("#login").addClass("loghide");
            }
        }
    })


})
