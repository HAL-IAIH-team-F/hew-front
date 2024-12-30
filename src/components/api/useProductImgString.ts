import { useEffect, useState } from 'react';
import { useClientContextState } from "~/api/context/ClientContextProvider";
import { Img } from "~/api/context/Api";

const useProductImgString = (product_thumbnail_uuid: string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (product_thumbnail_uuid) {
      Img.create(product_thumbnail_uuid, null)
        .then((value1) => {
          if (value1.error) {
            console.error(`${value1.error.error_id}: ${value1.error.message}`);
            setImageUrl(null);
          } else if (value1.success) {
            const url = value1.success.strUrl(); // URL を取得
            setImageUrl(url);
          } else {
            console.error("Unexpected response format");
            setImageUrl(null);
          }
        })
        .catch((err) => {
          console.error(`Error fetching image: ${err.message}`);
          setImageUrl(null);
        });
    }
  }, [product_thumbnail_uuid]);

  return imageUrl;
};

export default useProductImgString;
