import { Row } from '../TableCard';

export const PRIMARY_KEY = 'primaryKey';
export const FOREIGN_KEY = 'foreignKey';

export const sortRows = (rows: Row[]) => {
	return rows.sort((a, b) => {
		if (a.constraints === PRIMARY_KEY && b.constraints !== PRIMARY_KEY) return -1;
		if (a.constraints !== PRIMARY_KEY && b.constraints === PRIMARY_KEY) return 1;
		if (a.constraints === FOREIGN_KEY && b.constraints !== FOREIGN_KEY) return 1;
		if (a.constraints !== FOREIGN_KEY && b.constraints === FOREIGN_KEY) return -1;
		return 0;
	});
};
