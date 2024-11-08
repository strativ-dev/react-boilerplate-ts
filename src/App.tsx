import { App as AntApp } from "antd";

import { BaseRoutes } from "@/routes";
import GlobalStyles from "@/app/globals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

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
