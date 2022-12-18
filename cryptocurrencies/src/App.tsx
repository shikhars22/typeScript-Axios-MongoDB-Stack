import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { Crypto } from './Types';

function App() {
	const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
	const [selected, setSelected] = useState<Crypto | null>();

	useEffect(() => {
		const url =
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false';
		axios.get(url).then((response) => {
			console.log(response.data);
			setCryptos(response.data);
		});
	}, []);
	return (
		<>
			<div className='App'>
				<h2>Here are the Cryptos</h2>
				<select
					onChange={(e) => {
						console.log(e.target.value);
						const c = cryptos?.find((x) => x.id === e.target.value);
						setSelected(c);
						console.log(c);
					}}
					defaultValue='default'>
					<optgroup label='Default'>
						<option value={'default'}>Choose an Option</option>
					</optgroup>
					<optgroup label='Coins'>
						{cryptos
							? cryptos.map((crypto) => {
									// return <CryptoSummary crypto={crypto} />;
									return (
										<option
											key={crypto.id}
											value={crypto.id}>
											{crypto.name}
										</option>
									);
							  })
							: null}
					</optgroup>
				</select>
			</div>
			{selected ? <CryptoSummary crypto={selected} /> : null}
		</>
	);
}

export default App;
