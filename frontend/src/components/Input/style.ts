import styled from "styled-components";

const InputWrapper = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  :focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default InputWrapper;
