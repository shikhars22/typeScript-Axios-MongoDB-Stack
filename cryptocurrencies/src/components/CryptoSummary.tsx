import { Crypto } from '../Types';

export type AppProps = {
	crypto: Crypto;
};
export default function CryptoSummary({ crypto }: AppProps): JSX.Element {
	return (
		<p>
			<img
				src={crypto.image}
				width='15'
				alt=''
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
}
