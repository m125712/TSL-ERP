import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import {
	useOtherArticleValueLabel,
	useOtherCategoryValueLabel,
} from '@/state/other';
import { useStoreIssue, useStoreStock } from '@/state/store';
import { DevTool } from '@hookform/devtools';
import { useFetch, useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import {
	FormField,
	Input,
	JoinInput,
	JoinInputSelect,
	ReactSelect,
	Textarea,
} from '@/ui';

import nanoid from '@/lib/nanoid';
import GetDateTime from '@/util/GetDateTime';
import { ISSUE_NULL, ISSUE_SCHEMA } from '@/util/Schema';

export default function Index({
	modalId = '',
	updateIssue = {
		uuid: null,
		quantity: null,
	},
	setUpdateIssue,
}) {
	const { user } = useAuth();
	const { url, postData } = useStoreIssue();
	const schema = {
		...ISSUE_SCHEMA,
		issue_quantity: ISSUE_SCHEMA.issue_quantity.max(
			updateIssue?.quantity,
			`Quantity cannot be greater than ${updateIssue?.quantity}`
		),
	};
	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		context,
	} = useRHF(schema, ISSUE_NULL);

	const onClose = () => {
		setUpdateIssue((prev) => ({
			...prev,
			uuid: null,
			quantity: 0,
		}));
		reset(ISSUE_NULL);
		window[modalId].close();
	};
	const { value: material } = useFetch('/other/material/value/label');

	const onSubmit = async (data) => {
		// Add Item
		const updatedData = {
			...data,
			uuid: nanoid(),
			material_uuid: updateIssue?.uuid,
			created_at: GetDateTime(),
			created_by: user?.uuid,
		};
		await postData.mutateAsync({
			url,
			newData: updatedData,
			onClose,
		});
	};

	return (
		<AddModal
			id={modalId}
			title='Issue'
			isSmall={true}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}>
			<JoinInput
				title='quantity'
				label={`issue_quantity`}
				sub_label={`Max ${updateIssue?.quantity}`}
				unit={
					material?.find(
						(inItem) => inItem.value == updateIssue?.uuid
					)?.unit
				}
				{...{ register, errors }}
			/>
			<Input label='remarks' {...{ register, errors }} />
			<DevTool control={control} placement='top-left' />
		</AddModal>
	);
}