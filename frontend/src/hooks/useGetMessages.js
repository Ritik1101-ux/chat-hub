import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const token=localStorage.getItem('access-token')
				const url = import.meta.env.VITE_BACKEND_URL;
				const { data } = await axios.get(`${url}/api/messages/${selectedConversation._id}`, {
					headers: {
						'Content-Type': 'application/json',
						'authorization':`Bearer ${token}`
					},
				});
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error?.response?.data?.error || "Internal Server Error");
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};

export default useGetMessages;
