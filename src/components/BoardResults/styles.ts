import styled, { keyframes } from 'styled-components';


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

export const Player = styled.div`
  position: relative;
  display: inline-block;
`;

const floatYum = keyframes`
  from { opacity: 0; transform: translate(-35%, 4px) scale(0.8); }
  20% { opacity: 1; }
  to { opacity: 0; transform: translate(-35%, -24px) scale(1); }
`;

export const YumBubble = styled.span`
  position: absolute;
  top: -22px;
  left: 100%;
  z-index: 1;
  color: #16a34a;
  font-weight: 800;
  font-size: 0.9rem;
  pointer-events: none;
  animation: ${floatYum} 850ms ease-out forwards;
`;

export const Grid = styled.div`
  border: 3px solid grey;
  box-sizing: border-box;
  margin: auto;
  padding: 10px;
  width: fit-content;
  border-radius: 1rem;
`;
