var express = require('express');
var app = express();
var path = require('path');
var fs=require('fs');

/// Import SqliteDB.
var SqliteDB = require('./src/sqlite.js').SqliteDB;
var file = "weather.db";
var sqliteDB = new SqliteDB(file);
 
/// create table.
var createMemberTableSql = "create table if not exists members(username varchar(15), password varchar(20), nickname varchar(15));";
// var createTileTableSql = "create table if not exists members(level INTEGER, column INTEGER, row INTEGER, content BLOB);";
sqliteDB.createTable(createMemberTableSql);
 
/// insert data.
var memberData = [['user','123456','nickname']];
var insertMemberSql = "insert into members(username, password, nickname) values(?, ?, ?)";
sqliteDB.insertData(insertMemberSql, memberData);
 
/// query data.
// var querySql = 'select * from tiles where level = 1 and column >= 10 and column <= 11 and row >= 10 and row <=11';
// sqliteDB.queryData(querySql, dataDeal);
 
/// update data.
// var updateSql = 'update members set level = 2 where level = 1 and column = 10 and row = 10';
// sqliteDB.executeSql(updateSql);
 
// /// query data after update.
// querySql = "select * from tiles where level = 2";
// sqliteDB.queryData(querySql,dataDeal);
// sqliteDB.close();
 
// function dataDeal(objects){
//     // for(var i = 0; i < objects.length; ++i){
//     //     console.log(objects[i]);
//     // }
//     console.log('调用后',JSON.stringify(objects))
//     return JSON.stringify(objects);
// }


app.get('/login', function(req, res) {
    querySql = "select * from members";
    sqliteDB.queryData(querySql,(objects)=>{
        // console.log(1111,objects);
        res.send(objects);
    });
});

app.get('/modifypassword', function(req, res) {
    querySql1 = 'select username from members where nickname = '+req.query.nickname;
    sqliteDB.queryData(querySql1,(objects)=>{
        if(objects[0].username == req.query.username){
            console.log(2222,objects[0].username);
            // var updateSql = 'update members set password = '+req.query.password+' where nickname = '+req.query.nickname+' and where username = '+req.query.username;
            var updateSql = "update members set password = "+req.query.password+" where nickname = "+req.query.nickname;
            sqliteDB.executeSql(updateSql);
            // 这里不知道为什么，不能设置字母字符串，目前还存在语法问题

            querySql = "select * from members";
            sqliteDB.queryData(querySql,(objects)=>{
                // console.log(1111,objects);
                res.send(objects);
            });
        }

    });
});



app.listen(3000);