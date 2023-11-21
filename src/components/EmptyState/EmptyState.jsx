import styled from 'styled-components';

const EmptyStateContainer = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 20px;
background-color: #f8f8f8;
border: 1px dashed #ddd;
border-radius: 8px;
margin: 1rem 10rem 0 10rem;

  p {
    font-size: 24px;
    margin-bottom: 10px;
  }

  h3 {
    color: #333;
    margin-bottom: 10px;
  }

  p:last-child {
    color: #666;
  }
`;
const EmptyState = () => {
  return (
    <EmptyStateContainer>
    <section>
      <p>🍦</p>
      <h3>There's is nothing left to do</h3>
      <p>You deserve some ice-cream </p>
    </section>
    </EmptyStateContainer>
  )
}

export default EmptyState
