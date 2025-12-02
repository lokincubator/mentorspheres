import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextValue {
	// Example: could hold user info, theme, etc.
	heroSlideIndex: number;
	setHeroSlideIndex: (index: number) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [heroSlideIndex, setHeroSlideIndex] = useState(0);

	return (
		<AppContext.Provider value={{ heroSlideIndex, setHeroSlideIndex }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const ctx = useContext(AppContext);
	if (!ctx) throw new Error('useAppContext must be used within AppProvider');
	return ctx;
};
