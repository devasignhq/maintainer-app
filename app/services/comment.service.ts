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
import { CommentDto, CommentType, CreateCommentDto } from "../models/comment.model";

const commentsCollection = collection(db, "comments");

export const getTaskComments = async (taskId: string) => {
    const q = query(
        commentsCollection,
        where("taskId", "==", taskId),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const listenToTaskComments = (taskId: string, callback: (comments: CommentDto[]) => void) => {
    const q = query(
        commentsCollection,
        where("taskId", "==", taskId),
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommentDto));
        callback(comments);
    });
};

export const createComment = async ({
    userId,
    taskId,
    type = CommentType.GENERAL,
    message,
    metadata = {} as any,
    attachments = []
}: CreateCommentDto) => {
    const commentRef = doc(commentsCollection);
    const timestamp = new Date().toISOString();

    const commentData = {
        id: commentRef.id,
        userId,
        taskId,
        type,
        message,
        metadata,
        attachments,
        read: false,
        createdAt: timestamp,
        updatedAt: timestamp
    };

    await setDoc(commentRef, commentData);
    return commentData;
};

export const updateComment = async (commentId: string, data: Partial<Comment>) => {
    const commentRef = doc(db, "comments", commentId);
    const commentSnap = await getDoc(commentRef);

    if (!commentSnap.exists()) {
        throw new Error("Comment not found");
    }

    const updateData = {
        ...data,
        updatedAt: Timestamp.now()
    };

    await updateDoc(commentRef, updateData);

    const updatedCommentSnap = await getDoc(commentRef);
    return {
        id: updatedCommentSnap.id,
        ...updatedCommentSnap.data()
    };
};

export const markCommentAsRead = async (commentId: string) => {
    const commentRef = doc(db, "comments", commentId);
    const commentSnap = await getDoc(commentRef);

    if (!commentSnap.exists()) {
        throw new Error("Comment not found");
    }

    const data = commentSnap.data() as CommentDto;
    if (!data.read) {
        await updateDoc(commentRef, { read: true });
    }
};

export const countUnreadComments = async (taskId: string, userId: string) => {
    const q = query(
        commentsCollection,
        where("taskId", "==", taskId),
        where("userId", "!=", userId),
        where("read", "==", false)
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
};

export const listenToUnreadCommentsCount = (
    taskId: string,
    userId: string,
    callback: (count: number) => void
) => {
    const q = query(
        commentsCollection,
        where("taskId", "==", taskId),
        where("userId", "!=", userId),
        where("read", "==", false)
    );
    return onSnapshot(q, (snapshot) => {
        callback(snapshot.size);
    });
};