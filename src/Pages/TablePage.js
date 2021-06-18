import { Container, Button, H1, P1 } from '../components/index';

export const TablePage = () => {
  const loadMore = () => {
    console.log('gg')
  }

  return (
    <Container>
      <H1>HedgeFlows Test Case</H1>
      <P1>dfdf</P1>
      <Button text={'button'} onClick={() => loadMore()} />
    </Container>
  );
}
