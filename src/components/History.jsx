import { useAuth } from "../context/authContext";
import { calculateCurrentCaffeineLevel, getCaffeineAmount, timeSinceConsumption } from "../utils";

export default function History() {
	const { globalData } = useAuth();
	return (
		<>
			<div className="section-header">
				<i className="fa-solid fa-timeline"></i>
				<h2>History</h2>
			</div>
			<p>
				<i>Hover for more information!</i>
			</p>
			<div className="coffee-history">
				{Object.keys(globalData)
					.sort((a, b) => b - a)
					.map((utcTime) => {
						const coffee = globalData[utcTime];
						const timeSinceConsume = timeSinceConsumption(utcTime);
						const originalAmout = getCaffeineAmount(coffee.name);
						const remainingAmount = calculateCurrentCaffeineLevel({
							[utcTime]: coffee,
						});

						const summary = `${coffee.name} | ${timeSinceConsume} | $${coffee.cost} | ${remainingAmount}mg / ${originalAmout}mg`;

						return (
							<div title={summary} key={utcTime}>
								<i className="fa-solid fa-mug-hot"></i>
							</div>
						);
					})}
			</div>
		</>
	);
}
