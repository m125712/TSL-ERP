import { useMemo } from 'react';

import {
	DateTime,
	EditDelete,
	LinkWithCopy,
	Progress,
	StatusButton,
	Transfer,
} from '@/ui';

import { DEFAULT_COLUMNS } from '@/util/Table/default-columns';

export const BuyerColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};
export const ArticleColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'buyer_name',
				header: 'Buyer Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const LcColumns = ({ handelUpdate, handelDelete, haveAccess, data }) => {
	return useMemo(
		() => [
			{
				accessorKey: 'number',
				header: 'Number',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				header: 'Date',
				accessorKey: 'date',
				enableColumnFilter: false,
				cell: (info) => <DateTime date={info.getValue()} />,
			},
			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const VendorColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'person',
				header: 'Person',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'phone',
				header: 'Phone',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'address',
				header: 'Address',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const CategoryColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const StockColumns = ({
	handelUpdate,
	handelDelete,
	handleIssue,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'category_name',
				header: 'Category',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'color',
				header: 'Color',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'quantity',
				header: 'Quantity',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'action_trx',
				header: 'Issue',
				enableColumnFilter: false,
				enableSorting: false,
				hidden: !haveAccess.includes('click_issue'),
				width: 'w-24',
				cell: (info) => (
					<Transfer onClick={() => handleIssue(info.row.index)} />
				),
			},
			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const IssueLogColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'material_name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},

			{
				accessorKey: 'article_name',
				header: 'Article',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'buyer_name',
				header: 'Buyer',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'category_name',
				header: 'Category',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'issue_quantity',
				header: 'Quantity',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'material_unit',
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},

			{
				accessorKey: 'remarks',
				header: 'Remarks',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'actions',
				header: 'Actions',
				enableColumnFilter: false,
				enableSorting: false,
				hidden:
					!haveAccess?.includes('click_issue_update') &&
					!haveAccess?.includes('click_issue_delete'),
				width: 'w-24',
				cell: (info) => (
					<EditDelete
						idx={info.row.index}
						handelUpdate={handelUpdate}
						handelDelete={handelDelete}
						showUpdate={haveAccess?.includes('click_issue_update')}
						showDelete={haveAccess?.includes('click_issue_delete')}
					/>
				),
			},
		],
		[data]
	);
};
export const ReceiveLogColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'material_name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'article_name',
				header: 'Article',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'buyer_name',
				header: 'Buyer',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'category_name',
				header: 'Category',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'quantity',
				header: 'Quantity',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'material_unit',
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'price',
				header: 'Price',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'remarks',
				header: 'Remarks',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'actions',
				header: 'Actions',
				enableColumnFilter: false,
				enableSorting: false,
				hidden:
					!haveAccess?.includes('click_receive_update') &&
					!haveAccess?.includes('click_receive_delete'),
				width: 'w-24',
				cell: (info) => (
					<EditDelete
						idx={info.row.index}
						handelUpdate={handelUpdate}
						handelDelete={handelDelete}
						showUpdate={haveAccess?.includes(
							'click_receive_update'
						)}
						showDelete={haveAccess?.includes(
							'click_receive_delete'
						)}
					/>
				),
			},
		],
		[data]
	);
};