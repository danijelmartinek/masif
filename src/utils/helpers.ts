const isEmpty = (str: string): boolean => {
	return !str || 0 === str.length;
};

const makeId = (length: number): string => {
	let result: string = '';
	let characters: string =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength: number = characters.length;

	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}

	return result;
};

export { isEmpty, makeId };
