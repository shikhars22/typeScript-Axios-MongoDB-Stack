import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { Crypto } from './Types';
import type { ChartData, ChartOptions } from 'chart.js';
import React from 'react';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

function App() {
	const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
	const [selected, setSelected] = useState<Crypto | null>();
	const [data, setData] = useState<ChartData<'line'>>();
	const [options, setOptions] = useState<ChartOptions<'line'>>({
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Chart.js Line Chart',
			},
		},
	});

	useEffect(() => {
		const url =
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false';
		axios.get(url).then((response) => {
			// console.log(response.data);
			setCryptos(response.data);
		});
	}, []);
	return (
		<>
			<div className='App'>
				<h2>Here are the Cryptos</h2>
				<select
					onChange={(e) => {
						// console.log(e.target.value);
						const c = cryptos?.find((x) => x.id === e.target.value);
						setSelected(c);
						// console.log(c);
						axios
							.get(
								`https://api.coingecko.com/api/v3/coins/${c?.id}/market_chart?vs_currency=inr&days=30&interval=daily`
							)
							.then((response) => {
								console.log(response.data);
								setData({
									labels: response.data.prices.map((price: number[]) => {
										return moment.unix(price[0] / 1000).format('DD-MM-YYYY');
									}),
									datasets: [
										{
											label: 'Dataset 1',
											data: response.data.prices.map((price: number[]) => {
												return price[1];
											}),
											borderColor: 'rgb(255, 99, 132)',
											backgroundColor: 'rgba(255, 99, 132, 0.5)',
										},
									],
								});
								// console.log(data);
							})
							.catch((e) => {
								console.log(e);
							});
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
			{data ? (
				<div style={{ width: 600 }}>
					<Line
						options={options}
						data={data}
					/>
				</div>
			) : null}
		</>
	);
}

export default App;
