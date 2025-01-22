import {
	calculateCurrentCaffeineLevel,
	coffeeConsumptionHistory,
	getCaffeineAmount,
	timeSinceConsumption,
} from "../utils";

export default function History() {
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
				{Object.keys(coffeeConsumptionHistory)
					.sort((a, b) => b - a)
					.map((utcTime) => {
						const coffee = coffeeConsumptionHistory[utcTime];
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
