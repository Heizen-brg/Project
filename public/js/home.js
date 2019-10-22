var type = window.localStorage.getItem("type");
var token = window.localStorage.getItem("token");
var div = $("<div class='container '></div>");
var row = $('<div class= "row "></div>');

// api getAll

$.ajax({
  url: "/api/product",
  type: "get",
  headers: {
    token: token,
    data: type
  }
}).then(function(itemFull) {
  $.ajax({
    url: "/page/1",
    type: "get",
    headers: {
      token: token,
      data: type
    }
  }).then(function(data) {
    for (var i = 0; i < data.result.length; i++) {
      const element = data.result[i];
      var template = `<div class="card col-6 col-lg-3 element-parent" style="width: 30rem;">
      <div class="card-body">
      <h5 class="card-title">id:<span class="">${element.id}</span></h5>                                   
      <h5 class="card-title">ten:<span class="elementProduct">${element.username}</span>
      <span class="ip-element">
      <input type="text" class="ip-element-username">
      </span>
      </h5>
      <h5 class="card-title elementGuest">password:<span class="elementProduct">${element.password}</span>
      <span class="ip-element">
      <input type="text" class="ip-element-password">
      </span>
      </h5>
      <h5 class="card-title elementGuest">type:<span class="elementProduct">${element.type}</span>
      <span class="ip-element">
      <input type="text" class="ip-element-type">
      </span>
      </h5>
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
        var indexEditParent = $(nutEditNow)
          .parent()
          .index();
        var nutEditParent = $(nutEditNow).parent();
        $(nutSave[indexEditParent]).css("display", "inline-block");
        $(nutEdit[indexEditParent]).css("display", "none");
        $(nutEditParent)
          .find(ipElement)
          .css("display", "inline-block");
        $(nutEditParent)
          .find(element)
          .css("display", "none");
        $(nutEditParent)
          .find(ipElementUsername)
          .val(data.result[indexEditParent].username);
        $(nutEditParent)
          .find(ipElementPassword)
          .val(data.result[indexEditParent].password);
        $(nutEditParent)
          .find(ipElementType)
          .val(data.result[indexEditParent].type);
      });
    }
    for (var i = 0; i < nutSave.length; i++) {
      $(nutSave[i]).click(function() {
        var nutSaveNow = $(this).parent();
        var indexSaveParent = $(nutSaveNow)
          .parent()
          .index();
        var nutSaveParent = $(nutSaveNow).parent();
        $(nutSave[indexSaveParent]).css("display", "none");
        $(nutEdit[indexSaveParent]).css("display", "inline-block");
        $(nutSaveParent)
          .find(ipElement)
          .css("display", "none");
        $(nutSaveParent)
          .find(element)
          .css("display", "inline-block");

        $.ajax({
          url: "/api/product",
          type: "put",
          data: {
            id: data.result[indexSaveParent].id,
            username: $(nutSaveParent)
              .find(ipElementUsername)
              .val(),
            password: $(nutSaveParent)
              .find(ipElementPassword)
              .val(),
            type: $(nutSaveParent)
              .find(ipElementType)
              .val()
          }
        }).then(function(data) {
          $(nutSaveParent)
            .find(ipElementUsername)
            .val(data.result[0].username);
          $(nutSaveParent)
            .find(ipElementPassword)
            .val(data.result[0].password);
          $(nutSaveParent)
            .find(ipElementType)
            .val(data.result[0].type);
          alert("Update thanh cong");
          window.location.href = "/home";
        });
      });
    }
    // delete
    for (var i = 0; i < nutDelete.length; i++) {
      $(nutDelete[i]).click(function() {
        var nutDeleteNow = $(this).parent();
        var indexDeleteParent = $(nutDeleteNow)
          .parent()
          .index();
        $.ajax({
          url: "/api/product/" + `${data.result[indexDeleteParent].id}`,
          type: "delete"
        }).then(function(data) {
          window.location.href = "/home";
          alert("Delete thanh cong");
        });
      });
    }
    if (type == 3) {
      $("#create").css("display", "none");
      $(".edit").css("display", "none");
      $(".delete").css("display", "none");
      $(".elementGuest").remove();
    }
    if (type == 2) {
      $(".edit").css("display", "none");
    }
  });
  //  end api page
  // nut phan trang
  var navPage = $('<nav aria-label="Page navigation example"></nav>');
  var ulPage = $('<ul class="pagination"></ul>');
  var itemLenght = itemFull.result.length;
  var numberPage = parseInt(itemLenght / 8) + 1;
  for (var i = 1; i <= numberPage; i++) {
    var liPage = ` <li class="page-item" val=${i}><a class="page-link" href="#">${i}</a></li>`;
    $(ulPage).append(liPage);
  }
  $(navPage).append(ulPage);
  $("body").append(navPage);
  var domLi = $(".page-item");
  $(domLi).click(function() {
    var indexDomLi = $(this).attr("val");
    $.ajax({
      url: "/page/" + indexDomLi,
      type: "get",
      headers: {
        data: type
      }
    }).then(function(data) {
      $("div").remove();
      var div = $("<div class='container '></div>");
      var row = $('<div class= "row "></div>');
      for (var i = 0; i < data.result.length; i++) {
        const element = data.result[i];
        var template = `<div class="card col-12 col-md-6 col-lg-3 element-parent" style="width: 30rem;">
        <div class="card-body">
        <h5 class="card-title">id:<span class="">${element.id}</span></h5>                                   
        <h5 class="card-title">ten:<span class="elementProduct">${element.username}</span>
        <span class="ip-element">
        <input type="text" class="ip-element-username">
        </span>
        </h5>
        <h5 class="card-title elementGuest">password:<span class="elementProduct">${element.password}</span>
        <span class="ip-element">
        <input type="text" class="ip-element-password">
        </span>
        </h5>
        <h5 class="card-title elementGuest">type:<span class="elementProduct">${element.type}</span>
        <span class="ip-element">
        <input type="text" class="ip-element-type">
        </span>
        </h5>
        <button class="btn btn-warning my-2 my-sm-0 edit" type="button">Edit</button>
        <button class="btn btn-danger my-2 my-sm-0 save" type="button">Save</button>
        <button class="btn btn-danger my-2 my-sm-0 delete btnAdmin" type="button">Delete</button>
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
          var indexEditParent = $(nutEditNow)
            .parent()
            .index();
          var nutEditParent = $(nutEditNow).parent();
          $(nutSave[indexEditParent]).css("display", "inline-block");
          $(nutEdit[indexEditParent]).css("display", "none");
          $(nutEditParent)
            .find(ipElement)
            .css("display", "inline-block");
          $(nutEditParent)
            .find(element)
            .css("display", "none");
          $(nutEditParent)
            .find(ipElementUsername)
            .val(data.result[indexEditParent].username);
          $(nutEditParent)
            .find(ipElementPassword)
            .val(data.result[indexEditParent].password);
          $(nutEditParent)
            .find(ipElementType)
            .val(data.result[indexEditParent].type);
        });
      }
      for (var i = 0; i < nutSave.length; i++) {
        $(nutSave[i]).click(function() {
          var nutSaveNow = $(this).parent();
          var indexSaveParent = $(nutSaveNow)
            .parent()
            .index();
          var nutSaveParent = $(nutSaveNow).parent();
          $(nutSave[indexSaveParent]).css("display", "none");
          $(nutEdit[indexSaveParent]).css("display", "inline-block");
          $(nutSaveParent)
            .find(ipElement)
            .css("display", "none");
          $(nutSaveParent)
            .find(element)
            .css("display", "inline-block");

          $.ajax({
            url: "/api/product",
            type: "put",
            data: {
              id: data.result[indexSaveParent].id,
              username: $(nutSaveParent)
                .find(ipElementUsername)
                .val(),
              password: $(nutSaveParent)
                .find(ipElementPassword)
                .val(),
              type: $(nutSaveParent)
                .find(ipElementType)
                .val()
            }
          }).then(function(data) {
            $(nutSaveParent)
              .find(ipElementUsername)
              .val(data.result[0].username);
            $(nutSaveParent)
              .find(ipElementPassword)
              .val(data.result[0].password);
            $(nutSaveParent)
              .find(ipElementType)
              .val(data.result[0].type);
            alert("Update thanh cong");
            window.location.href = "/home";
          });
        });
      }
      // delete
      for (var i = 0; i < nutDelete.length; i++) {
        $(nutDelete[i]).click(function() {
          var nutDeleteNow = $(this).parent();
          var indexDeleteParent = $(nutDeleteNow)
            .parent()
            .index();
          $.ajax({
            url: "/api/product/" + `${data.result[indexDeleteParent].id}`,
            type: "delete"
          }).then(function(data) {
            window.location.href = "/home";
            alert("Delete thanh cong");
          });
        });
      }
      if (type == 3) {
        $("#create").css("display", "none");
        $(".edit").css("display", "none");
        $(".delete").css("display", "none");
        $(".elementGuest").remove();
      }
      if (type == 2) {
        $(".edit").css("display", "none");
        if (data.result.type == 1) {
          $(".delete").remove();
        }
      }
    });
  });
  //end nut phan trang
});
//end ajax api product

//get id
//api create
$("#create").click(function() {
  window.location.href = "/create";
});
//logout
$("#logout").click(function() {
  $.ajax({
    url: "/home",
    type: "post"
  })
    .then(function(response) {
      window.localStorage.clear();
      window.location.href = "/login";
    })
    .catch(function(err) {
    });
});
$("#btnSerach").click(function() {
  if ($("#ipSearch").val() != "") {
    $.ajax({
      url: "/api/product/" + `${$("#ipSearch").val()}`,
      type: "get",
      headers: {
        type: window.localStorage.getItem("type")
      }
    }).then(function(data) {
      if (data.length > 0) {
        var div = $("<div class='container '></div>");
        var row = $('<div class= "row "></div>');
        $("p").remove();
        $("#back").css("display", "inline-block");
        $("div").css("display", "none");
        $("nav").css("display", "none");
        var template = `<div class="card col-12 col-md-6 col-lg-3 element-parent" style="width: 30rem;">
        <div class="card-body">
        <h5 class="card-title">id:<span class="">${data[0].id}</span></h5>                                   
        <h5 class="card-title">ten:<span class="elementProduct">${data[0].username}</span>
        <span class="ip-element">
        <input type="text" class="ip-element-username">
        </span>
        </h5>
        <h5 class="card-title elementGuest">password:<span class="elementProduct">${data[0].password}</span>
        <span class="ip-element">
        <input type="text" class="ip-element-password">
        </span>
        </h5>
        <h5 class="card-title elementGuest">type:<span class="elementProduct">${data[0].type}</span>
        <span class="ip-element">
        <input type="text" class="ip-element-type">
        </span>
        </h5>
        <button class="btn btn-warning my-2 my-sm-0 edit" type="button">Edit</button>
        <button class="btn btn-danger my-2 my-sm-0 save" type="button">Save</button>
        <button class="btn btn-danger my-2 my-sm-0 delete btnAdmin" type="button">Delete</button>
        </div>
        </div>`;
        row.append(template);
        div.append(row);
        $("body").append(div);
        var type = window.localStorage.getItem("type");
        if (type == 3) {
          $("#create").css("display", "none");
          $(".edit").css("display", "none");
          $(".delete").remove();
          $(".elementGuest").remove();
        }
        if (type == 2) {
          $(".edit").css("display", "none");
        }
      } else if (data.length == 0) {
        $("#back").css("display", "inline-block");
        $("div").css("display", "none");
        $("nav").css("display", "none");
        $("p").remove();
        var p = $("<p></p>").html("khong tim thay");
        $("body").append(p);
      }
    });
  }
});
$("#back").click(function(){
  window.location.href ='/home'
})
