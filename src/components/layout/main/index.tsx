import { ReactElement } from 'react'
import { View } from 'react-native'
import Sidebar from './sidebar'

const MainLayout = ({ children }: { children: ReactElement }): ReactElement => {
	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<Sidebar />
				{children}
			</View>
		</View>
	)
}

export default MainLayout
