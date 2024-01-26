$j.ajax({

    // AJAX request to fetch match data from the specified URL
    url: "http://demo7719890.mockable.io/matches",

    //force to handle it as text
    dataType: "text",

    // Callback function on successful AJAX request
    success: function (data) {

        // Parse the received data as JSON
        var json = $j.parseJSON(data);

        // Loop through each match in the JSON data
        for (var i = 0; i < json.length; ++i) {

            // Append a list item for the match date, formatted using the 'moment' library
            $j('#date-match').append('<li class="date" data-date-time="' + json[i].startDate + '">'
                + moment(json[i].startDate).format("DD.M.YYYY") + '</li>');
            
            // Remove duplicate dates from the list
            $j(function () {
                var seen = {};
                $j('li').each(function () {
                    var txt = $j(this).text();

                    if (seen[txt]) {
                        $j(this).remove();
                    }

                    else
                    {
                        seen[txt] = true;
                    }        
                });
            });

            // Append a list item for the match details
            $j('#date-match').append('<li data-id="' + json[i].id + '"' + 'class="match ' + json[i].status +
                '" title="' + moment(json[i].startDate).format("DD.M.YYYY") + '" time="' + json[i].startTime + '" text="' + json[i].name + '"' +
                'date-time="' + json[i].startDate + ' ' + json[i].startTime + '"> ' +
                '<a href="#d" data-transition="pop" class="dialog">' + json[i].name + '</a></li>');
            
            // Click event for the match item
            const jData = json[i];
            $j('.match').on("click",json, function () {
                const nameId = $j(this).attr('data-id');
                $j.each(jData, function () {

                    if (jData.id === nameId)
                    {
                        // Update the details in the UI based on the selected match
                        $j('#name-match').html('<h1 class="named">' + jData.name + '</h1>');
                        $j('.start-time-date-wrapper').html('<p class="start-time">' + jData.startTime + '</p>' +
                            '<p class="start-date">' + jData.startDate + '</p></div>');
                        $j('.possible-win').html('<p class="possible">' + jData.possibleWinner + '</p>');
                        $j('.now-status').html('<p class="match-status">' + jData.status + '</p>');
                    }
                });
            });
        }

         // Group list items by date and append them to the respective date
        $j('#id li:not([title])').append('<ul />');
        $j('#id li[title]').each(function () {
            $j(this).appendTo('#id li:contains(' + $j(this).attr('title') + ') ul');
            $j('.date').find('ul').addClass('events');
        });

        // Check the number of game-finished elements and add a class accordingly
        $j('div > ul > li > ul').each(function (index, obj) {
            let thisClass = $j(obj).find('.game-finished')

            if (thisClass.length >= 2)
            {
                thisClass.addClass('done');
            }

            else if (thisClass.length <= 1)
            {
                thisClass.removeClass('done');
            }
        });

        // Click event for the match item to update UI based on game status
        $j('.match').click(function () {
            $j('.start-time-date-wrapper').each(function () {
            let date = $(this).find('.start-date').text();
            let newDate = moment(date).format("DD.M.YYYY");
                $j('.start-date').text(newDate);
        });

            let dialog = $j(this).find('.dialog');
            
            if ($j(this).hasClass('game-finished'))
            { 
                $j('#bet-btn').addClass('ui-btn-new');
                $j('#bet-btn').attr('data-rel', 'popup')
                $j('.start-time').css({ fontSize: 1 + 'em' });
                $j('.start-date').css({ fontSize: 1 + 'em' });
                
                dialog.addClass('disabled');
                $j('.disabled').remove();
                let txt = $j(this).attr('text');
                $j(this).text(txt).css({ padding: '0.5em'});
            }

            else
            {
                $j('#bet-btn').removeClass('ui-btn-new');
                $j('#bet-btn').attr('data-rel', 'back');
                dialog.removeClass('disabled');
            }
        });

        // Click event for the game-finished item to display next match details
        $j('.game-finished').click(function () { 
            let next = $(this).next().text();

            if (next.trim() === '')
            { 
                let notFind = $j(this).parent().parent().next().children().children().first().text();
                $j('.next-match').append('<button class="next-btn">' + notFind + '</button>');
            }

            else
            {
                $j('.next-match').append('<button class="next-btn">' + next + '</button>');
            }
        });

        // Click event to close the next match details
        $j('#close').click(function () {
            $j('.next-btn').remove();
        });

        // Sort the list items by date in descending order
        $j(function($j) {
            var container = $j("#date-match");
            var items = $j(".date");

            items.sort(function(a, b) {
                let d1 = new Date($j(a).attr("data-date-time"));
                let d2 = new Date($j(b).attr("data-date-time"));
                return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
            }).each(function() {
                container.prepend(this);
            });
        })($j);
    }
});





