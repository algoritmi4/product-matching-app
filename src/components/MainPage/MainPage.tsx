import { useMemo } from 'react';
import './MainPage.css';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';

interface Data {
  id: string;
  product_key: number;
  price: string;
  product_url: string;
  product_name: string;
  date: string;
  dealer_id: string;
  status: boolean;
}

const data: Data[] = [
  {
    id: '1',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Средство универсальное Prosept Universal Spray	500мл',
    date: '2023-07-11',
    dealer_id: '3',
    status: false
  },
  {
    id: '2',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Удалитель ржавчины PROSEPT RUST REMOVER 0 5л 023-05',
    date: '2023-07-11',
    dealer_id: '5',
    status: false
  },
  {
    id: '3',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Средство для чистки люстр Prosept Universal Anti-dust 500мл',
    date: '2023-07-11',
    dealer_id: '2',
    status: false
  },
  {
    id: '4',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: false
  },
  {
    id: '4',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: false
  },
  {
    id: '4',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: true
  },
  {
    id: '4',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: true
  },
  {
    id: '4',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: true
  },
  {
    id: '4',
    product_key: 546227,
    price: '232.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name:
      'Концентрат Prosept Multipower для мытья полов цитрус 1л название длинное ну прорстио очень я не могу прям',
    date: '2023-07-11',
    dealer_id: '4',
    status: true
  },
  {
    id: '4',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: true
  }
];

function MainPage() {
  const navigate = useNavigate();

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
    enableRowNumbers: true,
    enableRowPinning: true,
    enableColumnOrdering: true,
    enableClickToCopy: true,
    enableColumnPinning: true,
    enableColumnResizing: true,
    enableColumnDragging: false,
    enableDensityToggle: false,
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
    enableFullScreenToggle: true,
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
    }
  });

  return <MaterialReactTable table={table} />;
}

export default MainPage;
