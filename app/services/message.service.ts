import { db } from "@/lib/firebase";
import {
    Timestamp,
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import { MessageDto, MessageType, CreateMessageDto } from "../models/message.model";

const messagesCollection = collection(db, "messages");

export const getTaskMessages = async (taskId: string) => {
    const q = query(
        messagesCollection,
        where("taskId", "==", taskId),
        orderBy("createdAt", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MessageDto[];
};

export const listenToTaskMessages = (
    taskId: string, 
    userId: string, 
    startDate: string,
    callback: (messages: MessageDto[]) => void
) => {
    const constraints: any[] = [
        where("taskId", "==", taskId),
        where("userId", "==", userId)
    ];

    if (startDate && startDate.trim()) {
        const startTimestamp = Timestamp.fromDate(new Date(startDate));
        constraints.push(where("createdAt", ">", startTimestamp));
    }
    
    constraints.push(orderBy("createdAt", "asc"));

    const q = query(messagesCollection, ...constraints);
    
    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
        } as MessageDto));
        callback(messages);
    });
};

export const createMessage = async ({
    userId,
    taskId,
    type = MessageType.GENERAL,
    body,
    metadata = {} as any,
    attachments = []
}: CreateMessageDto) => {
    const messageRef = doc(messagesCollection);

    const messageData: MessageDto = {
        id: messageRef.id,
        userId,
        taskId,
        type,
        body,
        metadata,
        attachments,
        read: false,
        createdAt: Timestamp.now() as unknown as string,
        updatedAt: Timestamp.now() as unknown as string
    };

    await setDoc(messageRef, messageData);
    return messageData;
};

export const updateMessage = async (messageId: string, data: Partial<MessageDto>) => {
    const messageRef = doc(db, "messages", messageId);
    const messageSnap = await getDoc(messageRef);

    if (!messageSnap.exists()) {
        throw new Error("Message not found");
    }

    const updateData = {
        ...data,
        updatedAt: Timestamp.now()
    };

    await updateDoc(messageRef, updateData);

    const updatedMessageSnap = await getDoc(messageRef);
    return {
        id: updatedMessageSnap.id,
        ...updatedMessageSnap.data()
    };
};

export const markMessageAsRead = async (messageId: string) => {
    const messageRef = doc(db, "messages", messageId);
    const messageSnap = await getDoc(messageRef);

    if (!messageSnap.exists()) {
        throw new Error("Message not found");
    }

    const data = messageSnap.data() as MessageDto;
    if (!data.read) {
        await updateDoc(messageRef, { read: true });
    }
};

export const countUnreadMessages = async (taskId: string, userId: string) => {
    const q = query(
        messagesCollection,
        where("taskId", "==", taskId),
        where("userId", "!=", userId),
        where("read", "==", false)
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
};

export const listenToUnreadMessagesCount = (
    taskId: string,
    userId: string,
    callback: (count: number) => void
) => {
    const q = query(
        messagesCollection,
        where("taskId", "==", taskId),
        where("userId", "!=", userId),
        where("read", "==", false)
    );
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.size);
    });
};