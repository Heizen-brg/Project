var type = window.localStorage.getItem("type");
var token = window.localStorage.getItem("token"); 
var page = $('.page').click(function(){
  var id = $(this).attr('val')
  $.ajax({
    url: `/api/product/getAll/${id}`,
    type: "get",
    headers: {
      token: token,
      data: type
    }
  }).then(function(data) {
    $(".card").remove()
    if (parseInt(data.type) == 1) {
        for (var i = 0; i < data.result.length; i++) {
          const element = data.result[i];
          var template = `<div class="card col-3 element-parent" style="width: 30rem;">
                                          <div class="card-body">
                                                <h5 class="card-title">id:<span class="">${element.id}</span></h5>                                   
                                                <h5 class="card-title">ten:<span class="elementProduct">${element.username}</span>
                                                  <span class="ip-element">
                                                    <input type="text" class="ip-element-username">
                                                  </span>
                                                </h5>
                                                <h5 class="card-title">password:<span class="elementProduct">${element.password}</span>
                                                  <span class="ip-element">
                                                    <input type="text" class="ip-element-password">
                                                  </span>
                                                </h5>
                                                <h5 class="card-title">type:<span class="elementProduct">${element.type}</span>
                                                  <span class="ip-element">
                                                    <input type="text" class="ip-element-type">
                                                  </span>
                                                </h5>
                                                <button class="btn btn-info my-2 my-sm-0 view" type="button">View</button>
                                               <button class="btn btn-warning my-2 my-sm-0 edit" type="button">Edit</button>
                                               <button class="btn btn-danger my-2 my-sm-0 save" type="button">Save</button>
                                              <button class="btn btn-danger my-2 my-sm-0 delete" type="button">Delete</button>
                                          </div>
                                      </div>`;
          row.append(template);
        }
        div.append(row);
        $("body").append(div);
        // edit
            var nutSave = $(".save");
            var nutEdit = $(".element-parent .edit");
            var ipElement = $(".ip-element");
            var element = $(".elementProduct");
            var ipElementUsername = $(".ip-element-username");
            var ipElementPassword = $(".ip-element-password");
            var ipElementType = $(".ip-element-type");
            
            var nutDelete = $(".delete");
          for (var i = 0; i < nutEdit.length; i++) {
            $(nutEdit[i]).click(function() {
              var nutEditNow = $(this).parent();
              var indexEditParent = $(nutEditNow).parent().index();
              var nutEditParent = $(nutEditNow).parent();
              $(nutSave[indexEditParent]).css("display", "inline-block");
              $(nutEdit[indexEditParent]).css("display", "none");
             $(nutEditParent).find(ipElement).css("display","inline-block");
             $(nutEditParent).find(element).css("display","none");
             $(nutEditParent).find(ipElementUsername).val(data.result[indexEditParent].username);
             $(nutEditParent).find(ipElementPassword).val(data.result[indexEditParent].password);
             $(nutEditParent).find(ipElementType).val(data.result[indexEditParent].type);
            });
          }
          for (var i = 0; i < nutSave.length; i++) {
            $(nutSave[i]).click(function() {
              var nutSaveNow = $(this).parent();
              var indexSaveParent = $(nutSaveNow).parent().index();
              var nutSaveParent = $(nutSaveNow).parent();
              $(nutSave[indexSaveParent]).css("display", "none");
              $(nutEdit[indexSaveParent]).css("display", "inline-block");
              $(nutSaveParent).find(ipElement).css("display", "none");
             $(nutSaveParent).find(element).css("display","inline-block");
            
              $.ajax({
                url: "/api/product",
                type: "put",
                data:{
                  id: data.result[indexSaveParent].id,
                  username: $(nutSaveParent).find(ipElementUsername).val(),
                  password:  $(nutSaveParent).find(ipElementPassword).val(),
                  type: $(nutSaveParent).find(ipElementType).val(),
                }
              }).then(function(data){
                  $(nutSaveParent).find(ipElementUsername).val(data.result[0].username)
                $(nutSaveParent).find(ipElementPassword).val(data.result[0].password);
                   $(nutSaveParent).find(ipElementType).val(data.result[0].type);
                alert("Update thanh cong");
                window.location.href="/home"
              });
            });
          }
          // delete
           for (var i = 0; i < nutDelete.length; i++) {
            $(nutDelete[i]).click(function() {
              var nutDeleteNow = $(this).parent();
              var indexDeleteParent = $(nutDeleteNow).parent().index();
              $.ajax({
                url: "/api/product/"+`${data.result[indexDeleteParent].id}`,
                type: "delete"
              }).then(function(data) {
                window.location.href = "/home";
                alert("Delete thanh cong");
              });
            });
          }
      } else if (parseInt(data.type) == 2) {
          for (var i = 0; i < data.result.length; i++) {
          const element = data.result[i];
          var template = `<div class="card col-3 element-parent" style="width: 30rem;">
                                          <div class="card-body">
                                                <h5 class="card-title">id:<span>${element.id}</span></h5>                                   
                                                <h5 class="card-title">ten:<span class="elementProduct">${element.username}</span>
                                                  <span class="ip-element">
                                                    <input type="text" class="ip-element-username">
                                                  </span>
                                                </h5>
                                                <h5 class="card-title">password:<span class="elementProduct">${element.password}</span>
                                                  <span class="ip-element">
                                                    <input type="text" class="ip-element-password">
                                                  </span>
                                                </h5>
                                                <h5 class="card-title">type:<span class="elementProduct">${element.type}</span>
                                                  <span class="ip-element">
                                                    <input type="text" class="ip-element-type">
                                                  </span>
                                                </h5>
                                                <button class="btn btn-info my-2 my-sm-0 view" type="button">View</button>
                                              <button class="btn btn-danger my-2 my-sm-0 delete" type="button">Delete</button>
                                          </div>
                                      </div>`;
          row.append(template);
        }
        div.append(row);
        $("body").append(div);
          var nutDelete = $(".delete");
          // delete
           for (var i = 0; i < nutDelete.length; i++) {
            $(nutDelete[i]).click(function() {
              var nutDeleteNow = $(this).parent();
              var indexDeleteParent = $(nutDeleteNow).parent().index();
              $.ajax({
                url: "/api/product/"+`${data.result[indexDeleteParent].id}`,
                type: "delete"
              }).then(function(data) {  
                alert("Delete thanh cong");
                window.location.href = "/home";
              });
            });
          }
      } else if (parseInt(data.type) == 3) {
          for (var i = 0; i < data.result.length; i++) {
          const element = data.result[i];
          var template = `<div class="card col-3 element-parent" style="width: 30rem;">
                                          <div class="card-body">
                                                <h5 class="card-title">id:<span>${element.id}</span></h5>             
                                                <h5 class="card-title">ten:<span class="elementProduct">${element.username}</span>
                                                  <span class="ip-element">
                                                    <input type="text" class="ip-element-username">
                                                  </span>
                                                </h5>
                                                <button class="btn btn-info my-2 my-sm-0 view" type="button">View</button>
                                          </div>
                                      </div>`;
          row.append(template);
        }
        div.append(row);
        $("body").append(div);
      }
    })
})
console.log(page);

if (type == 2) {
  $("#update").css("display", "none");
} else if (type == 3) {
  $("#update").css("display", "none");
  $("#getId").css("display", "none");
  $("#create").css("display", "none");
  $("#delete").css("display", "none");
}
var div = $("<div class='container'></div>");
var row = $('<div class= "row"></div>');
var token = window.localStorage.getItem("token");
var div = $("<div class='container '></div>");
var row = $('<div class= "row "></div>');
  if(type==3){
    $("#create").css("display","none");
  }
// api getAll


//api get id
//api create
$("#create").click(function() {
  window.location.href = "/create";
});
//api update

//logout
$('#logout').click(function () {
  $.ajax({
      url: '/home',
      type: 'post',
  })
  .then(function (response) {
    window.location.href = '/login'
})
.catch(function (err) {
    console.log('err');

})
})
