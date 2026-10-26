import styled from 'styled-components';

export const MainDashboard = styled.div`
  height: 100vh;
`;

export const KeyboardHint = styled.aside`
  max-width: 560px;
  margin: 20px auto;
  padding: 18px 20px;
  border: 1px solid #dbe4ee;
  border-radius: 16px;
  background: #f6f8fc;
  color: #334155;
  text-align: center;
  line-height: 2;

  strong {
    display: block;
    font-size: 1.05rem;
    color: #1e293b;
  }

  p {
    margin: 8px 0;
  }

  kbd {
    display: inline-block;
    min-width: 20px;
    padding: 0 6px;
    border: 1px solid #cbd5e1;
    border-bottom-width: 3px;
    border-radius: 5px;
    background: white;
    font-family: inherit;
    font-size: 0.85em;
    line-height: 1.7;
  }

  small {
    color: #64748b;
  }

  .key-divider {
    margin: 0 10px;
    color: #94a3b8;
  }

  @media (max-width: 600px) {
    margin: 16px 12px;
    padding: 14px;
  }
`;

export const HeadingSlot = styled.div`
  height: 120px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  text-align: center;

  h1 {
    margin: 0;
    font-size: clamp(1.4rem, 5vw, 2rem);
  }

  @media (max-width: 600px) {
    height: 144px;
  }
`;
