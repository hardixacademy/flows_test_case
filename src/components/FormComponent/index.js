import { useContext } from 'react';
import styled from 'styled-components';
import { P1, P2, Button } from '..';
import { Context } from '../../utils/context';

const FormWrapper = styled.div`
    margin-top: 50px;
`;

const FormRow = styled.div`
	display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    ${P2} {
        margin-bottom: 5px;
    }
`;

const Input = styled.input`
	border-radius: 5px;
    border: 1px solid #161616;
    padding: 12px 18px;
`;

export const FormComponent = () => {
    const { addItem, getPosts, setPosts } = useContext(Context)

    const submitHandler = async (e) => {
        e.preventDefault()
        await addItem({ company: e.target.company.value, name: e.target.name.value, address: e.target.address.value })
        await getPosts(setPosts)
    };

    return (
        <FormWrapper>
            <P1>Add your post</P1>
            <form onSubmit={submitHandler}>
                <FormRow>
                    <P2 as='label' htmlFor="company">Company</P2>
                    <Input id="company" type="text" required />
                </FormRow>
                <FormRow>
                    <P2 as='label' htmlFor="name">Name</P2>
                    <Input id="name" type="text" required />
                </FormRow>
                <FormRow>
                    <P2 as='label' htmlFor="address">Zip code</P2>
                    <Input id="address" type="text" required />
                </FormRow>
                <Button type={'submit'} onClick={() => console.log("add")}>Add post</Button>
            </form>
        </FormWrapper>
    )
};
