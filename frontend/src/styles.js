import styled from "styled-components";

export const Card = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin: 30px;
	min-height: 30rem;
`;

export const CardWrapper = styled.div`
	width: 350px;
	border-radius: 5px;
	padding: 20px;

	box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
	@media only screen and (max-width: 800px) {
		max-width: 350px;
	}
`;
export const Container = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 60px;
	align-items: center;
`;
export const BoxWrapper = styled.div`
	display: flex;
	flex-direction: row;
	height: 50px;
	width: 300px;
	border: 1px solid black;
	justify-content: space-between;
`;

export const BoxRed = styled.div`
	height: 50px;
	background-color: ${(props) => props.inputColor || "black"};
	flex: ${(props) => props.flexRed} 0 auto;
`;

export const BoxBlue = styled.div`
	height: 50px;
	background-color: ${(props) => props.inputColor || "black"};
	flex: ${(props) => props.flexBlue} 0 auto;
`;
