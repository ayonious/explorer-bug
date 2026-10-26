import styled from 'styled-components';


export const Row = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  margin: auto;
`;

export const Cell = styled.div`
  height: 50px;
  width: 50px;
  text-align: center;
`;

export const Grid = styled.div`
  border: 3px solid grey;
  box-sizing: border-box;
  margin: auto;
  padding: 10px;
  width: fit-content;
  border-radius: 1rem;
`;
