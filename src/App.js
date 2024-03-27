import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import Types from "./components/Types";
import NotFoundPage from "./components/NotFoundPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:pokemonID" element={<Pokemon />} />
            <Route path="/type/:typeID" element={<Types />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
