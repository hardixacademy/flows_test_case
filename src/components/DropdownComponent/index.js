import { useContext } from 'react';
import styled from 'styled-components';
import { P1, P2 } from '../';
import { Context } from '../../utils/context';

const DropdownWrapper = styled.div`
	letter-spacing: 0.105em;

	.item{
		margin-bottom: 20px;
		border-radius: 5px;
		border: 1px solid rgba(22,22,22, 0.4);
		transition: 0.3s ease;
		overflow: hidden;

		&.expanded{
			.content{
			}

			.arrow{
				transform: rotate(-180deg);
			}
		}
	}

	img{
		width: 20px;
		pointer-events: none;
	}
`;

const TableHead = styled.div`
	padding: 20px 130px 20px 20px;
	position: relative;
	background: rgba(22,22,22, 0.5);
	color: #fff;
	cursor: pointer;
	.row{
		pointer-events: none;
	}

	${P1} {
		font-weight: bold;
		margin: 0;
		padding: 0 5px;
		opacity: 1;

		span{
			display: inline-block;
			font-size: 14px;
			width: 100px;
		}
	}

	.arrow{
		transition: 0.2s ease;
		position: absolute;
		pointer-events: none;
		top: 35px;
		right: 20px;		
	}	
`

const TableContent = styled.div`
	transition: all 0.45s ease;
	padding: 0px 20px;
	border-radius: 5px;

	max-height: 0;

	.row{
		display: flex;
			
		&:not(:first-child){
			border-top: 1px solid rgba(22,22,22, 0.4);
		}
	}

	${P2} {
		width: 25%;
		margin: 0;
		padding: 15px 10px;

		&:first-child{
			width: 50%;
		}

		&:not(:first-child){
			border-left: 1px solid rgba(22,22,22, 0.4);
		}

		&.bold{
			font-weight: bold;
		}
	}

	.actions{
		width: 100%;
		display: flex;
		justify-content: flex-end;
		padding: 20px 0;
		border-top: 1px solid rgba(22,22,22, 0.4);
	}

	.action{
		display: block;
		background-color: rgba(22,22,22, 0.4);
		border-radius: 50%;
		padding: 10px;
		width: 50px;
		height: 50px;
		border: none;
		cursor: pointer;
		transition: 0.2s;

		&:first-child{
			margin-right: 10px;
		}

		&:hover{
			opacity: 0.5;
		}
	}
`


export const DropdownComponent = ({ data }) => {
	const { deleteItem, editItem, getPosts, setPosts } = useContext(Context)

	const deletePostHandler = async (id) => {
		await deleteItem(id)
		await getPosts(setPosts)
	}

	const editPostHandler = async (id) => {
		await editItem(id)
		await getPosts(setPosts)
	}

	const expandHandler = (e) => {
		var parent = e.target.parentElement;
		const content = e.target.nextElementSibling;
		console.log(e.target);

		if (!parent.classList.contains('expanded')) {
			parent.classList.add('expanded');
			content.style.maxHeight = content.scrollHeight + 'px';
		}
		else {
			parent.classList.remove('expanded');
			content.style.maxHeight = '0px';
		}
	}

	return (
		<DropdownWrapper>
			{data && data.map(el => (
				<div key={el.id} className="item">
					<TableHead onClick={expandHandler}>
						{el.head.map(item => (
							<div className="row" key={item.id}>
								<P1><span>Company: </span>{item.company}</P1>
								<P1><span>Name: </span>{item.name}</P1>
							</div>
						))}
						<img src="img/arrow.svg" className='arrow' alt="arrow" />
					</TableHead>

					<TableContent className='content'>
						<div className="row">
							<P2 className='bold'>Car name</P2>
							<P2 className='bold'>Color</P2>
							<P2 className='bold'>Price</P2>
						</div>
						{el.body.map(item => (
							<div className="row" key={item.id}>
								<P2>{item.car}</P2>
								<P2>{item.color}</P2>
								<P2>{item.price}</P2>
								<button><img src="img/edit_small.svg" alt="delete" /></button>
							</div>
						))}

						<div className="actions">
							<button className="action" onClick={() => deletePostHandler(el.id)}><img src="img/trash.svg" alt="delete" /></button>
							<button className="action" onClick={() => editPostHandler(el.id)}><img src="img/edit.svg" alt="edit" /></button>
						</div>
					</TableContent>
				</div>
			))}
		</DropdownWrapper>
	)
};
