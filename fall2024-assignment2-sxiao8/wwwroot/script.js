function getTime() {
    var d = new Date;
    var formatted = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    var time = `<p> ${formatted} </p>`

    $('#time').html(time);
    $('#time').dialog({
        position: {
            at: "left top",
        }
    });
    $('#time').css("visibility", "visible");
}

function changeBkg() {
    var item = document.getElementById("body");
    var y = item.getAttribute("class");
    if (y === "bg1") {
        item.setAttribute("class", "bg2");
    } else {
        item.setAttribute("class", "bg1");
    }
}

function randomStringGenerator() {
    var string = '';

    //for loop of random size
    for (let i = 0; i < Math.floor(Math.random() * (30 - 10 + 1) + 10); i++) {
        string += String.fromCharCode(Math.floor(Math.random() * (127 - 33 + 1) + 33));
    }
    return string;
}

function apiSearch(lucky) {
    $('#searchResults').css("visibility", "visible");
    var params;
    var string;

    if (lucky == false) {
        params = {
            'q': $('#query').val() + ' seven eleven',
            'count': 50,
            'offset': 0,
            'mkt': 'en-us'
        };
    }

    else {
        string = randomStringGenerator();
        console.log(string);
        params = {
            'q': string + ' seven eleven',
            'count': 50,
            'offset': 0,
            'mkt': 'en-us'
        };
    }
    console.log('https://api.bing.microsoft.com/v7.0/search?' + $.param(params));

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '--'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            //$('searchResults').dialog(
            //    position: {
            //    at: "right",
            //}
            //);
        })
        .fail(function () {
            alert('error');
        });
}
