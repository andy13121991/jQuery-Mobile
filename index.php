<!DOCTYPE html>
<html lang="en">

<head>
    <?php include './components/head.php' ?>
</head>

<body>

    <!-- Main page content -->
    <main data-role="page">
        <div id="id" data-role="main" class="ui-content">

            <!-- List to display match dates -->
            <ul id="date-match"></ul>
        </div>
    </main>

    <!-- Modal page for detailed match information -->
    <div data-role="page" id="d">

        <?php include './components/modal.php' ?>

            <?php include './components/buttons.php' ?>

            <!-- Container for displaying the details of the next match -->
            <div class="next-match"></div>
        </div>
    </div>  
</div>
</body>

</html>