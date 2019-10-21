$.ajax({
    url:"/getAll/:page",
    type:'get'
}).then(function(data){
    console.log(data.numPage)
    for(i = 1 ; i<=data.numPage ; i++){
        $("#pagin").append( `<li><a href="#" class="page" val="${i}">${i}</a></li>`)
    }
})