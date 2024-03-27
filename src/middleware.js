// pages/_middleware.js

import { NextResponse } from 'next/server';

export function middleware(_req) {
    // Burada isteğe bağlı olarak herhangi bir işlem yapabilirsiniz.
    // Örneğin, bazı loglar tutabilir, istek başlıklarını değiştirebilirsiniz.
    // Bu örnekte herhangi bir özel işlem yapmıyoruz ve tüm istekleri olduğu gibi bırakıyoruz.

    return NextResponse.next();
}

export const config = {
    // Middleware'in uygulanacağı yolları matcher ile belirtiyoruz.
    matcher: ['/auth/:path*', '/dashboard/:path*']
};
