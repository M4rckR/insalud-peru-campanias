export const cdn = (path: string) =>
    `${process.env.NEXT_PUBLIC_CDN_BASE || "https://cdn.insalud.pe"}${path}`;