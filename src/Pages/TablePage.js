import { useEffect, useState } from 'react';
import { Context } from '../utils/context';
import { Container, H1, H2, P1, DropdownComponent, FormComponent } from '../components/index';
import { getPosts, deleteItem, editItem, addItem } from '../api';

export const TablePage = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPosts(setPosts)
  }, []);

  console.log(posts);

  return (
    <Context.Provider value={{ setPosts, getPosts, deleteItem, editItem, addItem }}>
      <Container>
        <H1>HedgeFlows Test Case</H1>
        <P1>
          Create a small demo application with React, the application should show a table with some data "I choose <a href="https://mockapi.io">mockapi.io</a>". Every row of the table should be expandable(expansion has to be smoothly animated). Markup has to be done with a usage of styled-components and without any external libraries like AntD etc.. As a bonus it would be good to have an update functionality for every row or you can add something cool in terms of animations or whatever you think could be useful or impressive. All changes have to be committed to git and be available for review on Github <a href="https://github.com/hardixacademy/hedge_flows_test_case.git">hedge_flows_test_case.git</a>.
        </P1>

        {posts ?
          <DropdownComponent data={posts} />
          :
          <H2>No items added</H2>
        }

        <FormComponent />
      </Container>
    </Context.Provider>
  );
}
