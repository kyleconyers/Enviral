$(document).ready(function () {
  /* global moment */

  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  var commentContainer = $("#commentBody");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  $(document).on("click", "#commentSubmit", handleComment);
  $(document).on("click", ".deleteButton", handleCommentDelete);
  $(".readBtn").on("click", ".readBtn", handlePostRead);

  // Variable to hold our posts
  var posts;

  // The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var authorId;
  if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
    getPosts(authorId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getPosts();
  }

  //Function handleComment

  function handleComment(event) {
    //console.log("testing handle comment click")
    var commentText = $("#commentBody").val().trim();
    var newComment = {
      // title: "title",
      body: commentText,
      PostId: 1,
    };
    console.log("..................xxx", newComment)
    //console.log("comment body test", commentText)
    $.post("/api/comment", newComment, function () {
      //console.log("look at me???????")
    })
    // .then(commentData);
    // console.log("commentData", commentData)
  }

  //Function getComment
  function getComment(event) {
    axios.get('/api/Comment')
      .then(function (response) {
        //console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          var li = $('<li>');
          li.html("<span>"+response.data[i].body+"</span><span><button id ="+response.data[i].id+" class = \"deleteButton\" type=\"button\">Delete</button>")
          // li.text(response.data[i].body)
          // console.log("this is", li);
          // console.log("this is another thing", response.data[i].body)
          $('#lala').append(li);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  // This function grabs posts from the database and updates the view
  function getPosts(author) {
    authorId = author || "";
    if (authorId) {
      authorId = "/?author_id=" + authorId;
    }
    $.get("/api/posts" + authorId, function (data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(author);
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/posts/" + id
      })
      .then(function () {
        getPosts(postCategorySelect.val());
      });
  }

  // This function does an API call to delete comments
  function deleteComment(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/comment/" + id
      })
      .then(function () {
        var commentContainer = $("#commentBody");
        commentContainer.empty();
        getComment(commentContainer.val());
      });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var readBtn = $("<button>");
    readBtn.text("READ")
    readBtn.addClass("read btn btn-info")
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostAuthor = $("<h5>");
    newPostAuthor.text("Written by: " + post.Author.name);
    newPostAuthor.css({
      float: "right",
      color: "blue",
      "margin-top": "-10px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    var newPostId = $("<p>");
    newPostTitle.append($("<a href='/blogPost/" + post + "'>" + "</a>"))
    // newPostTitle.append($("<a href='/blogPost/" + post.id + "'>"));
    newPostTitle.text(post.title);
    newPostTitle.append($("</a>"));
    newPostBody.text(post.body);
    newPostId.text(post.id);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(readBtn)
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    //newPostCardBody.append(testContainer);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);

   
    return newPostCard;

  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which comment we want to delete and then calls deleteComment
  function handleCommentDelete() {
    console.log ("Delete function can you see?")
    var currentComment = this;
    deleteComment(currentComment.id);
  }
  


  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }
    
  function handlePostRead() {
    var currentPost = $(this)
    // .parent()
    // .parent()
    // .data("post");
    console.log("clicked")
    // window.location.href = "/blogPost?post_id=" + currentPost.id;
    
    // $.ajax({
    //   method: "GET",
    //   url: "/api/posts/" + id
    // })
    // .then(function () {
    //   getPosts(postCategorySelect.val());
    // });
    
  }
  
  $(".read").click(handlePostRead);

  // This function displays a message when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Author #" + id;
    }
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({
      "text-align": "center",
      "margin-top": "50px"
    });
    messageH2.html("No posts yet" + partial + ", navigate <a href='/cms.html" + query +
      "'>here</a> in order to get started.");
      // + partial + ", navigate <a href='/cms" + query + "'>here</a> in order to get started."
    blogContainer.append(messageH2);
  }
  getComment();

});