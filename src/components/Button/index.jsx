import styled from 'styled-components';

const ButtonStyle = styled.button`
	font-weight: 500;
	font-size: 16px;
	letter-spacing: 0.105em;
	text-align: center;

	color: white;
	background: black;

	padding: 16px 28px 14px;
	border-radius: 5px;
	transition: 0.3s;
	cursor: pointer;
`;

export const Button = ({ onClick, type = 'button', children }) => (
	<ButtonStyle type={type} onClick={() => onClick()}>
		{children}
	</ButtonStyle>
);
