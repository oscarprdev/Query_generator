'use client';

import React, { useState } from 'react';
import TableCardDropdown from '../TableCardDropdown/TableCardDropdown';
import { Databases } from '@prisma/client';
import { Row } from '../TablesCard/TableCard';
import EditTableModal from '../Modals/EditTableModal/EditTableModal';
import DeleteTableModal from '../Modals/DeleteTableModal/DeleteTableModal';

type TableCardDropdownControllerProps = {
	tableId: string;
	type: Databases;
	title: string;
	projectTitle: string;
	rows: Row[];
};

const TableCardDropdownController = ({
	tableId,
	type,
	title,
	projectTitle,
	rows,
}: TableCardDropdownControllerProps) => {
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
				projectTitle={projectTitle}
				rows={rows}
			/>
			<DeleteTableModal
				tableId={tableId}
				type={type}
				title={title}
				isOpened={isDeleteModalVisible}
				toggleModal={toggleDeleteModal}
			/>
		</>
	);
};

export default TableCardDropdownController;
