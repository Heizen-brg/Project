
$("#btn").click(function() {
  $.ajax({
    url: "/api/product",
    type: "post",
    data: {
      username: $("#username").val(),
      password: $("#password").val(),
      email: $("#email").val(),
      type: parseInt($("#type").val())
    }
  })
    // console.log(data)
    .then(function(response) {
      window.location.href = "/home";
    });
});
