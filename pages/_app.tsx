import "bootstrap/dist/css/bootstrap.min.css";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import "../styles/globals.css";

export const queryCache = new QueryCache();

function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Component {...pageProps} />
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
