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
	const [selected, setSelected] = useState<Crypto[]>([]);
	const [range, setRange] = useState<number>(30);
	/* 	const [data, setData] = useState<ChartData<'line'>>();
	const [options, setOptions] = useState<ChartOptions<'line'>>({
		responsive: true,
		plugins: {
			legend: {
				display: false,
				// position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Chart.js Line Chart',
			},
		},
	});
 */
	useEffect(() => {
		const url =
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false';
		axios.get(url).then((response) => {
			// console.log(response.data);
			setCryptos(response.data);
		});
	}, []);
	/* 
	useEffect(() => {
		if (!selected) return;
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/${
					selected?.id
				}/market_chart?vs_currency=inr&days=${range}&${
					range === 1 ? 'interval=hourly' : `interval=daily`
				}`
			)
			.then((response) => {
				console.log(response.data);
				setData({
					labels: response.data.prices.map((price: number[]) => {
						return moment
							.unix(price[0] / 1000)
							.format(range === 1 ? 'HH:MM' : 'DD-MM-YYYY');
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
				setOptions({
					responsive: true,
					plugins: {
						legend: {
							display: false,
						},
						title: {
							display: true,
							text:
								`${selected?.name} Price over Last ` +
								(range === 1 ? `Day` : range + ` Days`),
						},
					},
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}, [selected, range]); */

	useEffect(() => {
		console.log('selcted : ', selected);
	}, [selected]);

	function updateOwned(crypto: Crypto, amount: number): void {
		console.log('updateowned', crypto, amount);
		let temp = [...selected];
		let tempObj = temp.find((c) => c.id === crypto.id);
		if (tempObj) {
			tempObj.owned = amount;
			setSelected(temp);
		}
	}
	return (
		<>
			<div className='App'>
				<h2>Here are the Cryptos</h2>
				<select
					key={'select'}
					onChange={(e) => {
						// console.log(e.target.value);
						const c = cryptos?.find((x) => x.id === e.target.value) as Crypto;
						setSelected([...selected, c]);
						// console.log(c);
					}}
					defaultValue='default'>
					<optgroup
						key='choose'
						label='Default'>
						<option
							key='choose'
							value={'default'}>
							Choose an Option
						</option>
					</optgroup>
					<optgroup
						key='coins'
						label='Coins'>
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
				{/* <select
					onChange={(e) => {
						setRange(parseInt(e.target.value));
					}}>
					<option value={30}>30 days</option>
					<option value={7}>7 days</option>
					<option value={1}>1 day</option>
				</select> */}
			</div>
			{selected.map((s) => {
				return (
					<CryptoSummary
						crypto={s}
						updateOwned={updateOwned}
					/>
				);
			})}
			{/* {selected ? <CryptoSummary crypto={selected} /> : null} */}
			{/* 		{data ? (
				<div style={{ width: 600 }}>
					<Line
						options={options}
						data={data}
					/>
				</div>
			) : null} */}
			<h3>Portfolio amounts owned for different coins</h3>
			{selected
				? selected.map((s) => {
						return (
							<p>
								{s.name + '------------'}
								{isNaN(s.current_price * s.owned)
									? null
									: (s.current_price * s.owned).toLocaleString('en-IN', {
											style: 'currency',
											currency: 'INR',
											minimumFractionDigits: 2,
									  })}
							</p>
						);
				  })
				: null}
			<h3>Your portfolio value: </h3>
			{selected
				? selected
						.map((s) => {
							if (isNaN(s.owned)) {
								return 0;
							}
							return s.current_price * s.owned;
						})
						.reduce((prev, current) => {
							return prev + current;
						}, 0)
						.toLocaleString('en-IN', {
							style: 'currency',
							currency: 'INR',
							minimumFractionDigits: 2,
						})
				: null}
		</>
	);
}

export default App;
