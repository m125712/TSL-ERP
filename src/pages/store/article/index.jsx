import { lazy, useEffect, useMemo, useState } from 'react';
import { useAccess } from '@/hooks';

import { Suspense } from '@/components/Feedback';
import ReactTable from '@/components/Table';
import { DateTime, EditDelete, Transfer } from '@/ui';

import PageInfo from '@/util/PageInfo';
import { DEFAULT_COLUMNS } from '@/util/table/default-columns';

const AddOrUpdate = lazy(() => import('./add-update'));
const DeleteModal = lazy(() => import('@/components/Modal/Delete'));

export default function Index() {
	const { data, isLoading, url, deleteData, refetch } = use();
	const info = new PageInfo('', url, '');
	const haveAccess = useAccess('');
	const columns = useMemo(
		() => [
			...DEFAULT_COLUMNS({
				handelUpdate: handelUpdate,
				handelDelete: handelDelete,
				haveAccess,
			}),
		],
		[data, haveAccess]
	);

	// Fetching data from server
	useEffect(() => {
		document.title = info.getTabName();
	}, []);

	// Add
	const handelAdd = () => {
		window[info.getAddOrUpdateModalId()].showModal();
	};

	// Update
	const [update, setUpdate] = useState({
		uuid: null,
	});

	const handelUpdate = (idx) => {
		setUpdate((prev) => ({
			...prev,
			uuid: data[idx].uuid,
			section_uuid: data[idx].section_uuid,
			type_uuid: data[idx].type_uuid,
		}));
		window[info.getAddOrUpdateModalId()].showModal();
	};

	const handleTrx = (idx) => {
		setUpdate((prev) => ({
			...prev,
			uuid: data[idx].uuid,
			name: data[idx].name,
		}));
		window['MaterialTrx'].showModal();
	};

	// Delete
	const [deleteItem, setDeleteItem] = useState({
		itemId: null,
		itemName: null,
	});
	const handelDelete = (idx) => {
		setDeleteItem((prev) => ({
			...prev,
			itemId: data[idx].uuid,
			itemName: data[idx].name.replace(/#/g, '').replace(/\//g, '-'),
		}));

		window[info.getDeleteModalId()].showModal();
	};

	return (
		<div>
			<ReactTable
				title={info.getTitle()}
				isLoading={isLoading}
				handelAdd={handelAdd}
				handleReload={refetch}
				accessor={haveAccess.includes('create')}
				data={data}
				columns={columns}
			/>

			<Suspense>
				<AddOrUpdate
					modalId={info.getAddOrUpdateModalId()}
					{...{
						update,
						setUpdate,
					}}
				/>
				<DeleteModal
					modalId={info.getDeleteModalId()}
					title={info.getTitle()}
					{...{
						deleteItem,
						setDeleteItem,
						url,
						deleteData,
					}}
				/>
			</Suspense>
		</div>
	);
}
