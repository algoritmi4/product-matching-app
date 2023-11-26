import './MainPage.css';
import { MaterialReactTable } from 'material-react-table';
import TableOptions from './TableOptions';

function MainPage() {
  const { table } = TableOptions();

  return <MaterialReactTable table={table} />;
}

export default MainPage;
