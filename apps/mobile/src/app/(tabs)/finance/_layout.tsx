import { Header } from '@/components/header';
import { Stack, usePathname } from 'expo-router';
import { useMemo } from 'react';

export default function PaymentsLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: "default",
			}}
		/>
	);
}