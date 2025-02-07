import {useEffect, useState} from 'react';
import {useClientState} from "~/api/context/ClientContextProvider";
import {Img} from "~/api/context/Api";

interface ProductUuid {
  product_thumbnail_uuid: string;
}

const ProductThumbnail = ({product_thumbnail_uuid}: ProductUuid) => {
  const context = useClientState();
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!image) {
    return <div>No image available</div>;
  }

  return (
    <div className="w-full h-full">
      <img
        src={image.strUrl()}
        alt="Product Thumbnail"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProductThumbnail;
