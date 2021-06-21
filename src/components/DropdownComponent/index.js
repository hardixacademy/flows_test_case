import { useContext } from 'react';
import { Edit, Add, Delete, EditBig } from '../';
import { Context } from '../../utils/context';
import { DropdownWrapper, TableHead, Line, TableRow } from './styles';


export const DropdownComponent = ({ data }) => {
	const { deleteItem, editItem, getPosts, setPosts, editItemRow, addItemRow } = useContext(Context)

	const deletePostHandler = async (id) => {
		await deleteItem(id)
		await getPosts(setPosts)
	}

	const editPostHandler = async (id, rowId) => {
		const company = prompt('Company');
		const name = prompt('Name');
		const address = prompt('Zip code');

		await editItem(id, rowId, { company, name, address })
		await getPosts(setPosts)
	}

	const editRowHandler = async (id, rowId) => {
		const car = prompt('Vehicle');
		const brand = prompt('Brand');
		const color = prompt('Сolor');
		const price = prompt('Sale');
		const date = prompt('Actual till');

		await editItemRow(id, rowId, { car, color, price, date, brand })
		await getPosts(setPosts)
	}

	const addRowHandler = async (id) => {
		const car = prompt('Vehicle');
		const brand = prompt('Brand');
		const color = prompt('Сolor');
		const price = prompt('Sale');
		const date = prompt('Actual till');

		await addItemRow(id, { car, color, price, date, brand })
		await getPosts(setPosts)
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
						<TableRow className="pointer" onClick={expandHandler} key={item.id}>
							<div className="block">{item.seller}</div>
							<div className="block">{item.company}</div>
							<div className="block">Zip: {item.address}</div>
							<div className="block"></div>
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
									<Edit />
								</button>
							</TableRow>
						))}

						<TableRow className='normal-padding'>
							<div className="actions">
								<button style={{ color: "#17b978" }} onClick={() => editPostHandler(el.id, el.head[0].id)} className="action">
									Edit item head <EditBig fill={'#17b978'} />
								</button>
								{/* <button style={{ color: "#3d5af1" }} onClick={() => addRowHandler(el.id)} className="action">
									Add item row <Add fill={'#3d5af1'} />
								</button> */}
								<button style={{ color: "#ff304f" }} onClick={() => deletePostHandler(el.id)} className="action">
									Delete item <Delete fill={'#ff304f'} />
								</button>
							</div>
						</TableRow>
					</div>
				</div>
			))
			}
		</DropdownWrapper >
	)
};