import { useMemo } from 'react';
import './MainPage.css';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef
} from 'material-react-table';

interface Data {
  id: string;
  product_key: number;
  price: string;
  product_url: string;
  product_name: string;
  date: string;
  dealer_id: string;
}

const data: Data[] = [
  {
    id: '1',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Средство универсальное Prosept Universal Spray	500мл',
    date: '2023-07-11',
    dealer_id: '3'
  },
  {
    id: '2',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Удалитель ржавчины PROSEPT RUST REMOVER 0 5л 023-05',
    date: '2023-07-11',
    dealer_id: '5'
  },
  {
    id: '3',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Средство для чистки люстр Prosept Universal Anti-dust 500мл',
    date: '2023-07-11',
    dealer_id: '2'
  },
  {
    id: '4',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4'
  }
];

function MainPage() {
  const columns = useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      {
        header: 'Название',
        accessorKey: 'product_name',
        size: 350
      },
      {
        header: 'Цена, руб',
        accessorFn: (dataRow: Data) => dataRow.price
      },
      {
        header: 'Дата сбора информации',
        accessorFn: (dataRow) => dataRow.date
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableRowPinning: true,
    enableColumnOrdering: true,
    enableGlobalFilter: false
  });

  return <MaterialReactTable table={table} />;
}

export default MainPage;
