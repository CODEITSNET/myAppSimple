// Listen for Form Submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//Save Bookmark
function saveBookmark(e){
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
       return false;
  }
 
  var bookmark = {
    name:siteName,
    url:siteUrl
  }
  /*
  //Local Storage Test
  localStorage.setItem('test', 'Hello World')
  console.log(localStorage.getItem('test'))
  localStorage.removeItem('test')*/


  //Test if bookmark is null
  if(localStorage.getItem('bookmarks') === null){
    //Init Array
    var bookmarks = [];
    //Add to Array
    bookmarks.push(bookmark);
    //Set to Local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  } else{
    //Get Bookmarks from Local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add Bookmark to Array
    bookmarks.push(bookmark);
    //Re set back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }

  //Clear Form
   document.getElementById('myForm').reset();
  //Re fetch bookmarks
fetchBookmarks()
  // Prevent Form from Submiting
  e.preventDefault();
}

//Delete Bookmark
function deleteBookmark(url){
//Get Bookmarks from localstorage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//Loop through bookmarks
for(i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
          //Remove from Array
          bookmarks.splice(i, 1);
    }
}
//Re set back to localstorage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

//Re fetch bookmarks
fetchBookmarks()
}

//Fetch Bookmarks
function fetchBookmarks(){
   //Get Bookmarks from Local Storage
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   //Get output id
   var bookmarksResults = document.getElementById('bookmarksResults');
   //Build an output
   bookmarksResults.innerHTML = '';
   for(i = 0; i < bookmarks.length; i++){
          var name = bookmarks[i].name;
          var url = bookmarks[i].url;

          bookmarksResults.innerHTML += '<div class = "well">'+ 
                                         '<h3>'+ name + 
                                         '<a class = "btn btn-success" target = " _blank" href = "'+url+'">Visit</a>'+
                                         '<a onclick = "deleteBookmark(\''+url+'\')" class = "btn btn-danger"  href = "#">Delete</a>'+
                                         '</h3>' +
                                         '</div>';
   }
}
// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
}

   return true;
}
