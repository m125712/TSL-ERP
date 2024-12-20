import { lazy, useEffect, useState } from 'react';
import { useOtherUnitValueLabel } from '@/state/other';
import { useStoreUnit } from '@/state/store';
import { useAccess } from '@/hooks';

import { Suspense } from '@/components/Feedback';
import ReactTable from '@/components/Table';

import PageInfo from '@/util/PageInfo';

import { LibraryCommonColumns } from '../columns';

const AddOrUpdate = lazy(() => import('./add-update'));
const DeleteModal = lazy(() => import('@/components/Modal/Delete'));

export default function Index() {
	const { data, isLoading, url, deleteData, refetch } = useStoreUnit();
	const { invalidateQuery: invalidateUnitValueLabel } =
		useOtherUnitValueLabel();
	const info = new PageInfo('Store/Unit', url, 'store__unit');
	const haveAccess = useAccess('store__unit');

	useEffect(() => {
		document.title = info.getTabName();
	}, []);

	const handelAdd = () => {
		window[info.getAddOrUpdateModalId()].showModal();
	};

	const [update, setUpdate] = useState({
		uuid: null,
	});

	const handelUpdate = (idx) => {
		setUpdate((prev) => ({
			...prev,
			uuid: data[idx].uuid,
		}));
		window[info.getAddOrUpdateModalId()].showModal();
	};

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

	const columns = LibraryCommonColumns({
		handelUpdate,
		handelDelete,
		haveAccess,
		data,
	});

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
					invalidateQuery={invalidateUnitValueLabel}
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
