import './MainPage.css';
import { MaterialReactTable } from 'material-react-table';
import TableOptions from './TableOptions';
import api from '../../utils/api';
import { ChangeEvent } from 'react';

function MainPage() {
  const { table } = TableOptions({ handleSCVLoading });

  function handleSCVLoading(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files && files.length > 0) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(files[0]);

      fileReader.onload = function (e) {
        const formData = new FormData();
        formData.append('file', files[0]);

        api.CSVFileLoad(formData);
      };
    }
  }

  return <MaterialReactTable table={table} />;
}

export default MainPage;
