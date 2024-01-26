<!-- Buttons container with 'Bet' button and 'Close' button -->
<div id="buttons">

    <!-- Container for the 'Bet' button -->
    <div class="new-btn-container">
        <a href="#popupBasic"
        id="bet-btn" 
        class="ui-btn ui-corner-all ui-shadow ui-btn-inline" 
        data-transition="pop">Bet</a>
    </div>

    <!-- Popup for a finished match -->
    <div data-role="popup" id="popupBasic">
        <p>This match is finished. Please click on next one.</p>
    </div>

    <!-- Container for the 'Close' button -->
    <div class="close-btn-container">
        <a href="" data-role="button" data-rel="back" data-theme="b" data-inline="true" id="close">
            close
        </a>
    </div>
</div>