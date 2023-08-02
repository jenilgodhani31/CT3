import MyState from "@/context/myState";
import "@/styles/globals.css";
import "apexcharts/dist/apexcharts.css";

const App = ({ Component, pageProps }) => {
  const Title = "CommitTO3";
  return (
    <MyState>
       <title>{Title}</title>
       <meta name="This is a Commit webApp" content="Generated by create next app" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <link rel="icon" href="/weblogo.png" />
       
    <Component {...pageProps} />
  </MyState>
  )
}

export default App

