import './MainPage.css';
import { MaterialReactTable } from 'material-react-table';
import TableOptions from './TableOptions';
import api from '../../utils/api';
import { FormEvent, useEffect, useState } from 'react';
import { DealerProduct } from '../../utils/DealerProduct.interface';

interface Pagination {
  pageIndex: number;
  pageSize: number;
}

function MainPage() {
  const [data, setData] = useState<DealerProduct[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ pageIndex: 0, pageSize: 10 });
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const { table } = TableOptions({
    handleSCVLoading,
    data,
    isButtonLoading,
    pagination,
    setPagination
  });

  useEffect(() => {
    api
      .getDealerProducts()
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSCVLoading(e: FormEvent<HTMLInputElement>) {
    const eventTarget = e.target as HTMLInputElement;
    const files = eventTarget.files;

    if (files && files.length > 0) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(files[0]);

      fileReader.onload = function () {
        const formData = new FormData();
        formData.append('file', files[0]);

        setIsButtonLoading(true);

        api
          .CSVFileLoad(formData)
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
          .finally(() => setIsButtonLoading(false));
      };
    }
  }

  return <MaterialReactTable table={table} />;
}

export default MainPage;
