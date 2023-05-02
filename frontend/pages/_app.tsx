import Layout from "@/components/Layout";
import ToasterMUI from "@/components/Toaster";
import { wrapper } from "@/store/store";
import "@/styles/globals.css";
import {
  Box,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const store: any = useStore();
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <ThemeProvider theme={darkTheme}>
        <Suspense
          fallback={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100vw"
              height="80vh"
            >
              <CircularProgress size={40} />
            </Box>
          }
        >
          <SessionProvider session={session} refetchInterval={60 * 10}>
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </Suspense>
      </ThemeProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(App);
