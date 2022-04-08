import { useContext, useEffect } from 'react';
import './App.css';
import { Header } from './components';
import { PersonalInfoDashboard } from './pages';
import { AppContext } from './providers';

const sampleTableData = [
  {
    name: 'Shivasai',
    age: 23,
    gender: 'Male',
    phone: 9666601298,
  },
  {
    name: 'Uthej',
    age: 20,
    gender: 'Male',
    phone: 9876543210,
  },
  {
    name: 'Aravind',
    age: 24,
    gender: 'Male',
    phone: 9876543210,
  },
  {
    name: 'Sree',
    age: 30,
    gender: 'Male',
    phone: 9898982456,
  },
  {
    name: 'Pravin',
    age: 28,
    gender: 'Male',
    phone: 9242567890,
  },
  {
    name: 'Ravi',
    age: 26,
    gender: 'Male',
    phone: 8989892323,
  },
  {
    name: 'Santosh',
    age: 30,
    gender: 'Male',
    phone: 8787874343,
  },
  {
    name: 'Sukumar',
    age: 32,
    gender: 'Male',
    phone: 7889981232,
  },
  {
    name: 'Srinivas',
    age: 30,
    gender: 'Male',
    phone: 9247478978,
  }
]

function App() {
  const { actions } = useContext(AppContext);

  useEffect(() => {
    const tableData = JSON.parse(localStorage.getItem('rdg-tableData'))
    if (tableData?.length) {
      actions.updateTableData(tableData);
    } else {
      const tableData = JSON.stringify(sampleTableData);
      localStorage.setItem('rdg-tableData', tableData);
      actions.updateTableData(sampleTableData);
    }
  }, [])

  useEffect(() => {
    const historyData = JSON.parse(localStorage.getItem('rdg-historyData'));

    if (historyData?.length) {
      actions.updateHistoryData(historyData);
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <PersonalInfoDashboard />
    </div>
  );
}

export default App;
