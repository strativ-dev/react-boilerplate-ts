import { App as AntApp } from "antd";

import { BaseRoutes } from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "@/assets/theme/globals";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AntApp>
        <BaseRoutes />
        <GlobalStyles />
      </AntApp>
    </QueryClientProvider>
  );
}

export default App;
