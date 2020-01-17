import React from 'react'
import styles from './App.module.scss'
import { Layout } from './layout/Layout';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Layout />
    </div>
  )
}

export default App
