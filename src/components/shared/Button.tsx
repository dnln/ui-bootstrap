import styled from "styled-components";

const Button = styled.button`
  border: 0;
  background: #6c63ff;
  border-radius: 0.3rem;
  color: #fff;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    background: #554aff;
  }
`;

export default Button;
