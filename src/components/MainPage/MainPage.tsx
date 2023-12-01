import './MainPage.css';
import { MaterialReactTable } from 'material-react-table';
import TableOptions from './TableOptions';
import api from '../../utils/api';
import { FormEvent, useEffect, useState } from 'react';
import { IDealerProduct } from '../../utils/IDealerProduct.interface';
import useDidMountEffect from '../../customHooks/useDidMountEffect';
import { useNavigate } from 'react-router-dom';

interface Pagination {
  pageIndex: number;
  pageSize: number;
}

function MainPage() {
  const navigate = useNavigate();
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
    isTableLoading,
    handleSignOut
  });

  const paginationSize = (pagination.pageIndex + 1) * pagination.pageSize;

  // useDidMountEffect custom hook is used to prevent React from rendering twice, which would cause an extra request to the server.
  useDidMountEffect(() => {
    handleDataLoad(30, 0, 0);
  }, []);

  useEffect(() => {
    if (paginationSize > 10 && paginationSize >= data.length) {
      const pageIndex = pagination.pageIndex;

      handleDataLoad(pagination.pageSize + paginationSize - data.length, data.length, pageIndex);
    }
  }, [pagination]);

  function handleDataLoad(pageSize: number, offset: number, pageIndex: number) {
    setIsTableLoading(true);
    api
      .getDealerProducts(pageSize, offset)
      .then((res) => {
        setData((state) => [...state, ...res.items]);
        setTimeout(() => {
          setPagination((state) => ({ ...state, pageIndex: pageIndex }));
        }, 0);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsTableLoading(false));
  }

  function handleSCVLoading(e: FormEvent<HTMLInputElement>, func: (arg: FormData) => Promise<any>) {
    const eventTarget = e.target as HTMLInputElement;
    const files = eventTarget.files;

    if (files && files.length > 0) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(files[0]);

      fileReader.onload = function () {
        const formData = new FormData();
        formData.append('file', files[0]);

        setIsButtonLoading(true);

        func(formData).finally(() => setIsButtonLoading(false));
      };
    }
  }

  function handleSignOut() {
    navigate('/auth');
  }

  return <MaterialReactTable table={table} />;
}

export default MainPage;
