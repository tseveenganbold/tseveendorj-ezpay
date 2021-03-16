import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {
	Card,
	Container,
	BoxWrapper,
	BoxBlue,
	BoxRed,
	CardWrapper,
} from "./styles";

const username = prompt("Тоглогч нэрээ оруулна уу");

function App() {
	const [state, setState] = useState({
		colorType: "",
		name: username,
		blueCount: 1,
		redCount: 1,
	});
	const [changeLog, setChangeLog] = useState([]);
	const socketRef = useRef();

	useEffect(() => {
		socketRef.current = io.connect("http://localhost:4000");
		socketRef.current.on(
			"colorType",
			({ name, colorType, blueCount, redCount }) => {
				setChangeLog([...changeLog, { name, colorType, blueCount, redCount }]);
			},
		);
		return () => socketRef.current.disconnect();
	}, [changeLog]);

	const renderChangeLog = () => {
		return changeLog.map(({ name, colorType, redCount, blueCount }, index) => (
			<div key={index} style={{ display: colorType == "" ? "none" : "block" }}>
				<h3 style={{ color: "#2f72da" }}>
					{name}{" "}
					<span style={{ color: "black" }}>
						нь өмнөх удаад {colorType} өнгө сонгосон байна.
					</span>
					<BoxWrapper>
						<BoxRed inputColor="red" flexRed={redCount} />
						<BoxBlue inputColor="blue" flexBlue={blueCount} />
					</BoxWrapper>
				</h3>
			</div>
		));
	};
	return (
		<>
			<Card>
				<CardWrapper>
					<h1>Сайн байна уу, {state.name}</h1>
					<Container>
						<button
							style={{
								margin: "0",
								backgroundColor: "red",
								border: "3px solid black",
								width: "50px",
								padding: "10px",
								borderRadius: "5px",
							}}
							onClick={() => {
								const { name, colorType, blueCount, redCount } = state;
								setState({
									colorType: "улаан",
									name,
									blueCount,
									redCount: state.redCount + 1,
								});
								socketRef.current.emit("colorType", {
									name,
									colorType,
									blueCount,
									redCount,
								});
							}}
						></button>
						<BoxWrapper>
							<BoxRed inputColor="red" flexRed={state.redCount} />
							<BoxBlue inputColor="blue" flexBlue={state.blueCount} />
						</BoxWrapper>
						<button
							style={{
								margin: "0",
								backgroundColor: "blue",
								border: "3px solid black",
								width: "50px",
								padding: "10px",
								borderRadius: "5px",
							}}
							onClick={() => {
								const { name, colorType, blueCount, redCount } = state;
								setState({
									colorType: "цэнхэр",
									name,
									blueCount: state.blueCount + 1,
									redCount,
								});
								socketRef.current.emit("colorType", {
									name,
									colorType,
									blueCount,
									redCount,
								});
							}}
						></button>
					</Container>
				</CardWrapper>

				<CardWrapper>
					<h1>Change log</h1>
					{renderChangeLog()}
				</CardWrapper>
			</Card>
		</>
	);
}

export default App;
