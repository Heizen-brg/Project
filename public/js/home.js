
var token = window.localStorage.getItem("token");
var divContainer = $("<div class='container'></div>");
var row = $('<div class= "row "></div>');
var table = $('<table width="100%" id="tableContainer"></table>');
var trListProduct = $('<tr class="tdListProduct"></tr>');
var trListButton = $('<tr class="tdButtonProduct" width="100%" align="center"></tr>');
var tdListProduct = $('<td class="tdListProduct"></td>');
var tdListButton = $('<td class="tdButtonProduct" width="100%" valign="middle" ></td>');
var nutSave = $(".save");
var nutEdit = $(".element-parent .edit");
var ipElement = $(".ip-element");
var element = $(".elementProduct");
var ipElementUsername = $(".ip-element-username");
var ipElementPassword = $(".ip-element-password");
var ipElementType = $(".ip-element-type");
var ipElementEmail = $(".ip-element-email");
var nutDelete = $(".delete");
 // load api khi vừa chuyển vào trang home
$.ajax({
  url: "/page/1",
  type: "get",
  headers: {
    token: token
  }
}).then(function(data){ 
    // nút edit khi vừa bấm và chuyển sang trạng thái nút save
    for (var i = 0; i < nutEdit.length; i++) {
        $(nutEdit[i]).click(function() {
        var nutEditNow = $(this).parent();
        var indexEditParent = $(nutEditNow).parent().index();
        var nutEditParent = $(nutEditNow).parent();
        $(nutSave[indexEditParent]).css("display", "inline-block");
        $(nutEdit[indexEditParent]).css("display", "none");
        $(nutEditParent).find(ipElement).css("display", "inline-block");
        $(nutEditParent).find(element).css("display", "none");
        $(nutEditParent).find(ipElementUsername).val(data.result[indexEditParent].username);
        $(nutEditParent).find(ipElementPassword).val(data.result[indexEditParent].password);
        $(nutEditParent) .find(ipElementType).val(data.result[indexEditParent].type);
        $(nutEditParent) .find(ipElementEmail).val(data.result[indexEditParent].email);
        });
    }
    //het nut edit
    // nút save khi bấm và chuyển sang nút edit
    for (var i = 0; i < nutSave.length; i++) {
        $(nutSave[i]).click(function() {
        var nutSaveNow = $(this).parent();
        var indexSaveParent = $(nutSaveNow) .parent().index();
        var nutSaveParent = $(nutSaveNow).parent();
        $(nutSave[indexSaveParent]).css("display", "none");
        $(nutEdit[indexSaveParent]).css("display", "inline-block");
        $(nutSaveParent).find(ipElement).css("display", "none");
        $(nutSaveParent).find(element).css("display", "inline-block");
        $.ajax({
            url: "/api/product",
            type: "put",
            data: {
            id: data.result[indexSaveParent].id,
            username: $(nutSaveParent).find(ipElementUsername).val(),
            password: $(nutSaveParent).find(ipElementPassword).val(),
            type: $(nutSaveParent).find(ipElementType).val(),
            email: $(nutSaveParent).find(ipElementEmail).val(),
            }
        }).then(function(data) {
            $(nutSaveParent).find(ipElementUsername).val(data[0].username);
            $(nutSaveParent).find(ipElementPassword).val(data[0].password);
            $(nutSaveParent).find(ipElementType).val(data[0].type);
            $(nutSaveParent).find(ipElementEmail).val(data[0].email);
            alert("Update thanh cong");
            window.location.href = "/home";
        });
        });
    }
    // het nut save
    //xử lí nút delete
    for (var i = 0; i < nutDelete.length; i++) {
        $(nutDelete[i]).click(function() {
        var nutDeleteNow = $(this).parent();
        var indexDeleteParent = $(nutDeleteNow).parent().index();
        $.ajax({
            url: "/api/product/" + `${data.result[indexDeleteParent].id}`,
            type: "delete"
        }).then(function(data) {
            window.location.href = "/home";
            alert("Delete thanh cong");
        });
        });
    }
    //het nut delete
})
// nut phan trang
    $(".page-item").click(function(){
    var indexDomLi = $(this).attr("val");
    console.log(indexDomLi);
         $("#tableContainer").remove();

    $.ajax({
        url: "/page/"+indexDomLi,
        type: "get",
        headers:{
            token:token
        }
    }).then(function(data) {
        for (var i = 0; i < data.result.length; i++) {
            var template = ` <div class="card col-6 col-lg-4 element-parent" >
                                <div class="card-body cardContainer">
                                  <table>
                                    <!-- id -->
                                    <tr>
                                      <td>
                                        <h5 class="card-title">ID:</h5> 
                                      </td>
                                      <td>
                                        <h5 class="card-title"><span class="">${data.result[i].id}</span></h5> 
                                      </td>
                                    </tr>
                                    <!-- username -->
                                    <tr>
                                        <td>
                                          <h5 class="card-title">Name:</h5> 
                                        </td>
                                        <td>
                                          <h5 class="card-title"><span class="elementProduct">${data.result[i].username}</span>
                                            <span class="ip-element">
                                              <input type="text" class="ip-element-username">
                                            </span>
                                          </h5>
                                        </td>
                                      </tr>
                                      <!-- password -->
                                      <tr>
                                        <td>
                                          <h5 class="card-title">Password:</h5> 
                                        </td>
                                        <td>
                                          <h5 class="card-title elementGuest"><span class="elementProduct">${data.result[i].password}</span>
                                            <span class="ip-element">
                                              <input type="text" class="ip-element-password">
                                            </span>
                                          </h5>
                                        </td>
                                      </tr>
                                      <!-- email -->
                                      <tr>
                                        <td>
                                          <h5 class="card-title">Email:</h5> 
                                        </td>
                                        <td>
                                        <h5 class="card-title elementGuest"><span class="elementProduct">${data.result[i].email}</span>
                                            <span class="ip-element">
                                              <input type="text" class="ip-element-email">
                                            </span>
                                          </h5>
                                        </td>
                                      </tr>
                                      <!-- type -->
                                      <tr>
                                        <td>
                                          <h5 class="card-title">Type:</h5> 
                                        </td>
                                        <td>
                                        <h5 class="card-title elementGuest"><span class="elementProduct">${data.result[i].type}</span>
                                            <span class="ip-element">
                                              <input type="text" class="ip-element-type">
                                            </span>
                                          </h5> 
                                        </td>
                                      </tr>
                                  </table>
                                  <button class="btn btn-warning my-2 my-sm-0 edit" type="button">Edit</button>
                                  <button class="btn btn-danger my-2 my-sm-0 save" type="button">Save</button>
                                  <button class="btn btn-danger my-2 my-sm-0 delete" type="button">Delete</button>
                                </div>                         
                              </div>`;
            $(row).append(template);
            }
            $(tdListProduct).append(row);
            $(trListProduct).append(tdListProduct);
            $(table).append(trListProduct);
            $(divContainer).append(table);
            $("body").append(divContainer);
            var nutSave = $(".save");
            var nutEdit = $(".element-parent .edit");
            var ipElement = $(".ip-element");
            var element = $(".elementProduct");
            var ipElementUsername = $(".ip-element-username");
            var ipElementPassword = $(".ip-element-password");
            var ipElementType = $(".ip-element-type");
            var ipElementEmail = $(".ip-element-email");
            var nutDelete = $(".delete");
            // nút edit khi vừa bấm và chuyển sang trạng thái nút save
            for (var i = 0; i < nutEdit.length; i++) {
            $(nutEdit[i]).click(function() {
                var nutEditNow = $(this).parent();
                var indexEditParent = $(nutEditNow) .parent().index();
                var nutEditParent = $(nutEditNow).parent();
                $(nutSave[indexEditParent]).css("display", "inline-block");
                $(nutEdit[indexEditParent]).css("display", "none");
                $(nutEditParent).find(ipElement).css("display", "inline-block");
                $(nutEditParent).find(element).css("display", "none");
                $(nutEditParent).find(ipElementUsername).val(data.result[indexEditParent].username);
                $(nutEditParent).find(ipElementPassword).val(data.result[indexEditParent].password);
                $(nutEditParent) .find(ipElementType).val(data.result[indexEditParent].type);
                $(nutEditParent) .find(ipElementEmail).val(data.result[indexEditParent].email);
            });
            }
            // nút save khi bấm và chuyển sang nút edit
            for (var i = 0; i < nutSave.length; i++) {
            $(nutSave[i]).click(function() {
                var nutSaveNow = $(this).parent();
                var indexSaveParent = $(nutSaveNow) .parent().index();
                var nutSaveParent = $(nutSaveNow).parent();
                $(nutSave[indexSaveParent]).css("display", "none");
                $(nutEdit[indexSaveParent]).css("display", "inline-block");
                $(nutSaveParent).find(ipElement).css("display", "none");
                $(nutSaveParent).find(element).css("display", "inline-block");
                $.ajax({
                url: "/api/product",
                type: "put",
                data: {
                    id: data.result[indexSaveParent].id,
                    username: $(nutSaveParent).find(ipElementUsername).val(),
                    password: $(nutSaveParent).find(ipElementPassword).val(),
                    type: $(nutSaveParent).find(ipElementType).val(),
                    email: $(nutSaveParent).find(ipElementEmail).val(),
                }
                }).then(function(data) {
                  console.log(data);
                $(nutSaveParent).find(ipElementUsername).val(data[0].username);
                $(nutSaveParent).find(ipElementPassword).val(data[0].password);
                $(nutSaveParent).find(ipElementType).val(data[0].type);
                $(nutSaveParent).find(ipElementEmail).val(data[0].email);
                alert("Update thanh cong");
                window.location.href = "/home";
                });
            });
            }
            //xử lí nút delete
            for (var i = 0; i < nutDelete.length; i++) {
            $(nutDelete[i]).click(function() {
                var nutDeleteNow = $(this).parent();
                var indexDeleteParent = $(nutDeleteNow).parent().index();
                $.ajax({
                url: "/api/product/" + `${data.result[indexDeleteParent].id}`,
                type: "delete"
                }).then(function(data) {
                window.location.href = "/home";
                alert("Delete thanh cong");
                });
            });
        }
          var navPage = $('<nav aria-label="Page navigation example"></nav>');
          var ulPage = $('<ul class="pagination"></ul>');
          var pageLenght = data.listProductItem;
          var numberPage = parseInt(pageLenght.length/6)+1;
          for (var i = 1; i <= numberPage; i++) {
              var liPage = ` <li class="page-item" val=${i}><a class="page-link" href="#">${i}</a></li>`;
              $(ulPage).append(liPage);
          }
          $(navPage).append(ulPage);
          $(tdListButton).append(navPage);
          $(trListButton).append(tdListButton);
          $(table).append(trListButton);
          $(divContainer).append(table);
          $('body').append(divContainer)
    })
});
        //  hết xử lí nút phân trang
        //         if (data.result.type == 3) {
        //   $("#create").css("display", "none");
        //   $(".edit").css("display", "none");
        //   $(".delete").css("display", "none");
        //   $(".elementGuest").remove();
        // }
        // if (data.result.type == 2) {
        //   $(".edit").css("display", "none");
        // }
 // hết load api khi vừa chuyển vào trang home
//api create
$("#create").click(function() {
  window.location.href = "/create";
});
//het xu li nut create
//logout
$("#logout").click(function() {
  $.ajax({
    url: "/home",
    type: "post"
  }).then(function(response) {
      window.location.href = "/login";
    })
    .catch(function(err) {
    });
});
// het logout
