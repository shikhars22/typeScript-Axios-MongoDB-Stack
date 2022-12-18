import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { type } from 'os';

export type Crypto = {
	ath: number;
	atl: number;
	current_price: number;
	id: string;
	image: string;
	name: string;
	symbol: string;
	high_24h: number;
	low_24h: number;
};

function App() {
	const [cryptos, setCryptos] = useState<Crypto[] | null>();

	useEffect(() => {
		const url =
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false';
		axios.get(url).then((response) => {
			console.log(response.data);
			setCryptos(response.data);
		});
	}, []);
	return (
		<div className='App'>
			<h2>Here are the Cryptos</h2>
			{cryptos
				? cryptos.map((crypto) => {
						return (
							<p>
								<img
									src={crypto.image}
									width='15'
								/>
								{' ' +
									crypto.name +
									' ' +
									crypto.current_price.toLocaleString('en-US', {
										style: 'currency',
										currency: 'INR',
										minimumFractionDigits: 2,
									})}
							</p>
						);
				  })
				: null}
		</div>
	);
}

export default App;
