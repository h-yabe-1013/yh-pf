export type Tag = {
    id: string
    name: string
}

export type Img = {
    url: string,
    height: number,
    width: number
}

export type Content = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    category: ["画像" | "動画"]
    thumbnail: Img
    image: Img
    created_date: string
    creation_time: string
    comment?: string
    tags?: Tag[]
}

export type Groups = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    description?: string
    items: Content[]
    totalCount: number
    offset: number
    limit: number
}