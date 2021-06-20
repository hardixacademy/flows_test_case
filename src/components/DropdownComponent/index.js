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
		}
	}

	.content{
		max-height: 0;
		transition: all 0.45s ease;
		/* padding: 0  0  0 20px; */
	}

	.edit{
		position: absolute;
		right: 20px;

		display: block;
		background-color: rgba(22,22,22, 0.07);
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
		width="24" height="24"
		viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" stroke-width="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" ><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#222"><path d="M35.83333,21.5c-7.91917,0 -14.33333,6.41417 -14.33333,14.33333v7.16667v7.16667v86c0,7.90483 6.4285,14.33333 14.33333,14.33333h80.0651l-14.33333,-14.33333h-65.73177v-86h100.33333l-0.014,51.39844l14.34733,14.33333v-65.73177v-7.16667v-7.16667c0,-7.91917 -6.41417,-14.33333 -14.33333,-14.33333zM50.16667,71.66667v14.33333h14.33333v-14.33333zM78.83333,71.66667v14.33333h43v-14.33333zM50.16667,100.33333v14.33333h14.33333v-14.33333zM78.83333,100.33333v14.33333h14.33333v-14.33333zM107.5,107.5v14.33333l36.88314,36.88314l14.33333,-14.33333l-36.88314,-36.88314zM163.78353,149.4502l-14.33333,14.33333l7.16667,7.16667c1.3975,1.3975 3.66956,1.3975 5.06706,0l9.26628,-9.26628c1.3975,-1.40467 1.3975,-3.66956 0,-5.06706z"></path></g></g></svg>
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

