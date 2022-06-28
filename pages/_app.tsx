import "../styles/globals.css";
import type { AppProps } from "next/app";

//React Query
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import { TerminalContextProvider } from "react-terminal";

const queryClient = new QueryClient(); //Global store for React-query

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <TerminalContextProvider>
          <Component {...pageProps} />
        </TerminalContextProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover={false}
        theme="dark"
      />
    </QueryClientProvider>
  );
}

export default MyApp;
