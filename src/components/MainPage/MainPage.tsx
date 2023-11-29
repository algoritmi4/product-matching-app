import './MainPage.css';
import { MaterialReactTable } from 'material-react-table';
import TableOptions from './TableOptions';
import api from '../../utils/api';
import { FormEvent, useEffect, useState } from 'react';
import { IDealerProduct } from '../../utils/IDealerProduct.interface';
import useDidMountEffect from '../../customHooks/useDidMountEffect';

interface Pagination {
  pageIndex: number;
  pageSize: number;
}

function MainPage() {
  const [data, setData] = useState<IDealerProduct[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ pageIndex: 0, pageSize: 10 });
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const { table } = TableOptions({
    handleSCVLoading,
    data,
    isButtonLoading,
    pagination,
    setPagination,
    isTableLoading
  });

  const paginationSize = (pagination.pageIndex + 1) * pagination.pageSize;

  useDidMountEffect(() => {
    handleDataLoad(30, 1);
  }, []);

  useEffect(() => {
    if (pagination.pageIndex > 0 && paginationSize >= data.length) {
      handleDataLoad(10, pagination.pageIndex + 2);
    }
  }, [pagination]);

  function handleDataLoad(pageSize: number, pageNumber: number) {
    setIsTableLoading(true);
    api
      .getDealerProducts(pageSize, pageNumber)
      .then((res) => {
        setData((state) => [...state, ...res.data]);
        return res;
      })
      .then((res) => {
        if (pagination.pageIndex > 1) {
          setTimeout(() => {
            setPagination((state) => ({ ...state, pageIndex: res.pagination.page - 2 }));
          }, 0);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsTableLoading(false));
  }

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
