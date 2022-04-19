import "../styles/globals.css";
import WebpageTemplate from "../templates/WebpageTemplates";
function MyApp({ Component, pageProps }) {
  return (
    <WebpageTemplate>
      <Component {...pageProps} />
    </WebpageTemplate>
  );
}

export default MyApp;
