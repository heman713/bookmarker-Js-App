//Listen for form submit
document.getElementById("myForm").addEventListener("submit",saveBookmark);

//save bookmark
function saveBookmark(e){
 //get form values
 var siteName = document.getElementById("siteName").value;
 var siteUrl = document.getElementById("siteUrl").value;

 if(!validateUser(siteName,siteUrl)){
     return false;
 } 

 var bookmark={
     name:siteName,
     url:siteUrl
 }

//test if bookmark is null
if(localStorage.getItem('bookmarks') === null){
    //init array
    var bookmarks=[];
    //add to array
    bookmarks.push(bookmark);
    //set to localstorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
else{
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmarks to array
    bookmarks.push(bookmark);
    //re-set localstorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
    //clear form
    document.getElementById("myForm").reset();
    //get bookmark from local
    fetchBookmarks();
    //prevent form submit
    e.preventDefault();
}

//get bookmarks
function fetchBookmarks(){
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // get div to populate bookmarks
    var divToPopulate = document.getElementById('bookmarksResults');
    //build output
    divToPopulate.innerHTML= '';
    //populate bookmarks in div
    for(var i=0;i<bookmarks.length;i++)
    {
        divToPopulate.innerHTML+= '<div class="well">'+
                                  '<h3>'+bookmarks[i].name+
                                  '<a class="btn btn-default" target="_blank" href='+bookmarks[i].url+'>Visit</a>'+
                                  '<a onclick="deleteBookmark(\''+bookmarks[i].url+'\')" class="btn btn-danger"  href="#">Delete</a>'+
                                   '</h3>'+
                                    '</div>'
    }

}

//delete bookmark
function deleteBookmark( url){
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop to find the bookmark
    for(var i=0;i<bookmarks.length;i++)
    {
        if(bookmarks[i].url ==url){
            bookmarks.splice(i,1);
        }
    }
    //set bookmarks after delete
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //Reload bookmarks from local
    fetchBookmarks();
}

function validateUser(siteName,siteUrl){
    //check if details filled
 if(!siteName || !siteUrl){
    alert("Please fill the form");
    return false;
}

//check url format
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if (!siteUrl.match(regex)) {
   alert("Please enter proper url")
   return false;
}
return true;
}