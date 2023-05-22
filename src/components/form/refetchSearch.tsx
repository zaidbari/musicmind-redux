import { IconButton } from '@/components/buttons/iconButton'
import Input from '@/components/form/input'
import { SPACER } from '@/constants/misc'
import { Dispatch, ReactElement, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

type SearchProps = {
	setSearch: Dispatch<SetStateAction<string>>
	refetch: () => void
	placeholder: string
}

export const RefetchSearch = ({ setSearch, refetch, placeholder }: SearchProps): ReactElement => {
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<IconButton onPress={refetch} size={26} icon="reload-outline" text={t('buttons.reload') as string} />
			<Input clearButtonMode="always" onChangeText={setSearch} style={styles.input} placeholder={placeholder} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginBottom: 10,
		paddingRight: SPACER,
		paddingLeft: 0,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	input: {
		marginBottom: 0,
		marginLeft: 10,
		width: '100%',
		flex: 1
	}
})
