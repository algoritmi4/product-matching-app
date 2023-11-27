import { useMemo, useState } from 'react';
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_RowSelectionState
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { type Data } from '../../utils/data.interface';
import { Button } from '@mui/material';
import { TEST_MARKETING_DEALERPRICE as data } from '../../utils/constants';
import uploadImage from '../../images/upload-image(main-page).svg';

function TableOptions(props: any) {
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const columns: MRT_ColumnDef<Data>[] = useMemo(
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
          max: 2000,
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
        header: 'Дата',
        accessorKey: 'date',
        size: 150,
        minSize: 40,
        maxSize: 350
      },
      {
        header: 'Статус',
        accessorFn: (data) => (data ? 'true' : 'false'),
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
    enableRowSelection: true,
    getRowId: (originalRow) => originalRow.product_key,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    enableRowNumbers: true,
    enableRowPinning: true,
    enableColumnOrdering: true,
    enableClickToCopy: true,
    enableColumnPinning: true,
    enableColumnResizing: true,
    enableColumnDragging: false,
    initialState: {
      showColumnFilters: true,
      pagination: { pageIndex: 0, pageSize: 5 },
      expanded: true
    },
    enableGlobalFilterRankedResults: false,
    enableGrouping: true,
    enablePagination: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    layoutMode: 'grid',
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        navigate(`/marking/${row.original.product_key}`);
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
        fontSize: {
          xs: '10px',
          sm: '11px',
          md: '12px',
          lg: '13px',
          xl: '14px'
        },
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }
    },
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" color="inherit">
        <div className="main-page__input-container">
          <input
            type="file"
            id="csv-input"
            accept=".csv"
            onInput={(e) => props.handleSCVLoading(e)}
            className="main-page__input"
          />
          <label className="main-page__input-label" htmlFor="csv-input">
            <div className="main-page__upload-image"></div>
            <p className="main-page__button-text">CSV</p>
          </label>
        </div>
      </Button>
    )
  });

  return { table };
}

export default TableOptions;
