import { Crypto } from '../Types';

export type AppProps = {
	crypto: Crypto;
};
export default function CryptoSummary({ crypto }: AppProps): JSX.Element {
	return (
		<p>
			{' ' +
				crypto.name +
				' ' +
				crypto.current_price.toLocaleString('en-US', {
					style: 'currency',
					currency: 'INR',
					minimumFractionDigits: 2,
				})}
			<br />
			<br />
			<img
				src={crypto.image}
				width='50'
				alt=''
			/>
		</p>
	);
}
