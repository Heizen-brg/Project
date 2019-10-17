$("#btn").click(function() {
  $.ajax({
    url: "/api/product",
    type: "post",
    data: {
      username: $("#username").val(),
      password: $("#password").val(),
      type: $("#type").val()
    }
  })
    // console.log(data)
    .then(function(response) {
     window.location.href='/home'
    })
    .catch(function(err) {
      console.log("err");
    });
});
