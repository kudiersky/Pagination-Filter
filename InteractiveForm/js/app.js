//My first Web form app, I have created other options in the .html file to allow non JS browsers to view it
$('#other-title').addClass("textarea").hide(); //Hiding other info option left for non JS availability
$('#name:input:first').focus(); //focus on first Element on load
$('#colors-js-puns').hide(); //remove colors from view
$("#credit-card").hide() //removes payment from view
$("#paymentSelect").hide() //removes payment from view
var otherInfo = 'enter info here...' //text inside textarea

//*******************other info box and title select code********************************************************************

$('#title').click(function() {
    $('#emptyOptionErrorMessage').remove() //remove error msg for validation
    $('#selectErrorMessage').remove() //remove error msg for validation


    if ($('#title').val() == 'other') {
        $('#other-title.textarea').val(otherInfo) //show text area on selection + otherinfo message which can be altered on line 6
        $('#other-title').addClass("textarea").show() //add a class to the textarea
        $('#other-title.textarea').click(function() { //function to clear the default value on click
            $('#other-title.textarea').val('')
        })

    } else {
        $('#other-title').hide() //remove text area when unclicked
    }
})

//*************************available colors for approprite design code********************************************************

$("#design").on('change', function() { //function on change of option in #design
    $('#designErrorMessage').remove() //remove validation error msg
    var designSelected = $('#design').val() //identify #design selected
    $('#colors-js-puns').show() //showw the colors option element
    $('#colors-js-puns option').hide() //But hide the colors inside to prevent ghost option


    if (designSelected === "js puns") {
        $('#color').replaceWith('<select id="color" name="user_size"><option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option></select>')
    } //busy, but replaces the element with only the appropriate colors related to option
    else if (designSelected === "heart js") {
        $('#color').replaceWith('<select id="color" name="user_size"><option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option></select>')
        //busy, but replaces the element with only the appropriate colors related to option
    } else {
        $('#colors-js-puns').hide(); //hide colors if nothing is selected
    }
})

//*********************************Total Cost Code**************************************************************************************
$("input[name='all']").addClass('200') //add activities to class depending on their cost $200 or $100.
$("input[name='js-frameworks']").addClass('100')
$("input[name='js-libs']").addClass('100')
$("input[name='express']").addClass('100')
$("input[name='node']").addClass('100')
$("input[name='build-tools']").addClass('100')
$("input[name='npm']").addClass('100')


$(".activities").on('change', function() {
    //function on change of activites selected
    $("#activitiesErrorMessage").remove() //added during validation

    $("input").attr("disabled", false); //ensures all activities are availabe

    var checkedLength = $("input:checked").length //identify number of checked options
    var totalCostDiv = $('#totalCost legend').length //prevent replication of #totalCost DIV


    if (totalCostDiv < 1 && checkedLength > 0) {
        $('.activities').last().after('<div id="totalCost" class="totalCost"><legend></legend></div>') //Dynamically create totalCost DIV #totalCost
    } else if (checkedLength < 1) { //If no activities selected remove element
        $('#totalCost').remove()
    }

    var acost = $("input:checked").filter($(".100")).length * 100; //A total of the classes that are $100 and Selected
    var bcost = $("input:checked").filter($(".200")).length * 200; //A total of the classes that are $200 and Selected
    var totalPrice = acost + bcost //A total of combined selected courses
    $('.totalCost legend').replaceWith('<legend> Total Cost: ' + '£' + totalPrice + ' </legend>') //Replace TotalCost Legend with totalPrice


    //******************Activities  conflict code***************************************************************************************************

    var jslibsSelected = $('input[name="js-libs"]:checked').val() //used for conditional if js-lib activity is selected
    var nodeSelected = $('input[name="node"]:checked').val() //used for conditional if node activity is selected
    var jsFrameworkSelected = $('input[name="js-frameworks"]:checked').val() //used for conditional if js frameworks activity is selected
    var expressSelected = $('input[name="express"]:checked').val() //used for conditional if express activity is selected

    $("input[name='js-libs']").parent().removeClass("greyout");
    $("input[name='node']").parent().removeClass("greyout");
    $("input[name='express']").parent().removeClass("greyout");
    $("input[name='js-frameworks']").parent().removeClass("greyout");

    if (jslibsSelected) {
        $("input[name='node']").attr("disabled", true); //disable check box
        $("input[name='node']").parent().addClass("greyout"); //greyout created in .CSS
    } else if (nodeSelected) {
        $("input[name='js-libs']").attr("disabled", true);
        $("input[name='js-libs']").parent().addClass("greyout");
    }

    //seperating IF statements to allow mutiple activities to be selected with conflicting course times

    if (jsFrameworkSelected) {
        $("input[name='express']").attr("disabled", true);
        $("input[name='express']").parent().addClass("greyout");

    } else if (expressSelected) {
        $("input[name='js-frameworks']").attr("disabled", true);
        $("input[name='js-frameworks']").parent().addClass("greyout");
    }

})

//***********************Payment Details********************************************************************

$('select#payment').on('change', function() {
    $('#paymentErrorMessage').remove() //error message on validation


    if ($('select#payment').val() == "credit card") { //dynamically create otherinfo textarea on click
        $("#credit-card").show() //show credit card input element
        $("#paymentSelect").hide() //removes payment from view
    } else if ($('select#payment').val() == "paypal") { //if paypal is selected then show payment select Div containing paypal and bitcoin instructions
        $("#paymentSelect").show() //Show the DIV hidden if credit card selected
        $("#credit-card").hide() //Hide the credit card DIV
        $("#bitcoin").hide() //Show bitcoin DIV
        $("#paypal").show() //Hide paypal DIV
    } else if ($('select#payment').val() == "bitcoin") { //if paypal is selected then show payment select Div containing paypal and bitcoin instructions
        $("#paymentSelect").show() //Show the DIV hidden if credit card selected
        $("#credit-card").hide() //Hide the credit card DIV
        $("#bitcoin").show() //Show bitcoin DIV
        $("#paypal").hide() //Hide paypal DIV
    } else {
        $("#paymentSelect").hide() //remove bitcoin and paypal parentDIV #paymentSelect
    }
})

//*******************Real time validation for Email field ********************************************************************

$('#mail').keyup(function() { //on key up in mail input field
    if ($('#mail').is(":invalid") && $('#emailformatErrorMessage').length < 1) { // if the email is invalid and there's not already an error
        $("#mail").before("<p><span class='error' id='emailformatErrorMessage'> invalid Email Format </span></p>"); //dynamically create error
    } else if ($('#mail').is(":valid")) { //of valid remove error
        $('#emailformatErrorMessage').remove()
    }
})

//**********************************Form Validation on submit ***********************************************

$('form').on('submit', function(event) { //action on submit button being clicked

    var errors = false;

    var errorMissingName = 'Missing Name'; // Variables of all error messages
    var errorMissingMail = 'Missing Email';
    var selectErrorMessage = 'Please identify your Role';
    var blankOptionErrorMessage = 'Please type a role in the space below';
    var activitiesErrorMessage = 'Please Select at least 1 Activity';
    var designErrorMessage = 'Please Select a Design';
    var paymentErrorMessage = 'Please Select a Payment Method';
    var emptyOptionErrorMessage = 'You left your role blank';
    var cardErrorMessage = 'Please enter your Card Number';
    var zipErrorMessage = 'Please enter your ZIP Code';
    var cvvErrorMessage = 'Please enter your CVV';
    //for inputting Name
    if ($("#name").val() === "" && $('#nameErrorMessage').length < 1) { //if the name is blank as there are no error messages for this
        $("#name").before("<p><span class='error' id='nameErrorMessage'> " + errorMissingName + " </span></p>"); //create error box
        errors = true; //log as error
    } else {
        $('#nameErrorMessage').remove() //remove message
    }

    $('#name').keyup(function() {
        $('#nameErrorMessage').remove()
        $('#emptyOptionErrorMessage').remove() //Real time Error remove on key-up
    })

    //for inputting Mail address
    if ($("#mail").val() === "" && $('#mailErrorMessage').length < 1) { //if the name is blank as there are no error messages for this
        $("#mail").before("<p id='mailErrorMessage'><span class='error' > " + errorMissingMail + " </span></p>"); //create error box
        errors = true; //log as error
    } else {
        $('#mailErrorMessage').remove() //remove message
    }

    $('#mail').keyup(function() { //remove mail error on typing in field
        $('#mailErrorMessage').remove()
    });


    $('#other-title').keyup(function() { //remove message on typing into other role
        $('#emptyOptionErrorMessage').remove();
    });


    if ($('select#title').val() === "pleaseSelect" && $('#selectErrorMessage').length < 1) { //if the title is default as there are no error messages for this already
        $("#title").before("<p id='selectErrorMessage'class='error'>" + selectErrorMessage + "</p>");
        $('#emptyOptionErrorMessage').remove();
        errors = true; //log as error
    } else if ($('select#title').val() === "other" && $('#other-title').val() === otherInfo && $('#emptyOptionErrorMessage').length < 1) { //this ensure the error message only shows when credit card is selected
        $("#title").before("<p id='emptyOptionErrorMessage'span class='error'> " + emptyOptionErrorMessage + " </span></p>"); //dynamically create error
        $('#selectErrorMessage').remove();
        errors = true; //log as error
    } else if ($('select#title').val() === "other" && $('#other-title').val() === "" && $('#emptyOptionErrorMessage').length < 1) { //this ensure the error message only shows when credit card is selected
        $("#title").before("<p id='emptyOptionErrorMessage'span class='error'> " + blankOptionErrorMessage + " </span></p>"); //dynamically create error
        $('#selectErrorMessage').remove()
        errors = true; //log as error
    } else {
        $('#selectErrorMessage').remove()
        $('#emptyOptionErrorMessage').remove();
    }


    if ($('input:checked').length < 1 && $('#activitiesErrorMessage').length < 1) { //if no input has been selected error & no other instance of error
        $(".activities legend").before("<p id='activitiesErrorMessage' class='error'>" + activitiesErrorMessage + "</p>"); //dynamically create error
        errors = true; //log as error
    } else {
        $("#activitiesErrorMessage").remove() //remove the error message
    }

    if ($('select#design').val() === "Select Theme" && $('#designErrorMessage').length < 1) {
        $("#colors-js-puns").parent().after("<p id='designErrorMessage' class ='error'>" + designErrorMessage + " </p>");
        errors = true; //log as error
    } else {
        $('#designErrorMessage').remove() //remove the error message
    }

    if ($('select#payment').val() === "select_method" && $('#paymentErrorMessage').length < 1) {
        $("#submit").before("<p id='paymentErrorMessage'class='error'> " + paymentErrorMessage + " </p>"); //dynamically create a message in <p> before the submit button
        errors = true; //log as error
    } else {
        $('#paymentErrorMessage').remove()
    }


    var cardNumber = $('#cc-num').val(); //get the card val
    var cardRange = /^[0-9]{13,16}$/ //ensure the card number is numeric between 13-16 characters
    var cardResult = cardRange.test(cardNumber); //test the field against the above criteria

    if (!cardResult && $('#cardErrorMessage').length < 1 && $('#payment').val() === "credit card") {
        $("#submit").before("<p id='cardErrorMessage'class='error'> " + cardErrorMessage + " </p>") //dynamically create a message in <p> before the submit button
        errors = true; //log as error //log as error

    } else {
        $("#cardErrorMessage").remove() //remove error message
    }

    var zipNumber = $('#zip').val(); //get the zip val
    var zipRange = /^[0-9]{5}$/ //ensure the zip number is numeric & 5 characters
    var zipResult = zipRange.test(zipNumber); //test the field against the above criteria

    if (!zipResult && $('#zipErrorMessage').length < 1 && $('#payment').val() === "credit card") { //if the zip is not valid, error exists already, and credit card is selected
        $("#submit").before("<p id='zipErrorMessage'class='error'> " + zipErrorMessage + " </p>") //dynamically create a message in <p> before the submit button
        errors = true; //log as error //log as error
    } else {
        $("#zipErrorMessage").remove() //remove error
    }

    var cvvNumber = $('#cvv').val(); //get cvv value
    var cvvRange = /^[0-9]{3}$/ //ensure cvv is numberic 3 digits
    var cvvResult = cvvRange.test(cvvNumber); //test against above criteria

    if (!cvvResult && $('#cvvErrorMessage').length < 1 && $('#payment').val() === "credit card") { //cvv isn't valid and cvv error message doesn't exist and credit card is selected
        $("#submit").before("<p id='cvvErrorMessage'class='error'> " + cvvErrorMessage + " </p>") //create <p> before submit
        errors = true; //log as error //log as error
    } else {
        $("#cvvErrorMessage").remove() //remove error
    }

    return !errors; //allow submit

})
