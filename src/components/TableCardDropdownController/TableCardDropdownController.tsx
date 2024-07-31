'use client';

import React, { useState } from 'react';
import TableCardDropdown from '../TableCardDropdown/TableCardDropdown';
import EditTableModal from '../Modals/EditTableModal';
import DeleteTableModal from '../Modals/DeleteTableModal';
import { Databases } from '@prisma/client';
import { Row } from '../TablesCard/TableCard';

type TableCardDropdownControllerProps = {
	tableId: string;
	type: Databases;
	title: string;
	rows: Row[];
};

const TableCardDropdownController = ({ tableId, type, title, rows }: TableCardDropdownControllerProps) => {
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

	const toggleEditModal = () => {
		setIsEditModalVisible(!isEditModalVisible);
	};
	const toggleDeleteModal = () => {
		setIsDeleteModalVisible(!isDeleteModalVisible);
	};

	return (
		<>
			<TableCardDropdown handleEditModal={toggleEditModal} handleDeleteModal={toggleDeleteModal} />
			<EditTableModal
				isOpened={isEditModalVisible}
				toggleModal={toggleEditModal}
				tableId={tableId}
				type={type}
				title={title}
				rows={rows}
			/>
			<DeleteTableModal isOpened={isDeleteModalVisible} toggleModal={toggleDeleteModal} />
		</>
	);
};

export default TableCardDropdownController;
