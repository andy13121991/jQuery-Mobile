// Make an Ajax request to fetch match data from a mock API
$j.ajax({
    url: "http://demo7719890.mockable.io/matches",
    dataType: "json",
    success: function (matches) {

        // Initialize variables to store HTML and unique dates
        let appendHtml = '';
        let uniqueDates = new Set();

        // Iterate through each match in the data
        $j.each(matches, function (i, match) {

            // Format the date using Moment.js
            let date = moment(match.startDate).format("DD.MM.YYYY");

            // Check if the date is unique, if yes, add it to the HTML
            if (!uniqueDates.has(date))
            {
                appendHtml += '<li class="date" data-date-time="' + match.startDate + '">' + date + '</li>';
                uniqueDates.add(date);
            }

            // Append the match details to the HTML
            appendHtml += '<li data-id="' + match.id + '" class="match ' + match.status +
                '" title="' + date + '" time="' +
                match.startTime + '" text="' + match.name + '"' +
                'date-time="' + match.startDate + ' ' + match.startTime + '"> ' +
                '<a href="#d" data-transition="pop" class="dialog">' + match.name + '</a></li>';

            // Set the HTML content in the specified element
            $j('#date-match').html(appendHtml);
            
            // Attach a click event to each match for further actions
            $j('.match').on("click", function () {

                // Get the selected match based on its ID
                let nameId = $j(this).attr('data-id');
                let selectedMatch = matches.find(item => item.id === nameId);

                // Update the UI with the details of the selected match
                if (selectedMatch)
                {

                    // Update the name, start time, start date, possible winner, and status
                    $j('#name-match').html('<h1 class="named">' + selectedMatch.name + '</h1>');
                    $j('.start-time-date-wrapper').html('<p class="start-time">' + selectedMatch.startTime + '</p>' +
                        '<p class="start-date">' + moment(selectedMatch.startDate).format("DD.MM.YYYY") + '</p></div>');
                    $j('.possible-win').html('<p class="possible">' + selectedMatch.possibleWinner + '</p>');
                    $j('.now-status').html('<p class="match-status">' + selectedMatch.status + '</p>');
                }

                else
                {
                    // If match not found, do nothing
                    return;
                }

                 // Handle the dialog and button based on the match status
                let dialog = $j(this).find('.dialog');

                if ($j(this).hasClass('game-finished'))
                {
                    // Handle UI changes for finished games
                    $j('#bet-btn').addClass('ui-btn-new').attr('data-rel', 'popup');
                    $j('.start-time, .start-date').css({ fontSize: '1em' });

                    // Disable the dialog and modify the text
                    dialog.addClass('disabled').remove();
                    let text = $j(this).attr('text');
                    $j(this).text(text).css({ padding: '0.5em' });
                }
                
                else
                {
                    // Handle UI changes for ongoing games
                    $j('#bet-btn').removeClass('ui-btn-new').attr('data-rel', 'back');
                    dialog.removeClass('disabled');
                }
                });
        });

        // Group list items by date and append them to the respective date
        $j('#date-match li:not([title])').append('<ul />');
        $j('#date-match li[title]').each(function () {
            $j(this).appendTo('#date-match li:contains(' + $j(this).attr('title') + ') ul');
            $j('.date').find('ul').addClass('events');
        });

        // Check the number of game-finished elements and add a class accordingly
        $j('div > ul > li > ul').each(function (index, obj) {
            let thisClass = $j(obj).find('.game-finished');

            if (thisClass.length >= 2)
            {
                thisClass.addClass('done');
            }
            
            else if (thisClass.length <= 1)
            {
                thisClass.removeClass('done');
            }
        });

        // Add a click event to the 'game-finished' elements
        $j('.game-finished').click(function () {

            // Get the text of the next match or use the text of the current match if not found
            let next = $j(this).next().text();
            let notFind = $j(this).parent().parent().next().children().children().first().text();

            // Append a button with the next match text
            $j('.next-match').append('<button class="next-btn">' + (next.trim() === '' ? notFind : next) + '</button>');
        });

        // Add a click event to the 'close' button to remove next buttons
        $j('#close').click(function () {
            $j('.next-btn').remove();
        });

        // Sort the list items by date in descending order
        (function ($j) {
            var container = $j("#date-match");
            var items = $j(".date");

            items.sort(function (a, b) {
                let date1 = new Date($j(a).attr("data-date-time"));
                let date2 = new Date($j(b).attr("data-date-time"));
                return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
            }).each(function () {
                container.prepend(this);
            });
        })($j);
    }
});
