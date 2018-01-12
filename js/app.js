$('div.page-header.cf').append('<div class="student-search"><input placeholder="search for Students..."id ="searchfield" type="search"><button id ="search">Search</button></div>'); //dynamically create search bar and button
$('.student-item').last().after('<div class="pagination"><ul></ul></div>');     //dynamically create pagination DIV
var  numberOfStudents = $("div.student-details").length                         //identiy how many students
const limitPerPage = 10                                                         //set a limit per page
$('ul.student-list li:gt(' + (limitPerPage - 1) + ')').hide();                  //initially only display 0 - limit perPage indexed students
var totalPages = Math.ceil (numberOfStudents / limitPerPage)
//console.log (totalPages + 'pages')                                            //developer number of initial pages


$(".pagination").append('<li><a href="#">' + 1 + '</a></li>');                  //initial pagination page link

for (var i = 2; i <= totalPages; i++) {                                         //Loop through all pagination page links, begin at 2 (1 exists ) stops at limit
  $(".pagination").append('<li><a href="#">' + i + '</a></li>');                //tabbed out i as reference
  }

$(".pagination li").on("click", function filter() {                                 //on.click function on all pagination li links at base of page
    $(".student-list li").hide()                                                    //hide all students initially
    var pageClick = $(this).text()                                                  //reference current page when clicked
    //console.log(pageClick)                                                        //developer for page clicked
    var upperLimit = pageClick * limitPerPage                                       //upper limit for page requested
    var lowerLimit = upperLimit - limitPerPage                                      //lower limit for page requested

    //console.log(upperLimit)                                                       //developer for upper limit of student index on the page
    //console.log(lowerLimit)                                                       //developer for lower limit of student index on the page

    for (var i = lowerLimit; i <= (upperLimit - 1); i++) {                          //for loop to show Student LIs. Start at lowerlimit - UpperLimit - 1
        $('ul.student-list li:eq(' + (i) + ')').show();                             //.show $
    }

})


//$('.student-search').on('keyup', function filter(){                    //function on key-up dynamic search, removed to fall within guidelines, please untab and tab out line below to have a go. it was tricky :)
$('#search').on('click', function filter(){
$('.noResults').remove()  								                         			  //remove the no results found Li created after function complete, helps with multiple seaches                        //function on click
var searchTerm = $("#searchfield").val().toLowerCase()                   //take search term and change to lower case

//console.log('searched for ' + searchTerm)                              //developer to show search term

  $('.student-list li').each(function(){                                        //run each LI through function

      var searchableData = $(this).text().toLowerCase()                         // prepare data to search
      var index = searchableData.indexOf(searchTerm)                            //index results
      //console.log(searchableData)                                             //developer to assist with the searchable Data

        if (index !=-1){                                                        //if not -1 then this is TRUE, !=-1 === FALSE
            $(this).show().removeClass('noMatch').addClass('match');                //remove class .noMatch and add to .match is matched
         }

             else{
               $(this).hide().removeClass('match').addClass('noMatch');             //remove class .show and add to .hide is not matched
             }

$('ul.student-list li.match:gt(' + (limitPerPage - 1) + ')').hide()

   });

   var matchedLI = $('.match').length                                           //identify how many Students matched and should be shown
   var newPages = Math.ceil(matchedLI / limitPerPage);													//reference for the first page

   //console.log(matchedLI + ' result(s)')                                         //developer how many students matched the search



       if (matchedLI === 0){                                                    // if no matches, replace div.paginaton with 'no reults'
       $(".pagination").replaceWith('<div class="pagination"><li class = "noResults">no results found</li></div>');   //dispalyed message
        }

       else if ( matchedLI > 0 && matchedLI < limitPerPage ) {                  //if there was only 1 page of results hide pagination
        $(".pagination").hide()
       }

          else {

          $(".pagination").replaceWith('<div class="pagination"><li><a href="#">' + 1 + '</a></li></div>'); //create first pagination link

          for (var i = 2; i <= newPages; i++) {                                 //for loop starts at 2 as 1st has been created
            $(".pagination").append('<li><a href="#">' + i + '</a></li>');      //adding pagination links with i as page number
            }

            $(".pagination li").on("click", function() {                        //on.click function on all pagination li links at base of page
                $('ul.student-list li.match').hide()                            // hide all matches first
                var pageClick = $(this).text()                                  // get page clicked (this references text not index. this will need addressing if format changes of pagination limks)
                //console.log(pageClick)                                        //developer for page clicked (not the expected results but I worked around it)
                var newUpperLimit = ( pageClick * limitPerPage)
                var newLowerLimit = (newUpperLimit - limitPerPage)              //calculate new ranges of pages ( had a odd event where I had to add 1 to index???)
                //console.log (newLowerLimit)                                   //lower limit for page requested post search
                //console.log (newUpperLimit)                                   //lower limit for page requested post search


                    for (var i = newLowerLimit; i <= (newUpperLimit - 1); i++) {    //for loop to show Student LIs. Start at lowerlimit - UpperLimit
                    $('ul.student-list li.match:eq(' + (i) + ')').show();
                    }


            })


          }


$('ul.student-list li.show:gt(' + (limitPerPage - 1) + ')').hide()              //only show first 10 students post search

})
