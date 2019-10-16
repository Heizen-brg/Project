$("#btn").click(function() {
  $.ajax({
    url: "/api/product",
    type: "post",
    data: {
      username: $("#username").val(),
      password: $("#password").val(),
    }
  })
    // console.log(data)
    .then(function(response) {
     console.log(response);
    })
    .catch(function(err) {
      console.log("err");
    });
});
// When the user clicks anywhere outside of the modal, close it
