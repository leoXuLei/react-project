import { css } from '@emotion/core'

export const popListCss = css`
  width: 250px;
  padding: 0 16px;
  .list-item {
    display: flex;
    align-items: center;
    height: 48px;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    &-label {
      color: #262626;
      font-weight: 700;
    }
  }
  .btn-ok {
    padding: 8px 0 16px 0;
    button {
      width: 100%;
    }
  }
`

export const labelCss = css`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: #8c8c8c;
  .icon {
    margin-left: 5px;
  }
  &:hover {
    color: #0171c2;
  }
`