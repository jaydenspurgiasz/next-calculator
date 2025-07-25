"use client";
import React from "react";

const Mathbox = () => {
	const [value, setValue] = React.useState("");

	return (
		<>
			<input
				type="text"
				placeholder="Enter math..."
				className="input"
				onChange={(e) => setValue(e.target.value)}
				onKeyUp={(e) => (e.key === "Enter" ? console.log(value) : null)}
			/>
		</>
	);
};

export default Mathbox;
