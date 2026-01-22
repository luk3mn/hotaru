import { getColorScheme } from "@/lib/color-schema";
import React, { useRef, useMemo, useCallback } from "react";
import { View, useWindowDimensions } from "react-native";
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
    ICarouselInstance,
    Pagination,
    TCarouselProps,
} from "react-native-reanimated-carousel";
// import { useScheme } from "@/hooks/use-schema";

interface CarouselItem {
    id: string | number;
    [key: string]: any;
}

interface CardCarouselProps<T extends CarouselItem> {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactElement;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    height?: number;
    className?: string;
    showPagination?: boolean;
}

export function CardCarousel<T extends CarouselItem>({
    data,
    renderItem,
    autoPlay = true,
    autoPlayInterval = 4000,
    height,
    className,
    showPagination = true,
}: CardCarouselProps<T>) {
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const { schema } = getColorScheme();
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();

    // Memorizar altura do carrossel
    const carouselHeight = useMemo(() => {
        return height || screenHeight * 0.21;
    }, [height, screenHeight]);

    // Memorizar estilos de paginação
    const paginationStyles = useMemo(() => ({
        dot: {
            backgroundColor: schema.surface0,
            borderRadius: 50,
        },
        activeDot: {
            backgroundColor: schema.surface0,
            borderRadius: 50,
        },
        container: {
            gap: 10,
            marginTop: 0,
        }
    }), [schema.surface0, schema.surface0]);

    // Callback para navegação por paginação
    const onPressPagination = useCallback((index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    }, [progress.value]);

    // Render item do carousel
    const carouselRenderItem: TCarouselProps<T>['renderItem'] = useCallback(({ item, index }) => {
        return renderItem(item, index);
    }, [renderItem]);

    // Validação de dados
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <View className={className}>
            <Carousel
                width={screenWidth*0.9}
                height={carouselHeight}
                ref={ref}
                data={data}
                onProgressChange={progress}
                renderItem={carouselRenderItem}
                autoPlay={autoPlay}
                autoPlayInterval={autoPlayInterval}
                loop
                pagingEnabled
                snapEnabled
            />

            {showPagination && (
                <Pagination.Basic
                    progress={progress}
                    data={data}
                    dotStyle={paginationStyles.dot}
                    activeDotStyle={paginationStyles.activeDot}
                    containerStyle={paginationStyles.container}
                    onPress={onPressPagination}
                />
            )}
        </View>
    );
}