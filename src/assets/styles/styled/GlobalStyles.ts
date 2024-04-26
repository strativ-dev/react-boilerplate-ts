import { createGlobalStyle } from 'styled-components';
import { margins } from './utils';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
  #root {
    width: 100%;
    height: 100%;
    display: block;
  }

  #nprogress {
    .bar {
      height: 3px !important;
      background: ${(props) => props?.theme?.colorPrimary};
    }

    .spinner {
      display: none;
    }
  }

  .Suspense {
    &Loader {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  .shadow {
    box-shadow: 0 0.25rem 1rem rgba(35, 123, 176, 0.06);

    &-lg {
      box-shadow: 0 0.5rem 1.5rem rgba(208, 216, 243, 0.6);
    }
  }

  .margin {
    &-0 {
      margin: 0 !important;
      ${margins(0)}
    }

    &-1 {
      margin: 0.25rem !important;
      ${margins(0.25)}
    }

    &-2 {
      margin: 0.5rem !important;
      ${margins(0.5)}
    }

    &-3 {
      margin: 1rem !important;
      ${margins(1)}
    }

    &-4 {
      margin: 1.5rem !important;
      ${margins(1.5)}
    }

    &-5 {
      margin: 3rem !important;
      ${margins(3)}
    }
  }

  .ant-table-wrapper {
  height: 100%;

  .ant-spin-nested-loading {
    height: 100%;

    .ant-spin-container {
      height: 100%;
      display: flex;
      flex-flow: column nowrap;

      .ant-table {
        flex: auto;
        overflow: hidden;

        .ant-table-container {
          height: 100%;
          display: flex;
          flex-flow: column nowrap;

          .ant-table-header {
            flex: none;
          }

          .ant-table-body {
            flex: auto;
            overflow: auto;
          }
        }
      }

      .ant-table-pagination {
        flex: none;
      }
    }
  }
}
.test-form .ant-form-item-label > label {
  display: block;
}
.hide {
  display: none !important;
}
`;

export default GlobalStyles;
