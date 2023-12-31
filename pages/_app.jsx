import '../styles/styles.scss'
import Layout from './layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>LHSS CS Club</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp