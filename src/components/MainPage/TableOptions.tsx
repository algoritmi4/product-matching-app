import { FormEvent, useMemo } from 'react';
import { useMaterialReactTable, type MRT_ColumnDef, MRT_Updater } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { IDealerProduct } from '../../utils/Interfaces/IDealerProduct.interface';
import ButtonPreloader from '../ButtonPreloader/ButtonPreloader';
import api from '../../utils/Api/api';

interface Pagination {
  pageIndex: number;
  pageSize: number;
}

interface isButtonsLoading {
  dealers: boolean;
  dealerPrices: boolean;
  products: boolean;
}

function TableOptions({
  handleSCVLoading,
  data,
  isButtonsLoading,
  pagination,
  setPagination,
  isTableLoading,
  handleSignOut
}: {
  handleSCVLoading: (
    e: FormEvent<HTMLInputElement>,
    func: (arg: FormData) => Promise<void>
  ) => void;
  data: IDealerProduct[];
  isButtonsLoading: isButtonsLoading;
  pagination: Pagination;
  setPagination: (value: MRT_Updater<Pagination>) => void;
  isTableLoading: boolean;
  handleSignOut: () => void;
}) {
  const navigate = useNavigate();

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
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive',
        size: 150,
        minSize: 40,
        maxSize: 350,
        muiFilterSliderProps: {
          marks: true,
          max: 4000,
          min: 0,
          step: 10,
          valueLabelFormat: (value) =>
            value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'RUB'
            })
        }
      },
      {
        header: 'Дилер',
        accessorFn: (data) => data.dealer.name,
        size: 250,
        minSize: 40,
        maxSize: 350
      },
      {
        header: 'Дата',
        accessorKey: 'date',
        size: 150,
        minSize: 40,
        maxSize: 350
      },
      {
        header: 'Статус',
        accessorFn: (data) => (data.mapped ? 'true' : 'false'),
        filterVariant: 'checkbox',
        size: 150,
        minSize: 40,
        maxSize: 1000,
        Cell: ({ cell }) =>
          cell.getValue() === 'true' ? (
            <p className="main__marked">Сопоставлен</p>
          ) : (
            <p className="main__need-marking">Не сопоставлен</p>
          )
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    state: { pagination, isLoading: isTableLoading },
    enableRowNumbers: true,
    enableRowPinning: true,
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
    enableGrouping: true,
    enablePagination: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    layoutMode: 'grid',
    enableFullScreenToggle: false,
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
