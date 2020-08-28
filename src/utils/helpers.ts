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

const hmsTos = (hh: number, mm: number, ss: number) => {
    const hourSec = hh * 60 * 60;
    const minuteSec = hh * 60;

    return hourSec + minuteSec + ss;
}

export { isEmpty, makeId, hmsTos };
