"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
	const { conversationId } = useConversation();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setValue("message", "", { shouldValidate: true });
		axios.post("/api/messages", {
			...data,
			conversationId,
		});
	};
	const handleUpload = (result: any) => {
		axios.post("/api/messages", {
			image: result?.info?.secure_url,
			conversationId,
		});
	};

	return (
		<div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
			<CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="tlh5pwu3">
				<HiPhoto size={30} className="text-sky-500" />
			</CldUploadButton>
			<form className="flex items-center gap-2 lg:gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
				<MessageInput id="message" register={register} errors={errors} required placeholder="write a message" />
				<button type="submit" className="rounded-full relative p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition">
					<HiPaperAirplane size={18} className="text-white rotate-90" />
				</button>
			</form>
		</div>
	);
};

export default Form;
