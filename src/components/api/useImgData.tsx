import {useEffect, useState} from 'react';
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {Img} from "~/api/context/Api";

interface ProductUuid {
  product_thumbnail_uuid: string;
}

const ProductThumbnail = ({product_thumbnail_uuid}: ProductUuid) => {
  const context = useClientContextState();
  const [image, setImg] = useState<Img | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product_thumbnail_uuid) {
      setLoading(true); // ローディングを開始
      setError(null); // エラーをリセット

      Img.create(product_thumbnail_uuid, null).then((value1) => {
        setLoading(false); // ローディングを終了
        if (value1.error) {
          console.error(`${value1.error.error_id}: ${value1.error.message}`);
          setError(`${value1.error.error_id}: ${value1.error.message}`);
        } else {
          setImg(value1.success);
        }
      });
    }
  }, [context, product_thumbnail_uuid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!image) {
    return <p>No image available</p>;
  }

  return (
    <div>
      <img src={image.strUrl()} alt="Product Thumbnail"/>
    </div>
  );
};

export default ProductThumbnail;
