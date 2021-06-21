import styled from 'styled-components';

export const DropdownWrapper = styled.div`
		box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 12px;
		margin-top: 30px;
		background-color: #fff;
		border-radius: 8px;
	.item{
		overflow: hidden;

		&.expanded{
			.arrow{
				span{
					&:first-of-type {
						transform: rotate(-45deg);
					}
					&:last-of-type {
						transform: rotate(45deg);
					}
				}
			}
			.circle{
				opacity: 0;
			}
		}
	}

	.content{
		max-height: 0;
		transition: all 0.45s ease;
	}
`;

export const TableHead = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px 100px 20px 20px;
	position: relative;
	letter-spacing: 0.105em;
	background-color: rgba(22,22,22, 0.03);
	border-bottom: 1px solid #eee;

	&:first-child{
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}

	.block{
		flex: 1;
		font-weight: bold;
		pointer-events: none;
	}

	&.dark{
		background-color: rgba(22,22,22, 0.3);
		color: #fff;
	}
`

export const Line = styled.div`
	margin-top: 15px;
	background-color: #eee;
	border-radius: 15px;
	width: 100%;
	height: 6px;
	overflow: hidden;

	span{
		display: block;
		background-color: turquoise;
		height: 6px;
		border-radius: 15px;
		width: 0%;
		transition: 0.8s ease;
		transition-delay: 0.5s;
	}
`

export const TableRow = styled.div`
		display: flex;
		justify-content: space-between;
		padding: 20px 100px 20px 20px;
		position: relative;
		border-bottom: 1px solid #eee;
		transition: 0.3s;

		&:hover{
			.circle{
				opacity: 1;
				width: 110%;
			}
		}

		&:last-child{
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
		}

		&.dark{
			background-color: rgba(22,22,22, 0.03);
			border-bottom:  1px solid transparent;
			cursor: pointer;
		}

		&.expanded{
			${Line} {
				span{
					width: ${props => props.propWidth}%;
				}
			}
		}

		&.normal-padding{
			padding: 20px;
			height: 60px;
			background-color: rgba(22,22,22, 0.03);
		}

		&.pointer{
			cursor: pointer;
		}

		.block{
			flex: 1;
			padding-right: 10px;
			pointer-events: none;
		}

		.centered{
			display: flex;
			align-items: center;
			text-transform: capitalize;
		}

		.arrow-wrapper{
			width: 20px;
			height: 20px;
			position: absolute;
			right: 20px;
			top: 20px;
			pointer-events: none;
		}

		.arrow {
			width: 20px;
			height: 20px;
			display: inline-block;
			position: relative;
			
			span {
			top: 0.5rem;
			position: absolute;
			width: 0.75rem;
			height: 0.1rem;
			background-color: #16161680;
			display: inline-block;
			transition: all 0.2s ease;

				&:first-of-type {
				left: 0;
				transform: rotate(45deg);
				}

				&:last-of-type {
				right: 0;
				transform: rotate(-45deg);
				}
			}
		}

		.circle{
			position: absolute;
			right: 0;
			top: 0;
			width: 0px;
			height: 100%;
			background-color: rgba(22,22,22, 0.03);
			transition: all 0.8s ease;
			opacity: 0;
			pointer-events: none;
		}

		.color{
			border-radius: 50%;
			width: 30px;
			height: 30px;
			margin-right: 15px;
		}
		
		.brand{
			font-size: 12px;
			opacity: 0.5;
			margin-top: 15px;
		}

		.edit{
			position: absolute;
			right: 20px;

			display: block;
			background-color: rgba(22,22,22, 0.3);
			border: none;
			border-radius: 50%;
			cursor: pointer;
			transition: 0.2s;

			height: 36px;
			width: 36px;

			display: flex;
			justify-content: center;
			align-items: center;

			svg{
				width: 20px;
			}

			&:not(:last-child){
				margin-right: 10px;
			}

			&:hover{
				opacity: 0.5;
			}
		}

		.actions{
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 100%;
		}

		.action{
			display: flex;
			align-items: center;
			padding: 10px;
			background-color: transparent;
			font-weight: bold;

			border: none;
			cursor: pointer;
			transition: 0.2s;

			svg{
				width: 20px;
				height: 20px;
				margin-left: 15px;
			}

			&:not(:last-child){
				margin-right: 10px;
			}

			&:hover{
				opacity: 0.5;
			}
		}
`