import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 10vh;
  background: rgba(255, 255, 255, 0.5);

  .spin {
    font-size: 24px;
    width: 20px;
    height: 20px;
    border-left: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingWrapper;
