import styled from "styled-components";

const TagWrapper = styled.div`
  border-radius: 4px;
  padding: 4px 8px;
  background: ${(props) => props.color};
  color: #fff;
  margin: 1px 2px;
  font-weight: 600;
  display: inline-block;
`;

export default TagWrapper;
