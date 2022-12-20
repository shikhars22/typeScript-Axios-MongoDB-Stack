import { useEffect, useState } from 'react';
import { Crypto } from '../Types';

export type AppProps = {
	crypto: Crypto;
	updateOwned: (crypto: Crypto, amount: number) => void;
};
export default function CryptoSummary({
	crypto,
	updateOwned,
}: AppProps): JSX.Element {
	const [amount, setAmount] = useState<number>(0);

	useEffect(() => {
		console.log(crypto.name, amount, crypto.current_price * amount);
	});

	return (
		<div key={crypto.id}>
			<span>
				{' ' +
					crypto.name +
					' ' +
					crypto.current_price.toLocaleString('en-IN', {
						style: 'currency',
						currency: 'INR',
						minimumFractionDigits: 2,
					})}
				{/* <br />
				<br /> */}
				<img
					style={{ margin: 10 }}
					src={crypto.image}
					width='70'
					alt=''
				/>
			</span>
			<input
				type='number'
				style={{ margin: 10 }}
				value={amount}
				onChange={(e) => {
					setAmount(parseFloat(e.target.value));
					updateOwned(crypto, parseFloat(e.target.value));
				}}></input>
			<p>
				{isNaN(amount)
					? '₹ 0.00'
					: (crypto.current_price * amount).toLocaleString('en-IN', {
							style: 'currency',
							currency: 'INR',
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
					  })}
			</p>
		</div>
	);
}
