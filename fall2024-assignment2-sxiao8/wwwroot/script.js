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
        params = {
            'q': string + ' seven eleven',
            'count': 50,
            'offset': 0,
            'mkt': 'en-us'
        };
    }

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '14109db116ba4840a23e599f8978ebf3'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            var luckyURL = '';
            var checkInt = Math.floor(Math.random() * (20 - 10 + 1) + 10);

            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                if (i == checkInt) {
                    luckyURL = data.webPages.value[i].url;
                }
            }

            if (lucky == true) {
                window.open(luckyURL);
            }
            else {
                $('#searchResults').css("visibility", "visible");
                $('#searchResults').html(results);
            }
        })
        .fail(function () {
            alert('error');
        });
}

function hideSearchResults() {
    $('#searchResults').css('visibility', 'hidden');
}
