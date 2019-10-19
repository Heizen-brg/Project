var type = window.localStorage.getItem("type");
var token = window.localStorage.getItem("token");
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
// api getAll
$.ajax({
  url: "/api/product",
  type: "get",
  headers: {
    token: token,
    data: type
  }
})
  .then(function(data) {
    if (parseInt(data.type) == 3) {
      for (var i = 0; i < data.length; i++) {
        const element = data.result[i];
        var template = `<div class="card col-3" style="width: 18rem;">
                                        <div class="card-body">
                                            <h5 class="card-title">id:${element.id}</h5>                                        
                                            <h5 class="card-title">ten:${element.username}</h5>
                                            <button class="btn btn-outline-success my-2 my-sm-0" id="view" type="button">View</button>
                                        </div>
                                    </div>`;
        row.append(template);
        div.append(row);
        $("body").append(div);
      }
    } else if (parseInt(data.type) == 1) {
      for (var i = 0; i < data.result.length; i++) {
        const element = data.result[i];
        var template = `<div class="card col-3" style="width: 18rem;">
                                        <div class="card-body">
                                              <h5 class="card-title">id:<span class="element">${element.id}</span><span class="ip-element"><input type="text" class="ip-element-id" value=""></span></h5>                                   
                                            <h5 class="card-title">ten:<span class="element">${element.username}</span><span class="ip-element"><input type="text" id="ip-element-username"></span></h5>
                                            <h5 class="card-title">password:<span class="element">${element.password}</span><span class="ip-element"><input type="text" id="ip-element-password"></span></h5>
                                            <h5 class="card-title">type:<span class="element">${element.type}</span><span class="ip-element"><input type="text" id="ip-element-type"></span></span></h5>
                                              <button class="btn btn-outline-success my-2 my-sm-0" id="view" type="button">View</button>
                                             <button class="btn btn-outline-success my-2 my-sm-0" class="edit" type="button">Edit</button>
                                             <button class="btn btn-outline-success my-2 my-sm-0" class="save" type="button">Save</button>
                                            <button class="btn btn-outline-success my-2 my-sm-0" id ="delete" type="button">Delete</button>
                                        </div>
                                    </div>`;
        row.append(template);
      }
      div.append(row);
      $("body").append(div);
      //edit
        // var nutEdit = $(".edit");
        // for(var i = 0 ;i<nutEdit.length;i++){
        //     nutEdit[i].click(function(){
        //         $(this).css("display", "none");
        //         $(".save").css("display", "inline-block");
        //         var nutEditNow = this;
        //         var indextEditNow = 0;
        //         for(indextEditNow  = 0; nutEditNow = nutEditNow.prev();indextEditNow++){}
        //         console.log(indextEditNow);
        //     })
        // }
    //   $(".edit").click(function() {
    //     $(this).css("display", "none");
    //     $(".save").css("display", "inline-block");
    //     $("span.ip-element").css("display","inline-block");
    //     $(".element").css("display","none");
    //     //edit
    //     for(var i = 0; i<nutEdit.length;i++){
            
    //     }

    //     // $("#ip-element-id").attr("value",""+`${data.result[1].id}`);
    //   });
      $(".save").click(function() {
        $(this).css("display", "none");
        $(".edit").css("display", "inline-block");
        $("span.ip-element").css("display", "none");
        $(".element").css("display", "inline-block");
      });
    } else if (parseInt(data.type) == 2) {
      for (var i = 0; i < data.result.length; i++) {
        const element = data.result[i];
        var template = `<div class="card col-3" style="width: 18rem;">
                                        <div class="card-body">
                                            <h5 class="card-title">id:<span class="element-id">${element.id}</span><span><input type="text"></span></h5>                                        
                                            <h5 class="card-title">ten:${element.username}</h5>
                                            <h5 class="card-title">password:${element.password}</h5>
                                            <h5 class="card-title">type:${element.type}</h5>
                                              <button class="btn btn-outline-success my-2 my-sm-0" id="view" type="button">View</button>
                                            <button class="btn btn-outline-warning my-2 my-sm-0" id="delete" type="button">delete</button>
                                        </div>
                                    </div>`;
        row.append(template);
      }
      div.append(row);
      $("body").append(div);
    }
  })
  .catch(function(err) {});
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
