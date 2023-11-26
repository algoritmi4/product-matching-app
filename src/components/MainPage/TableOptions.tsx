import { useMemo, useState } from 'react';
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_RowSelectionState
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { data, type Data } from './data';
import { Button } from '@mui/material';

function TableOptions() {
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const columns = useMemo<MRT_ColumnDef<Data>[]>(
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
        accessorFn: (data) => (data.status ? 'true' : 'false'),
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
    getRowId: (originalRow) => originalRow.id,
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
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" color="primary">
        Download Selected Rows
      </Button>
    )
  });

  return { table };
}

export default TableOptions;
