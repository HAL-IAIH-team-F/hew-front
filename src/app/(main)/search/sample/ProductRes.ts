export interface ProductRes {
    product_description: string
    product_id: string
    product_thumbnail_uuid: string
    product_price: number
    product_title: string
    purchase_date: string
    creator_ids: string[]
    purchase_info: PurchaseInfo | undefined | null
}

export interface PurchaseInfo {
    content_uuid: string
    token: {
        token: string,
        expire: string
    }
}
