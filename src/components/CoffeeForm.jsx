import { useState } from "react";
import { coffeeOptions } from "../utils";
import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/authContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

// eslint-disable-next-line react/prop-types
export default function CoffeeForm({ isAuthenticated }) {
	const [showModal, setShowModal] = useState(false);
	const [selectedCoffee, setSelectedCoffee] = useState(null);
	const [showCoffeeType, setShowCoffeeType] = useState(false);
	const [coffeeCost, setCoffeeCost] = useState(0);
	const [hours, setHours] = useState(0);
	const [mins, setMins] = useState(0);

	const { globalData, setGlobalData, globalUser } = useAuth();

	async function handleSubmit() {
		if (!isAuthenticated) {
			setShowModal(true);
			return;
		}
		if (!selectedCoffee) return;

		try {
			const newGlobalData = {
				...(globalData || {}),
			};

			const nowTime = Date.now();
			const timeToSubstract = hours * 60 * 60 * 1000 + mins * 60 * 1000;
			const timestamp = nowTime - timeToSubstract;

			const newData = {
				name: selectedCoffee,
				cost: coffeeCost,
			};
			newGlobalData[timestamp] = newData;
			console.log(timestamp, selectedCoffee, coffeeCost);

			setGlobalData(newGlobalData);
			const userRef = doc(db, "users", globalUser.uid);
			await setDoc(
				userRef,
				{
					[timestamp]: newData,
				},
				{ merge: true },
			);

			setSelectedCoffee(null);
			setCoffeeCost(0);
			setHours(0);
			setMins(0);
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<>
			{showModal && (
				<Modal handleCloseModal={() => setShowModal(false)}>
					<Authentication handleCloseModal={() => setShowModal(false)} />
				</Modal>
			)}

			{/* Header */}
			<div className="section-header">
				<i className="fa-solid fa-pencil"></i>
				<h2>Start Tracking Today</h2>
			</div>

			{/* Select Coffee */}
			<h4>Select coffee type</h4>
			<div className="coffee-grid">
				{/* Show Top 5 coffees */}
				{coffeeOptions.slice(0, 5).map((option) => (
					<button
						key={option.name}
						className={"button-card" + (option.name === selectedCoffee ? "coffee-button-selected" : "")}
						onClick={() => {
							setSelectedCoffee(option.name);
							setShowCoffeeType(false);
						}}
					>
						<h4>{option.name}</h4>
						<p>{option.caffeine} mg</p>
					</button>
				))}
				<button
					className={"button-card" + (showCoffeeType ? "coffee-button-selected" : "")}
					onClick={() => {
						setShowCoffeeType(true);
						setSelectedCoffee(null);
					}}
				>
					<h4>Other</h4>
					<p>n/a</p>
				</button>
			</div>
			{/* Show Other coffees */}
			{showCoffeeType && (
				<select onChange={(e) => setSelectedCoffee(e.target.value)} name="coffee-list" id="coffee-list">
					<option value={null}>Select type</option>
					{coffeeOptions.slice(5).map((option) => (
						<option key={option.name} value={option.name}>
							{option.name} ({option.caffeine}mg)
						</option>
					))}
				</select>
			)}

			{/* Add Cost */}
			<h4>Add the cost ($)</h4>
			<input
				type="number"
				placeholder="4.50"
				className="w-full"
				value={coffeeCost}
				onChange={(e) => setCoffeeCost(e.target.value)}
			/>

			{/* Time Consumtion */}
			<h4>Time since consumption</h4>
			<div className="time-entry">
				<div>
					<h6>Hours</h6>
					<select name="hours-select" id="hours-select" onChange={(e) => setHours(e.target.value)}>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(
							(hour) => (
								<option value={hour} key={hour}>
									{hour}
								</option>
							),
						)}
					</select>
				</div>
				<div>
					<h6>Mins</h6>
					<select name="mins-select" id="mins-select" onChange={(e) => setMins(e.target.value)}>
						{[0, 5, 10, 15, 30, 45].map((min) => (
							<option value={min} key={min}>
								{min}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Submit Form */}
			<button onClick={handleSubmit}>
				<p>Add Entry</p>
			</button>
		</>
	);
}
