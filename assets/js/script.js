
        $(document).ready(function () {
            // Fetch the initial list of cryptocurrencies and start real-time updates
            initializeCryptoList();

            // Set up the click event for the search button
            $('#search-button').click(function () {
                searchCrypto();
            });
        });

        function initializeCryptoList() {
            const symbols = [
                'btcusdt', 'ethusdt', 'bnbusdt', 'xrpusdt', 'adausdt',
                'solusdt', 'dogeusdt', 'dotusdt', 'maticusdt', 'shibusdt',
                'ltcusdt', 'avaxusdt', 'linkusdt', 'xlmusdt', 'uniusdt',
                'bchusdt', 'algousdt', 'atomusdt', 'vetusdt', 'ftmusdt'
            ];  
            let wsStreams = symbols.map(symbol => {
                return new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
            });

            wsStreams.forEach((ws, index) => {
                ws.onmessage = function (event) {
                    let data = JSON.parse(event.data);
                    updateCryptoRow(data.s, parseFloat(data.p));
                };
            });

            populateInitialRows(symbols);
        }

        function populateInitialRows(symbols) {
            const tbody = $('#crypto-table-body');
            tbody.empty();
            symbols.forEach((symbol, index) => {
                const row = `<tr id="row-${symbol}">
                                <td>${index + 1}</td>
                                <td>${symbol.slice(0, -4).toUpperCase()}</td>
                                <td>${symbol.toUpperCase()}</td>
                                <td class="crypto-price" id="price-${symbol}">$0.00</td>
                            </tr>`;
                tbody.append(row);
            });
        }

        function updateCryptoRow(symbol, price) {
            $(`#price-${symbol.toLowerCase()}`).text(`$${price.toFixed(2)}`);
        }

        function searchCrypto() {
            const query = $('#search-bar').val().trim().toLowerCase();
            if (query) {
                $.ajax({
                    url: `https://api.coingecko.com/api/v3/coins/markets`,
                    method: 'GET',
                    data: {
                        vs_currency: 'usd',
                        ids: query  // The 'ids' parameter expects a CoinGecko coin ID like 'bitcoin' or 'ethereum'
                    },
                    success: function (data) {
                        if (data.length > 0) {
                            displayCryptoDetails(data[0]);  // Use the first item in the response
                        } else {
                            alert('Cryptocurrency not found');
                        }
                    },
                    error: function () {
                        alert('Failed to search cryptocurrency. Please try again later.');
                    }
                });
            }
        }

        function displayCryptoDetails(crypto) {
            $('#crypto-details').show();
            $('#crypto-list').hide();

            $('#detail-name').text(crypto.name);
            $('#detail-symbol').text(crypto.symbol.toUpperCase());
            $('#detail-price').text('$' + crypto.current_price.toFixed(2));
            $('#detail-market-cap').text('$' + crypto.market_cap.toLocaleString());
            $('#detail-volume').text('$' + crypto.total_volume.toLocaleString());

            // Set the icon image
            $('#crypto-icon').attr('src', crypto.image);
        }