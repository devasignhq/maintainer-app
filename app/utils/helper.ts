export const formatDateAndTime = (value: string) => {
	const dateTime = new Date(value);
	
    const day = String(dateTime.getDate()).padStart(2, '0'); // Ensure day is always 2 digits
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Ensure month is always 2 digits
    const year = dateTime.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

	const formattedTime = dateTime.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
	return `${formattedDate}, ${formattedTime}`;
}

export const formatDate = (value: string) => {
    const dateTime = new Date(value);
    const day = String(dateTime.getDate()).padStart(2, '0'); // Ensure day is always 2 digits
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Ensure month is always 2 digits
    const year = dateTime.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}