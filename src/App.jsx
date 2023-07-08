import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { Navbar } from './components/Navbar';
import { Form } from '../src/pages/Form';
import { DataTable } from './pages/Table';
import { MobileForm } from './pages/MobileForm';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />} />  
        <Route path="/data" element={<DataTable />} /> 
        <Route path="/mobile-form" element={<MobileForm />} />
      </Routes>
    </Router>
  );
}

export default App;
