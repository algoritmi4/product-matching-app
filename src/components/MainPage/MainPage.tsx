import './MainPage.css';
import { MRT_ColumnFiltersState, MaterialReactTable } from 'material-react-table';
import TableOptions from './TableOptions';
import api from '../../utils/Api/api';
import { FormEvent, useEffect, useState } from 'react';
import { IDealerProduct } from '../../utils/Interfaces/IDealerProduct.interface';
import useDidMountEffect from '../../customHooks/useDidMountEffect';
import { useNavigate } from 'react-router-dom';

interface Pagination {
  pageIndex: number;
  pageSize: number;
}

interface isButtonsLoading {
  dealers: boolean;
  dealerPrices: boolean;
  products: boolean;
}

function MainPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<IDealerProduct[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ pageIndex: 0, pageSize: 10 });
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [isButtonsLoading, setIsButtonsLoading] = useState<isButtonsLoading>({
    dealers: false,
    dealerPrices: false,
    products: false
  });
  const { table } = TableOptions({
    handleSCVLoading,
    data,
    isButtonsLoading,
    pagination,
    setPagination,
    isTableLoading,
    handleSignOut,
    columnFilters,
    setColumnFilters
  });
  const paginationSize = (pagination.pageIndex + 1) * pagination.pageSize;

  useDidMountEffect(() => {
    console.log(columnFilters);
  }, [columnFilters]);

  useDidMountEffect(() => {
    const filterOptions = handleFilterOptions();

    handleDataLoad({
      pageSize: 30,
      offset: 0,
      pageIndex: 0,
      firstRender: true,
      filterOptions
    });
  }, [columnFilters]);

  useEffect(() => {
    if (paginationSize > 10 && paginationSize >= data.length && hasMore) {
      const pageIndex = pagination.pageIndex;
      const filterOptions = handleFilterOptions();

      handleDataLoad({
        pageSize: pagination.pageSize + paginationSize - data.length,
        offset: data.length,
        pageIndex,
        firstRender: false,
        filterOptions
      });
    }
  }, [pagination]);

  function handleFilterOptions() {
    const filterOptions: any = {};

    for (let i = 0; i < columnFilters.length; i++) {
      const ids = columnFilters[i].id;

      filterOptions[ids] = columnFilters[i].value;
    }

    return filterOptions;
  }

  function handleDataLoad({
    pageSize,
    offset,
    pageIndex,
    firstRender,
    filterOptions
  }: {
    pageSize: number;
    offset: number;
    pageIndex: number;
    firstRender: boolean;
    filterOptions: any;
  }) {
    setIsTableLoading(true);
    api
      .getDealerProducts({ pageSize, offset, filterOptions })
      .then((res) => {
        setData((state) => (firstRender ? [...res.items] : [...state, ...res.items]));
        res.offset + res.limit > res.total ? setHasMore(false) : setHasMore(true);
        setTimeout(() => {
          setPagination((state) => ({ ...state, pageIndex }));
        }, 0);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsTableLoading(false));
  }

  function handleSCVLoading(
    e: FormEvent<HTMLInputElement>,
    func: (arg: FormData) => Promise<void>
  ) {
    const eventTarget = e.target as HTMLInputElement;
    const files = eventTarget.files;

    if (files && files.length > 0) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(files[0]);

      fileReader.onload = function () {
        const formData = new FormData();
        formData.append('file', files[0]);

        const buttonId = eventTarget.name;

        setIsButtonsLoading((state) => ({ ...state, [buttonId]: true }));

        func(formData).finally(() =>
          setIsButtonsLoading({
            dealers: false,
            dealerPrices: false,
            products: false
          })
        );
      };
    }
  }

  function handleSignOut() {
    navigate('/auth');
  }

  return <MaterialReactTable table={table} />;
}

export default MainPage;
