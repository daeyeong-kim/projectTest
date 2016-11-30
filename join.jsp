<%@ page contentType="text/html;charset=utf-8" import="java.sql.*" %>

<%
 request.setCharacterEncoding("utf-8");  //Set encoding
 String id  =        request.getParameter("id");            
 String name =   request.getParameter("name");
 String pwd =     request.getParameter("pwd");
 String email  =   request.getParameter("email");
//POST로 Input.html로부터 입력받은 내용을 변수화

 try{
  Class.forName("com.mysql.jdbc.Driver");
  String url = "jdbc:mysql://necromman.cafe24.com?useUnicode=true&characterEncoding=utf-8";
  Connection con = DriverManager.getConnection(url,"necromman","lee848925");
  Statement stat = con.createStatement();

  String query = "INSERT INTO member(id, name, pwd, email)  VALUES('"+id+"','"+name+"','"+pwd+"','"+email+"')";
//INSERT into member(id,name,pwd,email) VALUES ('id','name','pwd','email') 쿼리문
  stat.executeUpdate(query);
  stat.close();
  con.close();
 }
 catch(Exception e){
  out.println( e );
 }
 response.sendRedirect("output.jsp"); 
%>