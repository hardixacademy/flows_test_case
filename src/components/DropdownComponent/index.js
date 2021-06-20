import { useContext } from 'react';
import styled from 'styled-components';
import { P1, P2 } from '../';
import { Context } from '../../utils/context';

const DropdownWrapper = styled.div`
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

`;

const TableHead = styled.div`
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

const Line = styled.div`
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

const TableRow = styled.div`
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
		}

		&.expanded{
			${Line} {
				span{
					width: ${props => props.propWidth}%;
				}
			}
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
`




export const DropdownComponent = ({ data }) => {
	const { deleteItem, editItem, getPosts, setPosts, editItemRow, addItemRow } = useContext(Context)

	const deletePostHandler = async (id) => {
		await deleteItem(id)
		await getPosts(setPosts)
	}

	const editPostHandler = async (id, rowId) => {
		const company = prompt('Company');
		const name = prompt('Name');

		await editItem(id, rowId, { company, name })
		await getPosts(setPosts)
	}

	const editRowHandler = async (id, rowId) => {
		const car = prompt('car');
		const color = prompt('color');
		const price = prompt('price');

		await editItemRow(id, rowId, { car, color, price })
		await getPosts(setPosts)
	}

	const addRowHandler = async (id) => {
		const car = prompt('car');
		const color = prompt('color');
		const price = prompt('price');

		await addItemRow(id, { car, color, price })
		await getPosts(setPosts)
	}

	const counter = (num, ref) => {
		let i = 0;
		const inv = setInterval(function () {
			if (i < num) {
				++i
				if (ref.current) {
					ref.current.innerText = `${i}`;
				}
			} else {
				if (ref.current) {
					ref.current.innerText = `${num}`;
				}
				clearInterval(inv);
			}
		}, 500 / num);
	}

	const expandHandler = (e) => {
		const parent = e.target.parentElement;
		const content = e.target.nextElementSibling;
		const target = e.target;
		const children = Array.from(content.children);

		if (!parent.classList.contains('expanded')) {
			parent.classList.add('expanded');
			target.classList.add('dark');
			parent.setAttribute("aria-expanded", "true")
			content.style.maxHeight = content.scrollHeight + 'px';
			children.forEach(element => {
				element.classList.add('expanded');
			})
		}
		else {
			parent.classList.remove('expanded');
			target.classList.remove('dark');
			parent.setAttribute("aria-expanded", "false")
			content.style.maxHeight = '0px';
			children.forEach(element => {
				element.classList.remove('expanded');
			})
		}
	}

	return (
		<DropdownWrapper>
			<TableHead className="dark">
				<div className="block">Seller</div>
				<div className="block">Company</div>
				<div className="block">Address</div>
				<div className="block"></div>
			</TableHead>
			{data && data.map(el => (
				<div key={el.id} aria-expanded="false" className="item">
					{el.head.map(item => (
						<TableRow onClick={expandHandler} key={item.id}>
							<div className="block">{item.seller}</div>
							<div className="block">{item.company}</div>
							<div className="block">Zip: {item.address}</div>
							<div className="block"></div>
							{/* <img src="img/arrow.svg" className='arrow' alt="arrow" /> */}
							<div class="arrow-wrapper"><span class="arrow"><span></span><span></span></span></div>
							<div className="circle"></div>
						</TableRow>
					))}

					<div className="content">
						<TableHead>
							<div className="block">
								Vehicle
							</div>
							<div className="block">
								Color
							</div>
							<div className="block">
								Actual till
							</div>
							<div className="block">
								Sale
							</div>
						</TableHead>
						{el.body.map(item => (
							<TableRow key={item.id} propWidth={(Number(item.price) / 1000) * 100}>
								<div className="block">
									<b>{item.car}</b>
									<div className="brand">
										<span>Brand: </span>{item.brand}
									</div>
								</div>
								<div className="block centered" style={{ color: item.color }}>
									<div className="color" style={{ background: item.color }}></div>
									{item.color}
								</div>
								<div className="block">
									{new Date().getFullYear() + Number(item.id)} {item.date}
								</div>
								<div className="block">
									<b>- {item.price} $</b>

									<Line>
										<span></span>
									</Line>
								</div>
								<button onClick={() => editRowHandler(el.id, item.id)} className="edit">
									{/* <img src="img/edit_small.svg" alt="edit row" /> */}
									<Edit />
								</button>
							</TableRow>
						))}
					</div>
				</div>
			))
			}
		</DropdownWrapper >
	)
};


export const Edit = () => {
	return <svg x="0px" y="0px"
		width="30" height="30"
		viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDashoffset="0" ><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M130.88125,17.2c-2.93403,0 -5.86843,1.12051 -8.10729,3.35938l-13.84062,13.84063l28.66667,28.66667l13.84062,-13.84063c4.47773,-4.47773 4.47773,-11.73685 0,-16.21458l-12.45208,-12.45208c-2.23887,-2.23887 -5.17326,-3.35937 -8.10729,-3.35937zM97.46667,45.86667l-67.31068,67.31067c0,0 5.26186,-0.47147 7.22266,1.48933c1.9608,1.9608 0.34669,14.792 2.75469,17.2c2.408,2.408 15.15831,0.71299 16.98724,2.54192c1.82894,1.82893 1.70209,7.43542 1.70209,7.43542l67.31067,-67.31067zM22.93333,131.86667l-5.40859,15.31875c-0.21262,0.60453 -0.32239,1.24042 -0.32474,1.88125c0,3.16643 2.5669,5.73333 5.73333,5.73333c0.64083,-0.00235 1.27672,-0.11212 1.88125,-0.32474c0.0187,-0.00737 0.03737,-0.01483 0.05599,-0.02239l0.14557,-0.04479c0.01122,-0.00743 0.02242,-0.01489 0.03359,-0.0224l15.08359,-5.31901l-8.6,-8.6z"></path></g></g></svg>
}



{/* {data && data.map(el => (
				<table key={el.id} aria-expanded="false" className=" iksweb">
					<thead>
						<tr className="row">
							<th>Company</th>
							<th colSpan='3'>Name</th>
						</tr>
						{el.head.map(item => (
							<tr className="row" key={item.id}>
								<th>{item.company}</th>
								<th>{item.name}</th>
								<th colSpan='2'><img src="img/arrow.svg" className='arrow' alt="arrow" /></th>
							</tr>
						))}
					</thead>

					<tbody>
						<tr>
							<td>Car name</td>
							<td>Color</td>
							<td colSpan='2'>Price</td>
						</tr>

						{el.body.map(item => (
							<tr className="row" key={item.id}>
								<td>{item.car}</td>
								<td>{item.color}</td>
								<td>{item.price}</td>
								<td>
									<button onClick={() => editRowHandler(el.id, item.id)} className="edit"><img src="img/edit_small.svg" alt="edit row" /></button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			))} */}

