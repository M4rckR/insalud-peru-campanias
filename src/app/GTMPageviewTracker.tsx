'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GTMPageviewTracker = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'pageview',
                page: pathname,
            });
        }
    }, [pathname]);

    return null;
};

export default GTMPageviewTracker;