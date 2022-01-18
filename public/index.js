

async function main() {
    
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    // const response = fetch("https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=5min&apikey=9d9d297ca258418291d7f5856e1b5506")
    // const data = await (await response).json()
    const { GME, MSFT, DIS, BNTX } = mockData;
        const stocks = [GME, MSFT, DIS, BNTX];
        function getColor(stock){
            if(stock === "GME"){
                return 'rgba(61, 161, 61, 0.7)'
            }
            if(stock === "MSFT"){
                return 'rgba(209, 4, 25, 0.7)'
            }
            if(stock === "DIS"){
                return 'rgba(18, 4, 209, 0.7)'
            }
            if(stock === "BNTX"){
                return 'rgba(166, 43, 158, 0.7)'
            }
        }

        
        
        stocks.forEach(stock=>stock.values.reverse())
        new Chart(timeChartCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: stocks[0].values.map( value => value.datetime),
                datasets: stocks.map(stock =>({
                    label: stock.meta.symbol,
                    data: stock.values.map(value => parseFloat(value.high)),
                    backgroundColor: getColor(stock.meta.symbol),
                    borderColor:getColor(stock.meta.symbol),
                    
                        
                    }))
            }
            
        });
        function getHighest(values){
            let highest = values[0].high
            for(let i=0; i<values.length; i++){
                if(values[i].high> highest){
                    highest = parseFloat(values[i].high)
                }

            }
            return highest

        }
        new Chart(highestPriceChartCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: stocks.map(stock => stock.meta.symbol) ,
                datasets: [{
                    label: "Highest",
                    data: stocks.map(stock => getHighest(stock.values)),
                    backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                    borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
                    
                        
                }]
            }
            
        });
        function getAverage(values){
            let total = 0
            for(let i=0; i<values.length; i++){

                total = parseFloat(values[i].high) + total
            }
            let average = total/values.length
            return average

        }

        new Chart(averagePriceChartCanvas.getContext('2d'), {
            type: 'pie',

            data: {
                labels: stocks.map(stock => stock.meta.symbol) ,
                datasets: [{
                    label: "Average",
                    data: stocks.map(stock => getAverage(stock.values)),
                    backgroundColor:   stocks.map(stock => getColor(stock.meta.symbol)),
                    borderColor:  stocks.map(stock => getColor(stock.meta.symbol)),
                    
                        
                }]
            }
            
        });
                    
                                                            
}

main()