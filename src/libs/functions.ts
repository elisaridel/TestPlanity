export function cn(
	baseClassName: string = '',
	additionalClassNames: Record<string, boolean> = {},
	guaranteedClassNames: (string | undefined)[] = [],
): string {
	let classNames = baseClassName
	const filteredClassNames = []

	if (guaranteedClassNames?.length > 0) {
		guaranteedClassNames?.forEach((className) => {
			if (className && className?.trim()?.length > 0) {
				filteredClassNames?.push(className.trim())
			}
		})
	}

	if (Object.keys(additionalClassNames)?.length > 0) {
		for (const [className, isAdded] of Object.entries(
			additionalClassNames,
		)) {
			if (isAdded) {
				filteredClassNames.push(className)
			}
		}
	}

	if (filteredClassNames?.length > 0) {
		classNames = `${classNames} ${filteredClassNames.join(' ')}`
	}

	return classNames
}



