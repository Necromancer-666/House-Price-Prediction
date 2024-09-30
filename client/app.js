function onPageLoad(){
    console.log("document loaded");
    //var url = "http://127.0.0.1:5000/get_location_names";
    var url = "/api/get_location_names";
    $.get(url,function(data,status){
        console.log("got response for get_location_name request");
        if(data){
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $("#uiLocations").empty();
            for(var i in locations){
                var opt = new Option(locations[i]);
                $("#uiLocations").append(opt);
            }
        }
    });
}

function onClickedEstimatePrice(){
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var locations = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
    
    //var url = "http://127.0.0.1:5000/predict_home_price";
    var url = "/api/predict_home_price";
    if(sqft.value<10 || sqft.value>100000 || isNaN(sqft.value)){
        alert("The entered value is not admissible")
    }
    else{
        $.post(url,{
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: locations.value
        },function(data, status){
        console.log(data.estimated_price);
        if(data.estimated_price<100){
            estPrice.innerHTML = "<h2>" + data.estimated_price.toString()+" Lakh</h2>";
        }
        else{
            estPrice.innerHTML = "<h2>" + ((data.estimated_price/100).toFixed(3)).toString()+" Crore</h2>";
        }
        console.log(status);
        })
    }
}

function getBathValue(){
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms){
        if(uiBathrooms[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}

function getBHKValue(){
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK){
        if(uiBHK[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the input field and button
    const inputField = document.getElementById('uiSqft');
    const estimateBtn = document.getElementById('uiEstimatedPrice');
    
    // Add event listener for Enter key press on input field
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission
            estimateBtn.click(); // Trigger the button click
        }
    });
    // Add click event listener to Estimate Price button
    estimateBtn.addEventListener('click', function() {
        onClickedEstimatePrice();
    });
});

window.onload = onPageLoad;