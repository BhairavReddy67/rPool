// src/pages/_app.js
 import { AppWrapper } from '../context/ContextProvider'; // import based on where you put it

function Application({ Component, pageProps }) {
  return (
   <AppWrapper>
      <Component {...pageProps} />
   </AppWrapper>
  )
}

export default Application