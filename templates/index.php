
<?php
session_start();
if(!isset($_SESSION['user_id'])){
    header("Location:./../index.html");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cryptocurrency Tracker</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="./../assets/css/style.css">
</head>

<body>
    <div class="container">
        <h1>Cryptocurrency Tracker</h1>
        <input type="text" id="search-bar" placeholder="Search for a cryptocurrency...">
        <button id="search-button">Search</button>

        <div id="crypto-list">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody id="crypto-table-body"></tbody>
            </table>
        </div>

        <div id="crypto-details" style="display: none;">
            <h2>Cryptocurrency Details</h2>
            <table>
                <tr>
                    <th>Name:</th>
                    <td id="detail-name"></td>
                </tr>
                <tr>
                    <th>Symbol:</th>
                    <td id="detail-symbol"></td>
                </tr>
                <tr>
                    <th>Icon:</th>
                    <td id="detail-icon"><img id="crypto-icon" src="" alt="Crypto Icon"
                            style="width: 30px; height: 30px;"></td>
                </tr>
                <tr>
                    <th>Current Price (USD):</th>
                    <td id="detail-price"></td>
                </tr>
                <tr>
                    <th>Market Cap (USD):</th>
                    <td id="detail-market-cap"></td>
                </tr>
                <tr>
                    <th>Volume (24h):</th>
                    <td id="detail-volume"></td>
                </tr>
            </table>
            <button onclick="$('#crypto-details').hide(); $('#crypto-list').show();" class="btn-back">Back to
                list</button>
        </div>
    </div>

    <script src="./../assets/js/script.js"></script>
</body>

</html>