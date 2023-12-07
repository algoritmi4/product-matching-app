import { FormEvent, useMemo } from 'react';
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_Updater,
  MRT_ColumnFiltersState
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { IDealerProduct } from '../../utils/Interfaces/IDealerProduct.interface';
import ButtonPreloader from '../ButtonPreloader/ButtonPreloader';
import api from '../../utils/Api/api';

interface Pagination {
  pageIndex: number;
  pageSize: number;
}

function TableOptions({
  handleSCVLoading,
  data,
  isButtonsLoading,
  pagination,
  setPagination,
  isTableLoading,
  handleSignOut,
  columnFilters,
  setColumnFilters
}: {
  handleSCVLoading: (
    e: FormEvent<HTMLInputElement>,
    func: (arg: FormData) => Promise<void>
  ) => void;
  data: IDealerProduct[];
  isButtonsLoading: {
    dealers: boolean;
    dealerPrices: boolean;
    products: boolean;
  };
  pagination: Pagination;
  setPagination: (value: MRT_Updater<Pagination>) => void;
  isTableLoading: boolean;
  handleSignOut: () => void;
  columnFilters: MRT_ColumnFiltersState;
  setColumnFilters: (arg: MRT_Updater<MRT_ColumnFiltersState>) => void;
}) {
  const navigate = useNavigate();
  const dateAndPriceStateList: string[] = ['Любая', 'По возрастанию', 'По убыванию'];
  const statusStateList: string[] = [
    'Все товары',
    'Сопоставленные',
    'Не сопоставленные',
    'Отложенные'
  ];

  const columns: MRT_ColumnDef<IDealerProduct>[] = useMemo(
    () => [
      {
        header: 'Название',
        accessorKey: 'product_name',
        size: 450,
        minSize: 40,
        maxSize: 1000
      },
      {
        header: 'Цена, руб',
        accessorKey: 'price',
        filterVariant: 'select',
        filterSelectOptions: dateAndPriceStateList,
        size: 150,
        minSize: 40,
        maxSize: 350
      },
      {
        header: 'Дилер',
        accessorKey: 'dealer',
        accessorFn: (data) => data.dealer.name,
        size: 250,
        minSize: 40,
        maxSize: 350
      },
      {
        header: 'Дата',
        accessorKey: 'date',
        filterVariant: 'select',
        filterSelectOptions: dateAndPriceStateList,
        size: 150,
        minSize: 40,
        maxSize: 350
      },
      {
        header: 'Статус',
        accessorKey: 'status',
        accessorFn: (data) =>
          data.productdealer === null ? 'not processed' : data.productdealer?.status,
        filterVariant: 'select',
        filterSelectOptions: statusStateList,
        size: 150,
        minSize: 40,
        maxSize: 1000,
        Cell: ({ cell }) => {
          switch (cell.getValue()) {
            case 'not processed':
              return <p className="main__marked">Не тронут</p>;
              break;
            case 'matched':
              return <p className="main__marked">Сопоставлен</p>;
              break;
            case 'not matched':
              return <p className="main__marked">Не сопоставлен</p>;
              break;
            case 'deferred':
              return <p className="main__marked">Отложен</p>;
              break;
            default:
              return <p className="main__marked">Отложен</p>;
          }
        }
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    state: { pagination, isLoading: isTableLoading, columnFilters },
    enableRowNumbers: true,
    enableColumnOrdering: true,
    enableClickToCopy: true,
    enableColumnPinning: true,
    enableColumnResizing: true,
    enableColumnDragging: false,
    initialState: {
      showColumnFilters: true,
      expanded: true
    },
    onPaginationChange: setPagination,
    enableGlobalFilterRankedResults: false,
    enablePagination: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    layoutMode: 'grid',
    enableSorting: false,
    manualFiltering: true,
    enableGlobalFilter: false,
    enableColumnFilters: true,
    onColumnFiltersChange: setColumnFilters,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        navigate(`/marking/${row.original.id}`);
      },
      sx: {
        cursor: 'pointer'
      }
    }),
    muiTableBodyCellProps: {
      sx: {
        borderRight: '2px solid #e0e0e0',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }
    },
    muiTableHeadCellProps: {
      sx: {
        fontSize: '15px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }
    },
    muiPaginationProps: {
      rowsPerPageOptions: [10, 20, 30, 50]
    },
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'nowrap' }}>
        <Button
          variant="contained"
          color="error"
          sx={{ margin: '0 0 0 auto' }}
          onClick={() => handleSignOut()}>
          Выйти
        </Button>
        <Button variant="contained" color="inherit">
          {isButtonsLoading.dealers ? (
            <ButtonPreloader />
          ) : (
            <div className="main-page__input-container">
              <input
                type="file"
                id="dealers"
                name="dealers"
                accept=".csv"
                onInput={(e) => handleSCVLoading(e, (formData) => api.addDealers(formData))}
                className="main-page__input"
              />
              <label className="main-page__input-label" htmlFor="dealers">
                <div className="main-page__upload-image"></div>
                <p className="main-page__button-text">Список дилеров</p>
              </label>
            </div>
          )}
        </Button>
        <Button variant="contained" color="inherit">
          {isButtonsLoading.dealerPrices ? (
            <ButtonPreloader />
          ) : (
            <div className="main-page__input-container">
              <input
                type="file"
                id="dealerPrices"
                name="dealerPrices"
                accept=".csv"
                onInput={(e) => handleSCVLoading(e, (formData) => api.addDealerPrices(formData))}
                className="main-page__input"
              />
              <label className="main-page__input-label" htmlFor="dealerPrices">
                <div className="main-page__upload-image"></div>
                <p className="main-page__button-text">Товары дилеров</p>
              </label>
            </div>
          )}
        </Button>
        <Button variant="contained" color="inherit">
          {isButtonsLoading.products ? (
            <ButtonPreloader />
          ) : (
            <div className="main-page__input-container">
              <input
                type="file"
                id="products"
                name="products"
                accept=".csv"
                onInput={(e) => handleSCVLoading(e, (formData) => api.addProducts(formData))}
                className="main-page__input"
              />
              <label className="main-page__input-label" htmlFor="products">
                <div className="main-page__upload-image"></div>
                <p className="main-page__button-text">Товары заказчика</p>
              </label>
            </div>
          )}
        </Button>
        <Button variant="contained" color="inherit" onClick={() => navigate('/statistics')}>
          Статистика
        </Button>
      </Box>
    )
  });

  return { table };
}

export default TableOptions;
