import styled, { css, keyframes } from 'styled-components'

const animation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

type StyledContentLoaderProps = {
  backgroundColor?: string
  foregroundColor?: string
  isLoading?: boolean
}

const StyledContentLoader = styled.div<StyledContentLoaderProps>(
  ({ 
    backgroundColor = '#e6e6e6',
    foregroundColor = '#f0f0f0',
    isLoading = true
  }) => css`
    ${isLoading &&
    css`
      > * {
        animation-duration: 1.25s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: ${animation};
        animation-timing-function: linear;
        background: ${backgroundColor};
        background: linear-gradient(
          to right,
          ${backgroundColor} 8%,
          ${foregroundColor} 18%,
          ${backgroundColor} 33%
        );
        background-size: 800px 104px;
        margin: 0.2rem;
        color: transparent !important;
        position: relative;
        user-select: none;
        * {
          display: none;
          visibility: hidden;
          opacity: 0;
        }
      }
    `}
  `,
)

export default StyledContentLoader
