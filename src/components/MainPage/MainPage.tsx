import './MainPage.css';
import { MaterialReactTable } from 'material-react-table';
import TableOptions from './TableOptions';
import api from '../../utils/api';
import { FormEvent, useEffect, useState } from 'react';
import { DealerProduct } from '../../utils/DealerProduct.interface';

function MainPage() {
  const [data, setData] = useState<DealerProduct[]>([
    {
      id: 2,
      product_key: '546227',
      price: 233,
      product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml/',
      product_name: 'Средство универсальное Prosept Universal Spray, 500мл',
      date: '2023-07-11',
      dealer_id: 2
    }
  ]);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const { table } = TableOptions({ handleSCVLoading, data, isButtonLoading });

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
