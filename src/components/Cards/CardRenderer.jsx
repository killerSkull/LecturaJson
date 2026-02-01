import React, { useMemo } from 'react';
import { detectType } from '../../utils/detectType';

// Import all card variants
import TextCard from './TextCard';
import ImageCard from './ImageCard';
import MixedCard from './MixedCard';
import VideoCard from './VideoCard';
import listCard from './ListCard'; // Careful with casing in imports if filename is camelCase
import LinkCard from './LinkCard';
import CodeCard from './CodeCard';
import GenericCard from './GenericCard';
import ListCard from './ListCard';

import CollapsibleCardWrapper from './CollapsibleCardWrapper';
import DownloadableCardWrapper from './DownloadableCardWrapper';

const CardRenderer = ({ item }) => {
    const type = useMemo(() => detectType(item), [item]);

    // Helper to get title for filename
    const title = item.title || item.name || `item-${type}`;

    let CardComponent;
    switch (type) {
        case 'text': CardComponent = TextCard; break;
        case 'image': CardComponent = ImageCard; break;
        case 'mixed': CardComponent = MixedCard; break;
        case 'video': CardComponent = VideoCard; break;
        case 'list': CardComponent = ListCard; break;
        case 'link': CardComponent = LinkCard; break;
        case 'code': CardComponent = CodeCard; break;
        default: CardComponent = GenericCard; break;
    }

    return (
        <DownloadableCardWrapper fileName={title}>
            <CollapsibleCardWrapper>
                <CardComponent item={item} />
            </CollapsibleCardWrapper>
        </DownloadableCardWrapper>
    );
};

export default CardRenderer;
