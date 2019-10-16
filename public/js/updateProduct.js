$("#btn").click(function() {
  $.ajax({
    url: "/api/product",
    type: "put",
    data: {
      username: $("#username").val(),
      password: $("#password").val(),
      id: $("#id").val(),
      type: $("#type").val()
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
