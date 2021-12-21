import './App.css';
import React ,{useEffect,useState} from 'react';
import axios from 'axios'
import Coin from './Coin';


function App() {
  const [coins,setcoins]=useState([])
  const [search,setsearch]=useState('')
  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      setcoins(res.data)
    })
    .catch(err => console.log(err) )
  },[])


  const coinsfilter = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )




  return (
    <div className="coin-app">
      <div className="coin-search">
     <h1 className="coin-text">Search a currency</h1>
     <form>
       <input type="text" className="coin-input" placeholder='Search'
       onChange={(e)=> setsearch(e.target.value) } />
     </form>
      </div>

      {coinsfilter.map(coin=>{
        return(
        <Coin
        key={coin.id}
        name={coin.name}
        price={coin.current_price}
        symbol={coin.symbol}
        marketcap={coin.market_cap}
        volume={coin.total_volume} 
        image={coin.image}
        priceChange={coin.price_change_percentage_24h}
      />
        )
      })}
    </div>
  );
}

export default App;
